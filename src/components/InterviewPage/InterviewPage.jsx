import Timer from "./Timer";
import Notes from "./Notes";
import Runtime from "../Runtime";
import Header from "../Header";
import { useState } from "react";
import TeacherAdminPageContext from "../../context/TeacherAdminPageContext";
import { TeacherAdminPageProvider } from "../../context/TeacherAdminPageContext";

const InterviewPage = () => {
    const [notes, setNotes] = useState('');
      const [input, setInput] = useState("");

    return (
            <TeacherAdminPageProvider>
        <div>
            <Header/>
        <div className="relative flex flex-col justify-center items-center w-full h-screen">
            <div className='bg-gray-200 h-full w-full flex flex-row'>         
                <div id='body' className='h-full w-4/5'>
                    <div id='left' className='w-fit'>
                        <Runtime input={input} setInput={setInput} />
            </div>
                </div>
                <div className='w-full h-full flex flex-col'>

                <Timer />
                    <Notes notes={notes} setNotes={setNotes} input={input} />
                </div>
            
            </div>             
        </div>
        </div>
        </TeacherAdminPageProvider>
    );
}

export default InterviewPage;