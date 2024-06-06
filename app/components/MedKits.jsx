import React, { useEffect, useState } from 'react';
import BarChart from './graficos/BarChart';

export default function MedKits() {
    const [medkitsConsumption, setMedkitsConsumption] = useState(0);
    const [medkitsSupply, setMedkitsSupply] = useState(0);
    const [daysRemaining, setDaysRemaining] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const consumptionResponse = await fetch('/api/catsConsumption');
                const consumptionData = await consumptionResponse.json();
                const medkitsConsumed = consumptionData.medkits;

                const suppliesResponse = await fetch('/api/supplies');
                const suppliesData = await suppliesResponse.json();
                const medkitsAvailable = suppliesData[0].medKit;

                const daysRemaining = Math.round(medkitsAvailable / medkitsConsumed);

                setMedkitsConsumption(medkitsConsumed);
                setMedkitsSupply(medkitsAvailable);
                setDaysRemaining(daysRemaining);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="rounded-2xl bg-[#181818] px-5 py-10 shadow-lg">
            <div className="w-[300px] h-[200px] flex flex-col gap-2 justify-center items-center">
                <h1 className="text-xl font-bold text-[#cfab6d]">Medical Kits</h1>
                <BarChart totalRecursos={medkitsSupply} totalConsumo={medkitsConsumption} />
                <div className='flex gap-10 w-[30px] justify-center font-semibold text-zinc-500'>
                    <p>Demand: {medkitsConsumption} medkits</p>
                    <p>Supply: {medkitsSupply} medkits</p>
                    <p>Days Remaining: {daysRemaining}</p>
                </div>
            </div>
        </div>
    );
}
