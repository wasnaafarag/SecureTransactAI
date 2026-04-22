"use client";
import React from 'react';
import { FileText, ShieldAlert, Download, Fingerprint } from 'lucide-react';

export default function UserPersonalSAR({ user }) {
    
    const downloadSAR = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>ST_SAR_${user?.username || 'User'}</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                        body { font-family: 'Inter', sans-serif; padding: 60px; color: #0f172a; line-height: 1.5; }
                        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #1e3a8a; padding-bottom: 20px; }
                        .logo { width: 160px; height: auto; object-fit: contain; }
                        .title { font-size: 26px; font-weight: 900; color: #1e3a8a; text-transform: uppercase; letter-spacing: -1px; margin: 0; }
                        .confidential { color: #dc2626; font-weight: 900; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 5px;}
                        .content { margin-top: 40px; }
                        .metric-card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin: 20px 0; }
                        .narrative { font-size: 14px; text-align: justify; color: #334155; }
                        footer { margin-top: 50px; font-size: 10px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div>
                            <div class="confidential">Confidential Forensic Record</div>
                            <h1 class="title">Suspicious Activity Report</h1>
                            <p style="font-weight: bold; color: #64748b; margin: 5px 0;">REF: ST-SAR-${(user?.username || 'USER').toUpperCase()}-2026</p>
                        </div>
                        <img src="/Plain_sheild_logo.png" class="logo" />
                    </div>
                    <div class="content">
                        <div class="metric-card">
                            <strong style="text-transform: uppercase; font-size: 11px; color: #64748b;">Target Identity:</strong> <span style="font-weight: 900;">${user?.username || 'Authorized Operator'}</span> <br/>
                            <strong style="text-transform: uppercase; font-size: 11px; color: #64748b;">Security Status:</strong> <span style="color: #dc2626; font-weight: 900;">ISOLATED FOR GOVERNANCE TRIAGE</span>
                        </div>
                        <h3 style="text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Investigative Findings</h3>
                        <p class="narrative">
                            The ST-Governance AI Engine (Weighted Stacking Ensemble) has identified a high-variance capital propagation vector associated with this identity. 
                            This entropy suggests a significant deviation from established behavioral clusters. In accordance with the <strong>SecureTransact Forensic Protocol</strong>, 
                            the transaction hash has been linked to the immutable ledger for secondary audit by the Authority Matrix.
                        </p>
                    </div>
                    <footer>SecureTransact AI Governance Unit • Unauthorized Reproduction is Strictly Prohibited</footer>
                </body>
            </html>
        `);
        printWindow.document.close();
        setTimeout(() => { printWindow.print(); }, 500);
    };

    return (
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                    <FileText className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-100 italic uppercase tracking-tighter">Personal Governance Metric</h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Authorized Identity: {user?.username}</p>
                </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                    <Fingerprint className="w-24 h-24 text-blue-500" />
                </div>
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Account Forensic Status</h3>
                <p className="text-slate-200 leading-relaxed italic mb-6">
                    "System verification of transaction history complete. Anomaly manifold identified in recent settlement attempts. 
                    Refer to individual Suspicious Activity Report (SAR) for ledgered details."
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 w-fit">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Pending Governance Clearance
                </div>
            </div>

            <button 
                onClick={downloadSAR}
                className="w-full py-4 bg-slate-100 hover:bg-blue-600 text-slate-950 hover:text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
                <Download className="w-5 h-5" />
                Export My Forensic SAR Summary
            </button>
        </div>
    );
}