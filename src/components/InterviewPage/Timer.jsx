import React, { useEffect, useState } from "react";

const Timer = ({socket}) => {

    const [minutes, setMinutes] = useState(45);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [inputMinutes, setInputMinutes] = useState(45); // State for input field

    let timer;

    useEffect(() => {
        if (isRunning) {//if the timer is running
            timer = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(timer);//what clearInterval does is that it stops the timer
                        alert("Time's up!");
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0 && minutes === inputMinutes) {
                    // socket.send("startTimer::::timer");
                }
            }, 1000);
        }//

        return () => clearInterval(timer);
    }, [isRunning, minutes, seconds]);

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    }

    const resetTimer = () => {
        setIsRunning(false);
        setMinutes(inputMinutes); // Reset to the input duration
        setSeconds(0);
    }

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value);
        setInputMinutes(value);
        setMinutes(value);
    }

    return (
        <div className="top-0 right-0 m-3 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold -mb-2 ml-4">Timer</h1>
            <div className="text-4xl font-bold mb-2 ml-4">
                {minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}
            </div>

            <div className="mb-4 ml-4 mr-4">
                <label className="block text-sm font-medium text-gray-700">
                    Set Timer (minutes)
                </label>
                <input
                    type="number"
                    value={inputMinutes}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-300"
                />
            </div>

            <div className="flex justify-center space-x-4 mb-4 ml-4"> {/* Add mb-4 to create margin at the bottom */}
                <button
                    className={`px-6 py-2 rounded-lg ${
                        isRunning ? "bg-red-500 hover:bg-red-300" : "bg-green-500 hover:bg-green-300"
                    } text-white font-semibold`}
                    onClick={toggleTimer}
                >
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-300 text-white font-semibold rounded-lg"
                    onClick={resetTimer}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Timer;
