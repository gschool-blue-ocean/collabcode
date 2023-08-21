import Timer from "./Timer";
import Notes from "./Notes";
import Runtime from "../Runtime";

const InterviewPage = () => {
    return (
        <div className="relative flex flex-col justify-center items-center w-full h-screen">
            <div className='bg-gray-200 h-full w-full flex flex-row'>
                <div id='body' className='h-full w-4/5'>
                    <div id='left' className='w-fit'>
                        <Runtime />
                    </div>
                </div>
                <div className='w-full h-full flex flex-col'>

                    <Timer />
                    <Notes />
                </div>

            </div>
        </div>
    );
}

export default InterviewPage;