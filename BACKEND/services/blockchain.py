import hashlib
import json
from datetime import datetime
from typing import List, Dict, Any, Optional
from database.connection import db

class Block:
    def __init__(self, index: int, timestamp: float, data: Dict[str, Any], previous_hash: str, nonce: int = 0, hash: Optional[str] = None):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.nonce = nonce
        self.hash = hash or self.calculate_hash()

    def calculate_hash(self) -> str:
        """
        Creates a SHA-256 hash of a Block.
        """
        block_string = json.dumps(self.data, sort_keys=True) + str(self.index) + str(self.timestamp) + self.previous_hash + str(self.nonce)
        return hashlib.sha256(block_string.encode()).hexdigest()

class Blockchain:
    def __init__(self):
        self.chain: List[Block] = []
        

    async def create_genesis_block(self):
        genesis_data = {"message": "ST-Governance Genesis Block", "protocol": "ST_CORE_V2"}
        genesis_block = Block(0, datetime.now().timestamp(), genesis_data, "0")
        self.chain.append(genesis_block)
        
        
        database = db.get_db()
        if await database.blockchain.count_documents({"index": 0}) == 0:
            await database.blockchain.insert_one({
                "index": genesis_block.index,
                "timestamp": genesis_block.timestamp,
                "data": genesis_block.data,
                "previous_hash": genesis_block.previous_hash,
                "nonce": genesis_block.nonce,
                "hash": genesis_block.hash
            })

    async def load_from_db(self):
        """
        Loads the blockchain from MongoDB on startup.
        If empty, creates genesis.
        """
        database = db.get_db()
        cursor = database.blockchain.find().sort("index", 1)
        blocks = await cursor.to_list(length=None)
        
        if not blocks:
            print("[+] Blockchain empty in DB. Initializing Genesis...")
            await self.create_genesis_block()
        else:
            self.chain = [
                Block(
                    b["index"], 
                    b["timestamp"], 
                    b["data"], 
                    b["previous_hash"], 
                    b.get("nonce", 0),
                    b["hash"]
                ) for b in blocks
            ]
            print(f"[+] Loaded {len(self.chain)} blocks from MongoDB.")

    def get_last_block(self) -> Block:
        return self.chain[-1]

    async def add_block(self, data: Dict[str, Any]) -> Block:
        last_block = self.get_last_block()
        new_block = Block(
            index=last_block.index + 1,
            timestamp=datetime.now().timestamp(),
            data=data,
            previous_hash=last_block.hash
        )
        
        
        database = db.get_db()
        await database.blockchain.insert_one({
            "index": new_block.index,
            "timestamp": new_block.timestamp,
            "data": new_block.data,
            "previous_hash": new_block.previous_hash,
            "nonce": new_block.nonce,
            "hash": new_block.hash
        })
        
        self.chain.append(new_block)
        return new_block

    def is_chain_valid(self) -> bool:
        """Standard continuity check (Hash linking)"""
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i - 1]

            if current.hash != current.calculate_hash():
                return False

            if current.previous_hash != previous.hash:
                return False

        return True

    async def cross_validate_with_db(self) -> Dict[str, Any]:
        """
        Advanced Integrity Check:
        1. Checks chain continuity (hash linking).
        2. Cross-references blockchain block data with raw database transaction records.
        """
        print("[*] Initiating Cross-Ledger Forensic Audit...")
        is_continuous = self.is_chain_valid()
        if not is_continuous:
            return {"is_valid": False, "reason": "ST_CORE_ALERT: Chain Continuity Failure (Broken Link)"}

        database = db.get_db()
        for block in self.chain:
            if block.index == 0: continue 
            
            tx_id = block.data.get("transaction_id")
            if not tx_id: continue
            
            
            db_record = await database.transaction_logs.find_one({"data.transaction_id": tx_id})
            
            if not db_record:
                print(f"[!] Forensic Error: Block {block.index} references missing DB record {tx_id}")
                return {"is_valid": False, "reason": f"ANOMALY_DETECTED: Block #{block.index} references non-existent transaction {tx_id}"}
            
            
            actual_data = db_record.get("data", {})
            
            
            db_verdict = str(actual_data.get("verdict")).strip()
            ledger_verdict = str(block.data.get("verdict")).strip()
            
            db_amount = float(actual_data.get("amount", 0))
            ledger_amount = float(block.data.get("amount", 0))

            if db_verdict != ledger_verdict or db_amount != ledger_amount:
                reason = f"FORENSIC_TAMPER_ALERT: Database record for {tx_id} ({db_verdict}, ${db_amount}) does not match the immutable ST-Governance ledger ({ledger_verdict}, ${ledger_amount})."
                print(f"[!!!] {reason}")
                
                
                from utils.email import notify_admin_of_tampering
                import asyncio
                background_tasks = asyncio.create_task(notify_admin_of_tampering(reason))
                
                return {
                    "is_valid": False, 
                    "reason": reason,
                    "block_index": block.index
                }

        print("[+] Forensic Audit Successful: Database state aligns with immutable ledger.")
        return {"is_valid": True, "reason": "Immutable Ledger Integrity Verified. Database state aligns with forensic audit trail."}

    def to_list(self) -> List[Dict]:
        return [
            {
                "index": b.index,
                "timestamp": b.timestamp,
                "data": b.data,
                "hash": b.hash,
                "previous_hash": b.previous_hash
            } 
            for b in self.chain
        ]

blockchain_instance = Blockchain()