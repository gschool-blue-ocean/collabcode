import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InterviewDetailContext from "../context/InterviewDetailsContext";
import TeacherAdminPageContext from "../context/TeacherAdminPageContext";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const { currentStudent, setCurrentStudent } = useContext(InterviewDetailContext);
  const { currentTeacher, setCurrentTeacher } = useContext(TeacherAdminPageContext);

  const navigate = useNavigate();

  const handleEvent = async () => {
    try {
      console.log('working')
      const response = await fetch(
        "https://collab-code.onrender.com/api/auth/logout",
        {
          method: "POST",
        }
      );

      if (response.status === 200) {
        setCurrentStudent({});
        setCurrentTeacher({});
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  if (currentTeacher.user) {
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
            href="/api/auth/signIn/teacher"
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
        </nav>
      </header>
    );
  } else if (currentStudent.user) {
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
            href="/api/auth/signIn/student"
            className="text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Home
          </a>
        <a
            className="text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300"
            onClick={handleEvent}
          >
            Logout
          </a>
        </nav>
      </header>
    );
  } else {
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
  }
};

export default Header;
