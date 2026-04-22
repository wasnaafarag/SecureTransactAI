import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { 
    ShieldCheck, Activity, AlertTriangle, ArrowRight, Shield, 
    Terminal, Zap, Globe, Cpu, TrendingUp, History, ExternalLink,
    Fingerprint, BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

export default function InvestigatorOverview() {
    const [stats, setStats] = useState(null);
    const [history, setHistory] = useState([]);
    const [activeManifold, setActiveManifold] = useState('models');
    const [isSwapping, setIsSwapping] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [s, h, m] = await Promise.all([
                    api.getStats(),
                    api.getHistory(10),
                    api.getManifold()
                ]);
                setStats(s);
                setHistory(h);
                setActiveManifold(m.active_manifold || m.active_engine);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
        const interval = setInterval(load, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleManifoldSwap = async (version) => {
        if (activeManifold === version) return;
        setIsSwapping(true);
        try {
            await api.updateManifold(version);
            setActiveManifold(version);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsSwapping(false);
        }
    };

    const StatCard = ({ icon: Icon, label, value, color, data, type }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 p-6 rounded-3xl relative overflow-hidden group shadow-2xl"
        >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className="w-20 h-20" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                <div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.25em] mb-1">{label}</p>
                    <div className={`text-4xl font-black italic tracking-tighter ${color} flex items-baseline gap-2`}>
                        {value?.toLocaleString() || 0}
                        <span className="text-[10px] font-bold text-slate-700 not-italic tracking-widest uppercase">Incidents</span>
                    </div>
                </div>

                <div className="h-12 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <Line 
                                type="monotone" 
                                dataKey={type === 'fraud' ? 'fraud' : 'total'} 
                                stroke={color.includes('blue') ? '#3b82f6' : color.includes('emerald') ? '#10b981' : '#ef4444'} 
                                strokeWidth={2} 
                                dot={false}
                                isAnimationActive={true}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );

    if (loading && !stats) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] animate-pulse">Synchronizing ST-Governance...</p>
        </div>
    );

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto p-4 lg:p-0">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800/80 pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/40">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-100 uppercase tracking-tighter italic">
                            Forensic<span className="text-blue-500">Workspace</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Globe className="w-3 h-3 text-blue-400" /> ST-Analytic Engine v2.0</span>
                        <span className="w-1 h-1 bg-slate-800 rounded-full" />
                        <span className="flex items-center gap-1.5"><Fingerprint className="w-3 h-3 text-purple-400" /> F1-Score: 0.97</span>
                        <span className="w-1 h-1 bg-slate-800 rounded-full" />
                        <span className="text-emerald-500 italic">Blockchain_Integrity: Verified</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-2xl border border-slate-800/50">
                    <div className="text-right">
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Analyst Credentials</p>
                        <p className="text-xs text-emerald-500 font-mono font-bold mt-0.5">FORENSIC_AUTHORITY_SYNC</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-slate-800 flex items-center justify-center bg-slate-950">
                        <Activity className="w-5 h-5 text-blue-500" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={BarChart3}
                    label="Scanned Volume"
                    value={stats?.summary?.total_transactions}
                    color="text-blue-500"
                    data={stats?.timeline || []}
                    type="total"
                />
                <StatCard
                    icon={ShieldCheck}
                    label="Verified Legitimate"
                    value={stats?.summary?.verified_transactions}
                    color="text-emerald-500"
                    data={stats?.timeline || []}
                    type="total"
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Anomalies Isolated"
                    value={stats?.summary?.detected_anomalies}
                    color="text-red-500"
                    data={stats?.timeline || []}
                    type="fraud"
                />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative h-48 rounded-[2rem] overflow-hidden border border-blue-500/20 bg-linear-to-br from-blue-900/20 via-slate-900 to-slate-950 flex items-center shadow-2xl"
            >
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
                
                <div className="relative z-10 px-10 py-8 flex flex-col md:flex-row items-center justify-between w-full gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <h3 className="text-2xl font-black text-blue-100 uppercase tracking-tighter italic">Pending Forensic Review</h3>
                        </div>
                        <p className="text-slate-400 max-w-2xl text-xs font-medium leading-relaxed uppercase tracking-wider">
                            Analytic meta-learner has flagged high-variance deviations. Authority review required to stabilize blockchain state and finalize ledger entries.
                        </p>
                    </div>
                    <button 
                        onClick={() => window.location.href='/dashboard?view=investigations'} 
                        className="px-8 py-4 bg-blue-600 hover:bg-white hover:text-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 transition-all hover:scale-105 shadow-xl shadow-blue-500/30 group/btn"
                    >
                        Initiate Triage <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                <div className="lg:col-span-2 bg-slate-900/30 border border-slate-800/50 rounded-[2.5rem] p-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-slate-100 uppercase italic font-black text-sm tracking-tighter">
                            <Terminal className="w-5 h-5 text-blue-500" />
                            Forensic Activity Feed
                        </div>
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-full border border-slate-800 italic">Audit_Trail_Active</span>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-2">
                                <thead>
                                    <tr className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                                        <th className="px-4 py-2">Forensic ID</th>
                                        <th className="px-4 py-2">Subject Entity</th>
                                        <th className="px-4 py-2">Asset Value</th>
                                        <th className="px-4 py-2">Verdict</th>
                                        <th className="px-4 py-2 text-right">Audit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence mode="popLayout">
                                        {history.slice(0, 6).map((tx, idx) => (
                                            <motion.tr 
                                                key={tx.data.transaction_id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="group bg-slate-900/50 hover:bg-slate-800/40 transition-colors border border-slate-800/30 overflow-hidden"
                                            >
                                                <td className="px-4 py-3 rounded-l-2xl border-y border-l border-slate-800/50">
                                                    <span className="font-mono text-[10px] text-slate-400 group-hover:text-blue-400 transition-colors">
                                                        #{tx.data.transaction_id.slice(-8).toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 border-y border-slate-800/50">
                                                    <span className="text-[10px] font-bold text-slate-300 truncate max-w-[120px] block font-mono">
                                                        {tx.data.user}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 border-y border-slate-800/50">
                                                    <span className="text-[10px] font-black text-slate-100 italic">
                                                        ${tx.data.amount.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 border-y border-slate-800/50">
                                                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black tracking-widest border uppercase ${
                                                        tx.data.verdict === 'Fraud' 
                                                            ? 'bg-red-500/10 border-red-500/30 text-red-500' 
                                                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                                    }`}>
                                                        {tx.data.verdict === 'Fraud' ? 'Isolated' : 'Anchored'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 rounded-r-2xl border-y border-r border-slate-800/50 text-right">
                                                    <a href={`/dashboard?view=investigations&id=${tx.data.transaction_id}`} className="p-1.5 hover:bg-blue-600/20 rounded-lg text-slate-600 hover:text-blue-400 inline-block">
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800/50 rounded-[2.5rem] p-8 space-y-8 flex flex-col justify-between overflow-hidden relative">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 text-slate-100 uppercase italic font-black text-sm tracking-tighter mb-4">
                            <Cpu className="w-5 h-5 text-purple-500" />
                            Engine Topology
                        </div>
                        <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800/40">
                            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mb-1.5">Neural Manifold State</p>
                            <p className="text-xs font-black text-emerald-500 uppercase italic">
                                {activeManifold === 'models' ? 'ST-Weighted-Ensemble' : 'Forensic-Stacking-Core'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                         <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800/50">
                            {[
                                { id: 'models', label: 'Weighted' },
                                { id: 'models_new', label: 'Stacking' }
                            ].map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => handleManifoldSwap(m.id)}
                                    disabled={isSwapping}
                                    className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                        activeManifold === m.id 
                                            ? 'bg-purple-600 text-white shadow-xl shadow-purple-900/40' 
                                            : 'text-slate-600 hover:text-slate-300'
                                    } ${isSwapping ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                        <p className="text-[9px] text-slate-600 font-medium leading-relaxed uppercase tracking-tight px-2 text-center italic">
                            ST-Engine utilizes weighted consensus for low-latency isolation. Switching manifolds injects specific bias sets.
                        </p>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-slate-900">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                            <span>Governance Sync</span>
                            <span className="text-emerald-500">100.0%</span>
                        </div>
                        <div className="mt-2 h-1 bg-slate-900 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: '100%' }} 
                                className="h-full bg-emerald-500 shadow-[0_0_8px_#10b981]" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}