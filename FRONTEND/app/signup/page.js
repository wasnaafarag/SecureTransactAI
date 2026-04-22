
"use client";
import React, { useState } from "react";
import { ShieldCheck, Lock, User, Mail, ArrowRight, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await api.register(formData);
            setSuccess(true);
            setTimeout(() => router.push("/login"), 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-700 via-blue-800 to-blue-900 flex-col items-center justify-center p-16 relative overflow-hidden">
                
                <div className="absolute top-[-80px] left-[-80px] w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
                <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative z-10 flex flex-col items-center text-center"
                >
                    <Image
                        src="/signup.svg"
                        alt="Create Account Illustration"
                        width={420}
                        height={420}
                        className="drop-shadow-2xl"
                        priority
                    />
                    <h2 className="text-white text-3xl font-extrabold mt-10 leading-snug">
                        Join the security network
                    </h2>
                    <p className="text-blue-200 mt-3 text-base max-w-sm leading-relaxed">
                        Get access to our AI-driven fraud detection platform and protect your financial operations from day one.
                    </p>

                    
                    <div className="flex flex-col gap-3 mt-10 w-full max-w-xs">
                        {[
                            "Real-time anomaly detection",
                            "Blockchain-backed audit trail",
                            "Multi-role access control",
                        ].map((feature) => (
                            <div key={feature} className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-300 shrink-0" />
                                <span className="text-blue-100 text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24 bg-white">
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full mx-auto"
                >
                    
                    <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 font-medium mb-8 group transition-colors">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to home
                    </Link>

                    
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-blue-600 rounded-xl">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">SecureGuard</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
                            Create account
                        </h1>
                        <p className="text-slate-500 mt-2 text-base">
                            Join the SecureTransaction network today.
                        </p>
                    </div>

                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                            <div className="relative">
                                <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="jdoe"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="jdoe@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 pr-11 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center font-medium border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="p-3 bg-emerald-50 text-emerald-600 text-sm rounded-xl text-center font-medium border border-emerald-100"
                            >
                                Account created! Redirecting to login...
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25 active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? "Creating account..." : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-sm mt-8">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
