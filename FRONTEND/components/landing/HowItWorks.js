
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
    {
        step: "01",
        title: "Transaction Initiation",
        desc: "A user submits a transfer. The system instantly captures 434 behavioral and contextual features from the event.",
    },
    {
        step: "02",
        title: "AI Analysis",
        desc: "The hybrid engine (Isolation Forest + DBSCAN) assigns an anomaly score and cluster ID in milliseconds.",
    },
    {
        step: "03",
        title: "Ledger Verification",
        desc: "Flagged transactions are SHA-256 hashed and appended to the immutable blockchain - creating a tamper-proof record.",
    },
    {
        step: "04",
        title: "Investigator Action",
        desc: "Security analysts review high-priority alerts on their dashboard and resolve or escalate incidents in real time.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-slate-950 overflow-hidden relative">
            
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
                <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">How It Works</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Autonomous Response Pipeline</h2>
                    <p className="text-slate-400 text-base leading-relaxed">
                        From transaction submission to blockchain log - fully automated, zero manual bottlenecks.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                        className="space-y-10"
                    >
                        {steps.map((s, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="flex-shrink-0 w-14 flex flex-col items-center">
                                    <span className="text-5xl font-black text-blue-700/40 leading-none group-hover:text-blue-500/60 transition-colors">
                                        {s.step}
                                    </span>
                                    {i < steps.length - 1 && (
                                        <div className="w-px flex-1 bg-slate-800 mt-2" />
                                    )}
                                </div>
                                <div className="pb-6">
                                    <h4 className="text-lg font-bold text-white mb-2">{s.title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
                        </div>
                        <div className="relative bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-md">
                            <Image
                                src="/storyset/QA engineers-rafiki.svg"
                                alt="Security Engineers Monitoring"
                                width={400}
                                height={400}
                                className="drop-shadow-xl"
                            />
                            
                            <div className="flex gap-3 mt-4 justify-center flex-wrap">
                                <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                                    ✓ Transaction Approved
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                                    ✗ Blocked &amp; Logged
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
