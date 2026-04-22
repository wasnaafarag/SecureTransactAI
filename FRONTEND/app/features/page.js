"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Database, Activity, Lock, Globe, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const showcaseFeatures = [
    {
        img: "/storyset/SEO-pana.svg",
        tag: "AI Core",
        title: "Real-Time Anomaly Detection",
        desc: "Process thousands of transactions per second with sub-50ms latency. Our hybrid engine (Isolation Forest + DBSCAN) assigns every event an anomaly score and cluster ID - flagging suspicious patterns before they settle.",
        bullets: ["Sub-50ms decision pipeline", "434-dimensional feature encoding", "Hybrid scoring with confidence intervals"],
        flip: false,
        bg: "from-blue-50 to-indigo-50",
    },
    {
        img: "/employer/Data extraction-pana.svg",
        tag: "Blockchain",
        title: "Immutable Audit Ledger",
        desc: "Every flagged transaction is SHA-256 hashed and appended to a cryptographically linked blockchain. Auditors get an unbreakable chain of custody that satisfies the strictest compliance requirements - nothing can be backdated or deleted.",
        bullets: ["SHA-256 cryptographic hashing", "Tamper-proof record chain", "Full compliance audit trail"],
        flip: true,
        bg: "from-slate-50 to-blue-50",
    },
    {
        img: "/employer/Live collaboration-rafiki.svg",
        tag: "Dashboard",
        title: "Investigator Command Center",
        desc: "Security analysts get deep-dive forensic tools, live alert queues, and case management - all in one dashboard. Visualize attack vectors, replay transaction flows, and resolve incidents in real time with your team.",
        bullets: ["Live alert queue with priority triage", "Case assignment & resolution tracking", "Collaborative investigation workflows"],
        flip: false,
        bg: "from-indigo-50 to-purple-50",
    },
    {
        img: "/employer/tech company-pana.svg",
        tag: "Enterprise",
        title: "Banking-Grade Security",
        desc: "Built from the ground up for financial institutions. TLS 1.3 in transit, AES-256 at rest, Role-Based Access Control, and architecture aligned to SOC 2 Type II requirements. Your data never leaves your compliance boundary.",
        bullets: ["TLS 1.3 + AES-256 encryption", "Granular RBAC permissions", "SOC 2 Type II aligned"],
        flip: true,
        bg: "from-slate-50 to-indigo-50",
    },
];

const capabilityCards = [
    { icon: Zap,        title: "50ms Latency",        desc: "From transaction submission to final verdict." },
    { icon: Activity,   title: "Hybrid AI Engine",    desc: "Isolation Forest + DBSCAN working in parallel." },
    { icon: Database,   title: "Immutable Ledger",    desc: "Blockchain-backed records that satisfy auditors." },
    { icon: ShieldCheck,title: "Investigator Tools",  desc: "Forensic dashboards, case queues, and replay." },
    { icon: Lock,       title: "E2E Encryption",      desc: "All data encrypted at rest and in transit." },
    { icon: Globe,      title: "Horizontal Scale",    desc: "Handle millions of transactions globally." },
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-80px] left-[-80px] w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-6">
                                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                Platform Capabilities
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
                                Every tool you need to{" "}
                                <span className="text-blue-400">stop fraud cold</span>
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                                From AI detection to blockchain logging to investigator dashboards - our platform covers the entire fraud response lifecycle in a single, integrated system.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/login" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2 group">
                                    Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/contact" className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold rounded-xl transition-all">
                                    Talk to Sales
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="relative flex justify-center"
                        >
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                            </div>
                            <Image
                                src="/employer/Dashboard-pana.svg"
                                alt="Dashboard Illustration"
                                width={460}
                                height={460}
                                className="relative z-10 drop-shadow-2xl"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 space-y-28">
                    {showcaseFeatures.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6 }}
                            className={`grid lg:grid-cols-2 gap-14 items-center ${feat.flip ? "lg:[&>*:first-child]:order-2" : ""}`}
                        >
                            
                            <div className={`relative rounded-3xl bg-gradient-to-br ${feat.bg} p-8 flex items-center justify-center min-h-[320px] overflow-hidden`}>
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl pointer-events-none" />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200/20 rounded-full blur-2xl pointer-events-none" />
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
                                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-snug">
                                    {feat.title}
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-base mb-6">{feat.desc}</p>
                                <ul className="space-y-2.5">
                                    {feat.bullets.map((b) => (
                                        <li key={b} className="flex items-center gap-2.5 text-slate-700 text-sm font-medium">
                                            <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            
            <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Technical Specs</p>
                        <h2 className="text-3xl font-extrabold text-slate-900">Under the Hood</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {capabilityCards.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="group p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="py-16 bg-blue-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Ready to see it in action?</h2>
                    <p className="text-blue-100 mb-8 text-base max-w-xl mx-auto">
                        Get a live demo tailored to your institution&apos;s transaction volume and risk profile.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/signup" className="px-7 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2 group">
                            Start Free Trial <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/contact" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all flex items-center justify-center">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
