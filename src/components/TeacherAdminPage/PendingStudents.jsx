/* eslint-disable no-unused-vars */
import { useContext } from "react";
import AppLevelContext from "../../context/AppLevelContext";
import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";

const PendingStudents = () => {
  const { pendingStudents } = useContext(TeacherAdminPageContext);

  return (
    <>
      <div
        id="student-selection-container"
        className="w-[40vw] h-[45vh] flex items-center justify-center"
      >
        <form
          id="student-selection"
          className="h-[30vh] w-full flex flex-col items-center justify-evenly border-2 p-3"
        >
          <select className="text-[1.5rem]" name="students" id="students">
            <option value="">Select A Student</option>
            {pendingStudents.length !== 0
              ? pendingStudents.map((elem, index) => (
                  <option value={elem.st_id} key={index}>
                    {elem.st_name}
                  </option>
                ))
              : console.log("There are no students")}
          </select>
          <input type="text" className="" placeholder="Date" />
          <input type="text" className="" placeholder="Time" />
          <button
            type="submit"
            className="text-[1.5rem] border-solid border-4 rounded w-[5rem] hover:bg-[#d69a4c] "
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PendingStudents;
