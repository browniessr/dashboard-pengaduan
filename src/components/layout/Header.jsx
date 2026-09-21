import { NavLink } from "react-router-dom";

const tabs = [
    { label: "Peserta", path: "/peserta" },
    { label: "Penyelenggara", path: "/penyelenggara" },
];

export default function Tabs() {
    return (
        <div className="inline-flex items-center gap-1 bg-transparent">
            {tabs.map((tab) => (
                <NavLink
                    key={tab.label}
                    to={tab.path}
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
