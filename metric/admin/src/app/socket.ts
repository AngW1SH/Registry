import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_IO_URL!;
const path = import.meta.env.VITE_SOCKET_IO_PATH!;

export const socket = io(URL, {
  path: path,
});
