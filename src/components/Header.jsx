import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(""); // "teacher" or "student"

  const navigate = useNavigate();

  const handleEvent = async () => {
    try {
      const response = await fetch(
        "https://collab-code.onrender.com/api/auth/logout",
        {
          method: "POST",
        }
      );

      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem('teacherLoggedIn');
        localStorage.removeItem('studentLoggedIn');
        setIsLoggedIn(false);
        setUserType("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn") === 'true';
    setIsLoggedIn(isUserLoggedIn);

    if (isUserLoggedIn) {
      const userType = localStorage.getItem("teacherLoggedIn") === 'true' ? "teacher" : "student";
      setUserType(userType);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
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
      }`}
    >
      <a href="/" className="text-4xl md:text-3xl lg:text-4xl font-semibold">
        CollabCode
      </a>
      <nav className="space-x-4 md:space-x-6">
        {isLoggedIn ? (
          <>
            <a
              href={`/api/auth/signIn/${userType}`}
              className="text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300"
            >
              Home
            </a>
            <button
              className="text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300"
              onClick={handleEvent}
            >
              Logout
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;





