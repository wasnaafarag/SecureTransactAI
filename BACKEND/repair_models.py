
import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import IsolationForest
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OrdinalEncoder
import os


os.makedirs("models", exist_ok=True)


DATA_DIR = r"c:\Users\abdul\Desktop\SE\ANOMLY_DETECTION\AI_MODELS\Finance-Fraud-Detection"

if not os.path.exists(DATA_DIR):
    DATA_DIR = r"c:\Users\abdul\Desktop\SE\ANOMLY_DETECTION\AI_MODELS"
print(f"[+] Loading Data from {DATA_DIR}...")


df_trans = pd.read_csv(os.path.join(DATA_DIR, 'train_transaction.csv'), nrows=50000)
df_id = pd.read_csv(os.path.join(DATA_DIR, 'train_identity.csv'), nrows=50000)
df = df_trans.merge(df_id, on='TransactionID', how='left')


X = df.drop(columns=['isFraud', 'TransactionID'], errors='ignore')
y = df['isFraud'] if 'isFraud' in df.columns else None


cat_cols = X.select_dtypes(include=['object', 'category']).columns.tolist()
num_cols = X.select_dtypes(include=['number']).columns.tolist()

print(f"[+] Features: {len(num_cols)} numeric, {len(cat_cols)} categorical")


numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median'))
])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('ordinal', OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1))
])

preprocessor = ColumnTransformer(transformers=[
    ('num', numeric_transformer, num_cols),
    ('cat', categorical_transformer, cat_cols)
])

print("[+] Fitting Preprocessor...")
X_processed = preprocessor.fit_transform(X)

print("[+] Training Isolation Forest...")


iso_forest = IsolationForest(
    n_estimators=100, 
    contamination=0.035, 
    random_state=42, 
    n_jobs=-1
)
iso_forest.fit(X_processed)

print("[+] Saving Compatible Models to BACKEND/models/...")
joblib.dump(preprocessor, 'models/ieee_preprocessor.joblib')
joblib.dump(iso_forest, 'models/ieee_isolation_forest.joblib')
print("[+] Done.")
