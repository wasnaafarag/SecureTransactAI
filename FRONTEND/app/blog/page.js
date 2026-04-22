"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Code2, Shield, TrendingUp } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const posts = [
    {
        category: "Research",
        categoryColor: "bg-blue-50 text-blue-700",
        icon: BookOpen,
        date: "Feb 1, 2026",
        readTime: "8 min read",
        title: "The Rise of Unsupervised Learning in Fraud Detection",
        excerpt: "Why traditional rule-based systems are failing against modern financial crime, and how Isolation Forest-based approaches provide a statistically rigorous answer. Based on peer-reviewed findings from IJACSA.",
        href: "https://thesai.org/Publications/ViewPaper?Volume=10&Issue=11&Code=IJACSA&SerialNo=1",
        source: "IJACSA - Vol. 10, Issue 11",
    },
    {
        category: "Engineering",
        categoryColor: "bg-emerald-50 text-emerald-700",
        icon: Code2,
        date: "Jan 25, 2026",
        readTime: "6 min read",
        title: "DBSCAN: Density-Based Clustering for Anomaly Detection",
        excerpt: "A practical deep-dive into how DBSCAN discovers clusters of arbitrary shape and naturally excludes outlier noise - making it a powerful complement to global anomaly scoring in real-time transaction pipelines.",
        href: "https://medium.com/@kaleemullahyounas123/dbscan-another-clustering-algorithm-for-machine-learning-89885f555a2e",
        source: "Medium - Kaleem Ullah Younas",
    },
    {
        category: "Security",
        categoryColor: "bg-red-50 text-red-700",
        icon: Shield,
        date: "Jan 10, 2026",
        readTime: "10 min read",
        title: "Why Immutable Ledgers Are Non-Negotiable in FinTech",
        excerpt: "Exploring the mathematical basis for cryptographic immutability and why mutable audit logs represent a critical security vulnerability in any system that handles financial verdicts. Published in ACM Digital Library.",
        href: "https://dl.acm.org/doi/abs/10.1145/3068335",
        source: "ACM Digital Library",
    },
    {
        category: "Strategy",
        categoryColor: "bg-purple-50 text-purple-700",
        icon: TrendingUp,
        date: "Dec 20, 2025",
        readTime: "12 min read",
        title: "Digital Transformation of Financial Fraud Management",
        excerpt: "How enterprise IT strategy is evolving to embed AI-driven anomaly detection directly into core banking infrastructure - and what business leaders need to know before making the switch. Published in Springer BISE.",
        href: "https://link.springer.com/article/10.1007/s12599-017-0467-3",
        source: "Springer - Business & Info. Systems Engineering",
    },
];

export default function BlogPage() {
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
                                Research & Insights
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
                                The science behind{" "}
                                <span className="text-blue-400">SecureTransact</span>
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                                Curated research, engineering deep-dives, and security insights from the journals and practitioners shaping the future of fraud detection.
                            </p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative flex justify-center">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
                            </div>
                            <Image src="/articles/Online article-pana.svg" alt="Blog Illustration" width={420} height={420} className="relative z-10 drop-shadow-2xl" priority />
                        </motion.div>
                    </div>
                </div>
            </section>

            
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="space-y-8">
                        {posts.map((post, i) => (
                            <motion.article
                                key={post.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-0.5 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3 mb-4 flex-wrap">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${post.categoryColor}`}>
                                        {post.category}
                                    </span>
                                    <span className="text-slate-400 text-sm">{post.date}</span>
                                    <span className="text-slate-300 text-sm">·</span>
                                    <span className="text-slate-400 text-sm">{post.readTime}</span>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <post.icon className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug">
                                            {post.title}
                                        </h2>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                                        <div className="flex items-center justify-between flex-wrap gap-3">
                                            <span className="text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                {post.source}
                                            </span>
                                            <Link
                                                href={post.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:text-blue-700 hover:underline transition-colors"
                                            >
                                                Read full article
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
