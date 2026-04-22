
import joblib
import os
import pandas as pd
import numpy as np

def extract_safe_vector():
    base_path = 'models'
    try:
        
        ae = joblib.load(os.path.join(base_path, 'ieee_preprocessor.joblib'))
        
        
        num_pipeline = ae.named_transformers_['num']
        imputer = num_pipeline.named_steps['imputer']
        
        stats = imputer.statistics_
        cols = num_pipeline.feature_names_in_
        
        print("--- SENTINEL SAFE MAP ---")
        for k, v in list(zip(cols, stats))[:50]:
            print(f"'{k}': {v:.4f},")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_safe_vector()
