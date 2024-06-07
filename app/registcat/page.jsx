"use client";

import NavBar from "../components/NavBar";
import CatRegistrationForm from "../components/catRegistrationForm";
import LogoCat from "../../public/assets/logo-cat.svg"


export default function Homepage() {


    return (
        <div>
            <div className="flex flex-col gap-5 py-10 items-center justify-center font-sans">
                
                <div className="mt-10 my-4 pt-5 w-full flex justify-center font-sans">
                    <LogoCat className="size-32" />
                </div>
                <p className="text-3xl font-bold text-[#947363] mb-[-30px]">Add a new Kitten.</p>
            <CatRegistrationForm />
                
                    <NavBar />
            </div>
        </div>
    );
}
