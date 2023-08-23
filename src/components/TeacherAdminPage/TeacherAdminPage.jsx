/* eslint-disable no-unused-vars */
import InterviewList from "./InterviewList";
import Scheduled from "./Scheduled";
import PendingStudents from "./PendingStudents";

const TeacherAdminPage = () => {
  return (
    <div id="teacher-content" className="flex">
      <InterviewList />
      <div id="teacher-content-sidebar" className="flex flex-col">
        <Scheduled />
        <PendingStudents />
      </div>
    </div>
  );
};

export default TeacherAdminPage;
