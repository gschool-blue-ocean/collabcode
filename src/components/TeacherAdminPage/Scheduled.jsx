import Calendar from 'react-calendar';
import { useState } from 'react';
const Scheduled = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div
        id="calendar-app"
        className="w-[40vw] h-[45vh] flex flex-col justify-center items-center border-solid border-4 border-indigo-400"
      >
        <h1 id="header" className="text-[2rem]">
          Scheduled Appointments
        </h1>
        <div id="calendar-container" className="flex justify-center">
          <Calendar onChange={setDate} value={date} />
        </div>
        <div className="text-[1.5rem] ">
          Selected date: {date.toDateString()}
        </div>
      </div>
    </>
  );
};

export default Scheduled;
