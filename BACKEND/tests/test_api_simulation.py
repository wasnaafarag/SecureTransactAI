from fastapi.testclient import TestClient
from main import app
import sys
import os


sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

client = TestClient(app)

def test_simulation_api():
    print("Testing /fraud/predict API Simulation Logic...")

    
    print("\n--- Test 1: Normal Simulation ---")
    payload_normal = {
        "features": {"V1": 1.0, "TransactionAmt": 50.0},
        "amount": 50.0,
        "receiver": "test_user",
        "simulation_mode": "normal"
    }
    
    
    
    
    
    
    
    
    
    return

if __name__ == "__main__":
    
    
    
    
    
    pass
