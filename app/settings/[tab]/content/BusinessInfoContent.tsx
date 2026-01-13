"use client";

import { useEffect, useState, useRef } from 'react';
import { useSettingsStore, UserProfile } from '../../../lib/stores';
import { Button, LoadingSpinner, InlineError } from '../../../components/ui';

export default function BusinessInfoContent() {
    const { profile, isLoading, error, fetchProfile, updateProfile, uploadFile } = useSettingsStore();

    // Local state
    const [formData, setFormData] = useState<Partial<UserProfile>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [showSuccess, setShowSuccess] = useState(false);

    // Initial fetch
    useEffect(() => {
        if (!profile) fetchProfile();
    }, [fetchProfile, profile]);

    // Sync
    useEffect(() => {
        if (profile) setFormData(profile);
    }, [profile]);

    // Cleanup success timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showSuccess) {
            timer = setTimeout(() => setShowSuccess(false), 3000);
        }
        return () => clearTimeout(timer);
    }, [showSuccess]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        await updateProfile(formData);
        setIsSaving(false);
        if (!useSettingsStore.getState().error) {
            setShowSuccess(true);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const url = await uploadFile(file);
        if (url) {
            setFormData(prev => ({ ...prev, companyLogoUrl: url }));
            // Optional auto-save
        }
        setIsUploading(false);
    };

    if (isLoading && !profile) return <div className="p-8"><LoadingSpinner /></div>;

    return (
        <div className="bg-[#1E293B] rounded-2xl shadow-xl border border-slate-700/50 overflow-hidden relative">
            {/* Custom Success Toast */}
            {showSuccess && (
                <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-lg shadow-xl shadow-black/20 flex items-center gap-3 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                        <span className="font-medium">Changes saved successfully!</span>
                    </div>
                </div>
            )}

            {error && <div className="p-6 pb-0"><InlineError message={error} /></div>}

            <div className="px-6 py-5 border-b border-slate-700/50 bg-[#1e293b]">
                <h2 className="text-lg font-bold text-white">Business Information</h2>
                <p className="text-sm text-slate-400 mt-1">Manage your company details and branding preferences shown on invoices.</p>
            </div>
            <div className="p-6 md:p-8 flex flex-col gap-10">
                <section>
                    <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-500 text-xl">domain</span>
                        Company Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-slate-300">Company Name</span>
                            <input
                                name="companyName"
                                value={formData.companyName || ''}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-700 bg-[#0F172A] text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 transition-all shadow-sm"
                                placeholder="Acme Inc."
                                type="text"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-slate-300">Tax ID / VAT Number</span>
                            <input
                                name="taxId"
                                value={formData.taxId || ''}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-700 bg-[#0F172A] text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 transition-all shadow-sm"
                                placeholder="e.g. US-123456789"
                                type="text"
                            />
                        </label>
                        <label className="flex flex-col gap-2 md:col-span-2">
                            <span className="text-sm font-medium text-slate-300">Street Address</span>
                            <input
                                name="streetAddress"
                                value={formData.streetAddress || ''}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-700 bg-[#0F172A] text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 transition-all shadow-sm"
                                placeholder="123 Business Rd"
                                type="text"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-slate-300">City</span>
                            <input
                                name="city"
                                value={formData.city || ''}
                                onChange={handleChange}
                                className="w-full rounded-lg border-slate-700 bg-[#0F172A] text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 transition-all shadow-sm"
                                placeholder="New York"
                                type="text"
                            />
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-300">Zip / Postal Code</span>
                                <input
                                    name="zipCode"
                                    value={formData.zipCode || ''}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-slate-700 bg-[#0F172A] text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 transition-all shadow-sm"
                                    placeholder="10001"
                                    type="text"
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-300">Country</span>
                                <div className="relative">
                                    <select
                                        name="country"
                                        value={formData.country || 'United States'}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-slate-700 bg-[#0F172A] text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 appearance-none px-3 transition-all shadow-sm"
                                    >
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>United Kingdom</option>
                                        <option>Germany</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xl">expand_more</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </section>
                <div className="h-px bg-slate-700/50 w-full"></div>
                <section>
                    <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-500 text-xl">palette</span>
                        Branding
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-slate-300">Company Logo</span>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="mt-1 flex justify-center rounded-lg border border-dashed border-slate-600 bg-slate-800/50 px-6 py-8 hover:bg-slate-700/30 transition-colors cursor-pointer group"
                            >
                                <div className="text-center">
                                    {isUploading ? (
                                        <LoadingSpinner size="sm" />
                                    ) : formData.companyLogoUrl ? (
                                        <img src={formData.companyLogoUrl} alt="Logo" className="mx-auto h-16 object-contain mb-2" />
                                    ) : (
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-700/50 text-slate-400 group-hover:text-amber-500 transition-colors">
                                            <span className="material-symbols-outlined">cloud_upload</span>
                                        </div>
                                    )}
                                    <div className="mt-4 flex flex-col text-sm leading-6 text-slate-400">
                                        <span className="font-semibold text-amber-500 hover:text-amber-400">
                                            {formData.companyLogoUrl ? 'Change logo' : 'Upload a file'}
                                        </span>
                                    </div>
                                    <p className="text-xs leading-5 text-slate-500 mt-1">PNG, JPG, SVG up to 5MB</p>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="flex flex-col gap-6">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-300">Brand Color</span>
                                <p className="text-xs text-slate-500 mb-1">Used for headings and primary buttons on your invoices.</p>
                                <div className="flex items-center gap-3">
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 size-4 rounded-full border border-slate-500" style={{ backgroundColor: formData.brandColor || "#0F172A" }}></div>
                                        <input
                                            name="brandColor"
                                            value={formData.brandColor || "#0F172A"}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-slate-700 bg-[#0F172A] text-white pl-10 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 uppercase font-mono tracking-wide"
                                            type="text"
                                        />
                                    </div>
                                    <input
                                        name="brandColor"
                                        value={formData.brandColor || "#0F172A"}
                                        onChange={handleChange}
                                        className="h-11 w-11 rounded-lg border border-slate-600 bg-slate-700 p-1 cursor-pointer"
                                        type="color"
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-slate-300">Secondary Color</span>
                                <div className="flex items-center gap-3">
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 size-4 rounded-full border border-slate-500" style={{ backgroundColor: formData.secondaryColor || "#F59E0B" }}></div>
                                        <input
                                            name="secondaryColor"
                                            value={formData.secondaryColor || "#F59E0B"}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-slate-700 bg-[#0F172A] text-white pl-10 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 h-11 uppercase font-mono tracking-wide"
                                            type="text"
                                        />
                                    </div>
                                    <input
                                        name="secondaryColor"
                                        value={formData.secondaryColor || "#F59E0B"}
                                        onChange={handleChange}
                                        className="h-11 w-11 rounded-lg border border-slate-600 bg-slate-700 p-1 cursor-pointer"
                                        type="color"
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                </section>
            </div>
            <div className="bg-slate-800/80 px-6 py-4 flex items-center justify-end border-t border-slate-700/50 backdrop-blur-sm">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`bg-amber-500 hover:bg-amber-600 text-black font-bold py-2.5 px-6 rounded-lg transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-amber-500/20 transform active:scale-95 ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}
