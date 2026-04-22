"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Eye, FileCheck, Server, Shield, CheckCircle, ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const securityCards = [
    { icon: Lock,        title: "End-to-End Encryption",     desc: "All data in transit is protected with TLS 1.3 and 256-bit keys. Data at rest is encrypted with AES-256.", color: "blue" },
    { icon: Eye,         title: "Role-Based Access Control",  desc: "Granular RBAC policies ensure every user sees only the data segments required for their specific role.", color: "indigo" },
    { icon: FileCheck,   title: "Immutable Audit Logs",       desc: "Every system action is hashed and appended to our private blockchain ledger - a tamper-proof history of all operations.", color: "purple" },
    { icon: Server,      title: "Zero-Trust Architecture",    desc: "No entity inside or outside the network is trusted by default. Every request is fully authenticated and authorized.", color: "blue" },
    { icon: Shield,      title: "Real-Time Threat Intel",     desc: "Our models are continuously updated with the latest fraud patterns and threat signatures from global feeds.", color: "indigo" },
    { icon: CheckCircle, title: "Compliance Ready",           desc: "Built to meet GDPR, PCI-DSS, and SOC 2 Type II requirements right out of the box.", color: "purple" },
];

const colorMap = {
    blue:   "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
    indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
};

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            
            <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-6">
                                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                Defense in Depth
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
                                Security isn&apos;t a feature -{" "}
                                <span className="text-blue-400">it&apos;s the foundation</span>
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                                We employ a multi-layer defense strategy to protect financial data at every tier - from the API gateway to the blockchain ledger.
                            </p>
                            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/25 group">
                                Request Security Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative flex justify-center">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                            </div>
                            <Image src="/security/Security-pana.svg" alt="Security Illustration" width={460} height={460} className="relative z-10 drop-shadow-2xl" priority />
                        </motion.div>
                    </div>
                </div>
            </section>

            
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Our Security Stack</p>
                        <h2 className="text-3xl font-extrabold text-slate-900">Protection at every layer</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {securityCards.map(({ icon: Icon, title, desc, color }) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5 }}
                                className="group p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${colorMap[color]} group-hover:text-white`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 p-10 flex items-center justify-center overflow-hidden"
                        >
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
                            <Image src="/security/Hacker-cuate.svg" alt="Threat Detection" width={340} height={340} className="relative z-10 drop-shadow-xl" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">Threat Mitigation</span>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-snug">We stop threats others miss</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                Modern financial fraud doesn&apos;t announce itself. Our AI models continuously learn the behavioral baseline of legitimate users - making any deviation immediately detectable, no matter how subtle.
                            </p>
                            <ul className="space-y-3">
                                {["Account takeover attempts", "Synthetic identity fraud", "Coordinated bot attacks", "Insider transaction abuse"].map((t) => (
                                    <li key={t} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                                        <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                        </span>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            
            <section className="py-14 bg-blue-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-extrabold text-white mb-4">Ready for an enterprise security review?</h2>
                    <p className="text-blue-100 mb-6 text-sm max-w-md mx-auto">Our team will walk through your current infrastructure and show you exactly where we fit.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg group">
                        Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
