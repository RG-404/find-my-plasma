import { useEffect, useState, useLayoutEffect } from "react";

const NavBar = () => {
  const [isMobilemenushown, setIsMobilemenushown] = useState(false);
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
      setIsMobilemenushown(false);
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const toggleMenu = () => {
    setIsMobilemenushown(!isMobilemenushown);
  };

  useEffect(() => {
    console.log("nav mounted");
  }, []);

  return (
    <nav className="bg-gray-100 py-1">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <a href="#" className="flex items-center py-4 px-3 text-gray-700">
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
            </div>
            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-1">
              <a
                href="#"
                className="py-4 px-3 text-gray-700 hover:text-gray-900"
              >
                Features
              </a>
              <a
                href="#"
                className="py-4 px-3 text-gray-700 hover:text-gray-900"
              >
                Pricing
              </a>
            </div>
          </div>

          {/* secondary nav */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="py-4 px-3 text-gray-700">
              Login
            </a>
            <a
              href="#"
              className="py-2 px-3 bg-yellow-400 text-yellow-900 rounded hover:bg-yellow-300 transition duration-100"
            >
              Register
            </a>
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
        <a className="block py-2 px-4 text-sm hover:bg-gray-200">Features</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Pricing
        </a>
      </div>

      <div></div>
    </nav>
  );
};

export default NavBar;
