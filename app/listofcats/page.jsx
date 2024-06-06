"use client"

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useRouter } from "next/navigation";
import CatProfile from "../components/CatProfile";

export default function Homepage() {
    const [cats, setCats] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null); 
    const [profileOpen, setProfileOpen] = useState(false);
    const [imgPath, setImgPath] = useState(null);

    const router = useRouter();
    const currentUrl = router.asPath;

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
        fetchData();
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

    return (
        <div className="h-screen">
            {error ? (
                <p>An error occurred: {error}</p>
            ) : (
                <ul className="flex flex-col gap-2 mt-10 overflow-auto">
                    {cats.map((cat, index) => (
                        <li key={cat._id}>
                            <div
                                className="flex gap-5 items-center py-3 px-5 bg-white rounded-lg shadow-md cursor-pointer"
                                onClick={() => handleCatClick(cat._id, index)} 
                            >
                                <div className="size-16 bg-black  rounded-full">

                                    <img
                                        src={index <= 20 ? `/assets/catPics/${index}.jpg` : `/assets/catPics/${getRandomIndex()}.jpg`}
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
            )}
            <NavBar currentUrl={currentUrl} />

            {profileOpen && <CatProfile cat={selectedCat} onClose={closeProfile} imgPath={imgPath} />}
        </div>
    );
}