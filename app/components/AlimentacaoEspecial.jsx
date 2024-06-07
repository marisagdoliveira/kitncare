import { useEffect, useState } from "react";
import PieChart from "./graficos/PieChart";

export default function AlimentacaoEspecial() {
    const [totalConsumo, setTotalConsumo] = useState(0);
    const [totalRecursos, setTotalRecursos] = useState(0);
    const [daysRemaining, setDaysRemaining] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const consumptionResponse = await fetch("/api/catsConsumption");
                const consumptionData = await consumptionResponse.json();
                const specialFoodConsumption = consumptionData.specialFoodConsumption;

                const suppliesResponse = await fetch("/api/supplies");
                const suppliesData = await suppliesResponse.json();
                const specialFoodSupply = suppliesData[0].specialFood;

                const daysRemaining = Math.round(specialFoodSupply / specialFoodConsumption);

                setTotalConsumo(specialFoodConsumption / 1000); // gr para KG
                setTotalRecursos(specialFoodSupply / 1000); // gr para KG
                setDaysRemaining(daysRemaining);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="rounded-2xl bg-[#D9BFB0] py-10 px-5 shadow-lg">
            <div className="w-[300px] h-[200px] flex flex-col gap-2 justify-center items-center">
                <h1 className="text-xl font-bold text-[#72625A] ">Special Food</h1>
                <PieChart totalRecursos={totalRecursos} totalConsumo={totalConsumo} />
                <div className='flex gap-2 justify-center font-semibold text-zinc-500'>
                    <p>Demand: {totalConsumo}kg</p>
                    <p>Supply: {totalRecursos}kg</p>
                    <p>Days Remaining: {daysRemaining}</p>
                </div>
            </div>
        </div>
    );
}
