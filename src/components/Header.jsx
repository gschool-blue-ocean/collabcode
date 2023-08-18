import { useState, useEffect } from "react";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        //scrollY is the number of pixels that the document is currently scrolled vertically
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="Navbar"
      className={`flex h-20 md:h-2 lg:h-28 w-full items-center justify-between mt-0 px-8 lg:px-16 ${
        isSticky ? "fixed top-0 bg-white shadow-md" : ""
      }`} // the header will be fixed to the top of the screen when the user scrolls past the landing page
    >
      <a href="/" className="text-4xl md:text-3xl lg:text-4xl font-semibold">
        CollabCode
      </a>
      <nav className="space-x-4 md:space-x-6">
        <a
          href="/"
          className="text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300"
        >
          Home
        </a>
        <a
          href="/signin"
          className="text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300"
        >
          Login/SignUp
        </a>
      </nav>
    </header>
  );
};

export default Header;
