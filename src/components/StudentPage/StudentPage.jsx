// import { Button } from "bootstrap"
import InterviewDetails from "./InterviewDetails";
import { InterviewDetailsProvider } from "../../context/InterviewDetailsContext";
import Header from "../Header";

const StudentPage = () => {
  return (
    <InterviewDetailsProvider>
    <Header/>
    <InterviewDetails />
    </InterviewDetailsProvider>
  )
};

export default StudentPage;
