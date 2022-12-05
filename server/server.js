const express = require('express')
const socket = require('socket.io')
const { ExpressPeerServer } = require('peer')
const PORT = 5000

const app = express()

const server = app.listen(PORT, () => {
    console.log('server listen on port  5000')
})

const peerServer = ExpressPeerServer(server, { debug: true })
app.use('/peerjs', peerServer)

peerServer.on('connection', (client) => {
    console.log('peer client', client.getId())
})
peerServer.on('disconnect', () => {
    console.log('peer client leave')
})
const io = socket(server, {
    cors: {
        origin: "*",
        method: ["GET"]
    }
})

io.on('connection', (socket) => {
    socket.emit('connection start', null)
    console.log('user', socket.id)
    socket.on('callUser', (data) => {
        socket.broadcast.emit('callUser', {
            peerId: data.peerId,
            socketId: data.socketId
        })
    })
    socket.on('callOff', (data) => {
        console.log('close user');
        socket.broadcast.emit('close')
    })
})

