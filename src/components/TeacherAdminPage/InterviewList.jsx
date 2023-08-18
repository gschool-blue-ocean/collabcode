/* eslint-disable no-unused-vars */
import { useContext } from "react";
import AppLevelContext from "../../context/AppLevelContext";
import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";

const InterviewList = () => {


  return (
    <div id="interview-list-container" className="w-[50vw] h-[60vh]">
      <div
        id="interview-list-items"
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <h1 className="text-[4rem]">Scheduled Interviews</h1>
      </div>
    </div>
  );
};

export default InterviewList;
