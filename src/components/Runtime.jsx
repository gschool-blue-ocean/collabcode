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
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState({});

  const establishConnection = () => {
    try {
      // let newSocket = new WebSocket(`ws://localhost:8000/`);
      let newSocket = new WebSocket(`wss://collab-code.onrender.com/socket`);

      // when the connection is established
      newSocket.onopen = (e) => {
        console.log("[socket] Connection established");
        socket.send("Connection opened");
      };

      //listen for incoming messages
      newSocket.onmessage = (e) => {
        // debug
        console.log("[socket] Received:", e.data);
        setInput(e.data);
      };

      // when the connection is lost
      newSocket.onclose = (e) => {
        if (e.wasClean) {
          console.log(
            `[socket] Connection closed cleanly, code=${e.code} reason=${e.reason}`
          );
        } else {
          console.log("[socket] Connection died");
        }
      };

      newSocket.onerror = (error) => {
        console.log('[socket] Error:', error.message);
      };

      setSocket(newSocket);
    }
    catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => { establishConnection() }, []);

  //handle inputs
  const handleChange = (e) => {
    // debug
    // console.log("[socket] Sending:", e);
    socket.send(e);
  };

  return (
    <>
      <div
        id="runtime-container"
        className="w-full h-[90vh] flex justify-center"
      >
        <div
          id="runtime-content"
          className="h-[80vh] flex w-[80vw] flex-col items-center justify-center"
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
                value={input}
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
