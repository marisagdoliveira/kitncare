// components/CatRegistrationForm.js

import { useState } from 'react';

const CatRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        sex: '',
        castrated: false,
        size: '',
        healthState: {
            healthy: true,
            allergies: false,
            vaccinated: true
        }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleHealthStateChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            healthState: {
                ...prevState.healthState,
                [name]: type === 'checkbox' ? checked : value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/registerCat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Age:</label>
                <input type="text" name="age" value={formData.age} onChange={handleChange} required />
            </div>
            <div>
                <label>Sex:</label>
                <input type="text" name="sex" value={formData.sex} onChange={handleChange} required />
            </div>
            <div>
                <label>Castrated:</label>
                <input type="checkbox" name="castrated" checked={formData.castrated} onChange={handleChange} />
            </div>
            <div>
                <label>Size:</label>
                <input type="text" name="size" value={formData.size} onChange={handleChange} required />
            </div>
            <div>
                <label>Healthy:</label>
                <input type="checkbox" name="healthy" checked={formData.healthState.healthy} onChange={handleHealthStateChange} />
            </div>
            <div>
                <label>Allergies:</label>
                <input type="checkbox" name="allergies" checked={formData.healthState.allergies} onChange={handleHealthStateChange} />
            </div>
            <div>
                <label>Vaccinated:</label>
                <input type="checkbox" name="vaccinated" checked={formData.healthState.vaccinated} onChange={handleHealthStateChange} />
            </div>
            <button type="submit">Register Cat</button>
        </form>
    );
};

export default CatRegistrationForm;
