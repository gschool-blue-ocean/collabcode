/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, createContext } from 'react';

//NEED TO CHANGE URL TO SITE URL WHEN DEPLOYED
const pageURL = 'http://localhost:8000';
const TeacherAdminPageContext = createContext();

export const TeacherAdminPageProvider = ({ children }) => {
  const [interviews, setInterviews] = useState({});

  //Getting Data for Teacher Component
  useEffect(() => {
    const getInterviewData = async () => {
      const interviewsRes = await fetch(`${pageURL}/interviews`);
      let interviewsData = await interviewsRes.json();
      setInterviews(interviewsData);
    };
    getInterviewData();
  }, []);

  return (
    <TeacherAdminPageContext.Provider value={{ interviews }}>
      {children}
    </TeacherAdminPageContext.Provider>
  );
};

export default TeacherAdminPageContext;
