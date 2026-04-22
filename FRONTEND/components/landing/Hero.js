
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, ShieldCheck, Activity, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-white">
            
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_60%,transparent_100%)] pointer-events-none opacity-30" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            AI-Powered Fraud Detection
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                            Stop Fraud{" "}
                            <span className="text-blue-600">Before</span>{" "}
                            It Happens
                        </h1>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                            Our hybrid Isolation Forest &amp; DBSCAN engine detects every anomaly in milliseconds - backed by an immutable blockchain ledger your auditors will love.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Link
                                href="/login"
                                className="px-7 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 group"
                            >
                                Get Started Free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/features"
                                className="px-7 py-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                            >
                                Explore Features
                            </Link>
                        </div>

                        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> No Credit Card</span>
                            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> 14-Day Free Audit</span>
                            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> SOC 2 Ready</span>
                        </div>
                    </motion.div>

                    
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="relative flex justify-center"
                    >
                        
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30" />
                        </div>

                        <Image
                            src="/storyset/Innovation-amico.svg"
                            alt="AI Innovation Illustration"
                            width={520}
                            height={520}
                            className="relative z-10 drop-shadow-xl"
                            priority
                        />

                        
                        <div className="absolute bottom-6 -left-4 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3 z-20">
                            <div className="p-2 bg-emerald-100 rounded-xl">
                                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Detection Rate</p>
                                <p className="text-sm font-extrabold text-slate-900">99.7% Accuracy</p>
                            </div>
                        </div>

                        
                        <div className="absolute top-8 -right-4 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3 z-20">
                            <div className="p-2 bg-blue-100 rounded-xl">
                                <Activity className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Response Time</p>
                                <p className="text-sm font-extrabold text-slate-900">&lt; 50ms</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 pt-10 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {[
                        { value: "2.4M+", label: "Transactions Analyzed" },
                        { value: "99.7%", label: "Detection Accuracy" },
                        { value: "<50ms", label: "Avg. Response Time" },
                        { value: "SHA-256", label: "Blockchain Hashing" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl font-extrabold text-blue-600 mb-1">{stat.value}</p>
                            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
