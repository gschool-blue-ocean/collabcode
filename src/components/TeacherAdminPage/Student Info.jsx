import { useContext } from "react";
import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";

const StudentInfo = () => {
  const { handleClick } = useContext(TeacherAdminPageContext);

  return (
    <div
      id="interview-list-container"
      className="w-[50vw] h-[70vh] flex flex-col justify-center items-center"
    >
      <h1 className="text-[4rem]">Scheduled Interview for [student]</h1>
      <div
        id="list-item-container"
        className="w-full h-full overflow-y-scroll flex flex-col items-center justify-center"
      >
        <h1>Student Info</h1>
        <button onClick={handleClick}>Return to List</button>
      </div>
    </div>
  );
};

export default StudentInfo;
