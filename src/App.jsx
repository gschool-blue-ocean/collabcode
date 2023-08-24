//MODULES BROUGHT IN
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//COMPONENTS BROUGHT IN
import { AppLevelProvider } from "./context/AppLevelContext";
import { AuthenticationModalProvider } from "./context/AuthenticationModalContext";
import LandingPage from "./components/LandingPage/LandingPage";
import Header from "./components/Header";
import TeacherAdminPage from "./components/TeacherAdminPage/TeacherAdminPage";
import StudentPage from "./components/StudentPage/StudentPage";
import InterviewPage from "./components/InterviewPage/InterviewPage";
import AuthenticationModal from "./components/AuthenticationModal/AuthenticationModal";
import InterviewPage2 from "./components/InterviewPage2/InterviewPage2";

function App() {
  return (
    <AppLevelProvider>
      <AuthenticationModalProvider>
            <Router>
              {/* <Header /> */}
              <Routes>
                {/* HOME PATH */}
                <Route exact path="/" element={<LandingPage />} />

                {/* AUTHENTICATION PATH */}
                <Route path="/signIn" element={<AuthenticationModal />} />

                {/* TEACHER PAGE */}
                <Route
                  path="/api/auth/signIn/teacher"
                  element={<TeacherAdminPage />}
                />

                {/* STUDENT PAGE */}
                <Route
                  path="/api/auth/signIn/student"
                  element={<StudentPage />}
                />

                {/* TEACHER INTERVIEW PAGE */}
                <Route path="/interview" element={<InterviewPage />} />

                {/* STUDENT INTERVIEW PAGE */}
                <Route path="/interviewStudent" element={<InterviewPage2 />} />
              </Routes>
            </Router>
      </AuthenticationModalProvider>
    </AppLevelProvider>
  );
}

export default App;
