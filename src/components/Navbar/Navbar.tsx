import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-black bg-opacity-80 w-auto flex relative justify-between items-center  px-8 h-10">
      {/* Logo */}
      <div className="inline-flex">
        <Link href="/" passHref legacyBehavior>
          <div className="md:block">
            <span className="text-gray-50 text-md md:text-xl">Geo Wiser</span>
          </div>
        </Link>
      </div>
      {/* Search bar */}
      <div className="flex items-center gap-x-2">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 bg-opacity-10 border border-gray-50 border-opacity-10 rounded-md px-2 py-1 text-gray-50 text-sm"
        />
        <button className="bg-gray-50  bg-opacity-10 border border-gray-50 border-opacity-10 rounded-md px-2 py-1 text-gray-50 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l5-5m0 0l-5-5m5 5H4"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
