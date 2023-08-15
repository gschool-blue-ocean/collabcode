// import { InterviewDetailsProvider } from '../../context/InterviewDetailsContext'; //Not Sure What that is

const PendingStudents = () => {
  return (
    <>
      <div
        id="student-selection-container"
        className="w-[40vw] h-[45vh] flex items-center justify-center"
      >
        <form
          id="student-selection"
          className="h-[30vh] flex flex-col items-center justify-evenly border-2 p-3"
        >
          <select className="text-[1.5rem]" name="students" id="students">
            <option value="">Select A Student</option>
            {/* INSERT MAPPING OF STUDENTS */}
          </select>
          <input type="text" className="" placeholder="Date" />
          <input type="text" className="" placeholder="Time" />
          <button
            type="submit"
            className="text-[1.5rem] border-solid border-4 rounded w-[5rem] hover:bg-[#d69a4c] "
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PendingStudents;
