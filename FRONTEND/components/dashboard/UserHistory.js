"use client";
import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Eye, X, Copy, CheckCircle, AlertTriangle, Filter, ArrowUpRight, ArrowDownLeft, Cpu, Activity, Zap, Info, FileText } from 'lucide-react';

const TransactionModal = ({ transaction, onClose, onDownload }) => {
    if (!transaction) return null;

    const data = transaction.data;
    const isFraud = data.verdict === 'Fraud';
    const isIncoming = transaction.direction === 'IN';
    const statusColor = isFraud ? 'text-red-500' : 'text-emerald-500';
    const statusBg = isFraud ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] overflow-hidden">

                <div className="flex items-center justify-between p-6 border-b border-slate-800/50 bg-slate-900/50">
                    <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-blue-500" />
                        Audit Details
                    </h3>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => onDownload(transaction)}
                            className="p-2 hover:bg-emerald-500/10 text-emerald-500 rounded-xl transition-all"
                            title="Download PDF"
                        >
                            <FileText className="w-5 h-5" />
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-all">
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar bg-slate-900">


                    <div className={`flex items-start gap-4 p-5 rounded-2xl border ${statusBg} transition-all`}>
                        <div className={`p-2.5 rounded-full mt-1 shadow-lg ${isFraud ? 'bg-red-500 text-white shadow-red-500/20' : 'bg-emerald-500 text-white shadow-emerald-500/20'}`}>
                            {isFraud ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">AI Verdict</p>
                            <p className={`text-xl font-black italic tracking-tight ${statusColor}`}>
                                {data.verdict.toUpperCase()}
                            </p>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed opacity-80">
                                {isFraud ? 'Anomaly detected across behavioral feature vectors. Transaction blocked.' : 'Feature analysis matches standard behavior. Transaction verified.'}
                            </p>
                        </div>
                    </div>


                    {data.details && (
                        <div className="space-y-3">
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-1">SecureTransactAI Decision Proof</p>
                            <div className="grid grid-cols-2 gap-3">

                                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-bold text-slate-400">Isolation Forest</span>
                                        <div className={`w-1.5 h-1.5 rounded-full ${data.details.isolation_forest?.prediction === 'Fraud' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500'}`} />
                                    </div>
                                    <p className="text-xs font-mono text-slate-200 mb-1">Score: {data.details.isolation_forest?.anomaly_score?.toFixed(4)}</p>
                                    <p className="text-[9px] text-slate-600 leading-tight uppercase font-bold">
                                        {data.details.isolation_forest?.prediction === 'Fraud' ? 'Outlier Isolated' : 'Data Centered'}
                                    </p>
                                </div>

                                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-bold text-slate-400">DBSCAN (Density)</span>
                                        <div className={`w-1.5 h-1.5 rounded-full ${data.details.dbscan?.prediction === 'Fraud' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500'}`} />
                                    </div>
                                    <p className="text-xs font-mono text-slate-200 mb-1">CID: {data.details.dbscan?.cluster_id === -1 ? 'NOISE' : `#${data.details.dbscan?.cluster_id}`}</p>
                                    <p className="text-[9px] text-slate-600 leading-tight uppercase font-bold">
                                        {data.details.dbscan?.prediction === 'Fraud' ? 'Cluster Noise' : 'In Dense Cluster'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}


                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                            <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Amount</p>
                            <div className="flex items-center gap-2">
                                {isIncoming ?
                                    <ArrowDownLeft className="w-5 h-5 text-emerald-400 shrink-0" /> :
                                    <ArrowUpRight className="w-5 h-5 text-slate-400 shrink-0" />
                                }
                                <p className={`text-2xl font-bold ${isIncoming ? 'text-emerald-400' : 'text-white'} break-all leading-tight tracking-tighter`}>
                                    ${data.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                            <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">
                                {isIncoming ? 'From' : 'To'}
                            </p>
                            <p className="text-lg font-bold text-slate-200 break-words line-clamp-1">
                                {transaction.counterparty || data.receiver || 'Unknown'}
                            </p>
                        </div>
                    </div>


                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800/80 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-bl-xl border-b border-l border-blue-500/10 backdrop-blur-md">
                            Ledger Node Rec#
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1.5 opacity-60">Hash Signature (SHA-256)</p>
                                <div className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800/50 group">
                                    <code className="font-mono text-emerald-500/90 text-xs break-all leading-normal flex-1 font-bold">
                                        {transaction.tx_hash || "GEN_BLOCK_WAIT..."}
                                    </code>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(transaction.tx_hash)}
                                        className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-white transition-colors shrink-0"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-3 border-t border-slate-800/50">
                                <span>Index: #{transaction.block_index || '0'}</span>
                                <span className="text-[10px] opacity-60 italic">{new Date(transaction.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function UserHistory() {
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTx, setSelectedTx] = useState(null);
    const [filter, setFilter] = useState('ALL');

    const generateProfessionalSAR = (log) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>ST_SAR_${log.data.transaction_id}</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                        body { font-family: 'Inter', sans-serif; padding: 50px; color: #0f172a; line-height: 1.6; }
                        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #1e3a8a; padding-bottom: 20px; margin-bottom: 30px; }
                        .logo { width: 160px; height: auto; }
                        .report-title { font-size: 24px; font-weight: 900; text-transform: uppercase; color: #1e3a8a; margin: 0; }
                        .tag { color: #dc2626; font-weight: 900; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; }
                        .section { margin-bottom: 25px; }
                        .section-title { font-size: 12px; font-weight: 900; text-transform: uppercase; color: #64748b; border-left: 4px solid #f59e0b; padding-left: 10px; margin-bottom: 10px; }
                        .narrative { background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 12px; text-align: justify; }
                        footer { margin-top: 50px; text-align: center; font-size: 9px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div>
                            <div class="tag">CONFIDENTIAL // INVESTIGATIVE SAR</div>
                            <h1 class="report-title">Suspicious Activity Report</h1>
                            <p style="font-size: 11px; font-weight: 700; margin: 5px 0;">REF: ST-CASE-${log.data.transaction_id?.substring(0, 10).toUpperCase()}</p>
                        </div>
                        <img src="/Plain_sheild_logo.png" class="logo" />
                    </div>
                    <div class="section">
                        <div class="section-title">Forensic Narrative</div>
                        <div class="narrative">
                            The ST-Governance Engine has completed a heuristic audit of transaction identity <strong>${log.data.transaction_id}</strong>. 
                            Through a Weighted Stacking Ensemble, the event was classified as <strong>${log.data.verdict.toUpperCase()}</strong>. 
                            Value propagation of $${log.data.amount?.toLocaleString()} was linked to Block #${log.block_index} on the immutable ledger.
                        </div>
                    </div>
                    <div class="section">
                        <div class="section-title">Cryptographic Signature</div>
                        <p style="font-family:monospace; font-size:10px; word-break:break-all; color:#1e3a8a;">${log.tx_hash}</p>
                    </div>
                    <footer>SecureTransact AI Governance Unit • Generated on ${new Date().toLocaleString()}</footer>
                </body>
            </html>
        `);
        printWindow.document.close();
        setTimeout(() => { printWindow.print(); }, 500);
    };

    useEffect(() => {
        api.getUserHistory().then((data) => {
            setHistory(data || []);
            setFilteredHistory(data || []);
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!history) return;
        let res = [...history];
        switch (filter) {
            case 'IN': res = res.filter(x => x.direction === 'IN'); break;
            case 'OUT': res = res.filter(x => x.direction === 'OUT'); break;
            case 'FRAUD': res = res.filter(x => x.data.verdict === 'Fraud'); break;
            case 'SAFE': res = res.filter(x => x.data.verdict === 'Normal'); break;
            default: break;
        }
        setFilteredHistory(res);
    }, [filter, history]);

    if (loading) return <div className="text-center py-20 text-slate-500 animate-pulse font-mono uppercase text-xs tracking-widest">Hydrating Chain Data...</div>;

    const FilterButton = ({ label, value }) => (
        <button
            onClick={() => setFilter(value)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${filter === value
                ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                : 'bg-slate-800/50 text-slate-500 border-slate-700 hover:text-slate-300 hover:border-slate-500'
                }`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-4">
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-xl flex flex-col h-[600px]">

                <div className="p-6 border-b border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-xl">
                            <Activity className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black uppercase tracking-tight text-slate-100 italic">Audit Ledger</h2>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{filteredHistory.length} Live Syncs</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <FilterButton label="All" value="ALL" />
                        <FilterButton label="Blocked" value="FRAUD" />
                        <FilterButton label="Normal" value="SAFE" />
                    </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar flex-1">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-950/50 text-slate-500 uppercase text-[9px] font-black tracking-[0.2em] sticky top-0 z-10 backdrop-blur-md">
                            <tr>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Behavioral Insight</th>
                                <th className="px-6 py-4 text-right pr-10">Amount Analysis</th>
                                <th className="px-6 py-4 text-center">Audit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/30">
                            {filteredHistory.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-slate-600 font-mono text-xs uppercase tracking-widest">
                                        No Data Segments Found
                                    </td>
                                </tr>
                            ) : filteredHistory.map((log) => {
                                const isIncoming = log.direction === 'IN';
                                const isFraud = log.data.verdict === 'Fraud';
                                return (
                                    <tr
                                        key={log._id}
                                        onClick={() => setSelectedTx(log)}
                                        className="hover:bg-slate-800/40 transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-blue-500"
                                    >
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${isFraud ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500'}`} />
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${isFraud ? 'text-red-500' : 'text-emerald-500'}`}>
                                                    {log.data.verdict}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-slate-100 font-bold flex items-center gap-2 text-sm">
                                                    {isIncoming ? <ArrowDownLeft className="w-4 h-4 text-emerald-400" /> : <ArrowUpRight className="w-4 h-4 text-slate-400" />}
                                                    {isIncoming ? 'CREDIT: ' : 'DEBIT: '}
                                                    <span className="opacity-90">{log.counterparty || log.data.receiver || 'SYSTEM'}</span>
                                                </span>
                                                <div className="flex gap-2 mt-1">
                                                    <span className="text-[10px] font-mono text-slate-500">{new Date(log.created_at).toLocaleDateString()}</span>
                                                    {isFraud && (
                                                        <span className="text-[9px] bg-red-500/10 text-red-400 px-1.5 rounded uppercase font-bold flex items-center gap-1">
                                                            <Zap className="w-2.5 h-2.5" /> High Variance
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-5 text-right font-black text-lg pr-10 border-r border-slate-800/10 ${isIncoming ? 'text-emerald-400' : 'text-slate-100'}`}>
                                            {isIncoming ? '+' : '-'}${log.data.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex gap-1">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setSelectedTx(log); }}
                                                        className="p-2 bg-slate-800 shadow-md hover:bg-blue-600 rounded-xl text-slate-400 hover:text-white transition-all transform active:scale-95"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); generateProfessionalSAR(log); }}
                                                        className="p-2 bg-slate-800 shadow-md hover:bg-emerald-600 rounded-xl text-slate-400 hover:text-white transition-all transform active:scale-95"
                                                    >
                                                        <FileText className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                                <span className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter">Inspect / PDF</span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-600/5 border border-blue-500/10 rounded-2xl">
                <Info className="w-4 h-4 text-blue-500 shrink-0" />
                <p className="text-[10px] text-slate-500 leading-relaxed font-bold uppercase tracking-widest">
                    Blockchain node synchronized. Showing AI behavioral insights and hash validation for all events.
                </p>
            </div>

            {selectedTx && (
                <TransactionModal
                    transaction={selectedTx}
                    onClose={() => setSelectedTx(null)}
                    onDownload={generateProfessionalSAR}
                />
            )}
        </div>
    );
}