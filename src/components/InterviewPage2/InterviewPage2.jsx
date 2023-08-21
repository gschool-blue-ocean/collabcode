// import Timer from "./Timer";
// import Notes from "./Notes";
import React, { useEffect, useState} from "react";
import Runtime from "../Runtime";
import { WebSocketServer } from "ws";
import Timer from "../InterviewPage/Timer";


//..
const InterviewPage2 = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new WebSocket("ws://localhost:8080");
        newSocket.addEventListener('open', () => {
            console.log('WebSocket connection opened.');
        });
        newSocket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });
    
        setSocket(newSocket);
    
        return () => newSocket.close();
    }, []);
    

    return (
        <div className="relative flex flex-col justify-center items-center w-full h-screen">
            <div className='bg-gray-200 h-full w-full flex flex-row'>         
                <div id='body' className='h-full w-4/5'>
                    <div id='left' className='w-fit'>
                <Runtime />
            </div>
                </div>
                <div className='w-full h-full flex flex-col'>

                <Timer socket={socket} /> {/* Pass socket to Timer */}
                {/* <Notes /> */}
                </div>
            
            </div>             
        </div>
    );
}

export default InterviewPage2;