"""
Branded HTML email templates for ST-Governance AI notifications.
All templates share a consistent dark-header / white-body layout.
"""

_BASE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>{title}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <tr>
        <td style="background:linear-gradient(135deg,#020617 0%,#0f172a 60%,#1e293b 100%);
                   border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
          <div style="display:inline-flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;background:#3b82f6;border-radius:8px;
                        display:inline-block;line-height:36px;text-align:center;
                        font-size:18px;font-weight:900;color:#fff;">G</div>
            <span style="font-size:20px;font-weight:800;color:#fff;letter-spacing:-0.3px;">
              ST-Governance <span style="color:#60a5fa;">AI</span>
            </span>
          </div>
          <p style="margin:12px 0 0;font-size:13px;color:#94a3b8;letter-spacing:0.5px;
                    text-transform:uppercase;font-weight:600;">{badge}</p>
        </td>
      </tr>

      <tr>
        <td style="background:#ffffff;padding:40px;border-left:1px solid #e2e8f0;
                   border-right:1px solid #e2e8f0;">
          {body}
        </td>
      </tr>

      <tr>
        <td style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;
                   border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;">
            This is an automated notification from the ST-Governance AI platform.
          </p>
          <p style="margin:0;font-size:12px;color:#cbd5e1;">
            Governance District, Building G-400 &bull; New Cairo, Egypt &bull;
            <a href="mailto:governance@st-ai.com"
               style="color:#3b82f6;text-decoration:none;">governance@st-ai.com</a>
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>"""


def _row(label: str, value: str, highlight: bool = False) -> str:
    """Render a single label/value data row."""
    bg = "#eff6ff" if highlight else "#f8fafc"
    border = "#bfdbfe" if highlight else "#e2e8f0"
    color = "#1d4ed8" if highlight else "#0f172a"
    return f"""
    <tr>
      <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#64748b;
                 white-space:nowrap;width:160px;vertical-align:top;">{label}</td>
      <td style="padding:10px 14px;font-size:14px;color:{color};font-weight:500;
                 background:{bg};border-left:3px solid {border};border-radius:0 6px 6px 0;"
          >{value}</td>
    </tr>"""


def _table(*rows: str) -> str:
    return (
        '<table cellpadding="0" cellspacing="6" '
        'style="width:100%;border-collapse:separate;border-spacing:0 6px;">'
        + "".join(rows)
        + "</table>"
    )





def contact_form_admin(name: str, email: str, subject: str, message: str) -> str:
    body = f"""
    <h2 style="margin:0 0 6px;font-size:22px;font-weight:800;color:#0f172a;">
      New Public Inquiry
    </h2>
    <p style="margin:0 0 28px;font-size:14px;color:#64748b;">
      A visitor has submitted a contact-form message from the website.
    </p>

    {_table(
        _row("From", f"{name}"),
        _row("Email", f'<a href="mailto:{email}" style="color:#3b82f6;">{email}</a>', True),
        _row("Subject", subject),
    )}

    <div style="margin-top:24px;background:#f8fafc;border:1px solid #e2e8f0;
                border-left:4px solid #3b82f6;border-radius:8px;padding:20px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#94a3b8;
                text-transform:uppercase;letter-spacing:0.5px;">Message</p>
      <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">{message}</p>
    </div>

    <div style="margin-top:32px;text-align:center;">
      <a href="mailto:{email}?subject=Re: {subject}"
         style="display:inline-block;background:#0f172a;color:#fff;font-size:14px;
                font-weight:700;text-decoration:none;padding:12px 28px;
                border-radius:10px;letter-spacing:0.2px;">
        Reply to {name}
      </a>
    </div>
    """
    return _BASE.format(title="New Contact Inquiry", badge="Website Contact Form", body=body)





def user_message_admin(
    username: str, company_id: str, category: str, subject: str, content: str
) -> str:
    body = f"""
    <h2 style="margin:0 0 6px;font-size:22px;font-weight:800;color:#0f172a;">
      New Support Inquiry
    </h2>
    <p style="margin:0 0 28px;font-size:14px;color:#64748b;">
      A platform user has submitted a message via the in-app messenger.
    </p>

    {_table(
        _row("User", username),
        _row("Governance Unit", company_id, True),
        _row("Category", category),
        _row("Subject", subject),
    )}

    <div style="margin-top:24px;background:#f8fafc;border:1px solid #e2e8f0;
                border-left:4px solid #6366f1;border-radius:8px;padding:20px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#94a3b8;
                text-transform:uppercase;letter-spacing:0.5px;">Message</p>
      <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">{content}</p>
    </div>

    <div style="margin-top:32px;text-align:center;">
      <a href="#"
         style="display:inline-block;background:#4f46e5;color:#fff;font-size:14px;
                font-weight:700;text-decoration:none;padding:12px 28px;
                border-radius:10px;letter-spacing:0.2px;">
        View in Dashboard
      </a>
    </div>
    """
    return _BASE.format(title="New Support Inquiry", badge="In-App Messenger", body=body)





def escalation_alert(
    investigator: str, tx_id: str, company_id: str, reason: str
) -> str:
    body = f"""
    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;
                padding:16px 20px;margin-bottom:28px;display:flex;align-items:center;">
      <span style="font-size:20px;margin-right:12px;">🚨</span>
      <div>
        <p style="margin:0;font-size:15px;font-weight:800;color:#b91c1c;">
          Forensic Escalation Required
        </p>
        <p style="margin:4px 0 0;font-size:13px;color:#ef4444;">
          A high-variance transaction has been flagged for Governance Unit review.
        </p>
      </div>
    </div>

    {_table(
        _row("Lead Analyst", investigator),
        _row("Incident ID", tx_id, True),
        _row("Unit", company_id),
    )}

    <div style="margin-top:24px;background:#fff7ed;border:1px solid #fed7aa;
                border-left:4px solid #f97316;border-radius:8px;padding:20px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#94a3b8;
                text-transform:uppercase;letter-spacing:0.5px;">Escalation Reason</p>
      <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">{reason}</p>
    </div>

    <div style="margin-top:32px;text-align:center;">
      <a href="#"
         style="display:inline-block;background:#0f172a;color:#fff;font-size:14px;
                font-weight:700;text-decoration:none;padding:12px 28px;
                border-radius:10px;letter-spacing:0.2px;">
        Review in Triage Console
      </a>
    </div>
    """
    return _BASE.format(
        title="Forensic Escalation Alert", badge="Priority Alert — Governance Review Required", body=body
    )





def tampering_alert(details: str) -> str:
    body = f"""
    <div style="background:#fdf2f8;border:1px solid #f9a8d4;border-radius:10px;
                padding:18px 20px;margin-bottom:28px;">
      <p style="margin:0;font-size:16px;font-weight:900;color:#9d174d;">
        💥 BLOCKCHAIN INTEGRITY FAILURE
      </p>
      <p style="margin:8px 0 0;font-size:13px;color:#be185d;line-height:1.6;">
        State drift detected between live database and cryptographic ledger.
        This may indicate unauthorized tampering with immutable audit data.
      </p>
    </div>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #7c3aed;
                border-radius:8px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#94a3b8;
                text-transform:uppercase;letter-spacing:0.5px;">Drift Details</p>
      <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;
                font-family:'Courier New',monospace;">{details}</p>
    </div>

    <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;
                padding:20px;">
      <p style="margin:0 0 12px;font-size:13px;font-weight:800;color:#6b21a8;
                text-transform:uppercase;letter-spacing:0.5px;">Governance Protocols</p>
      <ul style="margin:0;padding-left:20px;font-size:13px;color:#374151;line-height:1.9;">
        <li>Lock immutable ledger state immediately.</li>
        <li>Isolate secondary forensic nodes.</li>
        <li>Verify genesis hash chain against master.</li>
        <li>Initiate legal compliance reporting.</li>
      </ul>
    </div>

    <div style="margin-top:32px;text-align:center;">
      <a href="#"
         style="display:inline-block;background:#7c3aed;color:#fff;font-size:14px;
                font-weight:700;text-decoration:none;padding:12px 28px;
                border-radius:10px;letter-spacing:0.2px;">
        Open Forensic Vault
      </a>
    </div>
    """
    return _BASE.format(
        title="Integrity Failure Alert", badge="CRITICAL SYSTEM ERROR", body=body
    )


def contact_form_user_followup(name: str, subject: str) -> str:
    body = f"""
    <h2 style="margin:0 0 6px;font-size:22px;font-weight:800;color:#0f172a;">
      Transmission Logged
    </h2>
    <p style="margin:0 0 28px;font-size:15px;color:#475569;line-height:1.6;">
      Hello {name},<br><br>
      The <b>ST-Governance AI</b> unit has received your inquiry regarding 
      <b>"{subject}"</b>. This is an automated confirmation to let you know your message 
      has been successfully routed to our forensic and support teams.
    </p>

    <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:24px;">
      <p style="margin:0;font-size:14px;color:#0369a1;line-height:1.6;">
        <b>Next Protocol Steps:</b><br>
        Our team is currently triaging your request. You should expect an authorized response 
        to this email address within <b>24–48 hours</b>. 
      </p>
    </div>

    <p style="margin:32px 0 0;font-size:14px;color:#64748b;">
      In the meantime, feel free to explore our 
      <a href="#" style="color:#3b82f6;text-decoration:none;font-weight:600;">Technical Documentation</a> 
      or follow our 
      <a href="#" style="color:#3b82f6;text-decoration:none;font-weight:600;">Governance Lab Updates</a>.
    </p>

    <div style="margin-top:40px;padding-top:24px;border-top:1px solid #e2e8f0;font-size:13px;color:#94a3b8;">
      Authority Verified,<br>
      <b>ST-Governance AI Unit</b>
    </div>
    """
    return _BASE.format(title="Transmission Received", badge="Submission Confirmation", body=body)