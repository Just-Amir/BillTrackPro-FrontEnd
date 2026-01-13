export default function BillingContent() {
    return (
        <div className="grid gap-8">
            <section>
                <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#1E293B] shadow-sm ring-1 ring-white/5">
                    <div className="flex flex-col md:flex-row">
                        <div className="relative h-48 md:h-auto md:w-1/3 bg-slate-900">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwOJO7X3In_SvZj33ws3FLa71-o9tEhIYwLXOZoZw7Xhc-zGuNTK_hWuXqY8BMzU_bgKACdjobCBQgygvLsumjJcuDHomi35kCDDlSAH_d4pejRSIt6aInaBHNL7d3MzK87xRHU1cSHBDbed2Z6OAVZaPG_39RSgcAnugQa-_iOTbgmk_ZdtC0ZahlDnWBiJznqT7K2Mqx5X1yNKg37f1HDX0_NLfipIs66XlzCgbExDoPvt_-zO3Jmo2x0DZgvDCI1_a80MeW3aKN')", mixBlendMode: 'normal', opacity: 0.8 }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-800/20 md:bg-gradient-to-r md:from-slate-900/80 md:to-slate-900/10"></div>
                            <div className="absolute bottom-4 left-4 text-white md:hidden">
                                <span className="inline-flex items-center rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-medium text-slate-900 ring-1 ring-inset ring-amber-400/20">Active</span>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-xl font-bold text-white">Enterprise Plan</h2>
                                    <span className="hidden md:inline-flex items-center rounded-full bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-300 ring-1 ring-inset ring-slate-600/50">Active</span>
                                </div>
                                <p className="text-sm text-slate-400 mb-4">Unlimited invoices, 20 team members, priority support, and advanced analytics.</p>
                                <div className="flex flex-col gap-1 mb-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-white">$499.99</span>
                                        <span className="text-sm text-slate-400">/ month</span>
                                    </div>
                                    <p className="text-sm text-slate-400">Next billing on <span className="font-medium text-slate-200">Oct 24, 2023</span></p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                                <button className="h-10 inline-flex items-center justify-center rounded-lg bg-amber-500 px-6 text-sm font-bold text-slate-900 shadow-sm hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors">
                                    Manage Subscription
                                </button>
                                <button className="h-10 inline-flex items-center justify-center rounded-lg bg-amber-500 px-6 text-sm font-bold text-slate-900 shadow-sm hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors">
                                    Change Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Payment Method</h3>
                        <button className="text-sm font-semibold text-amber-500 hover:text-amber-400">Add new</button>
                    </div>
                    <div className="rounded-xl border border-slate-700 bg-[#1E293B] p-4 shadow-sm ring-1 ring-white/5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-14 shrink-0 items-center justify-center rounded border border-slate-600 bg-slate-900 p-1">
                                    <svg className="h-full w-full object-contain" fill="none" viewBox="0 0 32 10" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.8687 9.87531L14.7354 0.992188H12.3187L10.4687 9.87531H12.8687ZM21.9271 6.642C21.9437 4.25031 18.5771 4.10031 18.6187 2.942C18.6354 2.58369 19.0021 2.20031 19.9521 2.05869C20.4437 1.98369 21.7854 1.92531 23.1187 2.542L23.5354 0.608688C22.9687 0.392063 22.2354 0.175438 21.2854 0.175438C18.9021 0.175438 16.2021 1.44206 16.1521 4.29206C16.1187 6.43369 19.1437 6.55869 19.1271 7.74206C19.1104 8.57531 18.1104 8.94206 17.1771 8.94206C15.8937 8.94206 15.0271 8.60869 14.3937 8.31706L13.9771 10.3337C14.5104 10.5837 15.5104 10.8003 16.4937 10.8087C19.0271 10.8337 21.9104 9.53369 21.9271 6.642ZM28.4604 9.87531H30.8604L28.7104 0.992188H26.5437C26.0437 0.992188 25.5937 1.28369 25.4104 1.74206L21.6937 10.8837H24.2271L24.7271 9.49206H27.8771L28.1771 9.87531H28.4604ZM25.4604 7.52531L26.7437 3.86706L27.4604 7.52531H25.4604ZM10.5187 0.992188L8.16875 7.42531L7.90208 6.13369C7.45208 4.60031 5.96875 2.70869 4.31875 1.84206L8.85208 9.87531H11.3354L15.6521 0.992188H10.5187ZM0.31875 0.992188L0.0687501 2.21706C2.26875 2.79206 5.86875 3.99206 7.71875 8.99206L7.20208 6.47531L2.43542 0.992188H0.31875Z" fill="#e2e8f0"></path>
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm font-bold text-white">Visa ending in 4242</p>
                                    <p className="text-xs text-slate-400">Expiry 12/2025</p>
                                </div>
                                <span className="inline-flex items-center rounded-full bg-slate-700 px-2 py-0.5 text-xs font-medium text-slate-300 ring-1 ring-inset ring-slate-600/50">Default</span>
                            </div>
                            <div className="flex gap-2">
                                <button aria-label="Edit payment method" className="rounded p-2 text-slate-400 hover:bg-slate-700 hover:text-amber-500 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                                <button aria-label="Delete payment method" className="rounded p-2 text-slate-400 hover:bg-slate-700 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="lg:col-span-1">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Usage</h3>
                    </div>
                    <div className="rounded-xl border border-slate-700 bg-[#1E293B] p-4 shadow-sm h-fit ring-1 ring-white/5">
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400">Team Members</span>
                                    <span className="font-medium text-white">12 / 20</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-700">
                                    <div className="h-2 rounded-full bg-amber-500" style={{ width: "60%" }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-slate-400">Invoices Sent</span>
                                    <span className="font-medium text-white">Unlimited</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-700">
                                    <div className="h-2 rounded-full bg-amber-500 w-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Invoicing History</h3>
                    <button className="flex items-center gap-1 text-sm font-semibold text-slate-400 hover:text-amber-500 transition-colors">
                        <span>Download all</span>
                        <span className="material-symbols-outlined text-[18px]">download</span>
                    </button>
                </div>
                <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#1E293B] shadow-sm ring-1 ring-white/5">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#0f172a] text-slate-400 border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-3 font-medium" scope="col">Invoice</th>
                                    <th className="px-6 py-3 font-medium" scope="col">Date</th>
                                    <th className="px-6 py-3 font-medium" scope="col">Amount</th>
                                    <th className="px-6 py-3 font-medium" scope="col">Status</th>
                                    <th className="px-6 py-3 font-medium text-right" scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700 text-slate-300">
                                <tr className="hover:bg-slate-700/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">INV-002345</td>
                                    <td className="px-6 py-4 text-slate-400">Oct 01, 2023</td>
                                    <td className="px-6 py-4 font-medium text-white">$499.99</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-slate-700 px-2 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-slate-600">Paid</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-500 hover:text-amber-500 transition-colors" title="Download PDF">
                                            <span className="material-symbols-outlined text-[20px]">download</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t border-slate-700 bg-slate-900 px-6 py-3">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">Showing 1 of 24 invoices</p>
                            <div className="flex gap-2">
                                <button className="rounded border border-slate-700 bg-slate-800 px-3 py-1 text-sm font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-50" disabled>Previous</button>
                                <button className="rounded border border-slate-700 bg-slate-800 px-3 py-1 text-sm font-medium text-slate-300 hover:bg-slate-700">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
