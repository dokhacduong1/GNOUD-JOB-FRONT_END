import { io } from 'socket.io-client';
import { getCookie } from './src/helpers/cookie';

const checkTokenClient = getCookie("token-user") || "";
const checkTokenEmployer = getCookie("token-employer") || "";

const socketClient = io("http://localhost:2709",{
    auth: {
        token: checkTokenClient,
        role: "client"
    }
});
const socketEmployer = io("http://localhost:2709",{
    auth: {
        token: checkTokenEmployer,
        role: "employer"
    }
});