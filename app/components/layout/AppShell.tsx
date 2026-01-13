"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <div className="relative w-full h-screen bg-slate-900 text-slate-300 overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar
                isOpen={isSidebarOpen}
            />

            {/* Main Content Area */}
            <div className="flex flex-col lg:ml-[260px] h-screen transition-all duration-300">
                {/* Mobile Header */}
                <header className="lg:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="size-8 bg-slate-700 rounded-lg flex items-center justify-center text-amber-500 border border-slate-600">
                            <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
                        </div>
                        <span className="font-bold text-white tracking-tight">BillTrack Pro</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto bg-slate-900 p-4 lg:p-8 scroll-smooth">
                    {children}
                </main>
            </div>
        </div>
    );
}
