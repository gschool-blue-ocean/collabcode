//MODULES BROUGHT IN
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//COMPONENTS BROUGHT IN
import { AppLevelProvider } from './context/AppLevelContext';
import LandingPage from './components/LandingPage/LandingPage';
import Header from './components/Header';
import TeacherAdminPage from './components/TeacherAdminPage/TeacherAdminPage';
import StudentPage from './components/StudentPage/StudentPage';
import SignInModal from './components/SignInModal/SignInModal';



function App() {
  return (
    <AppLevelProvider>
      <Router>
        <div>
          <Header />
          <div className="content-container">
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignInModal />} />
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
