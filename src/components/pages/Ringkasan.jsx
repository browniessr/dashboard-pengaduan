import { useState } from "react";
import SummaryCard from "../charts/LineChartCard";
import DistributionCard from "../charts/Distribution";
import BarrierCard from "../charts/BarrierCard";
import TopicFunnelCard from "../charts/TopicCharts";
import ChatbotUsageCard from "../charts/ChatbotUsage";
import Dropdown from "../ui/Dropdown";
import AnsweredComplaintsCard from "../charts/AnsweredCharts";
import SensitiveCategoryPieCard from "../charts/SensitiveCategory";

export default function Ringkasan() {
    const [range, setRange] = useState("7 hari terakhir");
    const rangeOptions = [
        "24 jam terakhir",
        "7 hari terakhir",
        "30 hari terakhir",
        "3 bulan terakhir",
    ];

    return (
        <>
            <div className="flex items-center justify-end mb-6">
                <Dropdown options={rangeOptions} value={range} onChange={setRange} />
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex gap-6 items-start">
                    <SummaryCard />
                    <DistributionCard />
                    <BarrierCard />
                </div>

                <div className="flex gap-6 items-start">
                    <ChatbotUsageCard />
                    <TopicFunnelCard />
                </div>

                <div className="flex gap-6 items-start">
                    <AnsweredComplaintsCard />
                    <SensitiveCategoryPieCard />
                </div>
            </div>
        </>
    );
}