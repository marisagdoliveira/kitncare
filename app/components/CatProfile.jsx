"use client"

import React, { useState, useEffect } from "react";
import DoughnutChart from "./graficos/DoughnutChart";

const CatProfile = ({ cat, onClose, imgPath }) => {
    const [totalRecursos, setTotalRecursos] = useState(0);
    const [totalConsumo, setTotalConsumo] = useState(0);

    useEffect(() => {
        const fetchSuppliesData = async () => {
            try {
                const res = await fetch("/api/supplies");
                const data = await res.json();
                if (data && data.length > 0) {
                    const supplies = data[0];
                    const totalAvailableFood = cat.consumption.foodType === "Special" ? supplies.specialFood : supplies.normalFood;
                    const totalCats = await getTotalCats();
                    if (totalAvailableFood && totalCats) {
                        const totalResourcesForCat = totalAvailableFood / totalCats;
                        setTotalRecursos(Math.round(totalResourcesForCat));

                        const quantity = cat.consumption.quantity;
                        const extractedNumbers = quantity.match(/\d+/g);
                        if (extractedNumbers && extractedNumbers.length > 0) {
                            const totalQuantity = extractedNumbers.reduce((acc, num) => acc + parseInt(num), 0);
                            setTotalConsumo(totalQuantity);
                        } else {
                            console.error("No numbers found in quantity:", quantity);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching supplies:", error);
            }
        };

        fetchSuppliesData();
    }, [cat]);

    const getTotalCats = async () => {
        try {
            const res = await fetch("/api/cats");
            const data = await res.json();
            return data.length; 
        } catch (error) {
            console.error("Error fetching total cats:", error);
            return 0;
        }
    };

    const handleAdopt = async () => {
        const confirmed = window.confirm("Are you sure you want to adopt this cat?");
        if (confirmed) {
            try {
                const res = await fetch(`/api/adoptCat?catId=${cat._id}`, {
                    method: 'GET',
                });
                if (res.ok) {
                    const adoptedCat = await res.json();
                    alert(`${adoptedCat.name} has been adopted successfully!`);
                    onClose();
                } else {
                    console.error("Failed to adopt cat:", await res.json());
                    alert("Failed to adopt the cat. Please try again.");
                }
            } catch (error) {
                console.error("Error adopting cat:", error);
                alert("An error occurred while adopting the cat. Please try again.");
            }
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">

            <div className="bg-white/90 rounded-lg w-[90%] p-5 flex flex-col items-center">
                {cat && (
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="size-32 bg-black mb-5 rounded-full">
                            <img
                                src={imgPath}
                                alt="Cat Pic"
                                className="object-cover w-full h-full rounded-full"
                            />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-center">{cat.name}</h2>
                        <div className="text-center">
                            <div className="flex justify-between">
                                <p className="font-semibold text-yellow-600">Age:</p>
                                <p className="ml-10 font-bold text-yellow-800">{cat.age}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-yellow-600 mt-5">Gender:</p>
                                <p className="ml-10 font-bold text-yellow-800 mt-5">{cat.sex}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-yellow-600 mt-5">Castrated:</p>
                                <p className="ml-10 font-bold text-yellow-800 mt-5">{cat.castrated ? "Yes" : "No"}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-yellow-600 mt-5">Size:</p>
                                <p className="ml-10 font-bold text-yellow-800 mt-5">{cat.size}</p>
                            </div>
                            <div className="flex gap-5 mt-8 items-center">
                                <div className="flex flex-col gap-2">
                                    <p>Supply p/kitten: {totalRecursos}/gr</p>
                                    <p>{cat.name}'s apetite: {totalConsumo}/gr</p>
                                </div>
                                <DoughnutChart totalRecursos={totalRecursos} totalConsumo={totalConsumo} />
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex gap-4">
                    <button className="text-white bg-[#c0a597] px-4 py-2 rounded" onClick={handleAdopt}>
                        Adopt
                    </button>
                    <button className="text-white bg-[#574c46] px-4 py-2 rounded" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CatProfile;