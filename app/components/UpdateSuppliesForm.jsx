"use client"

import { useState } from "react";

const UpdateSuppliesForm = () => {
    const initialQuantities = {
        normalFood: "2000",
        specialFood: "1000",
        sand: "5000",
        medKit: "5"
    };

    const [formData, setFormData] = useState(initialQuantities);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleIncrement = (field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: String(parseInt(prevData[field]) + (field === "medKit" ? 1 : 1000))
        }));
    };

    const handleDecrement = (field) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: String(Math.max(0, parseInt(prevData[field]) - (field === "medKit" ? 1 : 1000)))
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/supplies", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log(result);

            result && setSuccessMessage("Success on the shipment, comes in 3 week days");
            setTimeout(() => {
                setSuccessMessage("");
            }, 5000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-[#645751] p-4 rounded-lg mt-4 mb-4">

                <h1 className="text-4xl font-semibold">Supply</h1>
            </div>
            <div className="bg-[#645751] p-10 rounded-2xl px-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {Object.keys(initialQuantities).map((key) => (
                        <div key={key} className=" rounded-lg bg-[#C29B87] p-2 flex items-center justify-between h-16">
                            <label className="text-lg mr-2 w-32">{key === "normalFood" ? "Normal Food" : key === "specialFood" ? "Special Food" : key === "sand" ? "Sand" : "Med Kit"}:</label>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() => handleIncrement(key)}
                                    className="w-8 h-8 bg-[#645751] text-white"
                                >
                                    +
                                </button>
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    readOnly
                                    className="p-2 text-lg mx-2 w-16 bg-white rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDecrement(key)}
                                    className="w-8 h-8 bg-[#645751] text-white"
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="bg-[#97755c] text-white px-4 py-2 rounded-lg"
                    >
                        Update Supplies
                    </button>
                </form>
                {successMessage && <p className="text-green-500 font-semibold text-right mt-5 w-[90%]">{successMessage}</p>}
            </div>
        </div>
    );
};

export default UpdateSuppliesForm;