type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
    variant?: BadgeVariant;
    children: React.ReactNode;
    className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
    success: 'bg-emerald-900/30 text-emerald-200 border-emerald-800/30',
    warning: 'bg-amber-900/30 text-amber-200 border-amber-800/30',
    danger: 'bg-rose-900/30 text-rose-200 border-rose-800/30',
    info: 'bg-blue-900/30 text-blue-200 border-blue-800/30',
    neutral: 'bg-slate-700 text-slate-200 border-slate-600',
};

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
    return (
        <span className={`
            inline-flex items-center justify-center px-2.5 py-1 
            rounded-md text-xs font-semibold border
            ${variantClasses[variant]}
            ${className}
        `}>
            {children}
        </span>
    );
}

// Status-specific badges for common use cases
export function StatusBadge({ status }: { status: string }) {
    const variant: BadgeVariant =
        status === 'Paid' || status === 'All Paid' || status === 'Active' ? 'success' :
            status === 'Pending' ? 'warning' :
                status === 'Overdue' || status === 'Inactive' ? 'danger' : 'neutral';

    return <Badge variant={variant}>{status}</Badge>;
}
