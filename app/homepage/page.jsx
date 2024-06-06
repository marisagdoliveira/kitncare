"use client"

import NavBar from "../components/NavBar";

import { useRouter } from "next/navigation";
import Logo from "../../public/assets/Logo.svg"
import AlimentacaoTotal from "../components/AlimentacaoTotal";
import AlimentacaoEspecial from "../components/AlimentacaoEspecial";
import Areias from "../components/Areias";
import MedKits from "../components/MedKits";


export default function Homepage() {
    const router = useRouter()
    const currentUrl = router.asPath;
    return (
        <div >
            <div className="pt-2 flex justify-center">
                <Logo className="size-72 my-[-80px]" />
            </div>
            <div className="w-[390px] flex flex-col gap-10 justify-center items-center overflow-auto pb-24">

                <AlimentacaoTotal />
                <AlimentacaoEspecial />
                <Areias />
                <MedKits />

            </div>
    <NavBar currentUrl={currentUrl} />
    </div>
    )
}