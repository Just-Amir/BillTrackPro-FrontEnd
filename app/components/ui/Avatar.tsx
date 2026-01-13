interface AvatarProps {
    src?: string;
    alt: string;
    fallback?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
};

export function Avatar({ src, alt, fallback, size = 'md', className = '' }: AvatarProps) {
    const initials = fallback || alt.substring(0, 2).toUpperCase();

    return (
        <div className={`
            rounded-xl bg-slate-700 flex items-center justify-center
            shrink-0 border border-slate-600 overflow-hidden
            text-slate-400 font-bold
            ${sizeClasses[size]}
            ${className}
        `}>
            {src ? (
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            ) : (
                initials
            )}
        </div>
    );
}
