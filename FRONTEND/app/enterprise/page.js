"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Users, BarChart3, Globe2, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const stats = [
    { value: "99.99%", label: "Uptime SLA",     bg: "bg-blue-50",    text: "text-blue-700" },
    { value: "<50ms",  label: "Avg. Latency",   bg: "bg-emerald-50", text: "text-emerald-700" },
    { value: "24/7",   label: "Expert Support", bg: "bg-purple-50",  text: "text-purple-700" },
    { value: "∞",      label: "Tx Volume",      bg: "bg-orange-50",  text: "text-orange-700" },
];

const enterpriseFeatures = [
    {
        icon: Building2,
        title: "On-Premise Deployment",
        desc: "Deploy SecureTransact within your own VPC or private data center for complete data sovereignty and compliance.",
        img: "/employer/tech company-pana.svg",
        flip: false,
        bg: "from-blue-50 to-indigo-50",
    },
    {
        icon: Users,
        title: "Dedicated Success Team",
        desc: "Assigned technical account managers and solution architects who stay with you from day one through full deployment - and beyond.",
        img: "/employer/Live collaboration-rafiki.svg",
        flip: true,
        bg: "from-indigo-50 to-purple-50",
    },
];

const perks = [
    { icon: BarChart3,    title: "Custom Model Training",      desc: "We retrain our Isolation Forest models on your historical data for maximum accuracy." },
    { icon: Globe2,       title: "Multi-Region Availability",  desc: "Global load balancing ensures low-latency verification anywhere in the world." },
    { icon: CheckCircle,  title: "SLA Guarantees",             desc: "Contractual uptime and response time guarantees backed by financial SLA credits." },
    { icon: Building2,    title: "White-Label Option",         desc: "Deploy under your own brand with full UI customization and custom domain support." },
];

export default function EnterprisePage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            Enterprise
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-5 max-w-3xl mx-auto">
                            Scale without <span className="text-blue-400">compromise</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                            For global financial institutions processing millions of transactions daily - dedicated infrastructure, custom AI tuning, and round-the-clock expert support.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="px-7 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2 group justify-center">
                                Contact Sales <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/features" className="px-7 py-4 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold rounded-xl transition-all text-center">
                                See All Features
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            
            <section className="py-14 bg-white border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map(({ value, label, bg, text }) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`${bg} rounded-2xl p-6 text-center`}
                        >
                            <p className={`text-3xl font-extrabold ${text} mb-1`}>{value}</p>
                            <p className="text-slate-500 text-sm font-medium">{label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 space-y-24">
                    {enterpriseFeatures.map((feat) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6 }}
                            className={`grid lg:grid-cols-2 gap-14 items-center ${feat.flip ? "lg:[&>*:first-child]:order-2" : ""}`}
                        >
                            <div className={`relative rounded-3xl bg-gradient-to-br ${feat.bg} p-8 flex items-center justify-center min-h-[300px] overflow-hidden`}>
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl pointer-events-none" />
                                <Image src={feat.img} alt={feat.title} width={320} height={320} className="relative z-10 drop-shadow-lg" />
                            </div>
                            <div>
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                                    <feat.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">{feat.title}</h2>
                                <p className="text-slate-600 leading-relaxed text-base">{feat.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            
            <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">What&apos;s Included</p>
                        <h2 className="text-3xl font-extrabold text-slate-900">Everything your team needs</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {perks.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                                    <Icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 mb-2">{title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="py-16 bg-blue-600">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">Ready to talk enterprise?</h2>
                    <p className="text-blue-100 mb-8 text-base">Get a custom quote, dedicated onboarding, and a direct line to our engineering team.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg group">
                        Contact Sales <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
