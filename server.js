const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
cors: { origin: "*" }
});

app.get("/", (req, res) => {
res.send("CloudNest chat server is running!");
});

io.on("connection", (socket) => {
console.log("A user connected:", socket.id);

```
socket.on("joinRoom", (roomCode) => {
    socket.join(roomCode);
});

socket.on("sendMessage", (data) => {
    if (
        typeof data?.roomCode !== "string" ||
        typeof data?.name !== "string" ||
        typeof data?.message !== "string"
    ) return;

    const roomCode = data.roomCode.trim();
    const name = data.name.trim().slice(0, 30);
    const message = data.message.trim().slice(0, 2000);

    if (!roomCode || !name || !message) return;

    io.to(roomCode).emit("newMessage", {
        name,
        message,
        time: new Date().toISOString()
    });
});

socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
});
```

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
console.log(`CloudNest server running on port ${PORT}`);
});
