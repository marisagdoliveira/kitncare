"use client";

import NavBar from "../components/NavBar";
import CatRegistrationForm from "../components/catRegistrationForm";



export default function Homepage() {


    return (
        <div>
            <div className="flex flex-col gap-5 py-10 items-center justify-center">
                <p className="text-3xl font-bold text-[#947363]">Add a new Kitten</p>
            <CatRegistrationForm />
                
                    <NavBar />
            </div>
        </div>
    );
}
