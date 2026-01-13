import React from "react";

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    subtitle: string;
    chartPath: string; // SVG Path d
    chartStrokePath: string; // SVG Stroke Path d
    gradientId: string;
}

export default function StatCard({
    title,
    value,
    change,
    isPositive,
    subtitle,
    chartPath,
    chartStrokePath,
    gradientId,
}: StatCardProps) {
    return (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-sm flex flex-col justify-between h-[200px] overflow-hidden group hover:border-amber-500/30 transition-colors">
            <div className="p-6 pb-0">
                <p className="text-sm font-semibold text-slate-400 mb-1">{title}</p>
                <div className="flex items-end gap-3 mb-2">
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                        {value}
                    </h3>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-amber-500 bg-[#2D2A26] border border-amber-500/10 font-semibold text-xs">
                        {isPositive ? "+" : ""}
                        {change}
                    </span>
                    <span className="text-slate-500">{subtitle}</span>
                </div>
            </div>
            <div className="relative h-24 w-full mt-auto">
                <svg
                    className="absolute inset-0 h-full w-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 40"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3"></stop>
                            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"></stop>
                        </linearGradient>
                    </defs>
                    <path d={chartPath} fill={`url(#${gradientId})`}></path>
                    <path
                        d={chartStrokePath}
                        stroke="#F59E0B"
                        strokeLinecap="round"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    ></path>
                </svg>
            </div>
        </div>
    );
}
