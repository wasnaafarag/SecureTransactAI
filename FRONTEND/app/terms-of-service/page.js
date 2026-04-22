"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ShieldCheck, AlertTriangle, Ban, Scale, RefreshCw, ChevronRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const sections = [
    { id: "acceptance",  icon: FileText,      color: "bg-blue-50 text-blue-600",     title: "1. Acceptance of Terms",
      content: [
        { heading: "Agreement", text: "By accessing or using SecureTransact AI (the \"Platform\"), you confirm that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, do not use the Platform." },
        { heading: "Authority", text: "If you accept these terms on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these terms." },
        { heading: "Age Requirement", text: "You must be at least 18 years old and legally permitted to enter into binding contracts to use the Platform." },
      ]
    },
    { id: "license",     icon: ShieldCheck,   color: "bg-indigo-50 text-indigo-600", title: "2. Usage License",
      content: [
        { heading: "Grant of License", text: "SecureTransact AI grants your organisation a limited, non-exclusive, non-transferable, revocable licence to access and use the Platform solely for your internal fraud monitoring and anomaly detection purposes." },
        { heading: "Restrictions", text: "You may not sublicense, resell, reverse-engineer, decompile, or create derivative works based on the Platform. You may not use the Platform to build a competing product or service." },
        { heading: "API Access", text: "API keys and JWT tokens issued to your organisation are confidential. You are responsible for all activity that occurs under your credentials. Report suspected compromise immediately to support@SecureTransact.com." },
      ]
    },
    { id: "conduct",     icon: Ban,           color: "bg-red-50 text-red-600",       title: "3. Prohibited Conduct",
      content: [
        { heading: "Misuse of the Platform", text: "You must not use the Platform to process transactions or data you are not authorised to analyse, or attempt to manipulate the AI models to suppress or generate false fraud alerts." },
        { heading: "Interference", text: "You must not interfere with, disrupt, or attempt to gain unauthorised access to the Platform's infrastructure, blockchain ledger, or other users' data." },
        { heading: "Tampering with Blockchain", text: "Any attempt to alter, forge, or invalidate blockchain audit records constitutes a serious breach. This activity is logged, cryptographically detectable, and may be reported to relevant authorities." },
      ]
    },
    { id: "liability",   icon: AlertTriangle,  color: "bg-amber-50 text-amber-600",  title: "4. Disclaimer & Liability",
      content: [
        { heading: "AI as an Assistive Tool", text: "The Platform's fraud detection models (Isolation Forest, DBSCAN) are assistive tools, not guarantees. SecureTransact AI is not liable for false positives, missed anomalies, or financial losses resulting from AI verdicts." },
        { heading: "Limitation of Liability", text: "To the maximum extent permitted by law, SecureTransact AI's aggregate liability for any claims arising under these terms shall not exceed the fees paid by your organisation in the 12 months preceding the claim." },
        { heading: "No Warranty", text: "The Platform is provided \"as is\" without warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, or uninterrupted availability." },
      ]
    },
    { id: "ip",          icon: Scale,          color: "bg-purple-50 text-purple-600", title: "5. Intellectual Property",
      content: [
        { heading: "Platform Ownership", text: "All rights, title, and interest in the Platform — including software, models, UI designs, and documentation — are owned by SecureTransact AI and protected by applicable intellectual property laws." },
        { heading: "Your Data", text: "You retain ownership of all transaction data and content you submit to the Platform. By using the Platform, you grant us a limited licence to process your data solely to provide the fraud detection service." },
        { heading: "Feedback", text: "Any feedback, suggestions, or improvement ideas you provide may be used by SecureTransact AI without restriction or compensation." },
      ]
    },
    { id: "termination", icon: RefreshCw,      color: "bg-emerald-50 text-emerald-600", title: "6. Termination & Changes",
      content: [
        { heading: "Termination by Us", text: "We may suspend or terminate your access immediately if you breach these terms, if required by law, or if we discontinue the Platform. Upon termination, your licence to use the Platform ceases immediately." },
        { heading: "Termination by You", text: "You may stop using the Platform at any time. Contact support@SecureTransact.com to request account deletion. Blockchain audit records may be retained per applicable financial regulations." },
        { heading: "Modifications to Terms", text: "We may update these Terms of Service to reflect changes in the Platform or applicable law. Material changes will be notified at least 14 days in advance. Continued use constitutes acceptance of updated terms." },
      ]
    },
];

export default function TermsOfServicePage() {
    const [active, setActive] = useState("acceptance");

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
                                Terms of <span className="text-blue-400">Service</span>
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed mb-6 max-w-lg">
                                Please read these terms carefully before using the SecureTransact AI platform. They govern your access, usage rights, and responsibilities.
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span className="text-slate-400 text-sm">Last Updated: <span className="text-white font-semibold">February 6, 2026</span></span>
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
                                    src="/security/Security-pana.svg"
                                    alt="Terms of Service Illustration"
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

                            
                            <div className="mt-8 bg-blue-600 text-white rounded-2xl p-5 text-center">
                                <ShieldCheck className="w-8 h-8 mx-auto mb-3 opacity-90" />
                                <p className="text-sm font-bold mb-1">Need clarification?</p>
                                <p className="text-xs opacity-75 mb-4">Our legal team is happy to answer questions about how these terms apply to your organisation.</p>
                                <Link
                                    href="/contact"
                                    className="block w-full bg-white text-blue-600 font-bold text-sm py-2 rounded-xl hover:bg-blue-50 transition-colors"
                                >
                                    Contact Us
                                </Link>
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
                                <strong>Governing Law:</strong> These terms are governed by the laws of the Arab Republic of Egypt. By using the Platform you submit to the exclusive jurisdiction of Egyptian courts. For legal inquiries contact{" "}
                                <a href="mailto:legal@SecureTransact.com" className="font-bold underline underline-offset-2">
                                    legal@SecureTransact.com
                                </a>
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
