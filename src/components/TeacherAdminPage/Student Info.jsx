import { useContext, useState } from "react";
import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";

const StudentInfo = () => {
  const {
    handleClick,
    currentStudent,
    currentInterview,
    setInterviews,
    currentTeacher,
    setShowStudents,
    setStudentName,
  } = useContext(TeacherAdminPageContext);
  
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState(currentInterview[0].in_date.split("T")[0]);
  const [time, setTime] = useState(
    currentInterview[0].in_time.split(":")[0] +
      ":" +
      currentInterview[0].in_time.split(":")[1]
  );

  const [notes, setNotes] = useState(currentInterview[0].in_comments || "");

  const handleEdit = async (e) => {
    // prevent the page from reloading
    e.preventDefault();

    // if editing is true (if user just made some edits)
    if (editing) {
      // confirm that you want to update the interview information
      if (confirm("Update interview with input information?")) {
        const formData = new FormData(e.currentTarget);
        const requestBody = Object.fromEntries(formData.entries());
        console.log(requestBody.in_completed);
        await fetch(
          "https://collab-code.onrender.com/interviews/" +
            currentInterview[0].in_id,
          {
            method: "PUT",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              st_id: currentStudent[0].st_id,
              in_date: requestBody.in_date,
              in_time: requestBody.in_time,
              in_completed:
                requestBody.in_completed === undefined ? false : true,
            }),
          }
        );
        //Updating Students Notes
        await fetch(
          "https://collab-code.onrender.com/students/comments/" +
            currentStudent[0].st_id,
          {
            method: "PUT",
            header: {
              "Content-Type": "spplication/json"
            },
            body: JSON.stringify({
              st_id: currentStudent[0].st_id,
              st_comments: requestBody.st_comments,
              st_scheduled:
                requestBody.st_scheduled === undefined ? false : true,
            }),
          }
        );
        //Create a request body to mark interview as complete
        setEditing(!editing);
      }
    }
    // if editing is false (if the user is viewing the information), set editing to true
    else {
      setEditing(!editing);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditing(!editing);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm("Delete interview?")) {
      try {
        await fetch(
          "https://collab-code.onrender.com/interviews/" +
            currentInterview[0].in_id,
          {
            method: "DELETE",
          }
        );
        const interviewsRes = await fetch(
          `https://collab-code.onrender.com/interviews?ta_id=${currentTeacher.user.ta_id}`
        );
        const interviewsData = await interviewsRes.json();
        setInterviews(interviewsData);
      } catch (err) {
        console.error(err.message);
      }
    }
    setShowStudents(true);
  };

  if (editing) {
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
          <form
            onSubmit={handleEdit}
            className="flex flex-col justify-center items-center "
          >
            <input
              name="in_time"
              type="time"
              placeholder="Enter Time"
              value={time}
              onChange={(e) => setTime(e.currentTarget.value)}
            ></input>
            <input
              name="in_date"
              type="date"
              placeholder="Enter Date"
              value={date}
              onChange={(e) => setDate(e.currentTarget.value)}
            ></input>
            <input
              name="st_comments"
              type="text"
              placeholder="Enter Notes"
              value={notes}
              onChange={(e) => setNotes(e.currentTarget.value)}
            ></input>
            <label>Mark as Complete</label>
            <input type="checkbox" name="in_completed" />
            <label>Move back to Main</label>
            <input type="checkbox" name="st_scheduled" />
            <div className="flex justify-evenly w-full">
              <input type="submit" />
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </form>
          <button onClick={handleClick}>Return to List</button>
        </div>
      </div>
    );
  } else {
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
          <div className="flex flex-col h-[30vh] w-1/5 justify-between items-center ">
            <h1 className="text-[2rem]">{time}</h1>
            <h1 className="text-[2rem]">{date}</h1>
            <h1 className="text-[1rem]">{notes}</h1>
            <div className="flex justify-between w-full">
              <button
                className="cursor-pointer border-2 p-2 rounded-lg"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="cursor-pointer border-2 p-2 rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
            <a href="/interview">
              <h1 className="cursor-pointer border-2 p-2 rounded-lg">
                Join Interview Room
              </h1>
            </a>
            <button
              className="cursor-pointer border-2 p-2 rounded-lg"
              onClick={handleClick}
            >
              Return to List
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default StudentInfo;
