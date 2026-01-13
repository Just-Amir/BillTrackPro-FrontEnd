// For now fetching client side or getting props, but user wants SSR.
// We will assume data is passed to it or it's a server component.
// Since it's a table display, it can be a Server Component.

export default function RecentInvoices() {
    return (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-sm overflow-hidden">
            <div className="px-6 py-6 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="text-xl font-bold font-serif text-white">
                    Recent Invoices
                </h3>
                <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                            <span className="material-symbols-outlined text-[20px]">
                                search
                            </span>
                        </span>
                        <input
                            className="pl-10 pr-4 py-2.5 text-sm border border-slate-700 rounded-xl bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 w-full sm:w-64 placeholder:text-slate-500 transition-all"
                            placeholder="Search invoices..."
                            type="text"
                        />
                    </div>
                    <button className="p-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined">filter_list</span>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-900/50 border-b border-slate-700">
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Invoice ID
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Client Name
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {/* Example Row - In real app map through data */}
                        <tr className="hover:bg-slate-900/50 transition-colors group">
                            <td className="px-6 py-4 text-sm font-semibold text-slate-300 hover:text-amber-500 cursor-pointer">
                                #INV-2024-001
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-white flex items-center gap-2">
                                <div className="size-6 rounded bg-slate-700 flex items-center justify-center text-slate-200 font-bold text-xs">
                                    AL
                                </div>
                                Apex Logistics LLC
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">
                                Oct 24, 2023
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-white">
                                $12,450.32
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                                    Paid
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded hover:bg-slate-700/50">
                                    <span className="material-symbols-outlined text-[20px]">
                                        more_horiz
                                    </span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
