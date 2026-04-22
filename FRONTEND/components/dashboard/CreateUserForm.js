
import React, { useState } from 'react';
import { UserPlus, CheckCircle, XCircle } from 'lucide-react';
import { api } from '@/lib/api';

export default function CreateUserForm() {
    const [formData, setFormData] = useState({ username: '', password: '', email: '', role: 'user' });
    const [status, setStatus] = useState(null); 
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);
        try {
            await api.createUser(formData);
            setStatus('success');
            setMsg(`User ${formData.username} created successfully!`);
            setFormData({ username: '', password: '', email: '', role: 'user' });
        } catch (err) {
            setStatus('error');
            setMsg(err.message);
        }
    };

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 h-full">
            <h3 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-400" />
                User Management
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Username</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 text-sm focus:border-blue-500 outline-none"
                        value={formData.username}
                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 text-sm focus:border-blue-500 outline-none"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 text-sm focus:border-blue-500 outline-none"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1">Role</label>
                    <select
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 text-sm focus:border-blue-500 outline-none"
                        value={formData.role}
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="user">User</option>
                        <option value="investigator">Investigator</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg text-sm transition-colors mt-4"
                >
                    Create Account
                </button>

                {status && (
                    <div className={`flex items-center gap-2 text-xs p-3 rounded-lg ${status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {status === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {msg}
                    </div>
                )}
            </form>
        </div>
    );
}
