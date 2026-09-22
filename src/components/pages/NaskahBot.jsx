import { useState } from "react";
import { useParams } from "react-router-dom";
import { Search, ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";

const generateQuestions = (audience) =>
    Array.from({ length: 94 }, (_, i) => ({
        no: i + 1,
        pertanyaan:
            audience === "penyelenggara"
                ? "Apa saja kewajiban saya sebagai penyelenggara"
                : "Apa saja hak saya sebagai peserta",
    }));

const [range, setRange] = useState("7 hari terakhir");
const rangeOptions = [
    "24 jam terakhir",
    "7 hari terakhir",
    "30 hari terakhir",
    "3 bulan terakhir",
];

const PAGE_SIZE = 20;

export default function NaskahBot() {


    const { audience } = useParams();
    const ALL_QUESTIONS = generateQuestions(audience);
    const TOTAL_PAGES = Math.ceil(ALL_QUESTIONS.length / PAGE_SIZE);

    const [statusFilter, setStatusFilter] = useState("semua");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const filtered = ALL_QUESTIONS.filter((q) =>
        q.pertanyaan.toLowerCase().includes(search.toLowerCase())
    );

    const start = (page - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);
    const half = Math.ceil(pageItems.length / 2);
    const leftColumn = pageItems.slice(0, half);
    const rightColumn = pageItems.slice(half);

    const now = new Date();
    const formattedDate = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("id-ID", { hour12: false }) + " WIB";

    return (
        <div>
            {/* Header info tanggal & filter periode */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span>{formattedDate}</span>
                    <span className="text-slate-300">|</span>
                    <span>{formattedTime}</span>
                </div>
                <button className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-sm hover:bg-slate-50">
                    7 hari terakhir
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
            </div>

            {/* Judul */}
            <h1 className="mt-2 text-2xl font-semibold text-slate-800">
                Naskah jawaban bot
            </h1>

            <div className="mt-4 flex items-center gap-3">
                <div className="relative flex-1 max-w-md">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Cari pertanyaan"
                        className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
                <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                    Tambah pertanyaan baru
                </button>
            </div>

            {/* Filter status */}
            <div className="mt-4 flex items-center gap-2">
                <button
                    onClick={() => setStatusFilter("semua")}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${statusFilter === "semua"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-400"
                        }`}
                >
                    Semua
                    <span
                        className={`rounded-full px-1.5 text-xs ${statusFilter === "semua"
                            ? "bg-white/20 text-white"
                            : "bg-slate-200 text-slate-500"
                            }`}
                    >
                        {ALL_QUESTIONS.length}
                    </span>
                </button>
                <button
                    onClick={() => setStatusFilter("belum")}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${statusFilter === "belum"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-400"
                        }`}
                >
                    Belum ada jawaban
                    <span
                        className={`rounded-full px-1.5 text-xs ${statusFilter === "belum"
                            ? "bg-white/20 text-white"
                            : "bg-slate-200 text-slate-500"
                            }`}
                    >
                        {ALL_QUESTIONS.length}
                    </span>
                </button>
            </div>

            {/* Tabel dua kolom */}
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="grid grid-cols-2 divide-x divide-slate-100">
                    <QuestionColumn items={leftColumn} />
                    <QuestionColumn items={rightColumn} />
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="flex items-center gap-1 text-sm text-slate-500 disabled:opacity-30"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-slate-500">
                        Halaman {page} dari {TOTAL_PAGES}
                    </span>
                    <button
                        disabled={page === TOTAL_PAGES}
                        onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                        className="flex items-center gap-1 text-sm text-slate-500 disabled:opacity-30"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <p className="mt-3 text-right text-sm text-slate-400">
                Menampilkan {pageItems.length} dari {filtered.length}
            </p>
        </div>
    );
}

function QuestionColumn({ items }) {
    return (
        <table className="w-full text-sm">
            <thead>
                <tr className="bg-slate-50 text-left text-slate-500">
                    <th className="w-14 px-4 py-2.5 font-medium">No.</th>
                    <th className="px-4 py-2.5 font-medium">Pertanyaan</th>
                    <th className="w-8" />
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr
                        key={item.no}
                        className="cursor-pointer border-t border-slate-50 hover:bg-slate-50"
                    >
                        <td className="px-4 py-3 text-slate-500">{item.no}</td>
                        <td className="px-4 py-3 text-slate-700">{item.pertanyaan}</td>
                        <td className="px-4 py-3 text-slate-300">
                            <ChevronRight className="h-4 w-4" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}