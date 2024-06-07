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
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10">
            {Object.entries(defaultValues).map(([key, value]) => (
                <div key={key} className="p-2 text-lg flex items-center">
                    <label className="text-lg">{key === 'normalFood' ? 'Normal Food' : key === 'specialFood' ? 'Special Food' : key === 'sand' ? 'Sand' : 'Med Kit'}:</label>
                    <div className="flex h-fit items-center justify-center">
                        <button type="button" onClick={() => handleIncrement(key)}>+</button>
                        <input
                            type="text"
                            name={key}
                            value={quantities[key]}
                            onChange={handleChange}
                            readOnly
                            className="p-2 text-lg"
                        />
                        <button type="button" onClick={() => handleDecrement(key)}>-</button>
                    </div>
                </div>
            ))}
            <button type="submit">Update Supplies</button>
        </form>
    );
};

export default UpdateSuppliesForm;