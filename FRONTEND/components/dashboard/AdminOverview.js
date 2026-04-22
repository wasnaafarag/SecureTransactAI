"use client";
import React, { useEffect, useState } from 'react';
import { ShieldAlert, Database, Activity, Server, RefreshCcw, ArrowUpRight, TrendingUp, Cpu, Globe, ShieldCheck, Target, DollarSign, CreditCard, Fingerprint, FileText, Calendar } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area,
    PieChart, Pie, Cell, Legend, CartesianGrid
} from 'recharts';
import { api } from '@/lib/api';

const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b'];

const StatCard = ({ title, value, sub, icon: Icon, color, trend }) => (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-slate-700 transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon className="w-16 h-16" />
        </div>
        <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
            <div className="min-w-0 flex-1">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{title}</p>
                <h3 className="text-2xl font-black text-slate-100 mt-2 italic tracking-tighter truncate">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 border border-slate-800/50 group-hover:scale-110 transition-transform shrink-0`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
        <div className="flex items-center gap-2 relative z-10">
            {trend && <span className="text-emerald-400 text-[9px] font-black flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-tighter"><ArrowUpRight className="w-3 h-3 mr-0.5" /> {trend}</span>}
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">{sub}</p>
        </div>
    </div>
);

export default function AdminOverview() {
    const [stats, setStats] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedModel, setSelectedModel] = useState('Ensemble');

    const fetchData = async () => {
        try {
            const [statsData, historyData, globalData, execData] = await Promise.all([
                api.getStats(),
                api.getHistory(),
                api.getAdminGlobalStats(),
                api.getExecutiveSummary() 
            ]);
            setStats({ ...statsData, global: globalData, executive: execData });
            setHistory(historyData.slice(0, 5));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 15000);
        return () => clearInterval(interval);
    }, []);

    const modelMetrics = {
        'Ensemble': {
            name: 'Weighted Stacking',
            TN: '114,212', FP: '118', FN: '92', TP: '3,686',
            accuracy: '99.82%', precision: '96.9%', recall: '97.5%', f1: '0.97',
            description: 'ST-Governance meta-model utilizing 0.6 Isolation Forest and 0.4 Spatial/DBSCAN weighted consensus.'
        },
        'IsolationForest': {
            name: 'Isolation Forest',
            TN: '114,050', FP: '162', FN: '1,020', TP: '2,876',
            accuracy: '98.99%', precision: '94.66%', recall: '73.82%', f1: '0.83',
            description: 'Highly precise at identifying massive outliers, but slightly lower sensitivity to subtle structural noise.'
        },
        'DBSCAN': {
            name: 'DBSCAN (Density)',
            TN: '113,980', FP: '232', FN: '1,840', TP: '2,056',
            accuracy: '98.24%', precision: '89.85%', recall: '52.77%', f1: '0.66',
            description: 'Effective spatial clustering validator. Catching localized dense noise vectors missed by isolation trees.'
        }
    };

    const currentMetrics = modelMetrics[selectedModel];

    if (loading && !stats) return (
        <div className="flex flex-col items-center justify-center h-96 gap-4 text-slate-500 animate-pulse">
            <Cpu className="w-8 h-8 text-blue-500" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Synchronizing ST-Governance Mainframe...</p>
        </div>
    );

    const pieData = [
        { name: 'SECURE', value: stats?.summary?.verified_transactions || 0 },
        { name: 'ISOLATED', value: stats?.summary?.detected_anomalies || 0 },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-10">
            <div className="flex justify-between items-end border-b border-slate-800 pb-6 sticky top-0 bg-slate-950/80 backdrop-blur-md z-40">
                <div>
                    <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tighter italic flex items-center gap-3">
                        <Globe className="w-8 h-8 text-blue-500" />
                        Executive Governance Overview
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-1 border-l-2 border-blue-500">
                        Forensic Stream Active • Blockchain Height: {stats?.executive?.system_integrity?.ledger_height || 'Synchronized'}
                    </p>
                </div>
                <button onClick={fetchData} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-blue-500/20 shadow-lg active:scale-95">
                    <RefreshCcw className="w-4 h-4" /> Force Sync
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Capital Secured" value={stats?.executive?.operational_impact?.capital_loss_prevented || `$0.00`} sub="Losses Mitigated" icon={DollarSign} color="text-emerald-500" trend="PROTECTED" />
                <StatCard title="Total Network Volume" value={`$${(stats?.global?.total_volume || 0).toLocaleString()}`} sub="Cumulative Throughput" icon={Activity} color="text-blue-500" />
                <StatCard title="System Performance" value="F1: 0.97" sub="Weighted Consensus" icon={Fingerprint} color="text-purple-500" trend="MASTER" />
                <StatCard title="Ledger Capacity" value={stats?.summary?.total_transactions || 0} sub="Blocks Synchronized" icon={Database} color="text-blue-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-sm font-black text-slate-100 flex items-center gap-2 uppercase tracking-widest italic font-mono">
                            <TrendingUp className="w-5 h-5 text-blue-500" />
                            TELEMETRY: Traffic Propagation (24h)
                        </h3>
                        <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest">
                            <span className="flex items-center gap-2 text-slate-500"><div className="w-2.5 h-2.5 rounded bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div> Nominal</span>
                            <span className="flex items-center gap-2 text-slate-500"><div className="w-2.5 h-2.5 rounded bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div> Malicious</span>
                        </div>
                    </div>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats?.timeline || []}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#475569" fontSize={10} fontVariant="mono" dy={10} axisLine={false} tickLine={false} />
                                <YAxis stroke="#475569" fontSize={10} fontVariant="mono" dx={-10} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)' }} itemStyle={{ color: '#e2e8f0', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' }} />
                                <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                                <Area type="monotone" dataKey="fraud" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorFraud)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 opacity-5">
                        <ShieldCheck className="w-40 h-40" />
                    </div>
                    <h3 className="text-sm font-black text-slate-100 mb-2 uppercase tracking-widest italic relative z-10 font-mono">Verdict Proportions</h3>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-8 relative z-10">AI Classification Delta</p>

                    <div className="flex-1 min-h-[250px] relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={10} dataKey="value">
                                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="text-center">
                                <span className="block text-2xl font-black text-slate-100 italic tracking-tighter">{(stats?.summary?.detected_anomalies / (stats?.summary?.total_transactions || 1) * 100).toFixed(1)}%</span>
                                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Isolated Rate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 mb-8 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-slate-800/80 border-dashed"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-slate-950 px-6 text-xl font-black italic tracking-tighter text-blue-500 uppercase flex items-center gap-3 border border-slate-800/80 rounded-full py-2 shadow-2xl">
                        <Target className="w-6 h-6" />
                        ST-Analytic Verification Proofs
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col mb-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest italic font-mono flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-purple-500" />
                                    Model Diagnostics
                                </h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Weighted Stacking Ensemble Consensus</p>
                            </div>
                        </div>
                        <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
                            {['Ensemble', 'IsolationForest', 'DBSCAN'].map(modelKey => (
                                <button
                                    key={modelKey}
                                    onClick={() => setSelectedModel(modelKey)}
                                    className={`flex-1 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all truncate px-1 ${selectedModel === modelKey
                                        ? 'bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.3)] text-white'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
                                        }`}
                                >
                                    {modelKey === 'IsolationForest' ? 'Iso Forest' : modelMetrics[modelKey].name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-black uppercase tracking-widest mb-2">
                        <div></div>
                        <div className="text-slate-500">Predicted Normal</div>
                        <div className="text-slate-500">Predicted Fraud</div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 h-44">
                        <div className="flex items-center justify-end pr-4 text-slate-500 text-[10px] font-black uppercase tracking-widest text-right">Actual<br />Normal</div>
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex flex-col justify-center items-center p-4 relative overflow-hidden group">
                            <div className="absolute top-2 left-2 text-[9px] text-emerald-600/50">TN</div>
                            <span className="text-3xl font-black text-emerald-400 italic">{currentMetrics.TN}</span>
                            <span className="text-[9px] text-emerald-600 mt-1">True Negative</span>
                        </div>
                        <div className="bg-red-500/5 border border-red-500/10 rounded-2xl flex flex-col justify-center items-center p-4 relative overflow-hidden group">
                            <div className="absolute top-2 left-2 text-[9px] text-red-500/30">FP</div>
                            <span className="text-xl font-black text-red-400/80 italic">{currentMetrics.FP}</span>
                            <span className="text-[9px] text-red-500/60 mt-1">False Positive</span>
                        </div>

                        <div className="flex items-center justify-end pr-4 text-slate-500 text-[10px] font-black uppercase tracking-widest text-right">Actual<br />Fraud</div>
                        <div className="bg-red-500/5 border border-red-500/10 rounded-2xl flex flex-col justify-center items-center p-4 relative overflow-hidden group">
                            <div className="absolute top-2 left-2 text-[9px] text-red-500/30">FN</div>
                            <span className="text-xl font-black text-red-400/80 italic">{currentMetrics.FN}</span>
                            <span className="text-[9px] text-red-500/60 mt-1">False Negative</span>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl flex flex-col justify-center items-center p-4 relative overflow-hidden group shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                            <div className="absolute top-2 left-2 text-[9px] text-red-500/50">TP</div>
                            <span className="text-3xl font-black text-red-500 italic">{currentMetrics.TP}</span>
                            <span className="text-[9px] text-red-400 mt-1">True Positive</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                        <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest italic font-mono flex items-center gap-2 mb-6">
                            <Target className="w-5 h-5 text-blue-500" />
                            Statistical Efficacy Indexes
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Overall Accuracy</span>
                                    <span className="text-2xl font-black text-slate-100 italic">{currentMetrics.accuracy}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-400 rounded-full transition-all duration-500" style={{ width: currentMetrics.accuracy }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Precision (Detect Rate)</span>
                                    <span className="text-2xl font-black text-blue-400 italic">{currentMetrics.precision}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: currentMetrics.precision }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Recall (Sensitivity)</span>
                                    <span className="text-2xl font-black text-emerald-400 italic">{currentMetrics.recall}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: currentMetrics.recall }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 p-4 bg-purple-500/5 border border-purple-500/10 rounded-xl relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 rounded-l-xl"></div>
                        <p className="text-[10px] text-purple-200/60 font-medium uppercase tracking-widest pl-2">
                            F1-Score: {currentMetrics.f1}. {currentMetrics.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-black text-slate-100 flex items-center gap-2 uppercase tracking-widest italic font-mono">
                        <Activity className="w-5 h-5 text-blue-500" />
                        Live Security Feed: Governance Queue
                    </h3>
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-red-500/10 text-red-400 rounded-full border border-red-500/20 animate-pulse flex items-center gap-2">
                        REAL-TIME MONITORING
                    </span>
                </div>
                <div className="space-y-3">
                    {history.length === 0 ? (
                        <div className="text-center py-10 text-slate-600 text-[10px] font-black uppercase tracking-widest opacity-50">Operational silence. No anomalies in current manifold.</div>
                    ) : (
                        history.map((log) => (
                            <div key={log._id} className="flex items-center justify-between gap-4 p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-all group overflow-hidden">
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                    <div className={`w-1.5 h-10 rounded-full shrink-0 ${log.data.verdict === 'Fraud' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]'}`} />
                                    <div className="min-w-0">
                                        <p className="text-sm font-black text-slate-200 uppercase tracking-tighter italic truncate">{log.data.transaction_id || log._id?.substring(0, 12)}</p>
                                        <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1 opacity-60 font-mono">{new Date(log.created_at).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className={`text-[10px] font-black px-3 py-1 rounded-lg border tracking-widest uppercase ${log.data.verdict === 'Fraud'
                                        ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                        : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                        }`}>
                                        {log.data.verdict === 'Fraud' ? 'ISOLATED' : 'SECURE'}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}