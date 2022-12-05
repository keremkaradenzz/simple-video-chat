import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    localStream: null,
    remoteStream: null,
    me: '',
    socketId: null,
}


const CallSlice = createSlice({
    name: 'callSlice',
    initialState,
    reducers: {
        setRemoteStream: (state, action) => {
            state.remoteStream = action.payload;
        },
        setLocalStream: (state, action) => {
            state.localStream = action.payload;
        },
        setMe: (state, action) => {
            state.me = action.payload;
        },
        setSocket: (state, action) => {
            state.socketId = action.payload;
        },
    }

});


export const {
    setRemoteStream, setLocalStream, setMe, setSocket
} = CallSlice.actions;


export default CallSlice.reducer;