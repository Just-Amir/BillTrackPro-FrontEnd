interface ErrorDisplayProps {
    title?: string;
    message: string;
    onRetry?: () => void;
}

export function ErrorDisplay({ title = 'Error', message, onRetry }: ErrorDisplayProps) {
    return (
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
            <div className="text-red-400 bg-red-900/20 px-6 py-4 rounded-lg border border-red-800 max-w-md">
                <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[20px]">error</span>
                    <p className="font-semibold">{title}</p>
                </div>
                <p className="text-sm text-red-300">{message}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-4 px-4 py-2 bg-red-800/50 hover:bg-red-800 rounded-lg text-sm font-medium transition-colors"
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
}

export function InlineError({ message }: { message: string }) {
    return (
        <div className="text-red-400 bg-red-900/20 px-4 py-3 rounded-lg border border-red-800 text-sm">
            {message}
        </div>
    );
}
