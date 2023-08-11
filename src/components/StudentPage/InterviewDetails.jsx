import { useContext } from "react"
import InterviewDetailContext from '../../context/InterviewDetailsContext'

const InterviewDetails = () => {
    const details = useContext(InterviewDetailContext);
    let current = details.detailsInfo[0]
    return (
        <div id="interview-details-container" className="flex flex-col justify-center items-center h-[20rem]">
        <div id="interview-details" className="w-[20rem] h-[15rem] border rounded-lg border-black flex flex-col justify-center items-center">
        <h1 className="font-semibold">Interview Details</h1>
        <h1>Date: {current.date}</h1>
        <h1>Time: {current.time}</h1>
        <h1>Instuctor: {current.instructor}</h1>
        <button className="p-0.5 border rounded-lg border-black mb-[1rem] hover:bg-[#faa161] cursor-cell">Join Room</button>
        </div>
        </div>
    )
}

export default InterviewDetails