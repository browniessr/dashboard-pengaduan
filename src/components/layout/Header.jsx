import { NavLink, useLocation } from "react-router-dom";

const tabs = [
    { label: "Peserta", key: "peserta" },
    { label: "Penyelenggara", key: "penyelenggara" },
];

export default function Tabs() {
    const location = useLocation();
    // ambil nama halaman setelah audience, misal "/peserta/naskah-bot" -> "naskah-bot"
    const currentPage = location.pathname.split("/")[2] || "ringkasan";

    return (
        <div className="inline-flex items-center gap-1 bg-transparent">
            {tabs.map((tab) => (
                <NavLink
                    key={tab.key}
                    to={`/${tab.key}/${currentPage}`}
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-full text-sm font-medium leading-none transition ${isActive
                            ? "bg-white text-navy shadow-sm"
                            : "text-gray-400 hover:text-gray-600"
                        }`
                    }
                >
                    {tab.label}
                </NavLink>
            ))}
        </div>
    );
}
