import { useEffect, useState } from "react";
import Link from "next/link";
import useLayoutEffect from "../services/use-isomorphic-layout-effect";

const NavBar = () => {
  const [isMobilemenushown, setIsMobilemenushown] = useState(false);
  const [size, setSize] = useState([0, 0]);

  const toggleMenu = () => {
    setIsMobilemenushown(!isMobilemenushown);
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
      setIsMobilemenushown(false);
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <nav className="bg-gray-100 py-1">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <Link href="/">
                <a className="flex items-center py-4 px-3 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="font-bold">Find My Plasma</span>
                </a>
              </Link>
            </div>
            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/listing">
                <a className="py-4 px-3 text-gray-700 hover:text-gray-900">
                  Plasma Listing
                </a>
              </Link>

              <a
                href="#"
                className="py-4 px-3 text-gray-700 hover:text-gray-900"
              >
                How it works
              </a>
            </div>
          </div>

          {/* secondary nav */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/myaccount">
              <a href="#" className="py-4 px-3 text-gray-700">
                My Account
              </a>
            </Link>
            <Link href="/plasmarequest">
              <a className="py-2 px-3 bg-yellow-400 text-yellow-900 rounded hover:bg-yellow-300 transition duration-100">
                Make Request
              </a>
            </Link>
          </div>
          {/* mobile button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div className={!isMobilemenushown ? "hidden" : null}>
        <a className="block py-2 px-4 text-sm hover:bg-gray-200">Tracker</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Pricing
        </a>
      </div>

      <div></div>
    </nav>
  );
};

export default NavBar;
