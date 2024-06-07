"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Logo from "../../public/assets/Logo.svg";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="relative h-[800px] w-screen overflow-hidden">
      <div className="background1 h-[800px] absolute z-1 top-0 left-0 h-full w-full"></div>
      <div className="flex justify-center w-full mt-20">
        <div className="flex justify-center mb-[-200px] w-fit h-fit rounded-full bg-[#85563f]">
          <Logo className="size-36" />
        </div>
      </div>
      <div className="relative z-10 grid place-items-center h-full w-full pb-16"> {/* Added padding-bottom */}
        <div className="shadow-2xl flex flex-col rounded-lg p-6 bg-[#72625A] w-[350px] h-[300px] border border-white">
          <div className="flex flex-col m-4 gap-4 text-white">
            <div className="bg-[#D9BFB0] w-full text-center text-3xl gap-3 rounded-md p-2 border border-white">
               <span>{session?.user?.name}</span>
            </div>
            <div className="bg-[#D9BFB0] w-full text-center text-xl border border-white rounded-md p-2">
               <span>{session?.user?.email}</span>
            </div>
          </div>
          <div>
            <button onClick={() => signOut()} className="bg-[#C29B87] border border-white">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className="grid place-items-center h-screen">
//   <div className="flex flex-col shadow-md p-5 rounded-lg my-6 border-t-4 border-purple-400 gap-4" >
//     <div className="font-bold">
//         Name: <span>{session?.user?.name}</span>
//     </div>
//     <div className="font-bold">
//         Email: <span>{session?.user?.email}</span>
//     </div>
//     <button onClick={() => signOut()}
//      className="bg-purple-400 py-2 rounded-lg cursor-pointer text-white">Log Out</button>
//   </div>
// </div>