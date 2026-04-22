"use client";
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Shield,
    LayoutDashboard,
    FileText,
    LogOut,
    Users,
    Search,
    Activity,
    CreditCard,
    GanttChartSquare,
    History
} from 'lucide-react';

export default function DashboardLayout({ children }) {
    const { user, logout } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'overview';

    const [brandingType, setBrandingType] = React.useState('GOV');

    if (!user) return null;

    const NavItem = ({ icon: Icon, label, id }) => (
        <button
            onClick={() => router.push(`/dashboard?view=${id}`)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentView === id
                ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}>
            <Icon className="w-5 h-5" />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
            <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 p-4 z-50">
                <div className="flex items-center gap-3 mb-8 px-2">
                    <div className="p-2 bg-blue-600 rounded-lg cursor-pointer" onClick={() => setBrandingType(brandingType === 'GOV' ? 'CORE' : 'GOV')}>
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight">ST-Governance<span className="text-blue-500">AI</span></h1>
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                            {brandingType === 'GOV' ? 'Governance' : 'Analytic'} Unit
                        </p>
                    </div>
                </div>

                <nav className="space-y-1">
                    <NavItem icon={LayoutDashboard} label="System Overview" id="overview" />

                    {user.role !== 'investigator' && (
                        <NavItem icon={History} label="Audit Ledger" id="history" />
                    )}

                    {user.role === 'user' && (
                        <>
                            <NavItem icon={Search} label="Transfer Portal" id="transfer" />
                            <NavItem icon={CreditCard} label="Forensic Cards" id="cards" />
                            <NavItem icon={FileText} label="Executive Metrics" id="executive" />
                        </>
                    )}

                    {user.role !== 'user' && <NavItem icon={Search} label="Forensic Triage" id="investigations" />}
                    
                    {user.role === 'admin' && (
                        <>
                            <NavItem icon={GanttChartSquare} label="Executive Matrix" id="executive" />
                            <NavItem icon={FileText} label="Immutable Ledger" id="ledger" />
                            <NavItem icon={Activity} label="System Activity" id="activity" />
                            <NavItem icon={Users} label="Authority Matrix" id="access" />
                        </>
                    )}
                </nav>

                <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 mb-3">
                        <p className="text-xs text-slate-400 mb-1 font-black uppercase tracking-tighter opacity-50">Identity Verified</p>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-sm truncate tracking-tight">{user.username}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-black uppercase ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                user.role === 'investigator' ? 'bg-amber-500/10 text-amber-400 border-amber-400/20' :
                                    'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                }`}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 font-bold hover:bg-red-500/10 rounded-lg transition-colors uppercase tracking-widest text-[10px]"
                    >
                        <LogOut className="w-4 h-4" />
                        Terminate Session
                    </button>
                </div>
            </aside>

            <main className="ml-64 p-8 overflow-x-hidden min-w-0">
                <header className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div>
                        <h2 className="text-2xl font-black text-slate-100 tracking-tighter italic uppercase">
                            {currentView === 'overview' ? 'ST-Analytic Hub' : 
                             currentView === 'history' ? 'Audit Manifold' : 'Forensic Workspace'}
                        </h2>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live Forensic Stream: Authenticated
                        </p>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}