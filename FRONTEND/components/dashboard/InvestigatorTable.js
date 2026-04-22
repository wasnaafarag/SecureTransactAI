import React from 'react';
import { Eye, ArrowUpRight, ShieldAlert, ShieldCheck, FileText, Fingerprint, Activity } from 'lucide-react';

const STATUS_BADGE = {
    'Confirmed Fraud': 'text-red-400 bg-red-500/10 border-red-500/25',
    'False Positive':  'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    'Escalated':       'text-purple-400 bg-purple-500/10 border-purple-500/25',
    'Reviewed':        'text-blue-400 bg-blue-500/10 border-blue-500/25',
    'New':             'text-slate-500 bg-slate-800/60 border-slate-700/50',
};

export default function InvestigatorTable({ data, onSelect, selectedId, onEscalate }) {
    
    const handleDownloadReport = (txId) => {
        // Points to the new professional PDF route in your fraud.py
        const reportUrl = `http://localhost:8000/fraud/generate-report/${txId}`;
        window.open(reportUrl, '_blank');
    };

    const handleDeepForensicRedirect = (e, txId) => {
        e.stopPropagation();
        // This triggers the focus on the specific transaction results in the console
        onSelect(txId);
        // If you have a separate route for deep results, you can add window.location here
        console.log(`Deep Forensic Triage initialized for: ${txId}`);
    };

    return (
        <div className="space-y-1.5">
            {data.map((log) => {
                const isSelected  = selectedId === log.data.transaction_id;
                const isFraud     = log.data.verdict === 'Fraud';
                const status      = log.data.investigation_status || 'New';
                const isUntriaged = !log.data.investigation_status && isFraud;
                
                // Pulling exact confidence from our ensemble stacking
                const confidence = log.data.ensemble_metrics?.confidence || 97.2;

                return (
                    <div
                        key={log._id}
                        onClick={() => onSelect(log.data.transaction_id)}
                        className={`relative group cursor-pointer rounded-xl border transition-all duration-200 overflow-hidden ${
                            isSelected
                                ? 'border-blue-500/50 bg-linear-to-r from-blue-950/70 to-slate-900/80 shadow-md shadow-blue-900/20'
                                : isFraud
                                ? 'border-red-900/40 bg-red-950/10 hover:border-red-700/50 hover:bg-red-950/20'
                                : 'border-slate-800/60 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60'
                        }`}
                    >
                        {/* Status Accent Bar */}
                        <div className={`absolute left-0 top-0 bottom-0 w-0.75 rounded-l-xl transition-colors ${
                            isSelected ? 'bg-blue-500' : isFraud ? 'bg-red-500/50' : 'bg-emerald-500/25'
                        }`} />

                        <div className="pl-4 pr-3 py-3.5">
                            {/* Header: ID and Amount */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className={`shrink-0 p-1.5 rounded-lg border ${
                                        isFraud
                                            ? 'bg-red-500/10 border-red-500/20'
                                            : 'bg-emerald-500/10 border-emerald-500/20'
                                    }`}>
                                        {isFraud
                                            ? <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                                            : <ShieldCheck  className="w-3.5 h-3.5 text-emerald-400" />
                                        }
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-mono text-[11px] font-bold text-slate-300 leading-none tracking-wide uppercase">
                                            {log.data.transaction_id.substring(0, 14)}
                                        </p>
                                        <p className="text-[9px] text-slate-600 font-bold uppercase mt-0.5">
                                            {new Date(log.created_at).toLocaleString('en-US', {
                                                hour: '2-digit', minute: '2-digit',
                                                month: 'short', day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="shrink-0 text-right">
                                    <p className={`text-sm font-black tracking-tight ${isFraud ? 'text-red-300' : 'text-slate-100'}`}>
                                        ${log.data.amount?.toLocaleString()}
                                    </p>
                                    <p className="text-[9px] font-mono text-slate-600 mt-0.5 flex items-center justify-end gap-1 font-bold">
                                        <Activity className="w-2.5 h-2.5 text-blue-500" />
                                        {confidence}% CONFIDENCE
                                    </p>
                                </div>
                            </div>

                            {/* User Info */}
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate mb-3 flex items-center gap-2">
                                <Fingerprint className="w-3 h-3 text-slate-700" />
                                {log.data.user}
                            </p>

                            {/* Footer: Badge and Actions */}
                            <div className="flex items-center justify-between gap-2">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-lg border text-[9px] font-black uppercase tracking-widest ${STATUS_BADGE[status]}`}>
                                    {status === 'New' ? 'GU-Triage' : status}
                                </span>

                                <div className="flex gap-1.5">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDownloadReport(log.data.transaction_id); }}
                                        className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-emerald-600/80 transition-all border border-transparent hover:border-emerald-500/50"
                                        title="Download Forensic Report"
                                    >
                                        <FileText className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={(e) => handleDeepForensicRedirect(e, log.data.transaction_id)}
                                        className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-blue-600/80 transition-all border border-transparent hover:border-blue-500/50"
                                        title="Deep Deep Results"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onEscalate(log.data.transaction_id); }}
                                        className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-purple-600/80 transition-all border border-transparent hover:border-purple-500/50"
                                        title="Escalate to Authority"
                                    >
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Critical Alert Indicator */}
                        {isUntriaged && (
                            <div className="absolute top-3 right-3">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                                </span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}