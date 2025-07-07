import React from "react";
import { FaArrowCircleRight, FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
        <>
            <div className="flex items-center bg-white border border-gray-200 rounded-md px-3  py-1 w-[50%] sm:w-full  md:w-full max-w-xs shadow-sm focus-within:border-gray-200">
                <FaSearch className="text-gray-500 text-sm mr-2" />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-transparent text-[12px] text-gray-600 focus:outline-none"
                />
            </div>
        </>
    );
}
