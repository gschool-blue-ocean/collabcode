/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, createContext} from 'react';

//NEED TO CHANGE URL TO SITE URL WHEN DEPLOYED
const pageURL = 'http://localhost:8000';
const TeacherAdminPageContext = createContext();

export const TeacherAdminPageProvider = ({ children }) => {
  const [interviews, setInterviews] = useState({});
  const [teachers, setTeachers] = useState({});
  const [students, setStudents] = useState({});



  //Getting Data for Teacher Component
  useEffect(() => {
    const getInterviewData = async () => {
      const interviewsRes = await fetch(`${pageURL}/interviews`);
      let interviewsData = await interviewsRes.json();
      setInterviews(interviewsData);
    };
    getInterviewData();

    const getTeacherData = async () => {
      const teacherRes = await fetch(`${pageURL}/teachers`);
      const teacherData = await teacherRes.json();
      setTeachers(teacherData);
    };
    getTeacherData();

    const getStudentData = async () => {
      const studentRes = await fetch(`${pageURL}/students`);
      const studentData = await studentRes.json();
      setStudents(studentData);
    };
    getStudentData();
  }, []);

  return (
    <TeacherAdminPageContext.Provider
      value={{ interviews, teachers, students }}
    >
      {children}
    </TeacherAdminPageContext.Provider>
  );
};

export default TeacherAdminPageContext;
