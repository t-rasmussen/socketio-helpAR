//make connection 
//var socket = io.connect('http://localhost:4000/')
//var socket = io.connect('https://socketio-helpar.herokuapp.com:4000/')
var socket = io()

var handle = document.getElementById('handle')
var message = document.getElementById('message')
var output = document.getElementById('output')
var feedback = document.getElementById('feedback')
var btnSend = document.getElementById('btnSend')

btnSend.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })  
})

message.addEventListener('keypress', () => {
    socket.emit("typing", handle.value)
})

//listen for chat response from server
socket.on('chat', (data) =>{
    feedback.innerHTML = ""
    output.innerHTML += '<p><strong>' + data.handle + '</strong> ' + data.message + '</p>';
})

//listen for typing response
socket.on('typing', (data) =>{
    feedback.innerHTML = '<p><em>'+data + ' is typing</em></p>'
})

