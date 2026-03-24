import { WebSocketServer } from "ws";

export const initWebSocket = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    console.log("WS Connected");

    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());

      // Broadcast
      wss.clients.forEach((client: any) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify(data));
        }
      });
    });

    ws.on("close", () => {
      console.log("WS Disconnected");
    });
  });
};