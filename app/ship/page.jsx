"use client"


import NavBar from "../components/NavBar";
import UpdateSuppliesForm from "../components/UpdateSuppliesForm";
import UserInfo from "../components/UserInfo";




export default function Homepage() {

    return (
        <div className="font-sans">
                    <UpdateSuppliesForm />
            <NavBar />
        </div>
    )
}