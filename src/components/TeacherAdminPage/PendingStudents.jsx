/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import AppLevelContext from "../../context/AppLevelContext";
import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";

const PendingStudents = () => {
  const { userData } = useContext(AppLevelContext);
  const { pendingStudents } = useContext(TeacherAdminPageContext);

  const [formInputs, setFormInputs] = useState({
    date: "",
    time: "",
  });

  const { date, time } = formInputs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formInputs, userData);
  }

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
          <select
            className="text-[1.5rem]"
            name="students"
            id="students"
            onChange={handleChange}
          >
            <option value="">Select A Student</option>
            {pendingStudents.length !== 0
              ? pendingStudents.map((elem, index) => (
                  <option value={elem.st_id} key={index}>
                    {elem.st_name}
                  </option>
                ))
              : console.log("Students are loading")}
          </select>
          <input
            type="date"
            className=""
            name="date"
            value={date}
            placeholder="Date"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="time"
            className=""
            name="time"
            value={time}
            placeholder="Time"
            onChange={(e) => handleChange(e)}
          />
          <button
            className="text-[1.5rem] border-solid border-4 rounded w-[5rem] hover:bg-[#d69a4c] "
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PendingStudents;
