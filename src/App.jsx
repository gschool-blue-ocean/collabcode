import LandingPage from './components/LandingPage/LandingPage';
import Header from './components/Header'; // Import your header component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Mock Components
//Teacher
import TeacherAdminPage from './components/TeacherAdminPage/TeacherAdminPage';

//Student
import StudentPage from './components/StudentPage/StudentPage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="content-container">
          {' '}
          {/* Layout container */}
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/teacher/1" element={<TeacherAdminPage />} />
            <Route path="/student" element={<StudentPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
