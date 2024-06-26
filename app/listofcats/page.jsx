"use client"

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import CatProfile from "../components/CatProfile";

export default function Homepage() {
    const [cats, setCats] = useState([]);
    const [adoptedCats, setAdoptedCats] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const [imgPath, setImgPath] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/cats");
                if (!response.ok) {
                    throw new Error("Failed to fetch cats");
                }
                const data = await response.json();
                setCats(data);
            } catch (error) {
                setError(error.message);
            }
        }

        async function fetchAdoptedCats() {
            try {
                const response = await fetch("/api/adoptedCats"); 
                if (!response.ok) {
                    throw new Error("Failed to fetch adopted cats");
                }
                const data = await response.json();
                setAdoptedCats(data);
                console.log("Adopted Cats:", data);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchData();
        fetchAdoptedCats();
    }, []);

    const handleCatClick = async (catId, index) => {
        try {
            const response = await fetch(`/api/cat?catId=${catId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch cat details");
            }
            const catDetails = await response.json();
            setImgPath(index <= 20 ? `/assets/catPics/${index}.jpg` : `/assets/catPics/${getRandomIndex()}.jpg`);
            setSelectedCat(catDetails);
            setProfileOpen(true);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch cat details");
        }
    };

    const getRandomIndex = () => {
        return Math.floor(Math.random() * 21);
    };

    const closeProfile = () => {
        setProfileOpen(false);
        setSelectedCat(null);
    };

    console.log("Cats:", cats);
    console.log("Adopted Cats:", adoptedCats); 

    return (
        <div className="h-fit mb-32 flex flex-col text-[#72625A]">
            <p className="text-4xl font-semibold  text-center p-10 mb-[-50px]">Your Kittens!</p>
            
            {error ? (
                <p>An error occurred: {error}</p>
            ) : (
                <div className="flex flex-col gap-4 p-4 justify-between">

                    <ul className="flex flex-col gap-2 mt-10">
                        {cats.map((cat, index) => (
                            <li key={cat._id}>
                                <div
                                    className="flex gap-5 items-center py-3 px-5 bg-[#FCEEDB] rounded-lg shadow-md cursor-pointer"
                                    onClick={() => handleCatClick(cat._id, index)}
                                >
                                    <div className="size-16 bg-black rounded-full">
                                        <img
                                            src={
                                                index <= 20
                                                    ? `/assets/catPics/${index}.jpg`
                                                    : `/assets/catPics/${getRandomIndex()}.jpg`
                                            }
                                            alt="Cat Pic"
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                    </div>
                                    <div className="font-semibold text-2xl flex flex-col">
                                        {cat.name}
                                        <div className="text-lg text-yellow-600">Age: {cat.age}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                        <p className="text-2xl font-semibold mt-10 mb-[-20px] text-center">Adopted</p>
                    <ul className="flex flex-col gap-2 mt-10">
                        {adoptedCats.map((adoptedCat, index) => (
                            <li key={adoptedCat._id}>
                                <div
                                    className="flex gap-5 items-center py-3 px-5 bg-[#fbeaea] rounded-lg shadow-md cursor-pointer"
                                >
                                    <div className="size-16 bg-black rounded-full">
                                        <img
                                            src={
                                                index <= 20
                                                    ? `/assets/catPics/${index}.jpg`
                                                    : `/assets/catPics/${getRandomIndex()}.jpg`
                                            }
                                            alt="Cat Pic"
                                            className="object-cover w-full h-full rounded-full filter grayscale"
                                        />
                                    </div>
                                    <div className="font-semibold text-2xl flex flex-col">
                                        {adoptedCat.name}
                                        <div className="text-lg text-zinc-400">Age: {adoptedCat.age}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <NavBar />
            {profileOpen && <CatProfile cat={selectedCat} onClose={closeProfile} imgPath={imgPath} />}
        </div>
    );
}