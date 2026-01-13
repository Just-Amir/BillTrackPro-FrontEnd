"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClientDto } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export default function NewInvoicePage() {
    const router = useRouter();
    const [clients, setClients] = useState<ClientDto[]>([]);
    const [formData, setFormData] = useState({
        invoiceNumber: "",
        clientId: "",
        amount: "",
        dateIssued: new Date().toISOString().split("T")[0],
        status: "Pending",
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/Clients`)
            .then((res) => res.json())
            .then((data) => setClients(data))
            .catch((err) => console.error(err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/Invoices`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    invoiceNumber: formData.invoiceNumber,
                    clientId: parseInt(formData.clientId),
                    amount: parseFloat(formData.amount),
                    dateIssued: formData.dateIssued, // Should be ISO string or handled by backend parsing
                    status: formData.status,
                }),
            });

            if (res.ok) {
                router.push("/invoices");
                router.refresh();
            } else {
                alert("Failed to create invoice");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating invoice");
        }
    };

    return (
        <div className="p-8 h-full overflow-y-auto">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Create New Invoice</h1>

                <form onSubmit={handleSubmit} className="space-y-6 bg-[#1E293B] p-8 rounded-2xl border border-[#334155]">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                            Invoice Number
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="INV-2024-XXX"
                            value={formData.invoiceNumber}
                            onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                            Client
                        </label>
                        <select
                            required
                            className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            value={formData.clientId}
                            onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                        >
                            <option value="">Select a client...</option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Amount ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">
                                Date Issued
                            </label>
                            <input
                                type="date"
                                required
                                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                value={formData.dateIssued}
                                onChange={(e) => setFormData({ ...formData, dateIssued: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                            Status
                        </label>
                        <select
                            className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2.5 rounded-lg border border-[#334155] text-slate-300 hover:text-white hover:bg-[#334155] transition-all font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-amber-500 text-[#0F172A] hover:bg-amber-400 transition-all font-bold shadow-lg shadow-amber-900/20"
                        >
                            Create Invoice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
