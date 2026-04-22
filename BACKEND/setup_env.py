import os
import shutil


BASE_DIR = r"c:\Users\abdul\Desktop\SE\ANOMLY_DETECTION\BACKEND"
SOURCE_MODELS_DIR_1 = r"c:\Users\abdul\Desktop\SE\ANOMLY_DETECTION\INITIAL_DATA\Finance-Fraud-Detection\models\saved"
SOURCE_MODELS_DIR_2 = r"c:\Users\abdul\Desktop\SE\ANOMLY_DETECTION\INITIAL_DATA\Finance-Fraud-Detection\models_ieee_if"


DIRS = ["models", "routers", "services", "utils", "database"]

def main():
    print("Starting setup...")
    
    
    for d in DIRS:
        path = os.path.join(BASE_DIR, d)
        os.makedirs(path, exist_ok=True)
        print(f"Created directory: {path}")

    
    files_1 = [
        "full_preprocessor.pkl",
        "pca_50.pkl",
        "knn_dbscan_proxy.pkl"
    ]
    
    for f in files_1:
        src = os.path.join(SOURCE_MODELS_DIR_1, f)
        dst = os.path.join(BASE_DIR, "models", f)
        try:
            shutil.copy2(src, dst)
            print(f"Copied {f}")
        except Exception as e:
            print(f"Failed to copy {f}: {e}")

    
    files_2 = [
        "ieee_isolation_forest.joblib",
        "ieee_preprocessor.joblib"
    ]

    for f in files_2:
        src = os.path.join(SOURCE_MODELS_DIR_2, f)
        dst = os.path.join(BASE_DIR, "models", f)
        try:
            shutil.copy2(src, dst)
            print(f"Copied {f}")
        except Exception as e:
            print(f"Failed to copy {f}: {e}")

    print("Setup complete.")

if __name__ == "__main__":
    main()
