"use client"


import NavBar from "../components/NavBar";
import UpdateSuppliesForm from "../components/UpdateSuppliesForm";
import UserInfo from "../components/UserInfo";
import Icon6 from "../../public/assets/icon6.svg";



export default function Homepage() {

    return (
        <div className="font-sans">
            <div className="mb-[-150px] pt-5 w-full flex justify-center font-sans">
                <Icon6 className="size-32" />
            </div>
                    <UpdateSuppliesForm />
            <NavBar />
        </div>
    )
}