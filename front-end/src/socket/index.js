import io from "socket.io-client";

const socket = io("https://chat-app-delta-neon.vercel.app", {
  autoConnect: true,
});

export default socket;
