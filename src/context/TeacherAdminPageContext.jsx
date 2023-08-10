/* eslint-disable react/prop-types */
import { useRef, createContext } from 'react';

const students = [
  {
    student: 'Brayan Torres',
    date: '2023-08-10',
    time: '11:00AM',
    status: 'Scheduled',
  },
  {
    student: 'Bao Tran',
    date: '2023-08-25',
    time: '12:00PM',
    status: 'Scheduled',
  },
  {
    student: 'Matthew Hopper',
    date: '2023-09-10',
    time: '3:45PM',
    status: 'Scheduled',
  },
  {
    student: 'Dylan Gordon',
    date: null,
    time: null,
    status: null,
  },
];

const TeacherAdminPageContext = createContext();

export const TeacherAdminPageProvider = ({ children }) => {
  let interviewInfo = useRef(students);
  interviewInfo = interviewInfo.current;

  return (
    <TeacherAdminPageContext.Provider value={{ interviewInfo }}>
      {children}
    </TeacherAdminPageContext.Provider>
  );
};

export default TeacherAdminPageContext;
