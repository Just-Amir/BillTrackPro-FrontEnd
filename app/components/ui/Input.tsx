import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: string;
}

export function Input({ label, error, icon, className = '', ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-slate-300">{label}</label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-500 text-[20px]">{icon}</span>
                    </div>
                )}
                <input
                    className={`
                        block w-full rounded-lg border bg-slate-800 text-white
                        shadow-sm transition-all
                        placeholder:text-slate-500
                        focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${icon ? 'pl-10' : 'px-3'}
                        ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'}
                        py-2.5 pr-3 sm:text-sm
                        ${className}
                    `}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-xs text-red-400">{error}</p>
            )}
        </div>
    );
}

interface SearchInputProps extends Omit<InputProps, 'icon'> {
    onSearch?: (value: string) => void;
}

export function SearchInput({ onSearch, ...props }: SearchInputProps) {
    return (
        <Input
            icon="search"
            type="text"
            {...props}
        />
    );
}
