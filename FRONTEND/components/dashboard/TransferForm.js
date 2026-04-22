import React, { useState, useEffect } from 'react';
import { CreditCard, ArrowRight, AlertTriangle, User, Info, Shield, Zap } from 'lucide-react';
import { api } from '@/lib/api';

export default function TransferForm({ onSuccess }) {
    const [recipients, setRecipients] = useState([]);
    const [formData, setFormData] = useState({
        amount: '',
        receiver: '',
        simulateAttack: false
    });
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null);
    const [insufficientFunds, setInsufficientFunds] = useState(false);

    useEffect(() => {
        api.getRecipients().then(setRecipients).catch(console.error);
        api.getUserStats().then(setStats).catch(console.error);
    }, []);

    useEffect(() => {
        if (stats && formData.amount) {
            setInsufficientFunds(parseFloat(formData.amount) > stats.balance);
        } else {
            setInsufficientFunds(false);
        }
    }, [formData.amount, stats]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (insufficientFunds) {
            alert("FISCAL LOCKDOWN: Insufficient funds to complete this operation.");
            return;
        }

        setLoading(true);

        const features = {};

        if (formData.simulateAttack) {
            
            features['V1'] = -15.5;
            features['V2'] = 12.0;
            features['V3'] = -10.5;
            features['V4'] = 14.2;
        } else {
            
            features['V1'] = 1.0;
            features['V2'] = 1.0;
            features['V3'] = 1.0;
            features['V4'] = 1.0;
        }

        features['TransactionAmt'] = parseFloat(formData.amount);

        try {
            const res = await api.predictFraud({
                features,
                amount: formData.amount,
                receiver: formData.receiver,
                operational_context: formData.simulateAttack ? "adversarial_stress_test" : "standard_verification"
            });
            onSuccess(res);
        } catch (e) {
            console.error(e);
            alert("Security Protocol Violation or Network Error: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl animate-in zoom-in duration-300">
            <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/20">
                    <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tight italic">Secure Gateway</h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Neural Anomaly Detection: ACTIVE</p>
                </div>
                {stats && (
                    <div className="ml-auto text-right border-l border-slate-800 pl-6">
                        <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Available Funds</p>
                        <p className="text-emerald-400 text-xl font-black italic tracking-tighter">
                            ${stats.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Volume Analysis (USD)</label>
                        {insufficientFunds && (
                            <span className="text-[9px] text-red-500 font-black uppercase animate-pulse flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> Insufficient Funds
                            </span>
                        )}
                    </div>
                    <div className="relative">
                        <span className="absolute left-5 top-4 text-blue-500 font-black text-lg">$</span>
                        <input
                            type="number"
                            className={`w-full bg-slate-950 border ${insufficientFunds ? 'border-red-500/50 focus:ring-red-600' : 'border-slate-700/50 focus:ring-blue-600'} rounded-2xl py-4 pl-10 pr-6 text-3xl font-black text-white outline-none transition-all placeholder:text-slate-800`}
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Counterparty Identification</label>
                    <div className="relative">
                        <User className="absolute left-5 top-4 w-5 h-5 text-slate-600" />
                        <select
                            className="w-full bg-slate-950 border border-slate-700/50 rounded-2xl py-4 pl-14 pr-6 text-slate-200 font-bold focus:ring-2 focus:ring-blue-600 outline-none appearance-none"
                            value={formData.receiver}
                            onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
                            required
                        >
                            <option value="">Awaiting Selection...</option>
                            {recipients.map(u => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </select>
                    </div>
                </div>

                
                <div className={`p-5 rounded-2xl border transition-all duration-500 ${formData.simulateAttack ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-800/30 border-slate-800'}`}>
                    <div className="flex items-start gap-4">
                        <div className={`mt-1 p-1.5 rounded-lg shadow-lg ${formData.simulateAttack ? 'bg-red-500 animate-pulse' : 'bg-slate-700'}`}>
                            {formData.simulateAttack ? <Zap className="w-4 h-4 text-white" /> : <Info className="w-4 h-4 text-slate-400" />}
                        </div>
                        <div className="flex-1">
                            <label className="flex items-center gap-3 text-xs font-black text-slate-200 cursor-pointer mb-2 uppercase tracking-tight">
                                <input
                                    type="checkbox"
                                    checked={formData.simulateAttack}
                                    onChange={(e) => setFormData({ ...formData, simulateAttack: e.target.checked })}
                                    className="w-5 h-5 accent-red-600 rounded-lg border-none"
                                />
                                {formData.simulateAttack ? 'ADVERSARIAL VECTOR INJECTION' : 'System Integrity Mode'}
                            </label>
                            <p className="text-[10px] text-slate-500 leading-relaxed font-medium uppercase">
                                {formData.simulateAttack
                                    ? "STRESS TEST: Injecting 4D-Outliers to validate engine response. Both IF/DBSCAN layers will classify as critical anomalies."
                                    : "AUDIT ALIGNMENT: Sending behavioral vectors centered on historical 'Safe Manifolds'. AI will confirm Cluster Density."}
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    disabled={loading || insufficientFunds}
                    className={`w-full font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl ${loading || insufficientFunds ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40 hover:scale-[1.01] active:scale-[0.99]'}`}
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin" />
                            Analyzing Behavioral Weights...
                        </>
                    ) : (
                        <>{insufficientFunds ? 'FISCAL LOCKDOWN' : 'AUTHORIZE TRANSACTION'} <ArrowRight className="w-6 h-6" /></>
                    )}
                </button>
            </form>
        </div>
    );
}
