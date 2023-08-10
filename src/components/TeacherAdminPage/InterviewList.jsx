import { useContext } from 'react';
import TeacherAdminPageContext from '../../context/TeacherAdminPageContext';

const InterviewList = () => {
  const students = useContext(TeacherAdminPageContext);
  console.log(students.interviewInfo); //Object
  return (
    <div id="interview-list-container" className="w-[50vw] h-[60vh]">
      <div
        id="interview-list-items"
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <h1 className="text-[4rem]">Scheduled Interviews</h1>
        {/* map data from  interviews_todo table */}
        {students.interviewInfo.map((elem, index) => (
          <div
            className="border rounded-lg border-black w-[20rem] h-[10rem] flex flex-col items-center justify-center mb-[1rem] hover:bg-[#faa161] cursor-cell"
            key={index}
          >
            <h1 className="font-semibold">{elem.student}</h1>
            <h2>{elem.date}</h2>
            <h2>{elem.time}</h2>
            <h2>{elem.status}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewList;
