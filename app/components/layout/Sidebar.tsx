"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <aside className={`
            w-[260px] bg-[#0F172A] flex flex-col h-screen fixed left-0 top-0 z-40 
            border-r border-[#334155]
            transition-transform duration-300 ease-in-out
            lg:translate-x-0
            ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}>
            <div className="px-6 pt-8 pb-6">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-[#1E293B] rounded-xl flex items-center justify-center shrink-0 border border-[#334155]">
                        <span className="material-symbols-outlined text-amber-500 text-2xl">
                            account_balance_wallet
                        </span>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-xl leading-none">
                            <span className="font-serif font-bold text-white tracking-wide">
                                BillTrack
                            </span>
                            <span className="font-sans font-semibold text-amber-500">
                                Pro
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto mt-6 px-4 custom-scrollbar">
                <Link
                    href="/"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg relative overflow-hidden transition-all duration-200 group ${isActive("/")
                        ? "bg-[#1E293B] text-amber-500"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                        }`}
                >
                    {isActive("/") && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500 rounded-l-lg"></div>
                    )}
                    <span className={`material-symbols-outlined text-[22px] ${isActive("/") ? "filled" : ""}`}>grid_view</span>
                    <span className="text-sm font-semibold">Dashboard</span>
                </Link>
                <Link
                    href="/invoices"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg relative overflow-hidden transition-all duration-200 group ${isActive("/invoices")
                        ? "bg-[#1E293B] text-amber-500"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                        }`}
                >
                    {isActive("/invoices") && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500 rounded-l-lg"></div>
                    )}
                    <span className={`material-symbols-outlined text-[22px] ${isActive("/invoices") ? "filled" : ""}`}>article</span>
                    <span className="text-sm font-medium">Invoices</span>
                </Link>
                <Link
                    href="/clients"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg relative overflow-hidden transition-all duration-200 group ${isActive("/clients")
                        ? "bg-[#1E293B] text-amber-500"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                        }`}
                >
                    {isActive("/clients") && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500 rounded-l-lg"></div>
                    )}
                    <span className="material-symbols-outlined text-[22px]">group</span>
                    <span className="text-sm font-medium">Clients</span>
                </Link>
                <Link
                    href="/reports"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg relative overflow-hidden transition-all duration-200 group ${isActive("/reports")
                        ? "bg-[#1E293B] text-amber-500"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                        }`}
                >
                    {isActive("/reports") && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500 rounded-l-lg"></div>
                    )}
                    <span className="material-symbols-outlined text-[22px]">bar_chart</span>
                    <span className="text-sm font-medium">Reports</span>
                </Link>
                <Link
                    href="/settings"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg relative overflow-hidden transition-all duration-200 group ${isActive("/settings")
                        ? "bg-[#1E293B] text-amber-500"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                        }`}
                >
                    {isActive("/settings") && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500 rounded-l-lg"></div>
                    )}
                    <span className="material-symbols-outlined text-[22px]">settings</span>
                    <span className="text-sm font-medium">Settings</span>
                </Link>
            </nav>

            <div className="mt-auto">
                <div className="px-6 py-6 border-t border-[#334155]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="size-10 rounded-full bg-[#0F172A] flex items-center justify-center shrink-0 border border-amber-500 text-amber-500">
                            <span className="material-symbols-outlined text-[20px]">
                                person
                            </span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-white truncate">Admin User</p>
                            <p className="text-[11px] text-slate-500 font-medium truncate">
                                admin@billtrack.pro
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
