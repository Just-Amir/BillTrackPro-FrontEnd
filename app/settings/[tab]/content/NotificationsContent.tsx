"use client";

import { useState, useEffect } from 'react';

export default function NotificationsContent() {
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showSuccess) {
            timer = setTimeout(() => setShowSuccess(false), 3000);
        }
        return () => clearTimeout(timer);
    }, [showSuccess]);

    const handleSave = () => {
        // Mock save action
        setShowSuccess(true);
    };

    return (
        <div className="space-y-8 relative">
            {/* Custom Success Toast */}
            {showSuccess && (
                <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-lg shadow-xl shadow-black/20 flex items-center gap-3 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                        <span className="font-medium">Changes saved successfully!</span>
                    </div>
                </div>
            )}

            <div className="bg-[#1E293B] rounded-2xl border border-slate-700 shadow-sm overflow-hidden">
                <div className="p-6 md:p-10 space-y-12">
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 pb-2 border-b border-slate-700">
                            <div className="p-2 rounded-lg bg-slate-800 text-amber-500 border border-slate-700">
                                <span className="material-symbols-outlined text-[20px]">mail</span>
                            </div>
                            <h3 className="text-white text-lg font-bold leading-tight">Email Notifications</h3>
                        </div>
                        <div className="space-y-3">
                            <NotificationRow title="Invoice Paid" desc="Receive an email when a client completes a payment." defaultOn />
                            <NotificationRow title="Invoice Overdue" desc="Get notified immediately when an invoice passes its due date." defaultOn />
                            <NotificationRow title="Weekly Reports" desc="A summary of your weekly financial activity sent every Monday." />
                        </div>
                    </section>
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 pb-2 border-b border-slate-700">
                            <div className="p-2 rounded-lg bg-slate-800 text-amber-500 border border-slate-700">
                                <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                            </div>
                            <h3 className="text-white text-lg font-bold leading-tight">In-app Notifications</h3>
                        </div>
                        <div className="space-y-3">
                            <NotificationRow title="New Client Added" desc="Get alerted when a team member adds a new client." defaultOn />
                            <NotificationRow title="Invoice Viewed" desc="Receive a push notification when a client opens an invoice." />
                            <NotificationRow title="System Updates" desc="Important announcements about maintenance and new features." defaultOn />
                        </div>
                    </section>
                </div>
            </div>
            <div className="flex justify-end gap-4 pb-12">
                <button className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2.5 rounded-lg text-sm font-bold text-[#0F172A] bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-900/20 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    Save Changes
                </button>
            </div>
        </div>
    );
}

function NotificationRow({ title, desc, defaultOn }: { title: string; desc: string; defaultOn?: boolean }) {
    return (
        <div className="flex items-center justify-between p-4 bg-[#0F172A] rounded-xl border border-slate-800 shadow-sm hover:border-slate-600 transition-colors">
            <div className="flex flex-col gap-1 pr-4">
                <p className="text-slate-200 font-semibold text-sm">{title}</p>
                <p className="text-slate-500 text-sm">{desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input defaultChecked={defaultOn} className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
        </div>
    );
}
