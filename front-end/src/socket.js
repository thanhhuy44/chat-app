import { io } from 'socket.io-client';
const URL = 'http://localhost:3030';

const socket = io(URL);
export default socket;
