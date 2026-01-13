"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const tabs = [
        { name: 'Profile', href: '/settings/profile', icon: 'person' },
        { name: 'Business Info', href: '/settings/business-info', icon: 'business' },
        { name: 'Team', href: '/settings/team', icon: 'group' },
        { name: 'Billing', href: '/settings/billing', icon: 'credit_card' },
        { name: 'Notifications', href: '/settings/notifications', icon: 'notifications' },
        { name: 'Security', href: '/settings/security', icon: 'lock' },
    ];

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto relative p-6 md:p-10 pb-24 font-sans">
            <div className="max-w-[1000px] mx-auto w-full">
                <div className="mb-8">
                    <h1 className="text-white text-3xl font-bold tracking-tight mb-2">Settings</h1>
                    <p className="text-slate-400 text-base">Manage your personal account preferences and company settings.</p>
                </div>
                <div className="mb-8 border-b border-slate-700">
                    <nav aria-label="Tabs" className="flex gap-6 overflow-x-auto pb-px">
                        {tabs.map((tab) => {
                            const tabIsActive = isActive(tab.href);
                            return (
                                <Link
                                    key={tab.name}
                                    href={tab.href}
                                    className={`shrink-0 px-1 pb-3 text-sm font-medium inline-flex items-center gap-2 transition-colors border-b-2 ${tabIsActive
                                        ? 'border-amber-500 text-amber-500 font-bold'
                                        : 'border-transparent text-slate-400 hover:text-white hover:border-slate-500'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                                    {tab.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                {children}
            </div>
        </div>
    );
}
