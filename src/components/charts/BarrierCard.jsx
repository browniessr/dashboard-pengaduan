function DonutSlice({ radius, strokeWidth, percent, offsetPercent, color }) {
    const circumference = 2 * Math.PI * radius;
    const dash = (percent / 100) * circumference;
    const gap = circumference - dash;
    const rotation = -90 + (offsetPercent / 100) * 360;

    return (
        <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${gap}`}
            transform={`rotate(${rotation} 100 100)`}
            strokeLinecap="butt"
        />
    );
}

export default function BarrierCard() {
    const data = [
        { label: "Butuh respon petugas", percent: 25, color: "#2F6BFF" },
        { label: "Perkara sensitif untuk dijawab bot", percent: 15.6, color: "#8FC1F5" },
        { label: "Jawaban belum tersedia", percent: 59.4, color: "#12294D" },
    ];

    let cumulative = 0;
    const slices = data.map((d) => {
        const slice = { ...d, offset: cumulative };
        cumulative += d.percent;
        return slice;
    });

    const mainPercent = data.find((d) => d.label === "Jawaban belum tersedia")?.percent;

    return (
        <div className="bg-gradient-to-b from-white to-slate-100/70 rounded-3xl shadow-sm p-8 flex-1">
            {/* Header */}
            <div className="flex items-center gap-2 mb-8">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-navy shrink-0">
                    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                    <path d="M21 4v5h-5" />
                </svg>
                <h3 className="text-base font-bold text-navy leading-snug">
                    Faktor hambatan aduan
                    <br />
                    yang belum ada jawaban
                </h3>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-3 mb-10">
                {data.map((d) => (
                    <span key={d.label} className="flex items-center gap-3 text-sm text-slate-700">
                        <span
                            className="w-7 h-2.5 rounded-full inline-block shrink-0"
                            style={{ backgroundColor: d.color }}
                        />
                        {d.label}
                    </span>
                ))}
            </div>

            {/* Donut chart */}
            <div className="relative w-56 h-56 mx-auto">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    {slices.map((s) => (
                        <DonutSlice
                            key={s.label}
                            radius={80}
                            strokeWidth={34}
                            percent={s.percent}
                            offsetPercent={s.offset}
                            color={s.color}
                        />
                    ))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-navy">
                    {mainPercent}%
                </div>
            </div>
        </div>
    );
}
