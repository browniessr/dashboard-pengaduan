import { useState } from "react";
import { BarChart3 } from "lucide-react";

const topics = [
    { label: "Topik 1", value: 18, color: "bg-blue-200" },
    { label: "Topik 2", value: 92, color: "bg-slate-800" },
    { label: "Topik 3", value: 60, color: "bg-blue-300" },
    { label: "Topik 4", value: 78, color: "bg-blue-500" },
    { label: "Topik 5", value: 50, color: "bg-slate-400" },
    { label: "Topik 6", value: 98, color: "bg-blue-600" },
];

export default function AnsweredComplaintsCard() {
    const [activeIndex, setActiveIndex] = useState(2);
    const maxVal = Math.max(...topics.map((t) => t.value));

    return (
        <div className="bg-gradient-to-b from-sky-50 to-blue-100/50 rounded-3xl shadow-sm p-8 w-full max-w-xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-800">
                    12,345 aduan sudah dijawab petugas
                </h2>
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-700 shrink-0">
                    <BarChart3 className="h-4 w-4" strokeWidth={2} />
                </div>
            </div>

            <p className="text-sm text-slate-500 mt-2 max-w-md">
                Dari 345,678 aduan yang diantar ke petugas, 345 aduan sudah dijawab petugas
            </p>

            {/* Subheader */}
            <div className="flex items-center justify-between mt-8 mb-6">
                <p className="text-sm text-slate-500">Daftar aduan berdasarkan topik perkara</p>
                <span className="text-sm text-slate-400">{topics.length} topik perkara</span>
            </div>

            {/* Bar chart */}
            <div className="flex items-end justify-between gap-3 h-44 px-1">
                {topics.map((t, i) => {
                    const heightPct = Math.max((t.value / maxVal) * 100, 15);
                    return (
                        <button
                            key={t.label}
                            type="button"
                            onClick={() => setActiveIndex(i)}
                            className="flex flex-col items-center flex-1 h-full justify-end"
                        >
                            <div
                                className={`w-8 sm:w-10 rounded-full transition-all ${i === activeIndex ? "bg-blue-500" : t.color}`}
                                style={{ height: `${heightPct}%` }}
                            />
                            <span className="mt-2 text-xs text-slate-400">{i + 1}</span>
                        </button>
                    );
                })}
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mt-6">
                {topics.map((t, i) => (
                    <button
                        key={t.label}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${i === activeIndex
                            ? "bg-blue-200 text-blue-800"
                            : "bg-white text-slate-600 hover:bg-blue-50"
                            }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
        </div>
    );
}