import Calendar from 'react-calendar';
import { useState } from 'react';
const Scheduled = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div
        id="calendar-app"
        className="w-[40vw] h-[40vh] flex flex-col justify-center items-center"
      >
        <h1 id="header">Scheduled Appointments</h1>
        <div id="calendar-container" className="flex justify-center">
          <Calendar onChange={setDate} value={date} />
        </div>
        <div className="text-center">Selected date: {date.toDateString()}</div>
      </div>
    </>
  );
};

export default Scheduled;
