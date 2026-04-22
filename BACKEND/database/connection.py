
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os

class Database:
    client: Optional[AsyncIOMotorClient] = None
    
    def connect(self):
        
        uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
        self.client = AsyncIOMotorClient(uri)
        print("[+] Connected to MongoDB")

    def get_db(self):
        return self.client.get_database("fraud_detection_system")

    def close(self):
        if self.client:
            self.client.close()

db = Database()
