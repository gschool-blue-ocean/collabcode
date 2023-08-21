import { useContext, useEffect, useState } from "react";
import InterviewDetailContext from "../../context/InterviewDetailsContext";

const InterviewDetails = () => {
  const { currentStudent } = useContext(InterviewDetailContext);
  const [interviews, setInterviews] = useState([]);
  const currentDate = new Date()

  useEffect(() => {
    const getInterviews = async () => {
      const interviewsRes = await fetch(
        `https://collab-code.onrender.com/interviews?st_id=${currentStudent.user.st_id}`,
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
  }, [currentStudent]);

  if (interviews.length === 0) {
    return (
      <div
        id="interview-details-container"
        className="flex flex-col justify-center items-center h-[20rem]"
      >
        <div
          id="interview-details"
          className="w-[20rem] h-[15rem] border rounded-lg border-black flex flex-col justify-center items-center"
        >
          <h2>No scheduled Interviews</h2>
        </div>
      </div>
    );
  } else {
    const interviewDate = new Date(interviews[2].in_date);
    const interviewTime = new Date(interviews[2].in_time);

    // Adjust the time portion based on the interviewTime object
    interviewDate.setUTCHours(interviewTime.getUTCHours());
    interviewDate.setUTCMinutes(interviewTime.getUTCMinutes());
    interviewDate.setUTCSeconds(interviewTime.getUTCSeconds());
    if (currentDate.getTime() === interviewDate.getTime()) {
    return (
        <div
        id="interview-details-container"
        className="flex flex-col justify-center items-center h-[20rem]"
      >
        <div
          id="interview-details"
          className="w-[20rem] h-[15rem] border rounded-lg border-black flex flex-col justify-center items-center"
        >
          <h1 className="font-semibold">Interview Details</h1>
          <h1>Date: {interviews[2].in_date}</h1>
          <h1>Time: {interviews[2].in_time}</h1>
          <h1>Instuctor: {interviews[2].ta_id}</h1>
          <button className="p-0.5 border rounded-lg border-black mb-[1rem] hover:bg-[#faa161] cursor-cell">
            Join Room
          </button>
        </div>
      </div>
    )
  } else  {
    return (
      <div
        id="interview-details-container"
        className="flex flex-col justify-center items-center h-[20rem]"
      >
        <div
          id="interview-details"
          className="w-[20rem] h-[15rem] border rounded-lg border-black flex flex-col justify-center items-center"
        >
          <h1 className="font-semibold">Interview Details</h1>
          <h1>Date: {interviews[2].in_date}</h1>
          <h1>Time: {interviews[2].in_time}</h1>
          <h1>Instuctor: {interviews[2].ta_id}</h1>
        </div>
      </div>
    );
  }
}
};

export default InterviewDetails;
