import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <>
            <div className="bg-[#373b69] px-5 py-2 flex flex col justify-between items-center sm:px-8">
                <p className="text-2xl font-bold text-white">KidsFlix</p>
                <input
                    className="hidden sm:block rounded-sm bg-transparent px-5 py-1 border-2 border-[#22254b] font-sm text-white italic focus:outline-0 focus:bg-[#22254b] focus:border-slate-500 sm:w-[320px]"
                    placeholder="Search"
                />
                <button>
                    <FontAwesomeIcon
                        icon={faBars}
                        className="sm:hidden text-white text-xl"
                        onClick={openMenu}
                    />
                </button>
            </div>
            <div
                className={`bg-slate-300 flex flex-col pl-8 py-4 ${
                    menuOpen ? "block" : "hidden"
                }`}>
                <a className="py-1 hover:font-bold w-[80%]">Home</a>
                <a className="py-1 hover:font-bold w-[80%]">Profile</a>
                <a className="py-1 hover:font-bold w-[80%]">Favourite</a>
                <button className="bg-red-400 px-4 py-1 mt-1 mb-5 w-fit rounded-sm hover:bg-red-600 hover:font-bold">
                    Logout
                </button>

                <input
                    className="w-[50%] rounded-sm bg-transparent px-5 font-bold py-1 border-2 border-[#22254b] font-sm text-[#373b69] italic focus:outline-0 focus:bg-[#22254b] focus:text-white focus:border-slate-500 sm:w-[320px]"
                    placeholder="Search"
                />
            </div>
        </>
    );
};

export default Navbar;
