"use client";

import { useState, useEffect } from 'react';

export default function SecurityContent() {
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showSuccess) {
            timer = setTimeout(() => setShowSuccess(false), 3000);
        }
        return () => clearTimeout(timer);
    }, [showSuccess]);

    const handleUpdatePassword = () => {
        // Mock save action
        setShowSuccess(true);
    };

    return (
        <div className="flex flex-col gap-6 pb-12 relative">
            {/* Custom Success Toast */}
            {showSuccess && (
                <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-lg shadow-xl shadow-black/20 flex items-center gap-3 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                        <span className="font-medium">Password updated successfully!</span>
                    </div>
                </div>
            )}

            <section className="bg-[#1e293b] rounded-xl border border-slate-700 p-6 shadow-xl shadow-black/20">
                <div className="mb-6">
                    <h2 className="text-white text-xl font-bold leading-tight">Change Password</h2>
                    <p className="text-slate-400 text-sm mt-1">Ensure your account is using a long, random password to stay secure.</p>
                </div>
                <div className="flex flex-col gap-5 max-w-[480px]">
                    <label className="flex flex-col gap-1.5 w-full">
                        <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Current Password</span>
                        <input className="w-full rounded-lg border border-slate-700 bg-slate-900 text-white px-4 py-2.5 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-slate-500" placeholder="Enter current password" type="password" />
                    </label>
                    <label className="flex flex-col gap-1.5 w-full">
                        <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">New Password</span>
                        <input className="w-full rounded-lg border border-slate-700 bg-slate-900 text-white px-4 py-2.5 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-slate-500" placeholder="Enter new password" type="password" />
                        <p className="text-xs text-slate-500">Minimum 8 characters, with uppercase and symbols.</p>
                    </label>
                    <label className="flex flex-col gap-1.5 w-full">
                        <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Confirm Password</span>
                        <input className="w-full rounded-lg border border-slate-700 bg-slate-900 text-white px-4 py-2.5 text-sm focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-slate-500" placeholder="Confirm new password" type="password" />
                    </label>
                    <button onClick={handleUpdatePassword} className="bg-amber-500 hover:bg-amber-600 text-slate-900 text-sm font-bold rounded-lg px-6 py-2.5 transition-colors shadow-lg shadow-amber-500/10 w-fit">
                        Update Password
                    </button>
                </div>
            </section>

            <section className="bg-[#1e293b] rounded-xl border border-slate-700 p-6 shadow-xl shadow-black/20">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                        <div className="bg-amber-500/10 rounded-lg p-2 h-fit text-amber-500 border border-amber-500/20">
                            <span className="material-symbols-outlined">security</span>
                        </div>
                        <div>
                            <h2 className="text-white text-xl font-bold leading-tight">Two-Factor Authentication</h2>
                            <p className="text-slate-400 text-sm mt-1 max-w-lg">Add an extra layer of security to your account.</p>
                            <div className="mt-3 flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Enabled</span>
                            </div>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input defaultChecked className="sr-only peer" type="checkbox" />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                </div>
            </section>

            <section className="bg-[#1e293b] rounded-xl border border-slate-700 p-8 shadow-xl shadow-black/20">
                <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <h2 className="text-white text-xl font-bold leading-tight">Active Sessions</h2>
                        <p className="text-slate-400 text-sm mt-1">Manage devices where your account is currently logged in.</p>
                    </div>
                    <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold rounded-lg px-6 py-2.5 transition-colors border border-slate-700 shadow-sm">
                        Logout all other devices
                    </button>
                </div>
                <div className="flex flex-col">
                    <SessionRow device="Windows PC - Chrome" location="London, UK • 192.168.1.1" icon="desktop_windows" active />
                    <SessionRow device="iPhone 13 - Safari" location="London, UK • 192.168.1.45" icon="smartphone" lastActive="2 hours ago" />
                    <SessionRow device="Macbook Pro - Firefox" location="Manchester, UK • 10.0.0.4" icon="laptop_mac" lastActive="3 days ago" />
                </div>
            </section>
        </div>
    );
}

function SessionRow({ device, location, icon, active, lastActive }: { device: string; location: string; icon: string; active?: boolean; lastActive?: string }) {
    return (
        <div className="flex items-center justify-between py-5 border-b border-slate-800 last:border-0 last:pb-0">
            <div className="flex items-center gap-5">
                <div className="text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="material-symbols-outlined text-[28px]">{icon}</span>
                </div>
                <div>
                    <p className="text-white text-sm font-bold">{device}</p>
                    <p className="text-slate-500 text-xs mt-0.5 font-medium">{location}</p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                {active ? (
                    <span className="inline-flex items-center rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-slate-700">Active now</span>
                ) : (
                    <>
                        <p className="text-xs text-slate-500 font-medium">Last active {lastActive}</p>
                        <button className="text-xs text-amber-500 hover:text-amber-400 font-bold tracking-wide uppercase mt-1">Revoke</button>
                    </>
                )}
            </div>
        </div>
    );
}
