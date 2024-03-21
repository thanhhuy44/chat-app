import io from "socket.io-client";

const socket = io(process.env.SOCKET_URL as string, {
  autoConnect: true,
});

export default socket;
