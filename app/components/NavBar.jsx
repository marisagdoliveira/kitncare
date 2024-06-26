import Icon1 from "../../public/assets/icon1.svg";
import Icon2 from "../../public/assets/icon2.svg";
import Icon3 from "../../public/assets/icon3.svg";
import Icon4 from "../../public/assets/icon4.svg";
import Icon5 from "../../public/assets/icon5.svg"; // 1. Import the new icon

import React, { useState, useEffect } from "react";
import Link from "next/link";

const NavBar = () => {
    const Menus = [
        { icon: <Icon1 />, dis: 0, path: "/homepage" },
        { icon: <Icon2 />, dis: 1 / 4, path: "/registcat" },
        { icon: <Icon3 />, dis: 2 / 4, path: "/listofcats" },
        { icon: <Icon4 />, dis: 3 / 4, path: "/ship" },
        { icon: <Icon5 />, dis: 4 / 4, path: "/account" }, 
    ];

    const getActiveIndex = (url) => {
        switch (url) {
            case "/account":
                return 4;
            case "/registcat":
                return 1;
            case "/listofcats":
                return 2;
                case "/homepage":
                    return 0;
                    case "/ship": 
                        return 3;
            default:
                return null;
        }
    };
    const [currentUrl1, setCurrentUrl] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.pathname);
        }
    }, []);

    const [active, setActive] = useState(null);

    useEffect(() => {
        setActive(getActiveIndex(currentUrl1));
    }, [currentUrl1]);

    const handleClick = (index) => {
        setActive(index);
    };

    const circlePosition = (activeIndex) => {
        const totalIcons = Menus.length;
        const spaceBetweenIcons = 100 / totalIcons;
        const leftPosition = spaceBetweenIcons * activeIndex + spaceBetweenIcons / 2;
        return `calc(${leftPosition}% - 28px)`;
    };

    if (active === null) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 transition-all">
            <div className="bg-[#72625A] h-16 w-full flex justify-around items-center mx-auto relative rounded-t-2xl">
                <ul className="flex justify-around w-full relative">
                    <span
                        className="bg-[#D9BFB0] duration-500 border-4 border-[#645751] h-16 w-16 absolute top-0 transform -translate-y-1/2 rounded-full flex justify-center items-center"
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
                                <Link href={menu.path}>
                                    <span
                                        className={`text-3xl duration-500 ${i === active ? "opacity-0" : "opacity-100"
                                            }`}
                                    >
                                        {menu.icon}
                                    </span>
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
