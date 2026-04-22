from fastapi import APIRouter, Depends, Body, HTTPException
from services.blockchain import blockchain_instance
from utils.deps import get_current_active_investigator, get_current_active_admin
from models.user import TokenData
from database.connection import db

router = APIRouter(prefix="/blockchain", tags=["Blockchain Ledger"])

@router.get("/ledger")
def get_ledger(current_user: TokenData = Depends(get_current_active_investigator)):
    return {
        "length": len(blockchain_instance.chain),
        "is_valid": blockchain_instance.is_chain_valid(),
        "chain": blockchain_instance.to_list()
    }

@router.get("/validate")
async def validate_ledger():
    validation_result = await blockchain_instance.cross_validate_with_db()
    return {
        "status": "Secure" if validation_result["is_valid"] else "Compromised", 
        "is_valid": validation_result["is_valid"],
        "reason": validation_result.get("reason")
    }

@router.post("/corrupt")
async def corrupt_transaction(tx_id: str = Body(..., embed=True), current_user: TokenData = Depends(get_current_active_admin)):
    collection = db.get_db()["transaction_logs"]
    
    
    record = await collection.find_one({"data.transaction_id": tx_id})
    if not record:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    old_verdict = record["data"].get("verdict", "Normal")
    new_verdict = "Fraud" if old_verdict == "Normal" else "Normal"
    old_amount = float(record["data"].get("amount", 0))
    new_amount = old_amount * 1.5 + 10  
    
    result = await collection.update_one(
        {"data.transaction_id": tx_id, "data.company_id": current_user.company_id},
        {"$set": {
            "data.verdict": new_verdict, 
            "data.amount": new_amount,
            "corrupted_by_sim": True
        }}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Transaction and authorities verified, but state reached parity (no change needed).")
        
    return {"message": f"Database Record Corrupted: Verdict flipped to {new_verdict}, amount mutated to ${new_amount}."}
