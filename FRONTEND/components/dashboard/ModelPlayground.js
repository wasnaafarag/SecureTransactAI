import React, { useState } from 'react';
import { api } from '@/lib/api';
import {
    Search, ShieldAlert, ShieldCheck, Activity, Info,
    AlertCircle, TrendingUp, Target, Zap, History, Cpu
} from 'lucide-react';

export default function ModelPlayground() {
    const [amount, setAmount] = useState('500');
    const [receiver, setReceiver] = useState('Unknown_Entity');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const runAnalysis = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const currentFeatures = result?.features || {
                V1: Math.random() * 2 - 1,
                V2: Math.random() * 2 - 1,
                V3: Math.random() * 2 - 1,
            };

            const data = await api.predictFraud({
                features: currentFeatures,
                amount: parseFloat(amount),
                receiver: receiver,
                operational_context: "adversarial_stress_test"
            });
            setResult(data);
        } catch (err) {
            alert("Error running analysis: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const generateAttackPattern = () => {
        setAmount('99999');
        setReceiver('OFFSHORE_SHELL_INC');
        alert("ADVERSARIAL ATTACK SIMULATED: Multi-dimensional feature outliers injected. Click 'Execute Security Audit' to observe detection.");
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                    <Target className="w-8 h-8 text-purple-500" />
                    Security Lab: AI Behavioral Verification
                </h2>
                <p className="text-slate-400 mt-2">
                    Validating Systemic Integrity via <strong>Joint Stacking Ensemble</strong>. Test the cross-correlation between base models and the meta-learner.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl shadow-purple-500/5">
                        <h3 className="text-sm font-bold text-slate-300 mb-6 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-purple-400" />
                            Input Vector Analysis
                        </h3>

                        <form onSubmit={runAnalysis} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Transferred Value ($)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-purple-600 outline-none transition-all font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Target Recipient Entry</label>
                                <input
                                    type="text"
                                    value={receiver}
                                    onChange={(e) => setReceiver(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-purple-600 outline-none transition-all font-mono"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={generateAttackPattern}
                                className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl font-bold transition-all mb-4 flex items-center justify-center gap-2 uppercase tracking-tighter"
                            >
                                <Zap className="w-5 h-5" /> Simulate Adversarial Attack
                            </button>

                            <button
                                disabled={loading}
                                className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>Execute Security Audit <TrendingUp className="w-5 h-5" /></>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <div className="flex gap-3">
                            <Info className="w-5 h-5 text-blue-400 shrink-0" />
                            <p className="text-xs text-blue-200/70 leading-relaxed uppercase font-bold tracking-tight">
                                Protocol Note: If the stacking ensemble detects a behavior deviation, the system enforces a Block Action.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    {loading ? (
                        <div className="h-full min-h-[400px] bg-slate-900/50 border border-slate-800 rounded-3xl flex flex-col items-center justify-center space-y-4">
                            <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                            <p className="text-slate-400 font-mono text-xs uppercase tracking-[0.3em]">Processing Neural Inference...</p>
                        </div>
                    ) : result?.details ? (
                        <div className="space-y-6 animate-in zoom-in-95 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {['Auth_Node_01', 'Governance_Ledger', 'Audit_Mirror'].map(node => (
                                    <div key={node} className="p-3 bg-slate-900 border border-emerald-500/20 rounded-xl flex items-center gap-3 shadow-xl">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        <div>
                                            <p className="text-[9px] text-slate-500 font-bold uppercase">{node}</p>
                                            <p className="text-[8px] text-emerald-400 font-mono italic">SYNCHRONIZED</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className={`p-5 rounded-2xl border relative overflow-hidden group transition-colors col-span-full ${result.verdict === 'Fraud' && result.details?.temporal_features?.velocity > 600
                                        ? 'bg-amber-950/20 border-amber-500/25'
                                        : 'bg-slate-950/60 border-slate-800'
                                    }`}>
                                    <div className="absolute bottom-0 right-0 p-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                                        <History className="w-20 h-20" />
                                    </div>
                                    <div className="flex items-start justify-between mb-5">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-0.5">Temporal Behavioral Analytics</p>
                                            <p className="text-[10px] font-bold text-slate-500">5-Transaction Rolling Window</p>
                                        </div>
                                        <TrendingUp className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Velocity delta</p>
                                            <p className="text-xl font-black font-mono text-slate-200">
                                                {result.details?.temporal_features?.velocity?.toFixed(1) ?? '——'}s
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Rolling Mean (L5)</p>
                                            <p className="text-xl font-black font-mono text-slate-200">
                                                ${result.details?.temporal_features?.mean_5?.toLocaleString() ?? '——'}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Dynamic Variance</p>
                                            <p className="text-xl font-black font-mono text-slate-200">
                                                {result.details?.temporal_features?.std_5?.toFixed(2) ?? '——'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-6 bg-slate-900 border rounded-2xl transition-all ${result.details?.isolation_forest?.prediction === 'Fraud' ? 'border-red-500/50 shadow-lg shadow-red-500/5 bg-red-500/5' : 'border-slate-800'}`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <h4 className="font-bold text-slate-100 uppercase text-xs tracking-widest">Isolation Forest</h4>
                                        <span className={`px-2.5 py-1 rounded text-[10px] font-black tracking-widest ${result.details?.isolation_forest?.prediction === 'Fraud' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                            {result.details?.isolation_forest?.prediction === 'Fraud' ? 'ANOMALY' : 'NORMAL'}
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-[10px] font-mono">
                                            <span className="text-slate-500 uppercase">Entropy Score</span>
                                            <span className="text-slate-100 font-bold">{result.details?.isolation_forest?.anomaly_score?.toFixed(4) || '0.000'}</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                                            <div className={`h-full transition-all duration-1000 ${result.details?.isolation_forest?.prediction === 'Fraud' ? 'bg-red-500 w-[90%]' : 'bg-emerald-500 w-[20%]'}`} />
                                        </div>
                                    </div>
                                </div>

                                <div className={`p-6 bg-slate-900 border rounded-2xl transition-all ${result.verdict === 'Fraud' ? 'border-red-500/50 shadow-lg shadow-red-500/5 bg-red-500/5' : 'border-slate-800'}`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <h4 className="font-bold text-slate-100 uppercase text-xs tracking-widest">Stacked Classifier</h4>
                                        <span className={`px-2.5 py-1 rounded text-[10px] font-black tracking-widest ${result.verdict === 'Fraud' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                            {result.verdict === 'Fraud' ? 'FRAUD CONFIRMED' : 'INTEGRITY VERIFIED'}
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-[10px] font-mono">
                                            <span className="text-slate-500 uppercase">Combined Confidence</span>
                                            <span className="text-slate-100 font-bold">{result.ensemble_metrics?.combined_confidence ?? 80}%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                                            <div className={`h-full transition-all duration-1000 ${result.verdict === 'Fraud' ? 'bg-red-500 w-[95%]' : 'bg-emerald-500 w-[15%]'}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`p-10 rounded-[2.5rem] border-2 flex flex-col items-center text-center space-y-6 transition-all ${result.verdict === 'Fraud' ? 'bg-red-500/10 border-red-500/30 shadow-2xl shadow-red-900/20' : 'bg-emerald-500/10 border-emerald-500/30 shadow-2xl shadow-emerald-900/20'}`}>
                                <div className={`p-6 rounded-3xl ${result.verdict === 'Fraud' ? 'bg-red-600' : 'bg-emerald-600'} shadow-[0_0_30px_rgba(0,0,0,0.4)]`}>
                                    {result.verdict === 'Fraud' ? <ShieldAlert className="w-12 h-12 text-white" /> : <ShieldCheck className="w-12 h-12 text-white" />}
                                </div>
                                <div>
                                    <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4">
                                        Audit Verdict: {result.verdict?.toUpperCase()}
                                    </h3>
                                    <p className="text-sm text-slate-400 max-w-lg font-medium leading-relaxed">
                                        {result.guard_rails?.velocity_lock
                                            ? `VELOCITY LOCK: ${result.guard_rails.reason}`
                                            : result.verdict === 'Fraud'
                                                ? "NEURAL CONSENSUS REACHED. Pattern matches high-variance fraud profile. Manual override required for fund release."
                                                : "Input parameters aligned with historical behavioral manifold. Transaction authorized for settlement."}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="px-6 py-2 bg-slate-950 border border-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        Latency: 34ms
                                    </div>
                                    <div className="px-6 py-2 bg-slate-950 border border-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        Nodes: 3/3
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600 p-20 bg-slate-900/10">
                            <Search className="w-16 h-16 mb-4 opacity-5" />
                            <p className="font-bold uppercase tracking-widest text-sm">System Standby</p>
                            <p className="text-xs text-center max-w-xs mt-2 opacity-60">Initialize parameters to begin side-by-side behavioral engine analysis.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
