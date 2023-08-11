import {  createContext, useRef } from "react";

const interviewDetails = [
    {
        date: '2023-08-10',
        time: '11:00AM',
        instructor: 'Phil'
    }
]

const InterviewDetailsContext = createContext();

export const InterviewDetailsProvider = ({ children }) => {
    let detailsInfo = useRef(interviewDetails);
    detailsInfo = detailsInfo.current

    return (
        <InterviewDetailsContext.Provider value={{ detailsInfo }}>
            {children}
        </InterviewDetailsContext.Provider>
    )
}

export default InterviewDetailsContext