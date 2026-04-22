"use client";
import React, { useState, useEffect } from 'react';
import AdminOverview from './AdminOverview';
import InvestigatorDashboard from './InvestigatorDashboard';
import LedgerView from './LedgerView';
import UserManagement from './UserManagement';
import ActivityMonitor from './ActivityMonitor';
import ModelPlayground from './ModelPlayground';
import InboxView from './InboxView';
import OnboardingTour from './OnboardingTour';
import AdminCardVault from './AdminCardVault';
import ExecutiveMatrix from './ExecutiveMatrix';

export default function AdminDashboard({ view }) {
    const [showTour, setShowTour] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    const activeView = view || 'overview';

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUserProfile(data);
                
                // FIXED: Removed the role check so standard users also get the introduction
                if (data.is_first_login) {
                    setShowTour(true);
                }
            }
        } catch (err) {
            console.error("Authority verification failed", err);
        }
    };

    const completeOnboarding = async () => {
        try {
            const token = localStorage.getItem('token');
            await fetch('http://localhost:8000/auth/onboarding/complete', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setShowTour(false);
        } catch (err) {
            console.error("Onboarding sync failure", err);
            setShowTour(false);
        }
    };

    const renderContent = () => {
        if (activeView === 'executive') {
            return <ExecutiveMatrix />;
        }
        
        if (activeView === 'overview') {
            return <AdminOverview />;
        }

        switch (activeView) {
            case 'investigations': 
                return <InvestigatorDashboard view="investigations" />;
            case 'ledger': 
                return <LedgerView />;
            case 'vault': 
                return <AdminCardVault />;
            case 'access': 
                return <UserManagement />;
            case 'activity': 
                return <ActivityMonitor />;
            case 'lab': 
                return <ModelPlayground />;
            case 'inbox': 
                return <InboxView />;
            default: 
                return <AdminOverview />;
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {showTour && <OnboardingTour onComplete={completeOnboarding} />}
            
            <div className="relative">
                {renderContent()}
            </div>
        </div>
    );
}