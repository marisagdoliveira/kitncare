"use client";

import { LiaHomeSolid } from "react-icons/lia";
import { LiaCatSolid } from "react-icons/lia";
import { LiaClipboardListSolid } from "react-icons/lia";
import { VscAccount } from "react-icons/vsc";

import React, { useState } from "react";
import Link from "next/link";



const NavBar = (props) => {
const Menus = [
    { icon: <LiaHomeSolid />, dis: 0 , path: "/homepage"},
    { icon: <LiaCatSolid />, dis: 1 / 4 , path: "/registcat"},
    { icon: <LiaClipboardListSolid />, dis: 2 / 4 , path: "/listofcats"},
    { icon: <VscAccount />, dis: 3 / 4 , path: "/account"},
  ];



  // Get the current URL
  const currentUrl = props.currentUrl;

  const [active, setActive] = useState(
      currentUrl === "/account"? 3 :
      currentUrl === "/registcat"? 1 :
      currentUrl === "/listofcats"? 2 :
      0
  )

  const handleClick = (index) => {
    setActive(index);
  };

  const circlePosition = (activeIndex) => {
    const totalIcons = Menus.length;
    const spaceBetweenIcons = 100 / totalIcons;
    const leftPosition = spaceBetweenIcons * activeIndex + spaceBetweenIcons / 2;
    return `calc(${leftPosition}% - 28px)`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="bg-gray-800 h-16 w-full flex justify-around items-center mx-auto relative">
        <ul className="flex justify-around w-full relative ">
          <span
            className="bg-yellow-600 duration-500 border-4 border-gray-900 h-14 w-14 absolute top-0 transform -translate-y-1/2 rounded-full flex justify-center items-center"
            style={{
              left: circlePosition(active),
              transition: "left 0.5s ease-in-out",
            }}
          >
            <span className="text-white text-3xl">{Menus[active].icon}</span>
          </span>
          {Menus.map((menu, i) => (
            <li
              key={i}
              className="w-16 flex flex-col items-center relative"
              onClick={() => handleClick(i)}
            >
              <p className="flex flex-col text-center pt-2 cursor-pointer text-white">
                <Link href={menu.path}
                  className={`text-3xl duration-500 ${
                    i === active ? "text-transparent" : ""
                  }`}
                >
                  {menu.icon}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;


// const Menus = [
//     { icon: <LiaHomeSolid />, dis: 0 , path: "/homepage"},
//     { icon: <LiaCatSolid />, dis: 1 / 4 , path: "/registcat"},
//     { icon: <LiaClipboardListSolid />, dis: 2 / 4 , path: "/listofcats"},
//     { icon: <VscAccount />, dis: 3 / 4 , path: "/account"},
//   ];



// import Link from "next/link";

// import { LiaHomeSolid } from "react-icons/lia";
// import { LiaCatSolid } from "react-icons/lia";
// import { LiaClipboardListSolid } from "react-icons/lia";
// import { VscAccount } from "react-icons/vsc";

// <div className="fixed bottom-0 left-0 right-0">
//   <div className="bg-gray-800 h-12 w-[100%] flex justify-around items-center mx-auto">
//     <Link href="/homepage">
//       <p className="text-white"><LiaHomeSolid /></p>
//     </Link>
//     <Link href="/registcat">
//       <p className="text-white"><LiaCatSolid /></p>
//     </Link>
//     <Link href="/listofcats">
//       <p className="text-white"><LiaClipboardListSolid /></p>
//     </Link>
//     <Link href="/account">
//       <p className="text-white"><VscAccount /></p>
//     </Link>
//   </div>
// </div>
