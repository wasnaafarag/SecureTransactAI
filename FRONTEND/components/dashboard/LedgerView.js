"use client";
import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import {
    ShieldCheck, Box, Clock,
    AlertTriangle, Disc, RefreshCw, Zap, Server, Shield, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LedgerView() {
    const [ledger, setLedger] = useState([]);
    const [loading, setLoading] = useState(true);
    const [validationStatus, setValidationStatus] = useState(null);
    const [validationReason, setValidationReason] = useState(null);
    const [corrupting, setCorrupting] = useState(null);

    const fetchLedger = async () => {
        setLoading(true);
        try {
            const data = await api.getLedger();
            setLedger(data.chain || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = async () => {
        try {
            setValidationStatus('validating');
            setValidationReason(null);
            const res = await api.validateChain();
            setValidationStatus(res.is_valid ? 'valid' : 'invalid');
            if (!res.is_valid) {
                setValidationReason(res.reason);
            }
        } catch (e) {
            setValidationStatus('error');
        }
    };

    const handleCorrupt = async (txId) => {
        if (!confirm("SECURITY RESEARCH PROTOCOL: This action will manually inject a database mutation to test the Blockchain's integrity-verification capabilities. Proceed?")) return;

        setCorrupting(txId);
        try {
            await api.corruptTransaction(txId);
            alert("Database Mutation successful. The system has recorded a state drift between the DB and the Ledger.");
            fetchLedger();
        } catch (e) {
            alert("Mutation failed: " + e.message);
        } finally {
            setCorrupting(null);
        }
    };

    const formatDate = (ts) => {
        if (!ts) return "N/A";
        const date = typeof ts === 'string' ? new Date(ts) : new Date(ts * 1000);
        return isNaN(date.getTime()) ? "INVALID_TS" : date.toLocaleString().toUpperCase();
    };

    useEffect(() => {
        fetchLedger();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-pulse">
            <RefreshCw className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em]">Synchronizing Immutable Ledger State...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-20">
            
            {/* Blockchain Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-slate-700 transition-all group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Server className="w-20 h-20 text-blue-500" />
                    </div>
                    <div className="flex justify-between items-center mb-4 relative z-10">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Chain Height</span>
                        <Server className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-3xl font-black text-slate-100 italic tracking-tighter relative z-10">{ledger.length} Blocks</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-slate-700 transition-all group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Shield className="w-20 h-20 text-emerald-500" />
                    </div>
                    <div className="flex justify-between items-center mb-4 relative z-10">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Hash Integrity</span>
                        <Shield className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className={`text-3xl font-black italic tracking-tighter relative z-10 ${validationStatus === 'invalid' ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
                        {validationStatus === 'invalid' ? 'COMPROMISED' : 'VERIFIED'}
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-slate-700 transition-all group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Lock className="w-20 h-20 text-purple-500" />
                    </div>
                    <div className="flex justify-between items-center mb-4 relative z-10">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Cipher Protocol</span>
                        <Lock className="w-4 h-4 text-purple-500" />
                    </div>
                    <p className="text-3xl font-black text-slate-100 uppercase italic tracking-tighter relative z-10">SHA-256</p>
                </div>
            </div>

            {/* Validation Control Bar */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-black text-slate-100 flex items-center gap-3 uppercase tracking-tighter italic">
                        <Disc className="w-6 h-6 text-blue-500 animate-spin-slow" />
                        Blockchain Governance Console
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-1 border-l-2 border-blue-500">
                        Ensuring immutable audit trails for sensitive financial events via Cryptographic Linking.
                    </p>
                </div>
                <div className="flex gap-4 relative z-10">
                    <button
                        onClick={fetchLedger}
                        className="p-4 bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 rounded-2xl transition-all shadow-lg active:scale-95"
                        title="Re-sync State"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleValidate}
                        className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-[11px] transition-all shadow-2xl active:scale-95 ${validationStatus === 'valid' ? 'bg-emerald-600 text-white' :
                            validationStatus === 'invalid' ? 'bg-red-600 text-white animate-bounce' :
                                validationStatus === 'validating' ? 'bg-blue-600 text-white animate-pulse' :
                                    'bg-blue-600 hover:bg-blue-500 text-white'
                            }`}
                    >
                        <ShieldCheck className="w-5 h-5" />
                        {validationStatus === 'valid' ? 'Integrity Verified' :
                            validationStatus === 'invalid' ? 'TAMPER DETECTED' :
                                validationStatus === 'validating' ? 'Analyzing Entropy...' : 'Run Integrity Validation'}
                    </button>
                </div>
            </div>

            {validationStatus === 'invalid' && (
                <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-3xl flex items-start gap-5 animate-in zoom-in duration-300 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
                    <div className="p-4 bg-red-600 rounded-2xl shadow-lg shadow-red-900/40">
                        <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <p className="font-black text-red-400 uppercase tracking-[0.2em] text-sm italic">ALARM: Cryptographic Inconsistency Detected</p>
                        <p className="text-xs text-red-200/60 mt-2 leading-relaxed font-medium uppercase">
                            {validationReason || "State Drift Identified. Forensic tampering is confirmed."}
                        </p>
                    </div>
                </div>
            )}

            <div className="space-y-6 relative">
                <div className="absolute left-8 top-10 bottom-10 w-[2px] bg-gradient-to-b from-blue-500/5 via-blue-500/20 to-blue-500/5 hidden md:block" />

                <AnimatePresence>
                    {ledger.map((block, idx) => (
                        <motion.div
                            key={block.index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bg-slate-900 border ${block.data.corrupted_by_sim ? 'border-red-500/40 bg-red-500/5' : 'border-slate-800'} p-8 rounded-3xl hover:border-slate-700 transition-all group relative overflow-hidden shadow-2xl`}
                        >
                            {block.index === 0 && (
                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black px-4 py-1 rounded-bl-xl tracking-[0.2em]">
                                    GENESIS_BLOCK
                                </div>
                            )}

                            {block.data.corrupted_by_sim && (
                                <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-black px-4 py-1 rounded-bl-xl animate-pulse tracking-[0.2em]">
                                    TAMPERED_RECORD
                                </div>
                            )}

                            <div className="flex items-start gap-8 relative z-10">
                                <div className={`p-5 rounded-2xl transition-all shadow-inner border ${block.data.corrupted_by_sim ? 'bg-red-950/40 border-red-500/20' :
                                    block.index === 0 ? 'bg-blue-900/20 border-blue-500/20' :
                                        'bg-slate-800 border-slate-700 group-hover:bg-slate-700 group-hover:border-slate-600'
                                    }`}>
                                    <Box className={`w-8 h-8 ${block.data.corrupted_by_sim ? 'text-red-500' :
                                        block.index === 0 ? 'text-blue-400' :
                                            'text-slate-500 group-hover:text-slate-200'}`}
                                    />
                                </div>

                                <div className="flex-1 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-slate-100 font-black text-2xl tracking-tighter italic uppercase">Block #{block.index}</h3>
                                                <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-widest border ${block.index === 0 ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'
                                                    }`}>
                                                    {block.index === 0 ? 'PROTOCOL_ORIGIN' : 'VALIDATED_LEDGER'}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-slate-500 font-black flex items-center gap-2 mt-2 uppercase tracking-widest font-mono">
                                                <Clock className="w-3.5 h-3.5 text-blue-500" /> {formatDate(block.timestamp)}
                                            </p>
                                        </div>

                                        {block.index > 0 && (
                                            <div className="text-right flex flex-col items-end gap-3 px-4 py-2 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                                                <div className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em]">Security Research / Anomaly Injection</div>
                                                {block.data.transaction_id && !block.data.corrupted_by_sim ? (
                                                    <button
                                                        onClick={() => handleCorrupt(block.data.transaction_id)}
                                                        disabled={corrupting === block.data.transaction_id}
                                                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-red-600 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-[10px] transition-all font-black uppercase tracking-widest active:scale-95 shadow-lg"
                                                    >
                                                        <Zap className="w-3.5 h-3.5" />
                                                        {corrupting === block.data.transaction_id ? 'Mutating Database...' : 'Trigger Simulation Drift'}
                                                    </button>
                                                ) : block.data.corrupted_by_sim && (
                                                    <span className="flex items-center gap-2 text-red-500 text-[9px] font-black uppercase bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/20 shadow-lg shadow-red-900/10">
                                                        <AlertTriangle className="w-3.5 h-3.5" /> Cryptographic Mismatch
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {block.index > 0 ? (
                                        <div className="bg-slate-950/80 p-8 rounded-3xl border border-slate-800/80 font-mono text-xs text-slate-200 shadow-inner relative group/data">
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <div>
                                                        <span className="text-[9px] text-slate-600 font-black block uppercase mb-1 tracking-widest">Operator Identity</span>
                                                        <span className="text-slate-100 font-bold tracking-tight">{block.data.user}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[9px] text-slate-600 font-black block uppercase mb-1 tracking-widest">Counterparty Node</span>
                                                        <span className="text-slate-100 font-bold tracking-tight">{block.data.receiver || 'SYSTEM_RECOVERY'}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-4 text-right">
                                                    <div>
                                                        <span className="text-[9px] text-slate-600 font-black block uppercase mb-1 tracking-widest">Volumetric Value</span>
                                                        <span className="text-emerald-400 font-black text-2xl italic tracking-tighter">${(block.data.amount || 0).toLocaleString()}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[9px] text-slate-600 font-black block uppercase mb-1 tracking-widest">Engine Verdict</span>
                                                        <span className={`font-black px-3 py-1 rounded-lg text-[10px] tracking-widest uppercase border ${block.data.verdict === 'Fraud' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                            }`}>
                                                            {block.data.verdict === 'Fraud' ? 'ISOLATED' : 'SECURE'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8 pt-8 border-t border-slate-800/50">
                                                <div className="flex items-center justify-between gap-4 px-4 py-3 bg-slate-900/50 border border-slate-800/80 rounded-xl">
                                                    <span className="text-[8px] text-slate-600 font-black uppercase">PREVIOUS_HASH</span>
                                                    <span className="truncate text-slate-500 font-mono text-[10px]">{block.previous_hash}</span>
                                                </div>
                                                <div className="flex items-center justify-between gap-4 px-4 py-3 bg-slate-900 border border-blue-500/10 rounded-xl mt-3">
                                                    <span className="text-[8px] text-blue-500 font-black uppercase">CURRENT_HASH</span>
                                                    <span className="truncate text-blue-400/80 font-mono text-[10px] font-bold">{block.hash}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-blue-500/5 border border-blue-500/10 p-10 rounded-3xl flex flex-col items-center justify-center text-center">
                                            <Disc className="w-12 h-12 text-blue-500/20 mb-4 animate-spin-slow" />
                                            <p className="text-slate-500 text-[10px] font-medium mt-2 max-w-xs uppercase tracking-widest">Genesis Block Established.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}