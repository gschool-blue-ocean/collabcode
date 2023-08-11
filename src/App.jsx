import LandingPage from './components/LandingPage/LandingPage';

//Mock Components
//Teacher
import TeacherAdminPage from './components/TeacherAdminPage/TeacherAdminPage';
//Student
import StudentPage from './components/StudentPage/StudentPage';

function App() {
  return (
    <>
      <LandingPage />
      <TeacherAdminPage />
      <StudentPage />
    </>
  );
}

export default App;
