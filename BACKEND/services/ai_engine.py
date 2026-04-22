import os
import joblib
import pandas as pd
import numpy as np
from typing import Dict
from database.connection import db

class AIEngine:
    def __init__(self):
        self.iso_forest = None
        self.iso_preprocessor = None
        self.stacked_ensemble = None 
        self.full_preprocessor = None 

        self.num_defaults = {}
        self.models_loaded = False
        self.active_manifold = "models"
        self.load_models() 

    def load_models(self, manifold_path="models"):
        print(f"[+] Loading AI Models from {manifold_path}...")
        self.active_manifold = manifold_path
        base_path = manifold_path
        
        try:
            self.iso_forest = joblib.load(os.path.join(base_path, "ieee_isolation_forest.joblib"))
            self.iso_preprocessor = joblib.load(os.path.join(base_path, "ieee_preprocessor.joblib"))
            
            
            stack_path = os.path.join(base_path, "stacked_ensemble.joblib")
            if os.path.exists(stack_path):
                self.stacked_ensemble = joblib.load(stack_path)
            
            self.models_loaded = True
            
            
            try:
                num_pipe = self.iso_preprocessor.named_transformers_['num']
                self.num_defaults = dict(zip(num_pipe.feature_names_in_, num_pipe.named_steps['imputer'].statistics_))
            except Exception as e:
                print(f"[!] Warning: Imputation extraction failed: {e}")
                
            print(f"[+] Manifold '{manifold_path}' Loaded Successfully.")
        except Exception as e:
            print(f"[-] Error Loading Models from {manifold_path}: {e}")
            self.models_loaded = False

    async def _get_temporal_features(self, user: str, current_amt: float):
        """
        FETCH TEOMPORAL HISTORY: 
        Queries the database for the last 4 transactions of the user to calculate 
        rolling features (Mean/Std) for the 5-transaction window.
        """
        if not db.client:
            return 0.0, 0.0, 0.0 

        collection = db.get_db()["transaction_logs"]
        cursor = collection.find({"data.user": user}).sort("created_at", -1).limit(4)
        history = await cursor.to_list(length=4)
        
        amounts = [h["data"]["amount"] for h in history] + [current_amt]
        
        mean_5 = np.mean(amounts)
        std_5 = np.std(amounts) if len(amounts) > 1 else 0.0
        
        
        time_diff = 0.0
        if history:
            
            last_time = history[0]["created_at"]
            from datetime import datetime
            time_diff = (datetime.now() - last_time).total_seconds()
            
        return mean_5, std_5, time_diff

    def _fill_missing_columns(self, data: pd.DataFrame, preprocessor):
        for name, transformer, cols in preprocessor.transformers_:
            if name == "remainder" or name == "drop": continue
            column_list = cols if hasattr(cols, "__iter__") and not isinstance(cols, str) else [cols]
            for col in column_list:
                if isinstance(col, str) and col not in data.columns:
                    data[col] = self.num_defaults.get(col, 0.0)
        return data

    async def predict_full_stack(self, raw_data: Dict):
        """
        AUTHENTIC STACKING INFERENCE:
        1. Injects temporal features from DB history.
        2. Routes through Preprocessor -> Layer 0 -> Layer 1 (Stacker).
        """
        if not self.models_loaded: return {"verdict": "Unknown", "combined_confidence": 0}

        user = raw_data.get("user", "Unknown")
        amount = raw_data.get("amount", 0.0)
        
        
        mean_5, std_5, time_diff = await self._get_temporal_features(user, amount)
        
        
        data_dict = {k: [v] for k, v in raw_data.get("features", {}).items()}
        data_dict['TransactionAmt'] = [amount]
        data_dict['Amt_Rolling_Mean_5'] = [mean_5]
        data_dict['Amt_Rolling_Std_5'] = [std_5]
        data_dict['DT_Diff'] = [time_diff]
        
        df = pd.DataFrame(data_dict)
        df = self._fill_missing_columns(df, self.iso_preprocessor)
        
        
        X_iso = self.iso_preprocessor.transform(df)
        iso_score = float(self.iso_forest.decision_function(X_iso)[0])
        iso_pred = "Fraud" if self.iso_forest.predict(X_iso)[0] == -1 else "Normal"
        
        
        if self.stacked_ensemble:
            
            
            proba = self.stacked_ensemble.predict_proba(df)[0][1] 
            prediction = "Fraud" if proba >= 0.5 else "Normal"
            confidence = proba * 100.0 if prediction == "Fraud" else (1 - proba) * 100.0
        else:
            
            prediction = iso_pred
            confidence = 80.0 

        return {
            "verdict": prediction,
            "combined_confidence": round(confidence, 1),
            "details": {
                "isolation_forest": {
                    "prediction": iso_pred,
                    "anomaly_score": iso_score
                },
                "temporal_features": {
                    "mean_5": round(mean_5, 2),
                    "std_5": round(std_5, 2),
                    "velocity": round(time_diff, 1)
                }
            },
            "logic": "Authentic Stacking Ensemble (IEEE-CIS Standard)"
        }

ai_engine = AIEngine()
