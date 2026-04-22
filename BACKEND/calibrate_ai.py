
import joblib
import os
import pandas as pd
import numpy as np
import warnings

warnings.filterwarnings('ignore')

def calibrate():
    base_path = 'models'
    try:
        ae = joblib.load(os.path.join(base_path, 'ieee_preprocessor.joblib'))
        pca = joblib.load(os.path.join(base_path, 'pca_50.pkl'))
        knn = joblib.load(os.path.join(base_path, 'knn_dbscan_proxy.pkl'))
        
        
        
        expected_cols = ae.feature_names_in_
        
        results = []
        for amt in [10, 100, 1000]:
            
            for v1 in np.linspace(-5, 5, 21):
                data = pd.DataFrame([{ 'TransactionAmt': amt, 'V1': v1 }])
                for col in expected_cols:
                    if col not in data.columns:
                        data[col] = 0.0
                
                
                
                
                
                
                db_ae = joblib.load(os.path.join(base_path, 'full_preprocessor.pkl'))
                db_expected = db_ae.feature_names_in_
                
                db_data = pd.DataFrame([{ 'TransactionAmt': amt, 'V1': v1 }])
                for col in db_expected:
                    if col not in db_data.columns:
                        db_data[col] = 0.0
                
                X_scaled = db_ae.transform(db_data)
                X_pca = pca.transform(X_scaled)
                cid = knn.predict(X_pca)[0]
                
                if cid >= 0:
                    results.append((amt, v1, cid))
        
        print("--- SAFE VECTORS FOUND ---")
        for r in results:
            print(f"Amt={r[0]}, V1={r[1]:.2f} => CID={r[2]}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    calibrate()
