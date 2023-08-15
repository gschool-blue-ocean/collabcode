//MODULES BROUGHT IN
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//COMPONENTS BROUGHT IN
import { AppLevelProvider } from './context/AppLevelContext';
import { AuthenticationModalProvider } from './context/AuthenticationModalContext';
import LandingPage from './components/LandingPage/LandingPage';
import Header from './components/Header';
import TeacherAdminPage from './components/TeacherAdminPage/TeacherAdminPage';
import StudentPage from './components/StudentPage/StudentPage';
import InterviewPage from './components/InterviewPage/InterviewPage';
import AuthenticationModal from './components/AuthenticationModal/AuthenticationModal';


function App() {
  return (
    <AppLevelProvider>
      <AuthenticationModalProvider>
        <Router>
          <div>
            <Header />
            <div className="content-container">
              <Routes>
                <Route exact path="/" element={<LandingPage />} />

                <Route path="/signIn" element={<AuthenticationModal />} />

                <Route
                  path="/api/auth/signIn/teacher"
                  element={<TeacherAdminPage />}
                />
                <Route path="/student" element={<StudentPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthenticationModalProvider>
    </AppLevelProvider>
  );
}

export default App;
