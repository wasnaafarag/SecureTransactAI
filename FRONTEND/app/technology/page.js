"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, Link as LinkIcon, Layers, Code2, ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const techStack = [
    { name: "Python 3.11",   role: "AI/ML Engine",            color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    { name: "FastAPI",        role: "Async REST Backend",       color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { name: "scikit-learn",   role: "Isolation Forest, DBSCAN", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { name: "MongoDB",        role: "Document Store",           color: "bg-green-50 text-green-700 border-green-200" },
    { name: "Next.js 15",     role: "React Frontend",          color: "bg-slate-100 text-slate-700 border-slate-200" },
    { name: "Tailwind CSS",   role: "UI Styling",              color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
    { name: "Framer Motion",  role: "Animations",              color: "bg-pink-50 text-pink-700 border-pink-200" },
    { name: "SHA-256",        role: "Blockchain Hashing",      color: "bg-orange-50 text-orange-700 border-orange-200" },
];

export default function TechnologyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-6">
                                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                Under the Hood
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
                                Built on{" "}
                                <span className="text-blue-400">battle-tested</span>{" "}
                                technology
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                                We move beyond rule-based detection. Every component of our stack was chosen for speed, accuracy, and auditability.
                            </p>
                            <Link href="/features" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/25 group">
                                See Features <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative flex justify-center">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                            </div>
                            <Image src="/storyset/Innovation-amico.svg" alt="Technology Illustration" width={460} height={460} className="relative z-10 drop-shadow-2xl" priority />
                        </motion.div>
                    </div>
                </div>
            </section>

            
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-14 items-start">
                        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                    <Cpu className="w-6 h-6 text-blue-600" />
                                </div>
                                <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Core AI Models</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">Unsupervised anomaly detection</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                We don&apos;t rely on labeled fraud data - our models learn what &quot;normal&quot; looks like and flag everything else. This makes us effective against novel attack vectors no human has seen before.
                            </p>
                            <div className="space-y-3">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                        <span className="font-bold text-slate-800 text-sm">Isolation Forest</span>
                                    </div>
                                    <p className="text-slate-500 text-sm ml-5">Isolates anomalies by recursively splitting the feature space. Points isolated in fewer splits are flagged as outliers.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                                        <span className="font-bold text-slate-800 text-sm">DBSCAN</span>
                                    </div>
                                    <p className="text-slate-500 text-sm ml-5">Density-based spatial clustering finds local outlier groups that Isolation Forest can miss - e.g. coordinated fraud rings with low individual scores.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                                    <LinkIcon className="w-6 h-6 text-purple-600" />
                                </div>
                                <span className="text-purple-600 font-bold text-sm uppercase tracking-wider">Blockchain Architecture</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">Permissioned ledger for audit trails</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Every verdict is SHA-256 hashed and appended to a cryptographically linked chain. No record can be altered, deleted, or backdated - ever.
                            </p>
                            <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl font-mono text-sm overflow-x-auto border border-slate-800">
                                <p className="mb-1 text-slate-500"># Block structure</p>
                                <p className="mb-1"><span className="text-purple-400">class</span> <span className="text-yellow-300">Block</span>:</p>
                                <p className="pl-4 text-slate-400">previous_hash: <span className="text-green-400">&quot;0000a7f2...&quot;</span></p>
                                <p className="pl-4 text-slate-400">timestamp:     <span className="text-blue-400">1740982891</span></p>
                                <p className="pl-4 text-slate-400">data: <span className="text-orange-300">&#123;</span></p>
                                <p className="pl-8 text-slate-400">tx_id:   <span className="text-green-400">&quot;TX_98234&quot;</span>,</p>
                                <p className="pl-8 text-slate-400">verdict: <span className="text-red-400">&quot;Fraud&quot;</span>,</p>
                                <p className="pl-8 text-slate-400">score:   <span className="text-blue-400">0.934</span></p>
                                <p className="pl-4 text-slate-400"><span className="text-orange-300">&#125;</span></p>
                                <p className="pl-4 text-slate-400">hash: <span className="text-green-400">&quot;8f4b2cde...&quot;</span></p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            
            <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Tech Stack</p>
                        <h2 className="text-3xl font-extrabold text-slate-900">Tools we rely on</h2>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
                        {techStack.map(({ name, role, color }) => (
                            <div key={name} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold ${color}`}>
                                <span>{name}</span>
                                <span className="text-xs opacity-60 font-normal hidden sm:inline">- {role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="py-16 bg-white border-t border-slate-100">
                <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="p-8 border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all">
                        <Layers className="w-8 h-8 text-emerald-600 mb-4" />
                        <h3 className="font-extrabold text-xl text-slate-900 mb-3">Backend Services</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">Python FastAPI for high-performance async processing, combined with MongoDB for flexible document storage and a custom blockchain module written in pure Python.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="p-8 border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all">
                        <Code2 className="w-8 h-8 text-pink-600 mb-4" />
                        <h3 className="font-extrabold text-xl text-slate-900 mb-3">Frontend Experience</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">Next.js 15 App Router with Tailwind CSS for rapid UI development and Framer Motion for fluid, production-grade animations across all dashboards.</p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
