/* eslint-disable react/prop-types */
import { useEffect, useState, createContext } from 'react';

//NEED TO CHANGE URL TO SITE URL WHEN DEPLOYED
const pageURL = 'http://localhost:8000/interviews';
const TeacherAdminPageContext = createContext();

export const TeacherAdminPageProvider = ({ children }) => {
  //Set the state for students
  const [interviews, setInterviews] = useState({});
  //Function for students
  useEffect(() => {
    const getInterviewData = async () => {
      const interviewsRes = await fetch(`${pageURL}`);
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
