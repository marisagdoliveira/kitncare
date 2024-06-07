// components/CatRegistrationForm.js
"use client";
import { useState } from "react";

const CatRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    Gender: "",
    castrated: false,
    size: "",
    healthState: {
      healthy: true,
      allergies: false,
      vaccinated: true,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleHealthStateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      healthState: {
        ...prevState.healthState,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/registerCat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <form
      className="cat-form overflow-hidden mb-32 mt-10 p-4 rounded-lg bg-[#D9BFB0]"
      onSubmit={handleSubmit}
    >
      <div className="rounded-lg bg-[#D9BFB0] border bg-[#C29B87] p-4 m-4 text-xs shadow-lg">
        <div className="flex flex-col space-y-2">
          <label className="text-brown-700 font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 bg-white border bg-[#C29B87] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>

      <div className="rounded-lg bg-[#D9BFB0] border bg-[#C29B87] p-4 m-4 text-xs shadow-lg">
        <div className="flex flex-col space-y-2">
          <label className="text-brown-700 font-semibold">Age:</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="p-2 bg-white border bg-[#C29B87]rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>

      <div className="rounded-lg bg-[#D9BFB0] border bg-[#C29B87] p-4 m-4 text-xs shadow-lg">
        <div className="flex flex-col space-y-2">
          <label className="text-brown-700 font-semibold">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="p-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg bg-[#D9BFB0] border bg-[#C29B87] p-4 m-4 text-xs shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-brown-700">Castrated</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="castrated"
              checked={formData.castrated}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-yellow-500 border-yellow-400 focus:ring-yellow-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-[#D9BFB0] border bg-[#C29B87] p-4 m-4 text-xs shadow-lg">
        <div className="flex flex-col space-y-2">
          <label className="text-brown-700 font-semibold">Size:</label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
            className="p-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg bg-[#D9BFB0] border bg-[#C29B87] p-4 m-4 text-xs shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-brown-700">Healthy</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="healthy"
              checked={formData.healthState.healthy}
              onChange={handleHealthStateChange}
              className="form-checkbox h-4 w-4 text-yellow-500 border-yellow-400 focus:ring-yellow-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-[#D9BFB0] border bg-[#C29B87] p-4 m-4 text-xs shadow-lg">
        <div className="flex items-center justify-between">
          <div >
            <label className="text-brown-700">Allergies</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="allergies"
              checked={formData.healthState.allergies}
              onChange={handleHealthStateChange}
              className="form-checkbox h-4 w-4 text-yellow-500 border-yellow-400 focus:ring-yellow-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-[#D9BFB0] border bg-[#C29B87] p-4 m-4 text-xs shadow-lg">
        <div className="flex items-center justify-between ">
          <div>
            <label className="text-brown-700">Vaccinated</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="vaccinated"
              checked={formData.healthState.vaccinated}
              onChange={handleHealthStateChange}
              className="form-checkbox h-4 w-4 text-yellow-500 border-yellow-400 focus:ring-yellow-500"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full border border-black bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Register Cat
      </button>
    </form>
  );
};

export default CatRegistrationForm;
