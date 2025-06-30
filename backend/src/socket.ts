import { Server as IOServer } from "socket.io";

export function setupSocket(server: any, prisma: any) {
  const io = new IOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinRoom", (eventId: string) => {
      socket.join(eventId);
      console.log(`Socket ${socket.id} joined room ${eventId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}