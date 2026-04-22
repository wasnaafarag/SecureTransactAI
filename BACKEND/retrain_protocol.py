import os
import joblib
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest, RandomForestClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

def train_new_manifold(data_path: str = "../AI_MODELS/Finance-Fraud-Detection/train_transaction.csv"):
    """
    SECURETRANSACTAI: TRUE STACKING ENSEMBLE RETRAINING
    Implements temporal feature engineering (rolling window of 5-6 transactions)
    and a multi-layer stacking architecture using the IEEE-CIS dataset.
    """
    print("[+] Protocol Initialized: Authentic Manifold Retraining...")
    
    
    if not os.path.exists(data_path):
        print(f"[!] Critical Error: {data_path} not found. Ensure IEEE-CIS dataset is present.")
        return

    
    print("[+] Loading real transaction data (approx 50k rows)...")
    data = pd.read_csv(data_path, nrows=50000)
    
    
    
    
    print("[+] Engineering Temporal Features (5-transaction sequence)...")
    data = data.sort_values('TransactionDT')
    
    
    data['uid'] = data['card1'].astype(str) + "_" + data['card2'].astype(str)
    
    
    data['Amt_Rolling_Mean_5'] = data.groupby('uid')['TransactionAmt'].transform(lambda x: x.rolling(window=5, min_periods=1).mean())
    data['Amt_Rolling_Std_5'] = data.groupby('uid')['TransactionAmt'].transform(lambda x: x.rolling(window=5, min_periods=1).std()).fillna(0)
    
    
    data['DT_Diff'] = data.groupby('uid')['TransactionDT'].diff().fillna(0)
    
    
    v_cols = [f'V{i}' for i in range(1, 101)] 
    training_features = ['TransactionAmt', 'Amt_Rolling_Mean_5', 'Amt_Rolling_Std_5', 'DT_Diff'] + v_cols
    
    X = data[training_features]
    y = data['isFraud']

    
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, training_features)
        ])

    
    print("[+] Configuring Stacking Layers (RandomForest + Logistic -> Meta Stacker)...")
    
    base_learners = [
        ('rf', RandomForestClassifier(n_estimators=50, max_depth=10, random_state=42, n_jobs=-1)),
        ('lr_base', LogisticRegression(max_iter=1000, random_state=42)) 
    ]
    
    meta_learner = LogisticRegression() 

    stack_clf = StackingClassifier(
        estimators=base_learners,
        final_estimator=meta_learner,
        cv=3, 
        n_jobs=-1
    )

    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    
    iso_forest = IsolationForest(contamination=0.01, random_state=42)
    
    full_pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('stacking', stack_clf)
    ])

    print("[+] Training Temporal Manifold (This may take several minutes)...")
    full_pipeline.fit(X_train, y_train)
    
    
    X_processed_train = preprocessor.transform(X_train)
    iso_forest.fit(X_processed_train)

    print("[+] Calculating Performance Metrics...")
    y_pred = full_pipeline.predict(X_test)
    report = classification_report(y_test, y_pred)
    print("\n[📊] Stacking Ensemble Performance Report:")
    print(report)

    
    print("[+] Exporting real-data binaries to /models_new...")
    os.makedirs('models_new', exist_ok=True)
    
    joblib.dump(iso_forest, 'models_new/ieee_isolation_forest.joblib')
    joblib.dump(full_pipeline, 'models_new/stacked_ensemble.joblib')
    joblib.dump(preprocessor, 'models_new/ieee_preprocessor.joblib')
    
    
    with open('models_new/model_report.txt', 'w') as f:
        f.write("SECURETRANSACTAI AUTHENTIC STACKING REPORT\n")
        f.write("==========================================\n")
        f.write(f"Source: IEEE-CIS Fraud Detection Dataset\n")
        f.write(f"Temporal Method: 5-Transaction Rolling Window\n")
        f.write(f"Stacking Layers: [RF, LR] -> Logistic Meta-Learner\n\n")
        f.write(f"EVALUATION RESULTS:\n{report}")

    print("[+] Retraining Protocol Complete. Authentic stacking manifold ready.")

if __name__ == "__main__":
    train_new_manifold()
