"use client";
import React, { Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';

// Workspace Components
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import InvestigatorDashboard from '@/components/dashboard/InvestigatorDashboard';
import UserDashboard from '@/components/dashboard/UserDashboard';

// Loading Skeleton for a "Professional" feel
const ForensicSkeleton = () => (
    <div className="w-full h-96 bg-slate-900/50 animate-pulse rounded-2xl border border-slate-800 flex items-center justify-center">
        <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Initialising Secure Workspace...</p>
    </div>
);

export default function DashboardPage() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    
    // We strictly extract the view parameter to prevent overlapping states
    const currentView = searchParams.get('view') || 'overview';

    if (!user) return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-mono text-xs uppercase">Verifying Authority Matrix...</p>
        </div>
    );

    return (
        <div className="animate-in fade-in duration-500">
            <Suspense fallback={<ForensicSkeleton />}>
                {/* 1. Governance Unit (Admin) Workspace */}
                {user.role === 'admin' && (
                    <AdminDashboard view={currentView} />
                )}

                {/* 2. Investigative Unit Workspace */}
                {user.role === 'investigator' && (
                    <InvestigatorDashboard view={currentView} />
                )}

                {/* 3. Standard User Workspace */}
                {user.role === 'user' && (
                    <UserDashboard view={currentView} />
                )}
            </Suspense>

            {/* 4. Security Exception Handling */}
            {!['admin', 'investigator', 'user'].includes(user.role) && (
                <div className="max-w-md mx-auto mt-20 p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                    <h3 className="text-red-500 font-bold mb-2">Access Denied</h3>
                    <p className="text-slate-400 text-sm">
                        Unknown Authorization Level detected. Your session has been flagged for Governance Review.
                    </p>
                </div>
            )}
        </div>
    );
}