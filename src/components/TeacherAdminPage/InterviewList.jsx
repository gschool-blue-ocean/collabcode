/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import AppLevelContext from "../../context/AppLevelContext";
import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";

const InterviewList = () => {
  const { userData } = useContext(AppLevelContext);
  const { pendingStudents, currentTeacher } = useContext(
    TeacherAdminPageContext
  );

  const [interviews, setInterviews] = useState([]);
  const [showStudents, setShowStudent] = useState(true);

  useEffect(() => {
    const getInterviews = async () => {
      const interviewsRes = await fetch(
        `https://collab-code.onrender.com/interviews?ta_id=${currentTeacher.user.ta_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const interviewsData = await interviewsRes.json();
      setInterviews(interviewsData);
    };
    getInterviews();
  }, [currentTeacher]);

  function handleClick(e) {
    console.log(e.currentTarget);
    setShowStudent(!showStudents);
  }

  //Conditional Rendering
  if (showStudents) {
    return (
      <div
        id="interview-list-container"
        className="w-[50vw] h-[70vh] flex flex-col justify-center items-center"
      >
        <h1 className="text-[4rem]">Scheduled Interviews</h1>
        <div
          id="list-item-container"
          className="w-full h-full overflow-y-scroll flex flex-col items-center justify-center"
        >
          {interviews.map(
            (elem, index) => (
              console.log(elem),
              (
                <div
                  id={elem.st_id}
                  key={index}
                  className="w-1/2"
                  onClick={handleClick}
                >
                  <div className="w-full flex flex-col justify-center items-center my-5 border-4 border-[#e6a65c7c] cursor-pointer rounded-2xl">
                    <h1>{pendingStudents[elem.st_id].st_name}</h1>
                    <h1>{elem.in_date.split("T")[0]}</h1>
                    <h1>
                      {elem.in_time.split(":")[0]}: {elem.in_time.split(":")[1]}
                    </h1>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        id="interview-list-container"
        className="w-[50vw] h-[70vh] flex flex-col justify-center items-center"
      >
        <h1 className="text-[4rem]">Scheduled Interviews</h1>
        <div
          id="list-item-container"
          className="w-full h-full overflow-y-scroll flex flex-col items-center justify-center"
        >
          <button onClick={handleClick}>Return</button>
        </div>
      </div>
    );
  }
};

export default InterviewList;
