// import ws from 'ws'
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8001 }, () => {
  console.log("Server running, listening on port 8001");
});

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    console.log("received: $s", data);
  });
});
