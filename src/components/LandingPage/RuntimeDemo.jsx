import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";

const RuntimeDemo = () => {
  // create state for 'input' (left runtime)
  const [input, setInput] = useState('');
const [output, setOutput] = useState('')
    
    const handleChange = (e) => {
       setInput(e)
    }
  // on 'run code' click, set the output to the (evaluated) input
  const handleRun = (e) => {
    try {
      const consoleMessages = [];
      const originalConsoleLog = console.log;
      console.log = (message) => {
        consoleMessages.push(message);
        originalConsoleLog(message);
      };

      const result = eval(input);

      const outputText = consoleMessages.join("\n") + "\n" + result;

      setOutput(outputText);

    } catch (error) {
      const errorOutput = "Error: " + error.message + "\n";
      setOutput(errorOutput);
    }
  }

  return (
      <>
          <hr className="border border w-10/12" />
      <p className="mt-20 mb-5"> Runtime demo:</p>
      <div id="demo-container" className="w-1/2 h-[45vh] flex justify-center mb-20">
        <div
          id="demo-content"
          className="h-full flex w-full flex-col items-center justify-center"
        >
          <button id="demoSubmit" className="border-2" onClick={handleRun}>
            Run Code
          </button>
          <div
            id="demoBody"
            className="flex flex-row h-screen w-full justify-center"
          >
            <div id="demoLeft" className="w-1/2 h-full flex flex-col">
              <Editor
                height="100%"
                width="100%"
                theme="vs-dark"
                onChange={handleChange}
                value={input}
              />
            </div>
            <div
              id="demoRight"
              className="w-1/2 h-full flex flex-col bg-[#353839]"
            >
              <Editor
                height="100%"
                width="100%"
                theme="vs-dark"
                value={output}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RuntimeDemo;