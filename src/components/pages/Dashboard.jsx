import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Tabs from "../layout/Header";
import Ringkasan from "./Ringkasan";
import NaskahBot from "./NaskahBot";
import KotakMasuk from "./KotakMasuk";

export default function Dashboard({ onLogout }) {
    return (
        <div className="flex">
            <Sidebar onLogout={onLogout} />
            <div className="flex-1 p-8">
                <Tabs />
                <Routes>
                    <Route path="/" element={<Navigate to="/peserta/ringkasan" replace />} />
                    <Route path="/:audience/ringkasan" element={<Ringkasan />} />
                    <Route path="/:audience/naskah-bot" element={<NaskahBot />} />
                    <Route path="/:audience/kotak-masuk" element={<KotakMasuk />} />
                </Routes>
            </div>
        </div>
    );
}
