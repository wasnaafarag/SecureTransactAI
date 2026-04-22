import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Shield, Search, CreditCard, User, Building, RefreshCw, AlertCircle, Info } from 'lucide-react';
import VirtualCard from './VirtualCard';

export default function AdminCardVault() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchAllCards = async () => {
        setLoading(true);
        try {
            const data = await api.getAdminAllCards();
            setCards(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAllCards(); }, []);

    const filteredCards = cards.filter(card =>
        card.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.card_number.includes(searchTerm)
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-sm font-medium">Loading card vault…</p>
        </div>
    );

    return (
        <div className="space-y-6 pb-10">

            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2.5 mb-1">
                        <Shield className="w-5 h-5 text-purple-400" />
                        Global Card Vault
                    </h2>
                    <p className="text-sm text-slate-400">
                        {cards.length} virtual card{cards.length !== 1 ? 's' : ''} issued across the platform
                    </p>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by owner or card number…"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-purple-500/50 transition-colors"
                    />
                </div>
            </div>

            
            {filteredCards.length === 0 ? (
                <div className="py-24 bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl flex flex-col items-center gap-4 text-slate-500">
                    <CreditCard className="w-10 h-10 opacity-30" />
                    <p className="text-sm font-medium">
                        {searchTerm ? 'No cards match your search' : 'No virtual cards issued yet'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredCards.map((card) => (
                        <div
                            key={card.id || card.card_number}
                            className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex flex-col lg:flex-row gap-6 hover:border-purple-500/40 transition-colors group overflow-hidden"
                        >

                            <div className="shrink-0 flex items-start justify-center lg:justify-start w-full lg:w-auto">
                                <div className="scale-95 origin-top-left transition-transform duration-300 group-hover:scale-100 w-full lg:w-auto">
                                    <VirtualCard
                                        card={card}
                                        onDelete={() => {
                                            if (confirm(`Revoke virtual card ending in ${card.card_number.slice(-4)}?`)) {
                                                api.deleteCard(card.id).then(fetchAllCards);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            
                            <div className="flex-1 flex flex-col justify-between min-w-0">
                                <div className="space-y-3">
                                    
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <span className="text-xs font-mono text-slate-500">
                                            ID: {card.id?.substring(0, 12) || 'N/A'}
                                        </span>
                                        <span className="px-2.5 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-lg text-xs font-semibold">
                                            Admin View
                                        </span>
                                    </div>

                                    
                                    <div className="flex items-center gap-3 p-3.5 bg-slate-900/60 border border-slate-700/60 rounded-xl">
                                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 shrink-0">
                                            <User className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-slate-400 mb-0.5">Card Owner</p>
                                            <p className="text-sm font-semibold text-white truncate">{card.owner}</p>
                                        </div>
                                    </div>

                                    
                                    <div className="flex items-center gap-3 p-3.5 bg-slate-900/60 border border-slate-700/60 rounded-xl">
                                        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 shrink-0">
                                            <Building className="w-4 h-4 text-emerald-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-slate-400 mb-0.5">Organisation</p>
                                            <p className="text-sm font-semibold text-white truncate font-mono">{card.company_id}</p>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="mt-4 flex items-start gap-2 pt-4 border-t border-slate-700/50">
                                    <Info className="w-3.5 h-3.5 text-slate-600 mt-0.5 shrink-0" />
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Revoking this card triggers an immediate audit log entry and cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
