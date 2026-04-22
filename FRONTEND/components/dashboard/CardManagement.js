
import React, { useState, useEffect } from 'react';
import { Plus, CreditCard, ShieldCheck, Loader2, Sparkles, AlertCircle, Zap } from 'lucide-react';
import { api } from '@/lib/api';
import VirtualCard from './VirtualCard';

export default function CardManagement() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState(null);

    const fetchCards = async () => {
        try {
            const data = await api.getCards();
            setCards(data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to synchronize virtual vault.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleCreate = async () => {
        setCreating(true);
        setError(null);
        try {
            const newCard = await api.createCard();
            setCards([newCard, ...cards]);
        } catch (err) {
            setError("Security Protocol: Card issuance denied.");
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (cardId) => {
        try {
            await api.deleteCard(cardId);
            setCards(cards.filter(c => c.id !== cardId));
        } catch (err) {
            alert("Protocol Violation: Could not shred card data.");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-6 text-slate-500 animate-pulse">
                <div className="relative">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                    <Zap className="w-4 h-4 text-blue-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] italic text-slate-400">Synchronizing Virtual Vault...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-800 pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-500/20">
                            <CreditCard className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-100 uppercase tracking-tight italic">
                            Digital Asset Vault
                        </h3>
                    </div>
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Neural Layer-4 Encryption Enabled
                    </p>
                </div>
                
                <button 
                    onClick={handleCreate}
                    disabled={creating || cards.length >= 3}
                    className={`group flex items-center gap-3 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all border shadow-2xl active:scale-95 ${
                        cards.length >= 3 
                        ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-50' 
                        : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400/20 shadow-blue-900/40 hover:scale-[1.02]'
                    }`}
                >
                    {creating ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Forging Manifold...
                        </>
                    ) : (
                        <>
                            <Plus className={`w-5 h-5 transition-transform ${cards.length < 3 && 'group-hover:rotate-90'}`} />
                            {cards.length >= 3 ? 'Vault Capacity Reached' : 'Issue Virtual Asset'}
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500 text-[11px] font-black uppercase tracking-widest animate-in shake duration-500">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {cards.length === 0 ? (
                <div className="bg-slate-950/50 border border-slate-800 border-dashed rounded-[2.5rem] p-24 text-center group hover:border-slate-700 transition-colors">
                    <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/5 shadow-2xl group-hover:scale-110 transition-transform">
                        <Sparkles className="w-10 h-10 text-slate-600 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <h4 className="text-white font-black uppercase tracking-[0.2em] italic mb-3 text-lg">Empty Secure Manifold</h4>
                    <p className="text-slate-500 text-xs font-bold uppercase max-w-sm mx-auto leading-relaxed tracking-widest opacity-60">
                        No virtual payment vectors detected. Issue a temporary asset to anonymize your footprint during adversarial simulations.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                    {cards.map(card => (
                        <VirtualCard 
                            key={card.id} 
                            card={card} 
                            onDelete={handleDelete} 
                        />
                    ))}
                </div>
            )}

            <div className="p-8 bg-blue-600/5 border border-blue-500/10 rounded-[2rem] flex items-start gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                    <ShieldCheck className="w-24 h-24 text-blue-500" />
                </div>
                <div className="bg-blue-600/10 p-4 rounded-2xl">
                    <ShieldCheck className="w-6 h-6 text-blue-500" />
                </div>
                <div className="space-y-2 relative z-10">
                    <p className="text-xs text-slate-200 font-black uppercase tracking-[0.2em]">High-Security Virtual Protocol</p>
                    <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest opacity-80 max-w-2xl">
                        Temporary assets are bound to your neural SOC ID and isolated from primary liquidity manifolds. 
                        Deletion triggers a cryptographic wipe from the distributed ledger. All sessions are logged by the Compliance Engine.
                    </p>
                </div>
            </div>
        </div>
    );
}
