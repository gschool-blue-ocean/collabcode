import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";

const Runtime = () => {
  //   //set refs for editor and console
  const editorRef = useRef(null);
  const outputRef = useRef(null);
  //   //set states for global access
  let input = "";

  //let socket = new WebSocket(`ws://localhost:8001/`);
  let socket = new WebSocket('wss://collab-code.onrender.com/');

  // when the connection is established
  socket.onopen = (e) => {
    console.log("[open] Connection established");
  };

  // when receiving some data from the server
  socket.onmessage = (e) => {
    console.log(`[message] Data received from server: ${e.data}`);
  };

  // when the connection is lost
  socket.onclose = (e) => {
    if (e.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`
      );
    } else {
      console.log("[close] Connection died");
    }
  };

  socket.onerror = (error) => {
    console.log(`[error]`);
  };

  //handle inputs
  const handleChange = (e) => {
    input = e;
    console.log("data to be sent via socket:", input);
    socket.send(input);
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
          <button id="runtimeSubmit" className="border-2">
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
                onChange={handleChange}
              />
            </div>
            <div
              id="runtimeRight"
              className="w-1/2 h-full flex flex-col bg-[#353839]"
            >
              <Editor height="100%" width="100%" theme="vs-dark" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Runtime;
