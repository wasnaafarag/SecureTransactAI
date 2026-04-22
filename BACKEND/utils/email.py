import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
FROM_EMAIL = os.getenv("FROM_EMAIL", SMTP_USER)
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")

async def send_email(to_email: str, subject: str, body_html: str):
    if not all([SMTP_USER, SMTP_PASS, ADMIN_EMAIL]):
        print("[!] Email settings not configured. Skipping email.")
        return False

    try:
        msg = MIMEMultipart()
        msg['From'] = f"ST-Governance Unit <{FROM_EMAIL}>"
        msg['To'] = to_email
        msg['Subject'] = subject

        msg.attach(MIMEText(body_html, 'html'))

        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)
        server.quit()
        print(f"[+] Forensic Alert dispatched to {to_email}: {subject}")
        return True
    except Exception as e:
        print(f"[-] Alert Dispatch Failure: {e}")
        return False

async def notify_admin_of_escalation(investigator: str, tx_id: str, company_id: str, reason: str):
    from utils.email_templates import escalation_alert
    subject = f"INCIDENT ESCALATION [ID: {tx_id}] - Forensic Unit Review Required"
    return await send_email(ADMIN_EMAIL, subject, escalation_alert(investigator, tx_id, company_id, reason))

async def notify_admin_of_tampering(details: str):
    from utils.email_templates import tampering_alert
    subject = "GOVERNANCE ALERT: Blockchain Integrity Violation Identified"
    return await send_email(ADMIN_EMAIL, subject, tampering_alert(details))