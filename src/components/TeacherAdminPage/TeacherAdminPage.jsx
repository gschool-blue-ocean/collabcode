/* eslint-disable no-unused-vars */
import InterviewList from './InterviewList';
import Calendar from './Calendar';
import PendingStudents from './PendingStudents';
import { useContext } from 'react';
import AppLevelContext from '../../context/AppLevelContext';
import { TeacherAdminPageProvider } from '../../context/TeacherAdminPageContext';

const TeacherAdminPage = () => {
  const data = useContext(AppLevelContext);
  // console.log(data); //Bringing in the data of all the Teachers and students to the teacher component
  return (
    <TeacherAdminPageProvider>
      <div id="teacher-content" className="flex">
        <InterviewList />
        <div id="teacher-content-sidebar" className="flex flex-col">
          <Calendar />
          <PendingStudents />
        </div>
      </div>
    </TeacherAdminPageProvider>
  );
};

export default TeacherAdminPage;
