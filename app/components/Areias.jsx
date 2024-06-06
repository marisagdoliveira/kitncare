import { useEffect, useState } from "react";
import ProgressBar from "./graficos/ProgressBar";

export default function Areias() {
    const [totalConsumo, setTotalConsumo] = useState(0);
    const [totalRecursos, setTotalRecursos] = useState(0);
    const [daysRemaining, setDaysRemaining] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const consumptionResponse = await fetch("/api/catsConsumption");
                const consumptionData = await consumptionResponse.json();
                const sandConsumption = consumptionData.sandConsumption;

                const suppliesResponse = await fetch("/api/supplies");
                const suppliesData = await suppliesResponse.json();
                const sandSupply = suppliesData[0].sand;

                const daysRemaining = Math.round(sandSupply / sandConsumption);

                setTotalConsumo(sandConsumption / 1000); // gr para KG
                setTotalRecursos(sandSupply / 1000); // gr para KG
                setDaysRemaining(daysRemaining);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="rounded-2xl bg-white/80 p-5 shadow-lg">
            <div className="w-[300px] h-[100px] flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold text-[#cfab6d]">Areias</h1>
                <ProgressBar totalRecursos={totalRecursos} totalConsumo={totalConsumo}/>
                <div className='flex gap-2 justify-center font-semibold text-zinc-500'>
                    <p>Demand: {totalConsumo}kg</p>
                    <p>Supply: {totalRecursos}kg</p>
                    <p>Days Remaining: {daysRemaining}</p>
                </div>
            </div>
        </div>
    );
}
