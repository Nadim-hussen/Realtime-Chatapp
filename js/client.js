const socket = io("http://localhost:8000");


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
}

const name1 = prompt("Enter your name");
socket.emit('new-user-joined',name1);

socket.on('user-joined',name1=>{
    append(`${name1} join the chat`,'right')
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})
socket.on('left',name1=>{
    append(`${name1} left the chat`,'left')
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message)
    messageInput.value="";
})

