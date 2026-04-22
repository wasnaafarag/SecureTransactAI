"use client";
import React, { useState } from 'react';
import UserOverview from './UserOverview';
import TransferForm from './TransferForm';
import UserHistory from './UserHistory';
import CardManagement from './CardManagement';
import UserPersonalSAR from './UserPersonalSAR'; // We will define this specialized view below
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export default function UserDashboard({ view = 'overview', user }) {
    const [transactionResult, setTransactionResult] = useState(null);

    // Forensic Result Overlay
    if (transactionResult) {
        return (
            <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                    
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border transition-all duration-500 ${
                        transactionResult.verdict === 'Fraud' 
                        ? 'bg-red-500/10 border-red-500/30 rotate-3' 
                        : 'bg-emerald-500/10 border-emerald-500/30'
                        }`}>
                        {transactionResult.verdict === 'Fraud' ? (
                            <ShieldAlert className="w-10 h-10 text-red-500" />
                        ) : (
                            <ShieldCheck className="w-10 h-10 text-emerald-500" />
                        )}
                    </div>

                    <h2 className="text-3xl font-black text-slate-100 mb-2 uppercase tracking-tighter italic">
                        {transactionResult.verdict === 'Fraud' ? 'Settlement Blocked' : 'Settlement Authorized'}
                    </h2>

                    <p className="text-slate-400 mb-8 text-lg font-medium">
                        {transactionResult.verdict === 'Fraud'
                            ? "ST-Governance Engine identified high-variance anomalies in this transaction vector."
                            : `Forensic clearance granted for $${transactionResult.amount.toLocaleString()} settlement to ${transactionResult.receiver}.`}
                    </p>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setTransactionResult(null)}
                            className="bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-xl shadow-blue-500/20"
                        >
                            Return to Command Center
                        </button>
                    </div>

                    {transactionResult.verdict === 'Fraud' && (
                        <div className="mt-8 p-6 bg-slate-950/60 border border-slate-800 rounded-2xl text-left relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3 opacity-5">
                                <ShieldAlert className="w-12 h-12" />
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">Forensic Incident Log</p>
                            <div className="space-y-1.5">
                                <p className="text-xs font-mono text-red-400/80 flex justify-between">
                                    <span>Incident_Ref:</span> 
                                    <span className="font-bold">{transactionResult.transaction_id?.toUpperCase() || 'TRX-INTERNAL'}</span>
                                </p>
                                <p className="text-xs font-mono text-red-400/80 flex justify-between">
                                    <span>Consensus_Score:</span> 
                                    <span className="font-bold">{(transactionResult.ensemble_metrics?.confidence || 0).toFixed(2)}%</span>
                                </p>
                                <p className="text-xs font-mono text-red-400/80 flex justify-between">
                                    <span>Engine_Status:</span> 
                                    <span className="font-bold">ISOLATED_AND_LEDGERED</span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // MAIN VIEW ROUTER
    switch (view) {
        case 'overview': return <UserOverview />;
        case 'transfer': return <TransferForm onSuccess={setTransactionResult} />;
        case 'history': return <UserHistory />;
        case 'cards': return <CardManagement />;
        
        case 'executive': return <UserPersonalSAR user={user} />;
        
        default: return <UserOverview />;
    }
}