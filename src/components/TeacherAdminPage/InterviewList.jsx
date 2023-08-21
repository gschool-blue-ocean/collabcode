/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import AppLevelContext from "../../context/AppLevelContext";
import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";

const InterviewList = () => {
  const { userData } = useContext(AppLevelContext);
  const { pendingStudents, currentTeacher } = useContext(TeacherAdminPageContext);
  const [interviews, setInterviews] = useState([]);

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


  return (
    <div
      id="interview-list-container"
      className="w-[50vw] h-[70vh] flex flex-col justify-center items-center"
    >
      <h1 className="text-[4rem]">Scheduled Interviews</h1>
      <div
        id="list-item-container"
        className="w-full h-full overflow-scroll mt-20 flex flex-col items-center"
      >
        {interviews.map((elem, index) => (
          <div id="list-item" key={index} className="w-1/2">
            <div className="w-full flex flex-col justify-center items-center my-5 border-4 border-[#e6a65c7c] cursor-pointer rounded-2xl">
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
