import socketClient from 'socket.io-client'
import store from "../../store/store";
import { setLocalStream, setMe, setRemoteStream, setSocket } from "../../store/slices/callSlice";

const SERVER = "http://localhost:5000"
const CONSTRAINTS = { audio: true, video: true };
let socket;
let peer;
export const handleVideo = (data) => {
    const localStream = store.getState().call.localStream
    const call = peer.call(data.peerId, localStream)
    console.log('data', data);
    call.on('stream', (incomingStream) => {
        console.log('remote user', incomingStream)
        store.dispatch(setRemoteStream(incomingStream))
    })
}

export const connectWithWebSocket = () => {

    socket = socketClient(SERVER)
    socket.on('connection', () => {
        console.log('connected', socket.id)
        store.dispatch(setSocket(socket.id));
    })
    socket.on('callUser', (data) => {
        if (data.socketId !== store.getState().socketId) {
            console.log('callUsers', data);
            handleVideo(data)
        }
    })
    socket.on('close', (call) => {
        store.dispatch(setRemoteStream(null))
    })
}

export const connectWithPeer = () => {
    peer = new window.Peer(undefined, {
        path: '/peerjs',
        host: '/',
        port: 5000
    })

    peer.on('open', (id) => {
        store.dispatch(setMe(id));
    })
    peer.on('call', (call) => {
        call.answer(store.getState().call.localStream)
        call.on('stream', (incomingStream) => {
            console.log('stream', incomingStream)
            store.dispatch(setRemoteStream(incomingStream))
        })
    })
}

export const getLocalStream = () => {
    navigator.mediaDevices.getUserMedia(CONSTRAINTS).then((stream) => {
        store.dispatch(setLocalStream(stream))
    }).catch((err) => {
        console.log('err', err)
    })
}
export const callRequest = (data) => {
    socket.emit('callUser', data)
}

export const callEnd = () => {
    // peer.destroy();
    socket.emit('callOff')
    store.dispatch(setRemoteStream(null));
    console.log('Connection close');
}