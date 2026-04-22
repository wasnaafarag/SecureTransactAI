
import React, { useState, useRef } from 'react';
import { CreditCard, Shield, Copy, Check, Trash2, Eye, EyeOff, Radio } from 'lucide-react';

export default function VirtualCard({ card, onDelete }) {
    const [copied, setCopied] = useState(false);
    const [showCVV, setShowCVV] = useState(false);
    const cardRef = useRef(null);
    const [style, setStyle] = useState({});

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            transition: 'none'
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'all 0.5s ease'
        });
    };

    const isVisa = card.card_type === 'Visa';
    const cardGradient = isVisa 
        ? 'from-blue-600/90 via-blue-800/90 to-blue-900/95' 
        : 'from-orange-600/90 via-red-600/90 to-rose-900/95';

    return (
        <div className="relative group w-full max-w-95">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={style}
                className={`w-full h-56 bg-gradient-to-br ${cardGradient} backdrop-blur-2xl border border-white/20 rounded-[2rem] p-6 shadow-2xl transition-all duration-500 overflow-hidden relative cursor-pointer`}
            >
                
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/20 rounded-full blur-3xl" />

                <div className="flex justify-between items-start relative z-10 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-10 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 rounded-xl shadow-inner flex items-center justify-center border border-white/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                            <div className="grid grid-cols-2 gap-px w-8 h-6 opacity-40">
                                <div className="border border-black/20" />
                                <div className="border border-black/20" />
                                <div className="border border-black/20" />
                                <div className="border border-black/20" />
                            </div>
                        </div>
                        <Radio className="w-6 h-6 text-white/40 rotate-90" />
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-1">
                            <Shield className="w-4 h-4 text-white/60" />
                            <p className="text-white font-black italic text-2xl tracking-tighter uppercase">
                                {card.card_type}
                            </p>
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Virtual Vault</p>
                    </div>
                </div>

                <div className="space-y-5 relative z-10">
                    <div className="flex items-center justify-between group/num">
                        <div className="flex gap-2.5">
                            {card.card_number.split(' ').map((chunk, i) => (
                                <span key={i} className="text-lg font-mono font-bold tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                                    {chunk}
                                </span>
                            ))}
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleCopy(card.card_number.replace(/\s/g, '')); }}
                            className="opacity-0 group-hover/num:opacity-100 p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-white/70" />}
                        </button>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="space-y-1 min-w-0 mr-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Authorized Holder</p>
                            <p className="text-sm font-black text-white uppercase tracking-wider subpixel-antialiased truncate">
                                {card.card_holder}
                            </p>
                        </div>
                        <div className="flex gap-6 shrink-0">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 text-center">Valid Thru</p>
                                <p className="text-sm font-mono font-bold text-white text-center">{card.expiry_date}</p>
                            </div>
                            <div className="space-y-1 text-right min-w-[60px]">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">CVV</p>
                                <div className="flex items-center gap-2 justify-end">
                                    <p className="text-sm font-mono font-bold text-white">
                                        {showCVV ? card.cvv : '•••'}
                                    </p>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setShowCVV(!showCVV); }}
                                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                                    >
                                        {showCVV ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -rotate-12" />
                <div className="absolute top-1/3 left-0 w-full h-px bg-white/5 rotate-12" />
            </div>

            
            <button 
                onClick={() => onDelete(card.id)}
                className="absolute -top-4 -right-4 p-3 bg-slate-900 text-red-500 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 z-20 border border-slate-800 hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
                <Trash2 className="w-5 h-5" />
            </button>

            <style jsx>{`
                @keyframes shimmer {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(200%); }
                }
            `}</style>
        </div>
    );
}
