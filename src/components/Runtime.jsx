import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";

const Runtime = () => {
  const editorRef = useRef(null);
  const outputRef = useRef(null);
  const [input, setInput] = useState("");
  const [outputType, setOutputType] = useState(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    const editorDoc = new Y.Doc();
    const provider = new WebrtcProvider("interview-Room", editorDoc);
    const type = editorDoc.getText("monaco");
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
  };

  const handleOutputDidMount = (output, monaco) => {
    outputRef.current = output;
    const outputDoc = new Y.Doc();
    const provider = new WebrtcProvider("interviewOutput", outputDoc);
    const type = outputDoc.getText("output");
    setOutputType(type);
    const binding = new MonacoBinding(
      type,
      outputRef.current.getModel(),
      new Set([outputRef.current]),
      provider.awareness
    );
  };

  const handleClick = () => {
    try {
      const consoleMessages = [];
      const originalConsoleLog = console.log;
      console.log = (message) => {
        consoleMessages.push(message);
        originalConsoleLog(message);
      };

      const result = eval(input);

      const outputText = consoleMessages.join("\n") + "\n" + result;

      outputRef.current.getModel().setValue(outputText);
      if (outputType) {
        outputType.delete(0, outputType.length);
        outputType.insert(0, outputText);
      }
    } catch (error) {
      const errorOutput = "Error: " + error.message + "\n";
      outputRef.current.getModel().setValue(errorOutput);
      if (outputType) {
        outputType.delete(0, outputType.length);
        outputType.insert(0, errorOutput);
      }

      console.error("An error occurred:", error);
    }
  };

  const handleChange = (e) => {
    setInput(e);
  };

  return (
    <>
      <div
        id="runtime-container"
        className="w-4/5 h-[80vh] flex justify-center"
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
