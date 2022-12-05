import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import * as Socket from '../../utils/socket';
import './style.css';

const Video = () => {
    const { localStream, remoteStream, me, socketId } = useSelector((state) => state.call);
    const [callId, setCallId] = useState('');
    const localVideoRef = useRef()
    const remoteVideoRef = useRef();

    useEffect(() => {
        if (localStream?.id) {
            localVideoRef.current.srcObject = localStream
        }
    }, [localStream])
    useEffect(() => {
        if (remoteStream?.id) {
            remoteVideoRef.current.srcObject = remoteStream
        }
    }, [remoteStream])


    const handleCreate = () => {
        Socket.connectWithWebSocket()
        Socket.connectWithPeer()
        Socket.getLocalStream()
    }

    const handleClose = () => {
        //dispatch(setRemoteStream(null));
        Socket.callEnd();
    }

    const handleCall = () => {
        Socket.callRequest({
            socketId: callId,
            peerId: me
        })
    }

    return (
        <div className="video-wrapper">
            <div>
                <span>YOUR CALL ID:</span><strong>  {socketId}</strong>
            </div>
            <div className='video-group'>
                <div className='video'>
                    {
                        localStream &&
                        <div>
                            <span>Local</span>
                            <div><video autoPlay muted width={400} height={400} ref={localVideoRef} /></div>
                        </div>
                    }
                </div>
                <div className='video'>
                    {
                        remoteStream &&
                        <div>
                            <span>Remote</span>
                            <div><video autoPlay muted width={400} height={400} ref={remoteVideoRef} /></div>
                        </div>
                    }
                </div>

            </div>

            <div className='button-group'>
                <div>
                    <button className='create-button' onClick={handleCreate}>Create Video Call</button>
                    {remoteStream && <button className='call-off' onClick={handleClose}>Call Off</button>}
                </div>
                {localStream &&
                    <div className='connect-wrapper'>
                        <label htmlFor='callId'>He/She Call Id</label>
                        <input id='callId' className='connect-input' onChange={(e) => setCallId(e.target.value)} />
                        <button onClick={handleCall}>Call</button>
                    </div>}
            </div>
        </div>
    );
}


export default Video;