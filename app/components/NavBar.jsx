import Link from "next/link";

const NavBar = () => {
    return (
        <div className="absolute bottom-0">
        <div className="bg-gray-800 h-12 w-[100%] flex justify-around items-center mx-auto">
            <Link href="/homepage">
                <p className="text-white">Home</p>
            </Link>
            <Link href="/registcat">
                <p className="text-white">Register Cat</p>
            </Link>
            <Link href="/listofcats">
                <p className="text-white">List of Cats</p>
            </Link>
            <Link href="/account">
                <p className="text-white">Account</p>
            </Link>
        </div>
        </div>
    );
};

export default NavBar;
