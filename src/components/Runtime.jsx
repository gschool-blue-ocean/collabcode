import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";

const Runtime = () => {
  //set refs for editor and console
  const editorRef = useRef(null);
  const outputRef = useRef(null);
  //set states for global access
  const [input, setInput] = useState("");
  const [outputType, setOutputType] = useState(null); 

  //connect to rtc room for input
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    //init input 
    const editorDoc = new Y.Doc();
    //connect to live or start new connection with webrtc
    const provider = new WebrtcProvider("interview-Room", editorDoc);
    const type = editorDoc.getText("monaco");
    //bind to monaco
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
  };

  //connect to rtc room for output
  const handleOutputDidMount = (output, monaco) => {
    outputRef.current = output;
    //init output
    const outputDoc = new Y.Doc();
    //connect or start new
    const provider = new WebrtcProvider("interviewOutput", outputDoc);
    const type = outputDoc.getText("output");
    setOutputType(type);
    //bind to output
    const binding = new MonacoBinding(
      type,
      outputRef.current.getModel(),
      new Set([outputRef.current]),
      provider.awareness
    );
  };

  //evaluate input, result to output
  const handleClick = () => {
    try {
      //console logs in array,console log each message
      const consoleMessages = [];
      const originalConsoleLog = console.log;
      console.log = (message) => {
        consoleMessages.push(message);
        originalConsoleLog(message);
      };
//declare result
      const result = eval(input);
//build console log messages
      const outputText = consoleMessages.join("\n") + "\n" + result;
//update output ref
      outputRef.current.getModel().setValue(outputText); 
      if (outputType) {
        outputType.delete(0, outputType.length);
        outputType.insert(0, outputText); 
      }
      //build error message to return
    } catch (error) {
      const errorOutput = "Error: " + error.message + "\n";
      //update output ref
      outputRef.current.getModel().setValue(errorOutput);
      if (outputType) {
        outputType.delete(0, outputType.length);
        outputType.insert(0, errorOutput); // Update the shared Yjs document for the output
      }
    }
  };

//handle inputs
  const handleChange = (e) => {
    setInput(e);
  };

  return (
    <>
      <div
        id="runtime-container"
        className="w-full h-[80vh] flex justify-center"
      >
        <div
          id="runtime-content"
          className="h-full flex w-[80vw] flex-col items-center justify-center"
        >
          <button id="runtimeSubmit" className="border-2" onClick={handleClick}>
            Run Code
          </button>
          <div
            id="runtimeBody"
            className="flex flex-row h-screen w-full justify-center"
          >
            <div id="runtimeLeft" className="w-1/2 h-full flex flex-col">
              <Editor
                height="100%"
                width="100%"
                theme="vs-dark"
                onMount={handleEditorDidMount}
                onChange={handleChange}
              />
            </div>
            <div
              id="runtimeRight"
              className="w-1/2 h-full flex flex-col bg-[#353839]"
            >
              <Editor
                height="100%"
                width="100%"
                theme="vs-dark"
                onMount={handleOutputDidMount}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Runtime;
