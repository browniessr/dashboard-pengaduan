const data = [
    { label: "Perkara 1", value: 18, color: "#0F2A4A" },
    { label: "Perkara 2", value: 16, color: "#1F6FEB" },
    { label: "Perkara 3", value: 14, color: "#3B8AF2" },
    { label: "Perkara 4", value: 12, color: "#7FB2F5" },
    { label: "Perkara 5", value: 10, color: "#C6DEFB" },
    { label: "Total pesan masuk", value: 30, color: "#CBD5E1" },
];

export default function SensitiveCategoryPieCard() {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const radius = 90;
    const cx = 100;
    const cy = 100;

    let cumulative = 0;
    const slices = data.map((d) => {
        const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
        cumulative += d.value;
        const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;

        const x1 = cx + radius * Math.cos(startAngle);
        const y1 = cy + radius * Math.sin(startAngle);
        const x2 = cx + radius * Math.cos(endAngle);
        const y2 = cy + radius * Math.sin(endAngle);
        const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
        return { ...d, path };
    });

    return (
        <div className="bg-gradient-to-b from-sky-50 to-blue-100/60 rounded-3xl shadow-sm p-8 w-full max-w-xl">
            {/* Header */}
            <div className="flex items-center gap-2 mb-10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-900">
                    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                    <path d="M21 4v5h-5" />
                </svg>
                <h3 className="text-base font-bold text-slate-900">
                    Kategori perkara sensitif untuk dijawab oleh bot
                </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
                {/* Pie chart */}
                <svg viewBox="0 0 200 200" className="w-56 h-56 shrink-0">
                    {slices.map((s) => (
                        <path key={s.label} d={s.path} fill={s.color}>
                            <title>{`${s.label}: ${s.value}`}</title>
                        </path>
                    ))}
                </svg>

                {/* Legend */}
                <div>
                    <p className="text-lg font-semibold text-slate-900 mb-4">Daftar perkara</p>
                    <ul className="space-y-3">
                        {data.map((d) => (
                            <li key={d.label} className="flex items-center gap-3 text-sm text-slate-700">
                                <span
                                    className="inline-block h-4 w-4 rounded-md"
                                    style={{ backgroundColor: d.color }}
                                />
                                {d.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}