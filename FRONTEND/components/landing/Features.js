
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Server, Database, Lock, Zap, Shield, Globe } from "lucide-react";

const showcaseFeatures = [
    {
        img: "/storyset/Chat bot-bro.svg",
        tag: "AI Core",
        title: "Dual-Engine AI Detection",
        desc: "Our hybrid model combines Isolation Forest for outlier detection with DBSCAN for density clustering. Together they assign every transaction a precise anomaly score and cluster ID - in under 50ms. False positives are minimized so your team only sees real threats.",
        flip: false,
        color: "from-blue-50 to-indigo-50",
    },
    {
        img: "/storyset/Plain credit card-pana.svg",
        tag: "Blockchain",
        title: "Tamper-Proof Transaction Audit",
        desc: "Every flagged transaction is cryptographically hashed (SHA-256) and appended to an immutable blockchain ledger. Auditors get an unbreakable chain of custody. No record can be altered, deleted, or backdated - ever.",
        flip: true,
        color: "from-slate-50 to-blue-50",
    },
    {
        img: "/storyset/Multi-device targeting-bro.svg",
        tag: "Access Control",
        title: "Multi-Role, Multi-Platform",
        desc: "Admins, Investigators, and Users each get a tailored dashboard with granular RBAC permissions. Access from any device. Whether you're reviewing alerts in the office or responding to incidents on the go, the full platform stays in your pocket.",
        flip: false,
        color: "from-indigo-50 to-purple-50",
    },
];

const miniFeatures = [
    { icon: Server, title: "434-Dim Feature Vectors", desc: "Every transaction is encoded into 434 behavioral features before analysis." },
    { icon: Database, title: "Immutable Ledger", desc: "Blockchain-backed records that satisfy the strictest compliance requirements." },
    { icon: Lock, title: "End-to-End Encryption", desc: "All data in transit and at rest is encrypted to banking-grade standards." },
    { icon: Zap, title: "Real-Time Latency", desc: "Sub-50ms pipeline from transaction submission to final verdict." },
    { icon: Shield, title: "SOC 2 Compliant", desc: "Built with security controls aligned to SOC 2 Type II requirements." },
    { icon: Globe, title: "Horizontal Scaling", desc: "The modular Python/Next.js architecture scales to millions of transactions." },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">What We Do</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Enterprise-Grade Protection</h2>
                    <p className="text-slate-500 text-base leading-relaxed">Built for financial institutions that cannot afford a single breach.</p>
                </div>

                
                <div className="space-y-24 mb-24">
                    {showcaseFeatures.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6 }}
                            className={`grid lg:grid-cols-2 gap-14 items-center ${feat.flip ? "lg:[&>*:first-child]:order-2" : ""}`}
                        >
                            
                            <div className={`relative rounded-3xl bg-gradient-to-br ${feat.color} p-8 flex items-center justify-center min-h-[320px]`}>
                                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-200/20 rounded-full blur-2xl" />
                                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-200/20 rounded-full blur-2xl" />
                                </div>
                                <Image
                                    src={feat.img}
                                    alt={feat.title}
                                    width={340}
                                    height={340}
                                    className="relative z-10 drop-shadow-lg"
                                />
                            </div>

                            
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                                    {feat.tag}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-snug">
                                    {feat.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-base">{feat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                
                <div className="text-center mb-14">
                    <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest">Technical Specifications</p>
                    <div className="mt-3 w-12 h-px bg-blue-200 mx-auto" />
                </div>

                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {miniFeatures.map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mb-4 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">
                                <Icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <h4 className="text-base font-bold text-slate-900 mb-2">{title}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
