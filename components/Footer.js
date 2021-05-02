const Footer = () => {
  return (
    <div className="bg-black text-white mt-20">
      <div className="flex py-4 max-w-6xl mx-auto px-4 items-start  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <div className="">
          <a href="mailto:support@locateplasma.in">support@locateplasma.in</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
