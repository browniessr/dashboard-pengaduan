import { useState } from "react";
import { Search, ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";

// Data dummy — ganti dengan hasil fetch dari API kamu
const generateMessages = () =>
    Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        waktuMasuk: "21 Sep 2026, 10.22",
        nomorWhatsapp: "0856718678902",
        kalimatTerakhir: "Selamat siang saya mau tanya",
        alasanDiantar: "Belum ada di naskah",
    }));

const ALL_MESSAGES = generateMessages();
const PAGE_SIZE = 10;

export default function KotakMasuk() {
    const [statusFilter, setStatusFilter] = useState("semua");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const filtered = ALL_MESSAGES.filter((m) =>
        m.kalimatTerakhir.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

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

            <h1 className="mt-2 text-2xl font-semibold text-slate-800">
                Kotak masuk
            </h1>

            {/* Filter status + search */}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setStatusFilter("semua");
                            setPage(1);
                        }}
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
                            {ALL_MESSAGES.length}
                        </span>
                    </button>
                    <button
                        onClick={() => {
                            setStatusFilter("belum");
                            setPage(1);
                        }}
                        className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${statusFilter === "belum"
                            ? "bg-slate-800 text-white"
                            : "bg-slate-100 text-slate-400"
                            }`}
                    >
                        Belum dibalas
                        <span
                            className={`rounded-full px-1.5 text-xs ${statusFilter === "belum"
                                ? "bg-white/20 text-white"
                                : "bg-slate-200 text-slate-500"
                                }`}
                        >
                            {ALL_MESSAGES.length}
                        </span>
                    </button>
                </div>

                <div className="relative w-64">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Cari pesan warga"
                        className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
            </div>

            {/* Tabel pesan */}
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 text-left text-slate-500">
                            <th className="px-4 py-2.5 font-medium">Waktu masuk</th>
                            <th className="px-4 py-2.5 font-medium">Nomor WhatsApp</th>
                            <th className="px-4 py-2.5 font-medium">
                                Kalimat terakhir dari warga
                            </th>
                            <th className="px-4 py-2.5 font-medium">Alasan diantar</th>
                            <th className="w-8" />
                        </tr>
                    </thead>
                    <tbody>
                        {pageItems.map((item) => (
                            <tr
                                key={item.id}
                                className="cursor-pointer border-t border-slate-50 hover:bg-slate-50"
                            >
                                <td className="whitespace-nowrap px-4 py-3 text-blue-700 font-medium">
                                    {item.waktuMasuk}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                                    {item.nomorWhatsapp}
                                </td>
                                <td className="px-4 py-3 text-slate-700">
                                    {item.kalimatTerakhir}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                                    {item.alasanDiantar}
                                </td>
                                <td className="px-4 py-3 text-slate-300">
                                    <ChevronRight className="h-4 w-4" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="flex items-center gap-1 text-sm text-slate-500 disabled:opacity-30"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Halaman {page} dari {totalPages}</span>
                    </button>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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