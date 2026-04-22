"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Database, Eye, Lock, UserCheck, RefreshCw, Mail, ChevronRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const sections = [
    { id: "collection",  icon: Database,   color: "bg-blue-50 text-blue-600",    title: "1. Data We Collect",
      content: [
        { heading: "Transaction Metadata", text: "We collect transaction identifiers, timestamps, amounts, currency codes, and counterparty references submitted through the platform API. Raw financial account credentials are never stored." },
        { heading: "Behavioural Signals", text: "We record anonymised usage patterns — session duration, feature interactions, and device fingerprints — to improve anomaly baselines and detect account-level fraud." },
        { heading: "Account Information", text: "When you register, we store your username, hashed password (bcrypt), email address, role assignment, and company identifier. Passwords are never stored in plain text." },
      ]
    },
    { id: "ai",          icon: Eye,        color: "bg-indigo-50 text-indigo-600", title: "2. How We Process Data",
      content: [
        { heading: "On-Premise AI Models", text: "All transaction data is processed locally by our Isolation Forest and DBSCAN models. No raw transaction data leaves your deployment environment for model inference." },
        { heading: "Blockchain Audit Trail", text: "Fraud verdicts are SHA-256 hashed and appended to an append-only cryptographic ledger stored within your organisation's database. This record cannot be altered or deleted." },
        { heading: "No Third-Party AI", text: "We do not forward your transaction data to external AI providers, cloud inference APIs, or ad-tech systems. Your data is used exclusively for fraud detection within the platform." },
      ]
    },
    { id: "storage",     icon: Lock,       color: "bg-purple-50 text-purple-600", title: "3. Data Storage & Security",
      content: [
        { heading: "Encryption at Rest", text: "All database records are stored in MongoDB with field-level encryption for sensitive fields. Blockchain hashes are stored alongside standard records for tamper detection." },
        { heading: "Encryption in Transit", text: "All API communication is secured over TLS 1.2+. JWT tokens are signed with HS256 and expire after a configurable window (default 24 hours)." },
        { heading: "Access Controls", text: "Data access is gated by role (User, Investigator, Admin, Super Admin). Each role has a strictly defined permission boundary enforced at the API layer via FastAPI dependencies." },
      ]
    },
    { id: "retention",   icon: RefreshCw,  color: "bg-emerald-50 text-emerald-600", title: "4. Data Retention",
      content: [
        { heading: "Transaction Records", text: "Transaction records and blockchain entries are retained indefinitely by default to maintain an unbroken audit chain. Your organisation's administrator may request deletion subject to applicable law." },
        { heading: "Activity Logs", text: "System activity logs (logins, status changes, escalations) are retained for 12 months for forensic and compliance purposes." },
        { heading: "Account Data", text: "Account data is removed within 30 days of a deletion request, except where retention is required by financial regulation or ongoing investigation." },
      ]
    },
    { id: "rights",      icon: UserCheck,  color: "bg-orange-50 text-orange-600",  title: "5. Your Rights",
      content: [
        { heading: "Access & Portability", text: "You may request a machine-readable export of all personal data held about your account at any time by contacting your organisation's administrator or emailing us directly." },
        { heading: "Correction", text: "If you believe any stored personal information is inaccurate, contact us and we will correct it within 14 business days after verification." },
        { heading: "Deletion", text: "You may request deletion of your personal data. Requests are fulfilled within 30 days subject to legal retention obligations. Anonymised analytics and blockchain verdicts may be retained." },
      ]
    },
    { id: "contact",     icon: Mail,       color: "bg-pink-50 text-pink-600",      title: "6. Contact & Updates",
      content: [
        { heading: "Privacy Inquiries", text: "For all privacy-related requests, email privacy@SecureTransact.com. We respond within 5 business days." },
        { heading: "Policy Updates", text: "We may update this policy when the platform evolves. Material changes will be communicated via the platform notification system at least 14 days before taking effect." },
        { heading: "Governing Law", text: "This policy is governed by the laws of the Arab Republic of Egypt. Disputes are subject to the exclusive jurisdiction of Egyptian courts." },
      ]
    },
];

export default function PrivacyPolicyPage() {
    const [active, setActive] = useState("collection");

    return (
        <div className="min-h-screen bg-white">
            <Header />

            
            <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
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
                                Legal
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
                                Privacy <span className="text-blue-400">Policy</span>
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed mb-6 max-w-lg">
                                We are committed to protecting your financial data. This policy explains exactly what we collect, how we process it, and the rights you hold.
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span className="text-slate-400 text-sm">Effective Date: <span className="text-white font-semibold">February 6, 2026</span></span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="flex justify-center"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                                </div>
                                <Image
                                    src="/privacy/Privacy policy-amico.svg"
                                    alt="Privacy Policy Illustration"
                                    width={420}
                                    height={420}
                                    className="relative z-10 drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-[260px_1fr] gap-10 items-start">

                        
                        <div className="hidden lg:block sticky top-28">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contents</p>
                            <nav className="space-y-1">
                                {sections.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => {
                                            setActive(s.id);
                                            document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                                        }}
                                        className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                            active === s.id
                                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                                                : "text-slate-600 hover:bg-slate-200"
                                        }`}
                                    >
                                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${active === s.id ? "translate-x-0.5" : ""}`} />
                                        {s.title}
                                    </button>
                                ))}
                            </nav>

                            
                            <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 overflow-hidden">
                                <Image
                                    src="/privacy/Privacy policy-bro.svg"
                                    alt="Privacy"
                                    width={220}
                                    height={200}
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>

                        
                        <div className="space-y-8">
                            {sections.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <motion.div
                                        key={s.id}
                                        id={s.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-60px" }}
                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                        onViewportEnter={() => setActive(s.id)}
                                        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                                    >
                                        
                                        <div className="flex items-center gap-4 px-8 py-6 border-b border-slate-100">
                                            <div className={`p-2.5 rounded-xl ${s.color} shrink-0`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <h2 className="text-lg font-extrabold text-slate-900">{s.title}</h2>
                                        </div>

                                        
                                        <div className="divide-y divide-slate-50">
                                            {s.content.map((item) => (
                                                <div key={item.heading} className="px-8 py-5">
                                                    <p className="text-sm font-bold text-slate-800 mb-1.5">{item.heading}</p>
                                                    <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })}

                            
                            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-8 py-6 text-sm text-blue-700 leading-relaxed">
                                <strong>Questions?</strong> If you have any questions about this Privacy Policy, contact us at{" "}
                                <a href="mailto:privacy@SecureTransact.com" className="font-bold underline underline-offset-2">
                                    privacy@SecureTransact.com
                                </a>{" "}
                                or visit our{" "}
                                <Link href="/contact" className="font-bold underline underline-offset-2">
                                    Contact page
                                </Link>
                                .
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
