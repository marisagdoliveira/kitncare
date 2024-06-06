"use client"

import NavBar from "../components/NavBar";
import UserInfo from "../components/UserInfo";
import { useRouter } from "next/navigation";



export default function Homepage() {
    const router = useRouter()
    const currentUrl = router.asPath;
    return (
        <div >
    <UserInfo />
    <NavBar currentUrl={currentUrl} />
    </div>
    )
}