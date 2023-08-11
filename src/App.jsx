//MODULES BROUGHT IN
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//COMPONENTS BROUGHT IN
import { AppLevelProvider } from './context/AppLevelContext';
import LandingPage from './components/LandingPage/LandingPage';
import Header from './components/Header';
import TeacherAdminPage from './components/TeacherAdminPage/TeacherAdminPage';
import StudentPage from './components/StudentPage/StudentPage';



function App() {
  return (
    <AppLevelProvider>
      <Router>
        <div>
          <Header />
          <div className="content-container">
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              {/* //NEEDING THESE ROUTES TO CHANGE BASED OFF ID IN THE SIGNUP MODAL */}
              <Route path="/teacher" element={<TeacherAdminPage />} />
              <Route path="/student" element={<StudentPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppLevelProvider>
  );
}

export default App;
