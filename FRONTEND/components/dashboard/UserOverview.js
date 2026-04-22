"use client";
import React, { useEffect, useState } from 'react';
import { Wallet, ShieldCheck, XOctagon, Activity, Shield, TrendingUp, Cpu, Fingerprint } from 'lucide-react';
import { api } from '@/lib/api';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#10b981', '#ef4444']; // Emerald for Secure, Red for Isolated

const StatCard = ({ title, value, icon: Icon, color, sub }) => (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-slate-700 transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Icon className="w-16 h-16" />
        </div>
        <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{title}</p>
                <h3 className="text-3xl font-black text-slate-100 mt-2 italic tracking-tighter">{value}</h3>
            </div>
            <div className={`p-4 rounded-2xl ${color.replace('text-', 'bg-').split('-')[0] + '-500/10'} border border-slate-800/50 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
        </div>
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest relative z-10">{sub}</p>
    </div>
);

export default function UserOverview() {
    const [stats, setStats] = useState(null);
    const [history, setHistory] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [userStats, userHistory] = await Promise.all([
                    api.getUserStats(),
                    api.getUserHistory()
                ]);
                
                setStats(userStats);
                setHistory(userHistory.slice(0, 5));

                const recent = userHistory.slice(0, 10).reverse().map(log => ({
                    id: log.data.transaction_id ? log.data.transaction_id.slice(-4) : '???',
                    amount: log.data.amount || 0,
                    status: log.data.verdict
                }));
                setChartData(recent);
            } catch (err) {
                console.error("Dashboard Sync Error:", err);
            } finally {
                setLoading(false);
            }
        };
        loadDashboard();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-pulse">
            <Cpu className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em]">Synchronizing Personal Manifold...</p>
        </div>
    );

    const pieData = [
        { name: 'SECURE', value: stats?.approved || 0 },
        { name: 'ISOLATED', value: stats?.fraud || 0 }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-10">
            <div className="flex justify-between items-end border-b border-slate-800 pb-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tighter italic flex items-center gap-3">
                        <Fingerprint className="w-8 h-8 text-blue-500" />
                        Operator Dashboard
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-1 border-l-2 border-blue-500">
                        Live Telemetry & Transaction Integrity Status
                    </p>
                </div>
            </div>

            {/* Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="Liquid Balance"
                    value={`$${stats?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}`}
                    sub="Authorized Capital"
                    icon={Wallet}
                    color="text-emerald-500"
                />
                <StatCard
                    title="Activity Volume"
                    value={stats?.total || 0}
                    sub="Operations Logged"
                    icon={Activity}
                    color="text-blue-500"
                />
                <StatCard
                    title="Integrity Proofs"
                    value={stats?.approved || 0}
                    sub="Consensus Passed"
                    icon={ShieldCheck}
                    color="text-blue-400"
                />
                <StatCard
                    title="Adversarial Blocks"
                    value={stats?.fraud || 0}
                    sub="Threats Isolated"
                    icon={XOctagon}
                    color="text-red-500"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                        <TrendingUp className="w-32 h-32" />
                    </div>
                    <h3 className="text-sm font-black text-slate-100 mb-8 uppercase tracking-widest flex items-center gap-2 italic font-mono relative z-10">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        Volume Propagation
                    </h3>
                    <div className="h-[250px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="id" stroke="#475569" fontSize={10} fontVariant="mono" axisLine={false} tickLine={false} />
                                <YAxis stroke="#475569" fontSize={10} fontVariant="mono" axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                    contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '16px' }}
                                />
                                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                        <Shield className="w-32 h-32" />
                    </div>
                    <h3 className="text-sm font-black text-slate-100 mb-8 uppercase tracking-widest flex items-center gap-2 italic font-mono relative z-10">
                        <Shield className="w-4 h-4 text-emerald-500" />
                        Behavioral Distribution
                    </h3>
                    <div className="h-[250px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value">
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Activity Stream */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-black text-slate-100 flex items-center gap-2 uppercase tracking-widest italic font-mono">
                        <Activity className="w-5 h-5 text-blue-500" />
                        Live Operations Stream
                    </h3>
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                        Authorized Feed
                    </span>
                </div>
                <div className="space-y-3">
                    {history.length === 0 ? (
                        <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest text-center py-10 opacity-50 font-mono">No telemetry segments found.</p>
                    ) : (
                        history.map(log => (
                            <div key={log._id} className="flex items-center justify-between p-5 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-blue-500/20 transition-all group overflow-hidden relative">
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className={`w-1 h-10 rounded-full ${log.data.verdict === 'Fraud' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]'}`} />
                                    <div>
                                        <p className="text-slate-100 font-bold text-sm tracking-tight">Counterparty: {log.data.receiver || 'SYSTEM_NODE'}</p>
                                        <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1 opacity-60 font-mono">
                                            {new Date(log.created_at).toLocaleString().toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right relative z-10">
                                    <p className="text-slate-100 font-black text-lg italic tracking-tighter">${log.data.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${log.data.verdict === 'Fraud' ? 'text-red-500' : 'text-emerald-500'}`}>
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