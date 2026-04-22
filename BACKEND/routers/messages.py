from fastapi import APIRouter, Depends, HTTPException, Body
from pydantic import BaseModel
from typing import List, Optional
from database.connection import db
from utils.deps import get_current_user, get_current_active_admin
from models.user import TokenData
from datetime import datetime
import re

router = APIRouter(prefix="/messages", tags=["Admin Inbox"])

class MessageCreate(BaseModel):
    subject: str
    content: str
    category: Optional[str] = "General Inquiry"

class MessagePublic(BaseModel):
    name: str
    email: str
    subject: str
    message: str

@router.post("/contact")
async def public_contact_submission(data: MessagePublic):
    """Public endpoint for the main landing page contact form"""
    from utils.email import send_email, ADMIN_EMAIL
    
    msg_doc = {
        "sender": f"{data.name} ({data.email})",
        "sender_email": data.email,
        "company_id": "GLOBAL_WEBSITE",
        "subject": data.subject,
        "content": data.message,
        "category": "Public Inquiry",
        "status": "unread",
        "created_at": datetime.now()
    }
    await db.get_db()["messages"].insert_one(msg_doc)
    
    
    from utils.email_templates import contact_form_admin, contact_form_user_followup
    await send_email(
        ADMIN_EMAIL,
        f"[Website] New Inquiry — {data.subject}",
        contact_form_admin(data.name, data.email, data.subject, data.message)
    )

    
    await send_email(
        data.email,
        f"We've received your inquiry: {data.subject}",
        contact_form_user_followup(data.name, data.subject)
    )

    return {"message": "Inquiry submitted successfully. A confirmation has been sent to your email."}

@router.post("/{msg_id}/reply")
async def reply_to_message(
    msg_id: str, 
    reply_content: str = Body(..., embed=True), 
    current_user: TokenData = Depends(get_current_active_admin)
):
    """Sends an email reply to the original message sender"""
    from bson import ObjectId
    from utils.email import send_email
    
    msg = await db.get_db()["messages"].find_one({"_id": ObjectId(msg_id), "company_id": current_user.company_id})
    if not msg:
        
        msg = await db.get_db()["messages"].find_one({"_id": ObjectId(msg_id), "company_id": "GLOBAL_WEBSITE"})
    
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
        
    
    recipient_email = msg.get("sender_email")
    sender_display = msg.get("sender") or msg.get("sender_name") or "Unknown Sender"
    original_content = msg.get("content") or msg.get("message") or "[No content]"

    if not recipient_email and "(" in sender_display and ")" in sender_display:
        
        match = re.search(r'\((.*?)\)', sender_display)
        if match:
            recipient_email = match.group(1)
            
    if not recipient_email:
        
        user_doc = await db.get_db()["users"].find_one({"username": msg.get("sender")})
        if user_doc:
            recipient_email = user_doc.get("email")
            
    if not recipient_email:
        raise HTTPException(status_code=400, detail="Cannot determine recipient email address. Please reply manually.")

    
    subject = f"Re: {msg.get('subject', 'Your Inquiry')}"
    body = f"""
    <div style="font-family: Segoe UI, Arial, sans-serif; line-height: 1.6; color: #1e293b;">
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 15px;">{reply_content}</p>
        </div>
        <br>
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; color: #64748b; font-size: 13px;">
            <b>Original Message from {sender_display}:</b><br>
            <blockquote style="margin: 10px 0; padding-left: 15px; border-left: 3px solid #cbd5e1; color: #475569;">
                {original_content}
            </blockquote>
        </div>
    </div>
    """
    await send_email(recipient_email, subject, body)
    
    
    await db.get_db()["messages"].update_one(
        {"_id": ObjectId(msg_id)},
        {"$set": {"status": "replied", "reply_sent_at": datetime.now()}}
    )
    
    return {"message": "Reply sent successfully"}

@router.post("/send")
async def send_message(message: MessageCreate, current_user: TokenData = Depends(get_current_user)):
    """Allows users to send messages to their company admin"""
    from utils.email import send_email, ADMIN_EMAIL
    
    msg_doc = {
        "sender": current_user.username,
        "company_id": current_user.company_id,
        "subject": message.subject,
        "content": message.content,
        "category": message.category,
        "status": "unread",
        "created_at": datetime.now()
    }
    await db.get_db()["messages"].insert_one(msg_doc)
    
    
    from utils.email_templates import user_message_admin
    await send_email(
        ADMIN_EMAIL,
        f"[Platform] New Support Inquiry — {message.subject}",
        user_message_admin(
            current_user.username,
            current_user.company_id,
            message.category,
            message.subject,
            message.content,
        )
    )

    return {"message": "Inquiry sent to administrator. A confirmation has been logged."}

@router.get("/inbox")
async def get_inbox(current_user: TokenData = Depends(get_current_active_admin)):
    """Allows admins to see messages for their company and global website inquiries"""
    query = {
        "$or": [
            {"company_id": current_user.company_id},
            {"company_id": "GLOBAL_WEBSITE"}
        ]
    }
    cursor = db.get_db()["messages"].find(query).sort("created_at", -1)
    messages = await cursor.to_list(length=100)
    for msg in messages:
        msg["_id"] = str(msg["_id"])
    return messages

@router.patch("/{msg_id}/read")
async def mark_as_read(msg_id: str, current_user: TokenData = Depends(get_current_active_admin)):
    from bson import ObjectId
    try:
        query = {
            "_id": ObjectId(msg_id),
            "$or": [
                {"company_id": current_user.company_id},
                {"company_id": "GLOBAL_WEBSITE"}
            ]
        }
        result = await db.get_db()["messages"].update_one(
            query,
            {"$set": {"status": "read"}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
        return {"message": "Marked as read"}
    except:
        raise HTTPException(status_code=400, detail="Invalid message ID")
@router.delete("/{msg_id}")
async def delete_message(msg_id: str, current_user: TokenData = Depends(get_current_active_admin)):
    from bson import ObjectId
    try:
        query = {
            "_id": ObjectId(msg_id),
            "$or": [
                {"company_id": current_user.company_id},
                {"company_id": "GLOBAL_WEBSITE"}
            ]
        }
        result = await db.get_db()["messages"].delete_one(query)
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
        return {"message": "Message purged from secure archives"}
    except:
        raise HTTPException(status_code=400, detail="Invalid message ID")
