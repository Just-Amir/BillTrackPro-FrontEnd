import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: string;
    children: ReactNode;
    isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-lg shadow-amber-900/20',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
};

export function Button({
    variant = 'primary',
    size = 'md',
    icon,
    children,
    isLoading,
    disabled,
    className = '',
    ...props
}: ButtonProps) {
    return (
        <button
            className={`
                inline-flex items-center justify-center gap-2 rounded-lg font-bold
                transition-all duration-150 active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                ${variantClasses[variant]}
                ${sizeClasses[size]}
                ${className}
            `}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
            ) : icon ? (
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
            ) : null}
            {children}
        </button>
    );
}
