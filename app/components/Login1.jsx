"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import "../globals.css";

export default function Login1() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [staff, setStaff] = useState("");
    const [password, setPassword] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [loginError, setLoginError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           const res = await signIn("credentials", {
                email, password, redirect: false,
            })

            if (res.error) {
                setLoginError("Invalid Credentials.");
                return;
            }
              
            router.replace("homepage");

        } catch (error) {
            console.log(error);

        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !staff || !password ) {
            setError("All fields are necessary.");
            return;
      }


      try {
        const resUserExists = await fetch('api/userExists', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        
        const { user } = await resUserExists.json();

        if (user) {
            setRegisterError("User already exists.");
            return;
        }

        

        const res = await fetch('api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, staff
            })
        });

        if (res.ok) {
            const form = e.target;
            form.reset();
            router.push('/');
        } else {
            console.log("User registration failed.");
        }
        
      } catch (error) {
        console.log("Error during registration.", error)
        
      }
    };

    return  (

            
        <div className="body1">
    <div className="main1">
        <div className="background-image"></div>
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup rounded-lg">
        <form onSubmit={handleRegisterSubmit} >
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <input onChange={e => setName(e.target.value)} type="text" name="txt" placeholder="Name" required />
          <input onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Email" required />
          <input onChange={e => setStaff(e.target.value)} type="text" name="staff" placeholder="Staff ID" required />
          <input onChange={e => setPassword(e.target.value)} type="password" name="pswd" placeholder="Password" required />
          <button>Sign up</button>
        </form>
        { registerError && (
                <div className="text-red-700 rounded-lg p-1 w-fit ml-[69px]">{registerError}</div>
            )}
      </div>

      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true" className="mt-10">Login</label>
          <input onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Email" required />
          <input onChange={e => setPassword(e.target.value)} type="password" name="pswd" placeholder="Password" required />
          <button>Login</button>
        </form>
        {loginError && (
                <div className="text-red-700 rounded-lg p-1 w-fit ml-[69px]">{loginError}</div>

                )}
      </div>
    </div>
</div>
)
}