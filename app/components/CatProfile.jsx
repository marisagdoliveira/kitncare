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
                    const supplies = data[0]; // Assuming the supplies data is returned as an array with one object
                    const totalAvailableFood = cat.consumption.foodType === "Special" ? supplies.specialFood : supplies.normalFood;
                    const totalCats = await getTotalCats(); // Assume you have a function to get total cats from the API
                    if (totalAvailableFood && totalCats) {
                        const totalResourcesForCat = totalAvailableFood / totalCats;
                        setTotalRecursos(Math.round(totalResourcesForCat));
                        // Extract only numbers from cat.consumption.quantity
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
            return data.length; // Assuming data is an array of cat objects
        } catch (error) {
            console.error("Error fetching total cats:", error);
            return 0;
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white/90 rounded-lg w-[90%] p-5 flex flex-col items-center">

                {cat && (
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="size-32 bg-black mb-5  rounded-full">

                            <img
                                src={imgPath}
                                alt="Cat Pic"
                                className="object-cover w-full h-full rounded-full"
                            />
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-center">{cat.name}</h2>
                        <div className="text-center">
                            <div className="flex justify-between">
                                <p className="font-semibold text-yellow-600 ">Age: </p>
                                <p className="ml-10 font-bold text-yellow-800">{cat.age}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-yellow-600 mt-5 ">Sex: </p>
                                <p className="ml-10 font-bold text-yellow-800 mt-5">{cat.sex}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-yellow-600 mt-5">Castrated: </p>
                                <p className="ml-10 font-bold text-yellow-800 mt-5">{cat.castrated ? "Yes" : "No"}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-semibold text-yellow-600 mt-5">Size: </p>
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
                <button className="text-white" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default CatProfile;