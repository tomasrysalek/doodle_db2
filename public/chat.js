$(function(){
    //make connection
 var socket = io.connect('http://localhost:4433')

 //buttons and inputs
 var message = $("#message")
 var send_message = $("#send_message")
 var chatroom = $("#chatroom")
 var feedback = $("#feedback")

 //Emit message
 send_message.click(function(){
     if(message.val().trim() === ""){

     }
     else{
        socket.emit('new_message', {message : message.val()})
     }
 })


 //Listen on new_message
 socket.on("new_message", (data) => {
     feedback.html('');
     message.val('');
     chatroom.append("<p class='message'>" + data.username + "<br>" + data.message + "</p>")
 })

 //Emit typing
 message.bind("keypress", () => {
     socket.emit('typing')
 })

 //Listen on typing
 socket.on('typing', (data) => {
     feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
 })

 socket.on('disconnect', ()=>{
    socket.disconnect();
 })
});
