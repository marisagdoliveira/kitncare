import { useEffect, useState } from "react";
import DoughnutChart from "./graficos/DoughnutChart";

export default function AlimentacaoTotal() {
    const [totalConsumo, setTotalConsumo] = useState(0);
    const [totalRecursos, setTotalRecursos] = useState(0);
    const [daysRemaining, setDaysRemaining] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const consumptionResponse = await fetch("/api/catsConsumption");
                const consumptionData = await consumptionResponse.json();
                
                console.log("Consumption Data:", consumptionData);
                
                const normalFoodConsumption = consumptionData.normalFoodConsumption;

                const suppliesResponse = await fetch("/api/supplies");
                const suppliesData = await suppliesResponse.json();
                
                console.log("Supplies Data:", suppliesData);

                const normalFoodSupply = suppliesData[0].normalFood;

                console.log("Normal Food Supply (grams):", normalFoodSupply);

                const normalFoodDaysRemaining  = Math.round(normalFoodSupply / normalFoodConsumption)

                setDaysRemaining(normalFoodDaysRemaining)
                setTotalConsumo(normalFoodConsumption / 1000); // gr to KG
                setTotalRecursos(normalFoodSupply / 1000); // gr to KG
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="rounded-2xl bg-[#C29B87] p-5 shadow-lg">
            <div className="w-[300px] h-[200px] flex flex-col gap-2 justify-center items-center">
                <h1 className="text-xl font-bold text-[#72625A]">Normal Food</h1>
                <DoughnutChart totalRecursos={totalRecursos} totalConsumo={totalConsumo} />
                <div className='flex justify-center gap-1 px-4 justify-center font-semibold text-[#72625A]'>
                    <div className="rounded-xl px-4 shadow-md bg-[#f0cdbb] flex flex-col items-center justify-center"><p>Demand: {totalConsumo}kg</p></div>
                    <div className="rounded-xl px-4 shadow-md bg-[#6f4f3f] text-[#f0cdbb] flex flex-col items-center justify-center" ><p>Supply: {totalRecursos}kg</p></div>
                    <div className="rounded-xl px-4 shadow-md bg-[#f0cdbb] flex flex-col items-center justify-center"><p>Days Remaining: {daysRemaining}</p></div>
                </div>
            </div>
        </div>
    );
}
