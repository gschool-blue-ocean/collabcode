import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";

const Runtime = () => {
  // create state for 'input' (left runtime)
  const [input, setInput] = useState('');

  // create state for 'output' (right runtime)
  const [output, setOutput] = useState('');

  // create state for the socket (object)
  const [socket, setSocket] = useState({});

  const establishConnection = () => {
    try {
      // create the web socket
      let newSocket = new WebSocket('ws://localhost:8000/'); // local
      // let newSocket = new WebSocket('wss://collab-code.onrender.com/socket'); // Render

      // when the connection is established
      newSocket.onopen = (e) => console.log("[socket] Connection established");

      // incoming messages set the 'input' state to whatever the server sent out
      newSocket.onmessage = (e) => setInput(e.data);

      // when the connection is lost
      newSocket.onclose = (e) => {
        e.wasClean ? console.log(`[socket] Connection closed cleanly, code=${e.code} reason=${e.reason}`)
          : console.log("[socket] Connection died");
      };

      // log any errors to the console
      newSocket.onerror = (error) => console.log('[socket] Error:', error.message);

      // after configuring newSocket, set it to the 'socket' state
      setSocket(newSocket);
    }
    catch (err) { console.error(err.message) }
  }

  // as soon as the element is rendered, establish the connection ONCE
  useEffect(() => { establishConnection() }, []);

  // on change, send the changes via the socket
  const handleChange = (e) => socket.send(e);

  // on 'run code' click, set the output to the (evaluated) input
  const handleRun = (e) => {}

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
          <button
            id="runtimeSubmit"
            className="border-2"
            onClick={handleRun}
          >
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

export default Runtime;
