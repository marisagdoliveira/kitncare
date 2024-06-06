"use client";

import NavBar from "../components/NavBar";
import UserInfo from "../components/UserInfo";
import { useRouter } from "next/navigation";
import CatRegistrationForm from "../components/catRegistrationForm";


export default function Homepage() {
  const router = useRouter();
  const currentUrl = router.asPath;
  return (
    <div>
      <CatRegistrationForm/>
      <NavBar currentUrl={currentUrl} />
      
    </div>
  );
}
