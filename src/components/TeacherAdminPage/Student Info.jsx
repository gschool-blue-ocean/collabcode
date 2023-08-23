import { useContext } from "react";
import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";

const StudentInfo = () => {
  const { handleClick, currentStudent, currentInterview } = useContext(
    TeacherAdminPageContext
  );

  console.log(currentStudent);
  console.log(currentInterview);
  return (
    <div
      id="interview-list-container"
      className="w-[50vw] h-[70vh] flex flex-col justify-center items-center"
    >
      <h1 className="text-[4rem]">
        Scheduled Interview for {currentStudent[0].st_name}
      </h1>
      <div
        id="list-item-container"
        className="w-full h-full overflow-y-scroll flex flex-col items-center justify-center"
      >
        <form className="flex flex-col justify-center items-center ">
          <h1>
            {currentInterview[0].in_time.split(":")[0]} :{" "}
            {currentInterview[0].in_time.split(":")[1]}
          </h1>
          <h1>{currentInterview[0].in_date.split("T")[0]}</h1>
          <input type="text" placeholder="Enter Notes" value="" />
          <button onClick={handleClick}>Return to List</button>
        </form>
      </div>
    </div>
  );
};

export default StudentInfo;
