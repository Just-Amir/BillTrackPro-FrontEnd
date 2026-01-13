interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
};

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
    return (
        <div className={`animate-spin rounded-full border-t-2 border-b-2 border-amber-500 ${sizeClasses[size]} ${className}`} />
    );
}

export function PageLoader() {
    return (
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="md" />
        </div>
    );
}
