/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, createContext } from 'react';
//NEED TO CHANGE URL TO SITE URL WHEN DEPLOYED
const pageURL = 'http://localhost:8000';

const AppLevelContext = createContext();

export const AppLevelProvider = ({ children }) => {
  const [teachers, setTeachers] = useState({});
  const [students, setStudents] = useState({});

  const loginTeacher = useRef();

  //Getting Data for Teacher Component
  useEffect(() => {
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
    <AppLevelContext.Provider value={{ teachers, students, loginTeacher }}>
      {children}
    </AppLevelContext.Provider>
  );
};

export default AppLevelContext;
