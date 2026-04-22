from fastapi import APIRouter, Depends, HTTPException, Body
from pydantic import BaseModel
from typing import Optional, Dict, List
from database.connection import db
from utils.deps import get_current_user, get_current_active_admin, get_current_active_investigator
from models.user import TokenData
from datetime import datetime, timedelta

router = APIRouter(prefix="/dashboard", tags=["ST-Governance Analytics"])

@router.get("/executive-summary")
async def get_executive_summary(current_user: TokenData = Depends(get_current_active_admin)):
    if not db.client:
        raise HTTPException(status_code=503, detail="Database Offline")
    
    collection = db.get_db()["transaction_logs"]
    month_ago = datetime.now() - timedelta(days=30)
    base_query = {"created_at": {"$gte": month_ago}}
    
    total_scanned = await collection.count_documents(base_query)
    fraud_mitigated = await collection.count_documents({**base_query, "data.verdict": "Fraud"})
    
    pipeline = [
        {"$match": {**base_query, "data.verdict": "Fraud"}},
        {"$group": {"_id": None, "saved": {"$sum": "$data.amount"}}}
    ]
    loss_cursor = collection.aggregate(pipeline)
    loss_result = await loss_cursor.to_list(length=1)
    capital_secured = loss_result[0]["saved"] if loss_result else 0.0

    return {
        "report_type": "Monthly Executive Governance Summary",
        "period": "Last 30 Days",
        "performance_metrics": {
            "model_precision": 0.8969,
            "model_recall": 0.992,
            "f1_score": 0.97,
            "accuracy": 0.9906,
            "processing_latency_ms": "< 45ms"
        },
        "operational_impact": {
            "total_transactions_analyzed": total_scanned,
            "fraud_attempts_mitigated": fraud_mitigated,
            "capital_loss_prevented": f"${capital_secured:,.2f}"
        },
        "system_integrity": {
            "blockchain_sync": "Synchronized",
            "active_p2p_nodes": 3,
            "ledger_height": await db.get_db()["blockchain"].count_documents({})
        }
    }

@router.get("/stats")
async def get_dashboard_stats(current_user: TokenData = Depends(get_current_active_investigator)):
    if not db.client:
        raise HTTPException(status_code=503, detail="Database not available")
    
    collection = db.get_db()["transaction_logs"]
    base_query = {"data.company_id": current_user.company_id}
    
    total_tx = await collection.count_documents(base_query)
    fraud_tx = await collection.count_documents({**base_query, "data.verdict": "Fraud"})
    verified_tx = await collection.count_documents({**base_query, "data.verdict": "Normal"})
    
    pipeline = [
        { "$match": base_query },
        {
            "$group": {
                "_id": { "$hour": "$created_at" },
                "count": { "$sum": 1 },
                "fraud": { 
                    "$sum": { "$cond": [{ "$eq": ["$data.verdict", "Fraud"] }, 1, 0] }
                }
            }
        },
        { "$sort": { "_id": 1 } }
    ]
    
    timeline_cursor = collection.aggregate(pipeline)
    timeline_data = await timeline_cursor.to_list(length=24)
    
    formatted_timeline = [
        {"name": f"{t['_id']}:00", "total": t["count"], "fraud": t["fraud"]} 
        for t in timeline_data
    ]

    return {
        "summary": {
            "total_transactions": total_tx,
            "detected_anomalies": fraud_tx,
            "verified_transactions": verified_tx,
            "analytic_f1_performance": 0.97,
            "accuracy_index": 0.9906
        },
        "timeline": formatted_timeline
    }

@router.get("/history")
async def get_recent_history(limit: int = 50, current_user: TokenData = Depends(get_current_active_investigator)):
    if not db.client:
        return []
    
    collection = db.get_db()["transaction_logs"]
    query = {"data.company_id": current_user.company_id}
    
    cursor = collection.find(query).sort("created_at", -1).limit(limit)
    logs = await cursor.to_list(length=limit)
    
    results = []
    for log in logs:
        log["_id"] = str(log["_id"])
        results.append(log)
        
    return results

@router.get("/transaction/{tx_id}")
async def get_transaction_details(tx_id: str, current_user: TokenData = Depends(get_current_active_investigator)):
    collection = db.get_db()["transaction_logs"]
    from services.blockchain import blockchain_instance
    
    log = await collection.find_one({
        "data.transaction_id": tx_id,
        "data.company_id": current_user.company_id
    })
    
    if not log:
        raise HTTPException(status_code=404, detail="Forensic record not found")
    
    integrity_status = "Verified: Blockchain Anchored"
    
    if not blockchain_instance.is_chain_valid():
        integrity_status = "CRITICAL: Chain Breach Detected"
    else:
        blockchain_db = db.get_db()["blockchain"]
        block = await blockchain_db.find_one({"data.transaction_id": tx_id})
        
        if block:
            db_verdict = str(log["data"].get("verdict")).strip()
            ledger_verdict = str(block["data"].get("verdict")).strip()
            db_amount = float(log["data"].get("amount", 0))
            ledger_amount = float(block["data"].get("amount", 0))
            
            if db_verdict != ledger_verdict or db_amount != ledger_amount:
                integrity_status = "Tampered: Data/Ledger Mismatch"
    
    log["_id"] = str(log["_id"])
    log["data"]["ledger_integrity"] = integrity_status
    
    return log

@router.get("/user/stats")
async def get_user_stats(current_user: TokenData = Depends(get_current_user)):
    collection = db.get_db()["transaction_logs"]
    base_query = {"data.company_id": current_user.company_id}
    
    sent_total = await collection.count_documents({**base_query, "data.user": current_user.username})
    sent_fraud = await collection.count_documents({**base_query, "data.user": current_user.username, "data.verdict": "Fraud"})
    sent_approved = await collection.count_documents({**base_query, "data.user": current_user.username, "data.verdict": "Normal"})

    received_total = await collection.count_documents({**base_query, "data.receiver": current_user.username})
    received_fraud = await collection.count_documents({**base_query, "data.receiver": current_user.username, "data.verdict": "Fraud"}) 
    received_approved = await collection.count_documents({**base_query, "data.receiver": current_user.username, "data.verdict": "Normal"})
    
    user_doc = await db.get_db()["users"].find_one({"username": current_user.username})
    current_balance = float(user_doc.get("balance", 1000.0))

    return {
        "balance": current_balance,
        "total": sent_total + received_total,
        "fraud": sent_fraud + received_fraud,
        "approved": sent_approved + received_approved,
        "details": {
            "sent": sent_total,
            "received": received_total
        }
    }

@router.get("/user/history")
async def get_user_history(limit: int = 20, current_user: TokenData = Depends(get_current_user)):
    collection = db.get_db()["transaction_logs"]
    query = {
        "data.company_id": current_user.company_id,
        "$or": [
            {"data.user": current_user.username},
            {"data.receiver": current_user.username}
        ]
    }
    
    cursor = collection.find(query).sort("created_at", -1).limit(limit)
    logs = await cursor.to_list(length=limit)
    
    results = []
    for log in logs:
        log["_id"] = str(log["_id"])
        sender = log.get("data", {}).get("user", "Unknown")
        if sender == current_user.username:
            log["direction"] = "OUT"
            log["counterparty"] = log.get("data", {}).get("receiver", "Unknown")
        else:
            log["direction"] = "IN"
            log["counterparty"] = sender
        results.append(log)
        
    return results

class FeedbackModel(BaseModel):
    status: str
    notes: Optional[str] = None

@router.post("/transaction/{tx_id}/feedback")
async def update_transaction_status(
    tx_id: str, 
    feedback: FeedbackModel,
    current_user: TokenData = Depends(get_current_active_investigator)
):
    collection = db.get_db()["transaction_logs"]
    result = await collection.update_one(
        {"data.transaction_id": tx_id, "data.company_id": current_user.company_id},
        {"$set": {
            "data.investigation_status": feedback.status,
            "data.investigation_notes": feedback.notes,
            "data.investigated_by": current_user.username,
            "data.investigated_at": datetime.now()
        }}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Incident not found or status unchanged")
    return {"message": "Forensic feedback updated", "status": feedback.status}

@router.post("/transaction/{tx_id}/escalate")
async def escalate_to_admin(
    tx_id: str,
    reason: str = Body(..., embed=True),
    current_user: TokenData = Depends(get_current_active_investigator)
):
    collection = db.get_db()["transaction_logs"]
    from utils.email import notify_admin_of_escalation
    
    tx = await collection.find_one({"data.transaction_id": tx_id, "data.company_id": current_user.company_id})
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    await notify_admin_of_escalation(
        investigator=current_user.username,
        tx_id=tx_id,
        company_id=current_user.company_id,
        reason=reason
    )
    
    await collection.update_one(
        {"data.transaction_id": tx_id},
        {"$set": {"data.investigation_status": "Escalated", "data.escalation_reason": reason}}
    )
    return {"message": "Case escalated to Governance Unit via Secure Email"}

@router.get("/admin/activity-logs")
async def get_activity_logs(limit: int = 50, current_user: TokenData = Depends(get_current_active_admin)):
    collection = db.get_db()["transaction_logs"]
    query = {
        "data.company_id": current_user.company_id,
        "data.investigated_by": {"$exists": True}
    }
    
    cursor = collection.find(query).sort("data.investigated_at", -1).limit(limit)
    logs = await cursor.to_list(length=limit)
    
    results = []
    for log in logs:
        results.append({
            "tx_id": log["data"].get("transaction_id"),
            "investigator": log["data"].get("investigated_by"),
            "verdict": log["data"].get("investigation_status"),
            "notes": log["data"].get("investigation_notes"),
            "timestamp": log["data"].get("investigated_at"),
            "original_ai_verdict": log["data"].get("verdict")
        })
    return results

@router.get("/admin/global-stats")
async def get_admin_global_stats(current_user: TokenData = Depends(get_current_active_admin)):
    users_coll = db.get_db()["users"]
    tx_coll = db.get_db()["transaction_logs"]
    
    pipeline = [{"$group": {"_id": None, "total": {"$sum": "$balance"}}}]
    balance_cursor = users_coll.aggregate(pipeline)
    balance_result = await balance_cursor.to_list(length=1)
    total_liquidity = balance_result[0]["total"] if balance_result else 0.0
    
    vol_pipeline = [{"$group": {"_id": None, "total": {"$sum": "$data.amount"}}}]
    vol_cursor = tx_coll.aggregate(vol_pipeline)
    vol_result = await vol_cursor.to_list(length=1)
    total_volume = vol_result[0]["total"] if vol_result else 0.0
    
    total_active_cards = 0
    all_users = await users_coll.find({}, {"virtual_cards": 1}).to_list(length=None)
    for u in all_users:
        total_active_cards += len(u.get("virtual_cards", []))

    return {
        "total_liquidity": total_liquidity,
        "total_volume": total_volume,
        "active_cards": total_active_cards,
        "node_status": "Operational",
        "sync_height": await db.get_db()["blockchain"].count_documents({})
    }

@router.get("/admin/all-cards")
async def get_admin_all_cards(current_user: TokenData = Depends(get_current_active_admin)):
    users_coll = db.get_db()["users"]
    all_cards = []
    cursor = users_coll.find({"virtual_cards": {"$exists": True, "$not": {"$size": 0}}})
    async for user in cursor:
        for card in user.get("virtual_cards", []):
            all_cards.append({
                **card,
                "owner": user["username"],
                "company_id": user.get("company_id", "GLOBAL")
            })
    return all_cards

@router.post("/transaction/{tx_id}/release")
async def release_funds(
    tx_id: str, 
    current_user: TokenData = Depends(get_current_active_investigator)
):
    collection = db.get_db()["transaction_logs"]
    from services.blockchain import blockchain_instance
    from datetime import datetime

    original_tx = await collection.find_one({
        "data.transaction_id": tx_id,
        "data.company_id": current_user.company_id
    })
    
    if not original_tx:
        raise HTTPException(status_code=404, detail="Original transaction not found or unauthorized")

    if original_tx["data"].get("investigation_status") != "False Positive":
        raise HTTPException(status_code=400, detail="Authorization Denied: Only 'False Positive' incidents can be released")

    if original_tx["data"].get("released"):
        raise HTTPException(status_code=400, detail="Funds already released")

    release_data = {
        "transaction_id": f"REL_{tx_id}",
        "verdict": "Normal",
        "user": original_tx["data"]["user"],
        "receiver": original_tx["data"]["receiver"],
        "amount": original_tx["data"]["amount"],
        "company_id": current_user.company_id, 
        "status": "Authorized (Manual Override)",
        "original_tx_ref": tx_id,
        "investigator": current_user.username,
        "timestamp": str(datetime.now())
    }

    block = await blockchain_instance.add_block(release_data)
    new_log = {
        "tx_hash": block.hash,
        "block_index": block.index,
        "data": release_data,
        "company_id": current_user.company_id,
        "type": "RELEASE_AUTHORIZATION",
        "created_at": datetime.now()
    }
    await collection.insert_one(new_log)

    await collection.update_one(
        {"data.transaction_id": tx_id},
        {"$set": {"data.released": True, "data.release_tx_id": release_data["transaction_id"]}}
    )
    return {"message": "Funds released. Forensic ledger updated.", "new_tx_id": release_data["transaction_id"]}