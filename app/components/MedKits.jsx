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
        <div className="rounded-2xl bg-[#D9BFB0] px-5 py-10 shadow-lg">
            <div className="w-[300px] h-[200px] flex flex-col gap-2 justify-center items-center">
                <h1 className="text-xl font-bold text-black">Medical Kits</h1>
                <BarChart totalRecursos={medkitsSupply} totalConsumo={medkitsConsumption} />
                <div className='flex gap-4 w-[30px] justify-center font-semibold text-black'>
                    <div className="rounded-xl p-2 shadow-md bg-[#654230] text-white flex flex-col items-center justify-center"><p>Demand: {medkitsConsumption} medkits</p></div>
                    <div className="rounded-xl p-2 shadow-md bg-[#f0cdbb] flex flex-col items-center justify-center"><p>Supply: {medkitsSupply} medkits</p></div>
                    <div className="rounded-xl p-2 shadow-md bg-[#654230] flex text-white flex-col items-center justify-center"><p>Days Remaining: {daysRemaining}</p></div>
                </div>
            </div>
        </div>
    );
}
