export default function TeamContent() {
    return (
        <div className="bg-[#1E293B] rounded-2xl shadow-sm border border-slate-700 flex flex-col overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1E293B]">
                <div>
                    <h2 className="text-xl font-bold text-white leading-tight">Team Members</h2>
                    <p className="text-sm text-slate-400 mt-1">Manage who has access to this workspace.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-amber-400 text-[#0F172A] text-sm font-bold py-2.5 px-5 rounded-lg transition-all shadow-md active:scale-95 shadow-amber-500/20">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    <span>Invite Member</span>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#0f172a]/40 border-b border-slate-700">
                        <tr>
                            <th className="px-8 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider" scope="col">Member</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell" scope="col">Email</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider" scope="col">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider" scope="col">Status</th>
                            <th className="px-8 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right" scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        <tr className="hover:bg-slate-800/50 transition-colors group">
                            <td className="px-8 py-5 whitespace-nowrap">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-cover bg-center ring-2 ring-slate-700 shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCylVPgP1d8VtzkCemxkyXWiRK46UT4QuoTPtyhlMOdwV2HhyY8J4yhlPem-QzVajeLibo7hc3vla0w5hcYnJcRKal672dRyYsd-qYTdpf2IgZlZ5Aq5i8vLrh_XrPCI6OkYVH8iwGh-OedBLUojMDBRnQZ0lAoTRXub0lG8_QS1x4KiO_zl6-Lxu56mh41CvvkTYtSfZOqXLrMrpWICe6cWrljHrVYsXptAWxPdsFwE3F99BMHJ7MgxeJCZl0EthZ_NBTAaGYnvtiN')" }}></div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-white">Sarah Miller</span>
                                        <span className="text-xs text-slate-400 sm:hidden">sarah@billtrack.com</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap hidden sm:table-cell">
                                <span className="text-sm text-slate-300">sarah@billtrack.com</span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                                <select className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-amber-500 sm:text-sm sm:leading-6 bg-[#0F172A] text-slate-200 cursor-pointer hover:bg-slate-800 transition-colors">
                                    <option defaultValue="Admin">Admin</option>
                                    <option>Editor</option>
                                    <option>Viewer</option>
                                </select>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-800 ring-1 ring-inset ring-slate-600/10">
                                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-slate-800"></span>
                                    Active
                                </span>
                            </td>
                            <td className="px-8 py-5 whitespace-nowrap text-right">
                                <button className="text-slate-500 hover:text-slate-300 p-2 rounded-full hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-800/50 transition-colors group">
                            <td className="px-8 py-5 whitespace-nowrap">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-cover bg-center ring-2 ring-slate-700 shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQeKAoTHxkgdjKI187aIwcb6ARuAY7U267e309GQmh2blIw3_uiKtCViPCvkCdmloTwgINNz8IW7Yeam-u6UpGCvQSOu1EoAreBmiWzzHifKhjC7it-1thsU2LqIq4f-jIUAg_Chj6ugGwvnSHKFZwpvp6dZCUDlaMd-L9bzMf60aWRUnwccGWU9uUm5-lm2Agr_ZIjq83SbNMhGxUci_Rsq29EtXjAQFojWKpFtfRBZ-xzdRi70ghbIyKlL_Nu-y72mqG3S8WuWRB')" }}></div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-white">David Chen</span>
                                        <span className="text-xs text-slate-400 sm:hidden">david@billtrack.com</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap hidden sm:table-cell">
                                <span className="text-sm text-slate-300">david@billtrack.com</span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                                <select className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-amber-500 sm:text-sm sm:leading-6 bg-[#0F172A] text-slate-200 cursor-pointer hover:bg-slate-800 transition-colors" defaultValue="Editor">
                                    <option>Admin</option>
                                    <option>Editor</option>
                                    <option>Viewer</option>
                                </select>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-800 ring-1 ring-inset ring-slate-600/10">
                                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-slate-800"></span>
                                    Active
                                </span>
                            </td>
                            <td className="px-8 py-5 whitespace-nowrap text-right">
                                <button className="text-slate-500 hover:text-slate-300 p-2 rounded-full hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                </button>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-800/50 transition-colors group">
                            <td className="px-8 py-5 whitespace-nowrap">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-cover bg-center ring-2 ring-slate-700 shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEIyL9_pG9doq_tZOfL8R_Uq_Tjdy46-aVDOu3NU1vjJpvzISDOO0OL9Y6N2v2qYwGorc6F2KhMIEBRHSI-2gccfbNKZJNzBAv-7-mtuOh7fsWgWUJc9_x3-9wX8Fo9iAkQbGqHgs74YivimiQr1IQT63N_YffoDHPsfXQ9tMEphzr7Muz0me3Fk-xnJcaf68h0TW-NTsHAC0iNEqPGPacml4zkHrEN2vvNm5CLsubB9dCgqxtQkw82JuQfgDGLiyFM4u1Df9GUyPr')" }}></div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-white">Emily Rose</span>
                                        <span className="text-xs text-slate-400 sm:hidden">emily@billtrack.com</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap hidden sm:table-cell">
                                <span className="text-sm text-slate-300">emily@billtrack.com</span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                                <select className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-amber-500 sm:text-sm sm:leading-6 bg-[#0F172A] text-slate-200 cursor-pointer hover:bg-slate-800 transition-colors" defaultValue="Viewer">
                                    <option>Admin</option>
                                    <option>Editor</option>
                                    <option>Viewer</option>
                                </select>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-600/20">
                                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-600"></span>
                                    Pending
                                </span>
                            </td>
                            <td className="px-8 py-5 whitespace-nowrap text-right">
                                <button className="text-slate-500 hover:text-slate-300 p-2 rounded-full hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="px-8 py-5 border-t border-slate-700 flex items-center justify-between text-sm text-slate-400 bg-slate-900/30">
                <p>Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">3</span> of <span className="font-medium text-white">3</span> results</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 border border-slate-600 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-all text-xs font-medium" disabled>Previous</button>
                    <button className="px-3 py-1.5 border border-slate-600 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-all text-xs font-medium" disabled>Next</button>
                </div>
            </div>
        </div>
    );
}
