"use client";

import { useEffect, useState, useRef } from 'react';
import { useSettingsStore, UserProfile } from '../../../lib/stores';
import { PageLoader, Button, LoadingSpinner, InlineError } from '../../../components/ui';

export default function ProfileContent() {
    const { profile, isLoading, error, fetchProfile, updateProfile, uploadFile } = useSettingsStore();

    // Local state for form management
    const [formData, setFormData] = useState<Partial<UserProfile>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [showSuccess, setShowSuccess] = useState(false);

    // Initial fetch
    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    // Sync store data to local form state
    useEffect(() => {
        if (profile) {
            setFormData(profile);
        }
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

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        await updateProfile(formData);
        setIsSaving(false);
        // Check current error state from store, if clean then success
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
            setFormData(prev => ({ ...prev, avatarUrl: url }));
            // Optional: Auto-save or just wait for user to click Save
            await updateProfile({ ...formData, avatarUrl: url });
        }
        setIsUploading(false);
    };

    // If loading for the first time
    if (isLoading && !profile) return <div className="p-8"><LoadingSpinner /></div>;

    // Default avatar if none
    const avatarSrc = formData.avatarUrl || "https://ui-avatars.com/api/?name=" + (formData.fullName || "User") + "&background=random";

    return (
        <div className="bg-[#1E293B] rounded-xl shadow-lg shadow-black/20 border border-slate-700 p-6 md:p-8 relative">
            {/* Custom Success Toast */}
            {showSuccess && (
                <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-lg shadow-xl shadow-black/20 flex items-center gap-3 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                        <span className="font-medium">Changes saved successfully!</span>
                    </div>
                </div>
            )}

            {error && <div className="mb-4"><InlineError message={error} /></div>}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-slate-700 mb-8">
                <div className="relative group">
                    <div
                        className="size-24 rounded-full bg-slate-700 bg-cover bg-center border-4 border-slate-600 shadow-md transition-all"
                        style={{ backgroundImage: `url('${avatarSrc}')` }}
                    >
                        {isUploading && (
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                                <LoadingSpinner size="sm" />
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-slate-800 border border-slate-600 rounded-full p-2 shadow-sm text-slate-300 hover:text-amber-500 hover:border-amber-500 transition-colors cursor-pointer"
                        title="Change photo"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[16px] block">edit</span>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-white text-lg font-bold">Profile Picture</h3>
                    <p className="text-slate-400 text-sm max-w-md">Upload a new avatar. JPG, GIF or PNG. Max size of 5MB.</p>
                    <div className="flex gap-3 mt-3">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2.5 rounded-lg border border-slate-600 text-slate-300 bg-transparent hover:bg-slate-700 hover:text-white font-semibold text-sm shadow-sm transition-colors"
                            type="button"
                        >
                            {isUploading ? 'Uploading...' : 'Upload New'}
                        </button>
                        <button
                            onClick={() => {
                                setFormData(prev => ({ ...prev, avatarUrl: '' }));
                                updateProfile({ ...formData, avatarUrl: '' });
                            }}
                            className="px-4 py-2.5 rounded-lg border border-slate-600 text-slate-300 bg-transparent hover:bg-slate-700 hover:text-white font-semibold text-sm shadow-sm transition-colors"
                            type="button"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-slate-300 mb-2" htmlFor="fullName">Full Name</label>
                    <input
                        className="block w-full rounded-lg border-slate-600 bg-[#0F172A] text-white shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm py-2.5 px-3 placeholder-slate-500"
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-slate-300 mb-2" htmlFor="title">Professional Title</label>
                    <input
                        className="block w-full rounded-lg border-slate-600 bg-[#0F172A] text-white shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm py-2.5 px-3 placeholder-slate-500"
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-slate-300 mb-2" htmlFor="email">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-500 text-[20px]">mail</span>
                        </div>
                        <input
                            className="block w-full rounded-lg border-slate-600 bg-[#0F172A] text-white shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm py-2.5 pl-10 px-3 placeholder-slate-500"
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold text-slate-300 mb-2" htmlFor="phone">Phone Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-500 text-[20px]">phone</span>
                        </div>
                        <input
                            className="block w-full rounded-lg border-slate-600 bg-[#0F172A] text-white shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm py-2.5 pl-10 px-3 placeholder-slate-500"
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-300 mb-2" htmlFor="timezone">Timezone</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-500 text-[20px]">schedule</span>
                        </div>
                        <select
                            className="block w-full rounded-lg border-slate-600 bg-[#0F172A] text-white shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm py-2.5 pl-10 pr-10"
                            id="timezone"
                            name="timezone"
                            value={formData.timezone || 'Eastern Time (US & Canada) (GMT-05:00)'}
                            onChange={handleChange}
                        >
                            <option>Pacific Time (US & Canada) (GMT-08:00)</option>
                            <option>Eastern Time (US & Canada) (GMT-05:00)</option>
                            <option>Central European Time (Berlin, Paris) (GMT+01:00)</option>
                            <option>Greenwich Mean Time (London) (GMT+00:00)</option>
                            <option>Australian Eastern Time (Sydney) (GMT+10:00)</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-500 text-[20px]">expand_more</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 border-t border-slate-700 my-2"></div>
                <div className="col-span-2 flex items-center justify-end gap-3">
                    <button className="px-4 py-2.5 rounded-lg border border-slate-600 text-slate-300 bg-transparent hover:bg-slate-700 hover:text-white font-semibold text-sm shadow-sm transition-colors" type="button">
                        Cancel
                    </button>
                    <button
                        className={`px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-sm shadow-sm transition-colors flex items-center gap-2 ring-2 ring-amber-500/20 ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
                        type="submit"
                        disabled={isSaving}
                    >
                        {isSaving ? <LoadingSpinner size="sm" /> : <span className="material-symbols-outlined text-[18px]">save</span>}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
