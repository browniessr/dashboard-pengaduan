import { useState } from "react";
import { BarChart3 } from "lucide-react";

const topics = [
    { label: "Uang saku", value: 109136, width: "94%", gradient: "from-slate-800 to-slate-700" },
    { label: "Penandatanganan perjanjian magang", value: 89136, width: "85%", gradient: "from-blue-700 to-blue-600" },
    { label: "Perjanjian magang belum muncul", value: 69136, width: "76%", gradient: "from-blue-500 to-blue-500" },
    { label: "Kapan mentor menyetujui laporan magang", value: 49136, width: "67%", gradient: "from-blue-400 to-blue-400" },
    { label: "Besaran uang saku tidak sama setiap bulan", value: 29134, width: "58%", gradient: "from-blue-200 to-blue-200" },
];

const months = [
    { name: "Jan", value: 35 },
    { name: "Feb", value: 78 },
    { name: "Mar", value: 55 },
    { name: "Apr", value: 60 },
    { name: "May", value: 48 },
    { name: "Jun", value: 96, active: true },
    { name: "Jul", value: 44 },
    { name: "Aug", value: 82 },
    { name: "Sep", value: 22 },
    { name: "Oct", value: 65 },
    { name: "Nov", value: 38 },
    { name: "Dec", value: 58 },
];

const filters = ["24h", "1d", "3d", "1w", "3w", "1m"];

export default function TopicFunnelCard() {
    const [activeFilter, setActiveFilter] = useState("3d");
    const rowHeight = 44;
    const chartHeight = rowHeight * topics.length;

    return (
        <div className="bg-gradient-to-b from-sky-50 to-blue-100/30 rounded-3xl shadow-sm p-8 w-full border-2 border-dashed border-blue-200">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold text-slate-800 flex-1">
                    345,678 aduan diantar ke petugas
                </h2>
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-700 shrink-0">
                    <BarChart3 className="h-4 w-4" strokeWidth={2} />
                </div>
            </div>

            {/* Subheader */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-500">Daftar aduan berdasarkan topik perkara</p>
                <span className="text-sm text-slate-400">{topics.length} topik perkara</span>
            </div>

            {/* Funnel chart */}
            <div className="relative mb-6" style={{ height: chartHeight }}>
                {[...topics, null].map((_, i) => (
                    <div
                        key={i}
                        className="absolute left-0 right-0 flex items-center"
                        style={{ top: i * rowHeight }}
                    >
                        <span className="text-xs text-slate-400 w-4">{topics.length - i}</span>
                        <div className="flex-1 border-t border-dashed border-blue-200 ml-2" />
                    </div>
                ))}

                {topics.map((topic, i) => (
                    <div
                        key={topic.label}
                        className={`absolute left-8 flex items-center justify-between text-white text-xs sm:text-sm font-medium px-4 rounded-r-full bg-gradient-to-r ${topic.gradient} ${i >= 3 ? "!text-slate-700" : ""}`}
                        style={{
                            top: i * rowHeight + 4,
                            height: rowHeight - 8,
                            width: topic.width,
                        }}
                    >
                        <span className="truncate pr-3">{topic.label}</span>
                        <span className="shrink-0">{topic.value.toLocaleString("id-ID")}</span>
                    </div>
                ))}
            </div>

            <p className="text-xs text-slate-400 text-right mt-4 mb-3">345,678 aduan</p>

            {/* Filter pills */}
            <div className="flex gap-2 mb-8">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${activeFilter === f
                            ? "bg-blue-600 text-white"
                            : "bg-white text-slate-500 hover:bg-blue-50"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Monthly bar chart */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 border-t-2 border-dashed border-blue-400" />
                    <span className="text-xs font-semibold text-slate-600">MAX</span>
                </div>

                <div className="flex items-end justify-between gap-2">
                    {months.map((m) => (
                        <div key={m.name} className="flex flex-col items-center gap-2 flex-1">
                            <div className="w-full h-40 flex items-end">
                                <div
                                    className={`w-full rounded-full ${m.active ? "bg-blue-600" : "bg-blue-100"
                                        }`}
                                    style={{ height: `${m.value}%` }}
                                />
                            </div>
                            <span className="text-xs text-slate-400">{m.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
