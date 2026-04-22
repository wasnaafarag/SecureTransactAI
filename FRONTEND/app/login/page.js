
"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Lock, Activity, ShieldCheck, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const res = await login(formData.username, formData.password);
        if (!res.success) setError(res.message);
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex">
            
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24 bg-white">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
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
                            Welcome back
                        </h1>
                        <p className="text-slate-500 mt-2 text-base">
                            Sign in to access your anomaly detection dashboard.
                        </p>
                    </div>

                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Email or Username
                            </label>
                            <div className="relative">
                                <Activity className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your email or username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-sm font-semibold text-slate-700">Password</label>
                                <span className="text-sm text-blue-600 cursor-pointer hover:underline">Forgot password?</span>
                            </div>
                            <div className="relative">
                                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pl-11 pr-11 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your password"
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25 active:scale-[0.98] mt-2"
                        >
                            {loading ? "Authenticating..." : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center text-slate-500 text-sm mt-8">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-blue-600 font-bold hover:underline">
                            Request Access
                        </Link>
                    </p>
                </motion.div>
            </div>

            
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 flex-col items-center justify-center p-16 relative overflow-hidden">
                
                <div className="absolute top-[-80px] right-[-80px] w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-[-80px] left-[-80px] w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative z-10 flex flex-col items-center text-center"
                >
                    <Image
                        src="/login.svg"
                        alt="Secure Login Illustration"
                        width={420}
                        height={420}
                        className="drop-shadow-2xl"
                        priority
                    />
                    <h2 className="text-white text-3xl font-extrabold mt-10 leading-snug">
                        Detect threats in real-time
                    </h2>
                    <p className="text-blue-200 mt-3 text-base max-w-sm leading-relaxed">
                        AI-powered anomaly detection that monitors every transaction and keeps your system secure 24/7.
                    </p>

                    
                    <div className="flex gap-6 mt-10">
                        {["99.9% Uptime", "SOC 2 Compliant", "AES-256"].map((badge) => (
                            <div key={badge} className="text-center">
                                <div className="text-white font-bold text-sm">{badge}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
