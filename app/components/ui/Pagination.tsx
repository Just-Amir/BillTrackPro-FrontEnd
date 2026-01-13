"use client";

import { Button } from "./Button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
    if (totalPages <= 1) return null;

    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <Button
                variant="secondary"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="disabled:opacity-50"
            >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
            </Button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${1 === currentPage
                                ? "bg-amber-500 text-black font-bold"
                                : "text-slate-400 hover:text-white hover:bg-slate-700"
                            }`}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="text-slate-600">...</span>}
                </>
            )}

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                            ? "bg-amber-500 text-black font-bold"
                            : "text-slate-400 hover:text-white hover:bg-slate-700"
                        }`}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="text-slate-600">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${totalPages === currentPage
                                ? "bg-amber-500 text-black font-bold"
                                : "text-slate-400 hover:text-white hover:bg-slate-700"
                            }`}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <Button
                variant="secondary"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="disabled:opacity-50"
            >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
            </Button>
        </div>
    );
}
