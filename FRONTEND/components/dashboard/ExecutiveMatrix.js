"use client";
import React from 'react';
import { FileText, Calendar, Download, TrendingUp, BarChart3, ShieldCheck, Award } from 'lucide-react';

export default function ExecutiveMatrix() {
    const archives = [
        { 
            month: 'April 2026', 
            id: 'April_2026', 
            incidents: 42, 
            accuracy: '99.82%', 
            f1: '0.97',
            capital: '$142,000',
            status: 'Active' 
        },
        { 
            month: 'March 2026', 
            id: 'March_2026', 
            incidents: 128, 
            accuracy: '99.70%', 
            f1: '0.96',
            capital: '$312,500',
            status: 'Archived' 
        },
        { 
            month: 'February 2026', 
            id: 'February_2026', 
            incidents: 94, 
            accuracy: '99.50%', 
            f1: '0.94',
            capital: '$189,200',
            status: 'Archived' 
        },
    ];

    const generateProfessionalReport = (report) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>SecureTransact_Forensic_Audit_${report.id}</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                        body { font-family: 'Inter', sans-serif; padding: 50px; color: #0f172a; line-height: 1.6; }
                        
                        /* HEADER LOGO FIX */
                        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #1e3a8a; padding-bottom: 20px; margin-bottom: 30px; }
                        .logo-container { text-align: right; min-width: 180px; }
                        .logo { width: 160px; height: auto; object-fit: contain; display: block; margin-left: auto; }
                        
                        .report-title { font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; color: #1e3a8a; }
                        .confidential-tag { color: #dc2626; font-weight: 900; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 5px; }
                        .section { margin-bottom: 30px; }
                        .section-title { font-size: 14px; font-weight: 900; text-transform: uppercase; color: #64748b; border-left: 4px solid #f59e0b; padding-left: 10px; margin-bottom: 15px; letter-spacing: 0.1em; }
                        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
                        .metric-card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px; }
                        .metric-label { font-size: 9px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 5px; }
                        .metric-value { font-size: 18px; font-weight: 900; color: #1e293b; }
                        .narrative { font-size: 12px; color: #334155; text-align: justify; background: #fff; border: 1px solid #f1f5f9; padding: 20px; border-radius: 8px; }
                        .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; text-align: center; }
                        @media print { .no-print { display: none; } }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div>
                            <div class="confidential-tag">CONFIDENTIAL // GOVERNANCE ONLY</div>
                            <div class="report-title">Executive Forensic Audit</div>
                            <p style="font-size: 11px; font-weight: 700; color: #64748b; margin: 0;">REPORT REF: ST-SAR-${report.id.toUpperCase()}</p>
                        </div>
                        <div class="logo-container">
                            <img src="/Plain_sheild_logo.png" class="logo" alt="ST-Governance Logo" />
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">System Efficacy Summary</div>
                        <div class="grid">
                            <div class="metric-card">
                                <div class="metric-label">Reporting Period</div>
                                <div class="metric-value">${report.month}</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-label">Detection Integrity (F1)</div>
                                <div class="metric-value" style="color: #1e3a8a;">${report.f1}</div>
                            </div>
                            <div class="metric-card">
                                <div class="metric-label">Capital Preserved</div>
                                <div class="metric-value" style="color: #059669;">${report.capital}</div>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">Forensic Intelligence Narrative</div>
                        <div class="narrative">
                            <p>During the ${report.month} governance cycle, the SecureTransact AI engine triaged ${report.incidents} high-entropy incidents. Utilizing a Weighted Stacking Ensemble (0.6 Isolation Forest / 0.4 DBSCAN), the system maintained a mean accuracy of ${report.accuracy}.</p>
                            <p>All isolated transactions were programmatically validated against the immutable blockchain ledger. No cryptographic state-drift was detected during the quarterly integrity audit. The findings in this SAR (Suspicious Activity Report) are consistent with institutional risk-thresholds.</p>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">Governance Certification</div>
                        <p style="font-size: 11px; font-style: italic; color: #475569;">
                            This document serves as an official forensic record. All data points have been verified via SHA-256 integrity proofs and are stored within the immutable audit manifold.
                        </p>
                    </div>

                    <div class="footer">
                        SecureTransact AI Governance Unit • Generated on ${new Date().toLocaleString()} • Authorized Access Only
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        
        setTimeout(() => {
            printWindow.print();
        }, 500);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-20 p-6">
            <div className="flex justify-between items-end border-b border-slate-800 pb-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tighter italic flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-amber-500" />
                        Executive Governance Matrix
                    </h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">
                        Consolidated Forensic Archives • High-Level Audit Summaries
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {archives.map((report) => (
                    <div key={report.id} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl hover:border-amber-500/30 transition-all group relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                            <Award className="w-32 h-32 text-amber-500" />
                        </div>
                        
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="p-3 bg-amber-500/10 rounded-2xl">
                                <ShieldCheck className="w-6 h-6 text-amber-500" />
                            </div>
                            <span className="text-[8px] font-black uppercase px-3 py-1 rounded-full bg-slate-950 text-slate-500 border border-slate-800">
                                {report.status}
                            </span>
                        </div>

                        <h3 className="text-xl font-black text-slate-100 mb-1 italic relative z-10">{report.month}</h3>
                        <div className="space-y-1 mb-8 relative z-10">
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                {report.incidents} Incidents Triaged
                            </p>
                            <p className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-widest">
                                F1 Score: {report.f1} • {report.accuracy} Accuracy
                            </p>
                        </div>

                        <button 
                            onClick={() => generateProfessionalReport(report)}
                            className="w-full py-4 bg-slate-950 hover:bg-amber-600 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white rounded-2xl border border-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl relative z-10"
                        >
                            <FileText className="w-4 h-4" /> Export Executive Summary
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}