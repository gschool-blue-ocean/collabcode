import InterviewList from './InterviewList';
import Calendar from './Calendar';
import PendingStudents from './PendingStudents';
import { TeacherAdminPageProvider } from '../../context/TeacherAdminPageContext';

const TeacherAdminPage = () => {
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
