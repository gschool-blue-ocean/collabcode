import {useState} from 'react'

const Runtime = () => {
  const [input, setInput] = useState("");
      const [output, setOutput] = useState('')

      //handle input text
      const handleChange = (e) => {
          //set input state to textarea value
          const rawInput = e.target.value
          setInput(rawInput)
      }

      //handle 'run' click even
   const handleClick = () => {
     // Clear output
     setOutput("");

     try {
       // Capture messages
       const consoleMessages = [];
       const originalConsoleLog = console.log;
       console.log = (message) => {
         consoleMessages.push(message);
         originalConsoleLog(message);
       };

       // Evaluate input, capture result
       const result = eval(input);

       // Combine console.log messages and result, update the output state
       setOutput(consoleMessages.join("\n") + "\n" + result);
     } catch (error) {
       // Handle error messages
       setOutput((prevOutput) => prevOutput + "Error: " + error.message + "\n");
     }
   };



  return (
    <>
      <div id="runtime-container" className="w-full h-[80vh] flex">
        <div
          id="runtime-content"
          className="h-full flex w-[80vw] flex-row items-center justify-center"
        >
          <div id="runtimeLeft" className="w-2/5 h-full flex flex-col">
            <button id="runtimeSubmit" onClick={handleClick}>
              Run Code
            </button>{" "}
            <textarea
              id="runtimeInput"
              placeholder="//your code here"
              onChange={handleChange}
            ></textarea>
          </div>

          <div
            id="runtimeRight"
            className="w-2/5 h-full flex flex-col bg-[#353839]"
          >
            <pre id="runtimeOutput" className="text-[#50d71e] overflow-y-scroll">
              {output}
            </pre>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Runtime;


// import {useState} from 'react'


// const Runtime = () => {
//     const [input, setInput] = useState('')
//     const [output, setOutput] = useState('')
    

//     //handle input text
//     const handleChange = (e) => {
//         //set input state to textarea value
//         const rawInput = e.target.value
//         setInput(rawInput)
//         //clear output for clarity(only see relevant console messages)
//         setOutput('')
//     }

//     //handle 'run' click even
//     const handleClick = () => {
//         //clear output to avoid duplicates
//         setOutput("");
//         //add console.log messages to output
//             try {
//               const originalConsoleLog = console.log;
//               console.log = (message) => {
//                 originalConsoleLog(message);
//                 setOutput((prevOutput) => prevOutput + message + "\n");
//               };
                
//                 //add result of eval to output
//               const result = eval(input);
//                 setOutput((prevOutput) => prevOutput + result + "\n");
                
//             } catch (error) {
//                 //add error messages to output
//               setOutput(
//                 (prevOutput) => prevOutput + "Error: " + error.message + "\n"
//               );
//             }
//     };

    

//   return (
//     <>
//       <div id="runtimeContainer">
//         <div id="runtimeLeft">
//           <button id="runtimeSubmit" onClick={handleClick}>Run Code</button>
//           <textarea id="runtimeInput" placeholder='//your code here' onChange={handleChange}></textarea>
//         </div>
//               <pre id="runtimeOutput">{output}</pre>
//       </div>
//     </>
//   );
// };

// export default Runtime;