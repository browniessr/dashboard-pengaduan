import { NavLink } from "react-router-dom";

const menu = [
    { label: "Ringkasan", icon: "🏠", path: "/ringkasan" },
    { label: "Naskah bot", icon: "📄", path: "/naskah-bot" },
    { label: "Kotak masuk", icon: "📥", path: "/kotak-masuk" },
];

export default function Sidebar({ adminName = "Admin", adminUsername = "akunakun", onLogout }) {
    return (
        <>
            {/* Sidebar asli — fixed, lepas dari alur layout */}
            <aside className="fixed left-0 top-0 h-screen w-56 shrink-0 px-4 py-6 flex flex-col justify-between bg-slate-50 border-r border-gray-200 z-20">
                <div>
                    <div className="flex items-center gap-2 mb-10">
                        <div className="w-9 h-9 rounded-md bg-navy" />
                        <div className="text-sm font-semibold leading-tight text-navy">
                            Layanan Aduan
                            <br />
                            Magang Nasional
                        </div>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {menu.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition text-left ${isActive
                                        ? "bg-white text-navy font-medium shadow-sm"
                                        : "text-gray-600 hover:bg-white hover:text-navy"
                                    }`
                                }
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Profil admin — tetap di bawah, gak ikut ke-scroll karena sidebar fixed */}
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-gray-300 shrink-0" />
                        <div className="leading-tight">
                            <p className="text-sm font-semibold text-navy">{adminName}</p>
                            <p className="text-xs text-gray-400">@{adminUsername}</p>
                        </div>
                    </div>

                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition w-full text-left"
                    >
                        <span>↩</span>
                        Keluar
                    </button>
                </div>
            </aside>

            {/* Spacer — elemen kosong seukuran sidebar, ikut alur layout normal.
                Ini yang "mendorong" konten di sebelahnya biar gak ketutupan
                sidebar yang fixed, tanpa perlu nambahin ml-56 manual di tempat lain. */}
            <div className="w-56 shrink-0 h-screen" aria-hidden="true" />
        </>
    );
}
