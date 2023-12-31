/* eslint-disable no-unused-vars */
import { useContext, useState, useRef } from "react";
import AppLevelContext from "../../context/AppLevelContext";
import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";

const PendingStudents = () => {
  const { userData } = useContext(AppLevelContext);
  const { pendingStudents, currentTeacher, setShowStudents } = useContext(
    TeacherAdminPageContext
  );
  console.log(pendingStudents)

  const [formInputs, setFormInputs] = useState({});

  const { date, time } = formInputs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formObj = {
        ta_id: currentTeacher.user.ta_id,
        st_id: Number(formInputs.students),
        in_date: formInputs.date,
        in_time: formInputs.time,
        in_completed: false,
        st_scheduled: true,
      };
      //Send the formObj back
      const response = await fetch(
        "https://collab-code.onrender.com/interviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObj),
        }
      );
      //If the response is successful
      if (response.status === 201) {
        await fetch(
          `https://collab-code.onrender.com/students/scheduled/${formObj.st_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ st_scheduled: formObj.st_scheduled }),
          }
        );

        //Reset the Form Data
        setFormInputs({});
      }
    } catch (error) {
      console.log(error);
    }
    setShowStudents(true);
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
            {pendingStudents.map((elem, index) =>
              elem.st_scheduled === false ? (
                <option value={elem.st_id} key={index}>
                  {elem.st_name}
                </option>
              ) : (
                <option hidden value={elem.st_id} key={index}>
                  {elem.st_name}
                </option>
              )
            )}
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
