export default function DashboardHeader() {
    return (
        <header className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div>
                <h2 className="text-3xl font-serif font-bold tracking-tight text-white mb-1">
                    Command Center
                </h2>
                <p className="text-slate-400 font-medium">Welcome back, Admin</p>
            </div>
            <div className="flex gap-3">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">
                        calendar_today
                    </span>
                    Last 30 Days
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-900/20 hover:bg-amber-400 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                        download
                    </span>
                    Export Report
                </button>
            </div>
        </header>
    );
}
