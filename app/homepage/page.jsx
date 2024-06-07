"use client"

import NavBar from "../components/NavBar";


import Logo from "../../public/assets/Logo.svg"
import LogoCat from "../../public/assets/logo-cat.svg"
import AlimentacaoTotal from "../components/AlimentacaoTotal";
import AlimentacaoEspecial from "../components/AlimentacaoEspecial";
import Areias from "../components/Areias";
import MedKits from "../components/MedKits";



export default function Homepage() {

    return (
        <div >
            <div className="mt-10 my-4 pt-5 w-full flex justify-center font-sans">
                <LogoCat className="size-32" />
                </div>
            <div className="mb-10 py-14 bg-[#947363] w-full flex justify-center">
                <Logo className="size-72 my-[-80px]" />
            </div>
            <div className="w-[390px] flex flex-col gap-10 justify-center items-center overflow-auto pb-24">
                <AlimentacaoTotal />
                <AlimentacaoEspecial />
                <Areias />
                <MedKits />

            </div>
    <NavBar  />
    </div>
    )
}