import { Button } from "bootstrap"
import InterviewDetails from "./InterviewDetails"
import { InterviewDetailsProvider } from "../../context/InterviewDetailsContext"

const StudentPage = () => {
    return (
        <InterviewDetailsProvider>
        <InterviewDetails/>
        </InterviewDetailsProvider>
    )
}

export default StudentPage