/* eslint-disable no-unused-vars */
import InterviewList from "./InterviewList";
import Scheduled from "./Scheduled";
import PendingStudents from "./PendingStudents";
import { TeacherAdminPageProvider } from "../../context/TeacherAdminPageContext";

const TeacherAdminPage = () => {
  return (
    <TeacherAdminPageProvider>
      <div id="teacher-content" className="flex">
        <InterviewList />
        <div id="teacher-content-sidebar" className="flex flex-col">
          <Scheduled />
          <PendingStudents />
        </div>
      </div>
    </TeacherAdminPageProvider>
  );
};

export default TeacherAdminPage;
