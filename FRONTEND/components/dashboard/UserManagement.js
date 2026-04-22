"use client";
import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Trash2, Edit2, UserPlus, Shield, Check, X, ShieldCheck, ShieldAlert, Cpu, Fingerprint, Lock } from 'lucide-react';
import CreateUserForm from './CreateUserForm';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await api.getUsers();
            setUsers(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (username) => {
        if (!confirm(`ACCESS PROTOCOL: Are you sure you want to revoke system privileges for operator [${username}]? This action will be logged in the immutable audit manifold.`)) return;
        try {
            await api.deleteUser(username);
            setUsers(users.filter(u => u.username !== username));
        } catch (e) {
            alert("Authorization Error: " + e.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { username, ...updates } = editingUser;

            const cleanUpdates = {};
            if (updates.email) cleanUpdates.email = updates.email;
            if (updates.role) cleanUpdates.role = updates.role;
            if (updates.password) cleanUpdates.password = updates.password;

            await api.updateUser(username, cleanUpdates);
            setEditingUser(null);
            fetchUsers();
        } catch (e) {
            alert("Privilege Escalation Sync Error: " + e.message);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [showCreate]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-pulse">
            <Cpu className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em]">Synchronizing Operator Directory...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-10">
            <div className="flex justify-between items-end border-b border-slate-800 pb-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-100 uppercase tracking-tighter italic flex items-center gap-3">
                        <Shield className="w-8 h-8 text-blue-500" />
                        Governance Control: IAM Console
                    </h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2 px-1 border-l-2 border-blue-500">Identity & Access Management (IAM) for System Operators</p>
                </div>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-900/40 ${showCreate
                            ? 'bg-slate-800 text-slate-300 border border-slate-700'
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                >
                    {showCreate ? <X className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    {showCreate ? 'Close Provisioning' : 'Provision New Operator'}
                </button>
            </div>

            {showCreate && (
                <div className="bg-slate-900/50 p-8 rounded-3xl border border-blue-500/20 mb-10 shadow-2xl animate-in slide-in-from-top-4">
                    <CreateUserForm onSuccess={() => { setShowCreate(false); fetchUsers(); }} />
                </div>
            )}

            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
                <table className="w-full text-left">
                    <thead className="bg-slate-950/50 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-slate-800">
                        <tr>
                            <th className="px-8 py-5">Operator Identity</th>
                            <th className="px-8 py-5">Authorization Level</th>
                            <th className="px-8 py-5">Communication Endpoint</th>
                            <th className="px-8 py-5 text-right">Governance Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-800/30 transition-all group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center text-blue-500 shadow-inner group-hover:border-blue-500/50 transition-all">
                                            <Fingerprint className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-200 block text-sm tracking-tight">{user.username}</span>
                                            <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest">Active State</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black border tracking-widest uppercase ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                            user.role === 'investigator' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-8 py-6 font-mono text-[11px] text-slate-500">{user.email || 'NO_ENDPOINT_SPECIFIED'}</td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setEditingUser(user)}
                                            className="p-2.5 bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 rounded-xl transition-all shadow-md active:scale-95"
                                            title="Modify Privileges"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.username)}
                                            className="p-2.5 bg-slate-950 border border-slate-800 hover:border-red-500/50 text-slate-400 hover:text-red-400 rounded-xl transition-all shadow-md active:scale-95"
                                            title="Revoke Access"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingUser && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-8 w-full max-w-md shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                        
                        <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
                            <ShieldCheck className="w-6 h-6 text-emerald-500" />
                            <h3 className="text-xl font-black text-slate-100 uppercase tracking-tighter italic">Re-Provisioning: {editingUser.username}</h3>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Audit Email Endpoint</label>
                                <input
                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-slate-200 font-medium focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-800"
                                    value={editingUser.email || ''}
                                    onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Authorization Matrix</label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-slate-200 font-bold focus:ring-1 focus:ring-blue-600 outline-none appearance-none"
                                        value={editingUser.role}
                                        onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}
                                    >
                                        <option value="user">USER (Standard Operator)</option>
                                        <option value="investigator">INVESTIGATOR (Forensic Lead)</option>
                                        <option value="admin">ADMIN (Root Governance)</option>
                                    </select>
                                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Authorization Key Reset</label>
                                <input
                                    type="password"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-slate-200 font-mono focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-800"
                                    placeholder="Enter new credentials to reset"
                                    onChange={e => setEditingUser({ ...editingUser, password: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-4 mt-10">
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-400 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all"
                                >
                                    Abandoned
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-900/40 transition-all active:scale-95"
                                >
                                    Commit Sync
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}