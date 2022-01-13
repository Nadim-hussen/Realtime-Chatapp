//https://stackoverflow.com/questions/67363195/how-do-i-fix-the-following-cors-error-and-polling-error 
// solution of the cors problem

const io = require("socket.io")(8000, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
  });

const users= {}
// if any user join letting other to know that
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
 

// if user send any message
socket.on('send',message=>{
    socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
})
// if user leave the chat
socket.on('disconnect',message=>{
    socket.broadcast.emit('left',users[socket.id])
    delete users[socket.id]
});
})