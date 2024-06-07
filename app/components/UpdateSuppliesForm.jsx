import { useState } from "react";

const UpdateSuppliesForm = () => {
    const defaultValues = {
        normalFood: "2000",
        specialFood: "1000",
        sand: "5000",
        medKit: "5"
    };

    const [formData, setFormData] = useState(defaultValues);
    const [quantities, setQuantities] = useState(defaultValues);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleIncrement = (field) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [field]: parseInt(prevQuantities[field]) + (field === "medKit" ? 1 : 1000)
        }));
    };

    const handleDecrement = (field) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [field]: Math.max(0, parseInt(prevQuantities[field]) - (field === "medKit" ? 1 : 1000))
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
            // Handle success
            setSuccessMessage("Success on the shipment, comes in 3 week days");
            setTimeout(() => {
                setSuccessMessage("");
            }, 5000); // Hide the message after 5 seconds
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10">
                <div className="p-2 text-lg flex items-center">
                    <label className="text-lg">Normal Food:</label>
                    <div className="flex h-fit items-center justify-center">
                        <button type="button" onClick={() => handleIncrement("normalFood")}>+</button>
                        <input
                            type="text"
                            name="normalFood"
                            value={quantities.normalFood}
                            onChange={handleChange}
                            readOnly
                            className="p-2 text-lg"
                        />
                        <button type="button" onClick={() => handleDecrement("normalFood")}>-</button>
                    </div>
                </div>
                <div className="p-2 text-lg flex items-center">
                    <label className="text-lg">Special Food:</label>
                    <div className="flex h-fit items-center justify-center">
                        <button type="button" onClick={() => handleIncrement("specialFood")}>+</button>
                        <input
                            type="text"
                            name="specialFood"
                            value={quantities.specialFood}
                            onChange={handleChange}
                            readOnly
                            className="p-2 text-lg"
                        />
                        <button type="button" onClick={() => handleDecrement("specialFood")}>-</button>
                    </div>
                </div>
                <div className="p-2 text-lg flex items-center">
                    <label className="text-lg">Sand:</label>
                    <div className="flex h-fit items-center justify-center">
                        <button type="button" onClick={() => handleIncrement("sand")}>+</button>
                        <input
                            type="text"
                            name="sand"
                            value={quantities.sand}
                            onChange={handleChange}
                            readOnly
                            className="p-2 text-lg"
                        />
                        <button type="button" onClick={() => handleDecrement("sand")}>-</button>
                    </div>
                </div>
                <div className="p-2 text-lg flex items-center">
                    <label className="text-lg">Med Kit:</label>
                    <div className="flex h-fit items-center justify-center">
                        <button type="button" onClick={() => handleIncrement("medKit")}>+</button>
                        <input
                            type="text"
                            name="medKit"
                            value={quantities.medKit}
                            onChange={handleChange}
                            readOnly
                            className="p-2 text-lg"
                        />
                        <button type="button" onClick={() => handleDecrement("medKit")}>-</button>
                    </div>
                </div>
                <button type="submit">Update Supplies</button>
            </form>
            {successMessage && <p className="text-green-500 font-semibold text-right mt-5 w-[90%]">{successMessage}</p>}
        </div>
    );
};

export default UpdateSuppliesForm;