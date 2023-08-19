/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import AppLevelContext from "../../context/AppLevelContext";
import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";

const InterviewList = () => {
  const { userData } = useContext(AppLevelContext);
  const { pendingStudents } = useContext(TeacherAdminPageContext);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const getInterviews = async () => {
      const interviewsRes = await fetch(
        `https://collab-code.onrender.com/interviews?ta_id=${userData.user.ta_id}`,
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
  }, [userData.user.ta_id]);

  return (
    <div id="interview-list-container" className="w-[50vw] h-[60vh]">
      <div
        id="interview-list-items"
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <h1 className="text-[4rem]">Scheduled Interviews</h1>
        {interviews.map((elem, index) => (
          <div id="list-item-container" key={index} className="w-full h-[50vh]">
            <div className="w-full h-full flex flex-col justify-center items-center m-[10px]">
              <h1>{pendingStudents[elem.st_id - 1].st_name}</h1>
              <h1>{elem.in_date.split("T")[0]}</h1>
              <h1>
                {elem.in_time.split(":")[0]}: {elem.in_time.split(":")[0]}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewList;
