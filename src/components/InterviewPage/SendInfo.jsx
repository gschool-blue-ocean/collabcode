import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";
import { useContext } from "react";

const SendInfo = ({ input, notes }) => {
  const { currentTeacher, studentName, currentStudent } = useContext(
    TeacherAdminPageContext
  );

  const handleClick = () => {
    console.log(currentTeacher.user.ta_email);
    console.log(localStorage.getItem("currentName"));
    console.log(input);
    console.log(notes);
    const email = "Dw.gordon2@gmail.com";
    const name = localStorage.getItem("currentName");

    const mailObj = {
      email: email,
      name: name,
      input: input,
      notes: notes,
    };

    const sendIt = async (obj) => {
      await fetch("https://collab-code.onrender.com//api/auth/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
    };

    sendIt(mailObj);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="px-4 py-1 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-300 hover:text-gray-800 transition-all duration-300 ease-in-out"
      >
        Send Interview Data
      </div>
    </>
  );
};

export default SendInfo;
