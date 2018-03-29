var express = require('express')
var socket = require('socket.io')

//app setup
var app = express()
var server = app.listen(4000, () =>{
    console.log("server is listening on port 4000")
})

//static files
app.use(express.static('public'))

//socket setup
var io = socket(server, { wsEngine: 'ws' }) 
//you have to set { wsEngine: 'ws' }, otherwise there is latency when there is teo or more people on the chat
//https://github.com/socketio/socket.io/issues/3179

io.on('connection', (socket) => {
    console.log("browser made a connection! ", socket.id)

    socket.on('chat', (data) =>{
        console.log(data)
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})


