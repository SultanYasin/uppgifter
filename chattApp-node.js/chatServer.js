const net = require('net');

let users = [];

const server = net.createServer(socket => {

    users.push(socket);
    console.log('Client connected to the server!.');
    
    socket.on('data', data => broadcast(data, socket));

    socket.on('error', err => console.log('A client has disconnected.'));

    socket.on('close', () =>  console.log("A client has left the chat."));
});

server.listen(8000 || 8001);

function broadcast(message, messageSender) {
    if (message === 'quit') { 
        const index = users.indexOf(messageSender);
        users.splice(index, 1); }

    else users.forEach(user => { if (user !== messageSender) user.write(message) });
}

/* 
  users.push(socket) // adding users to the array

    handling the messages that been send from the user and boadcasted it.
    this function except the message that user send and a socket to know who send the message.
    socket.on('data' , data =>broadcast(data , socket) ) 

     logging when a user disconnect from the server. 
    socket.on('error' , error => console.error('A client has disconnected')) 

    logging when a user leave the chat server.
    socket.on('close' , ()=> console.log('A client has left the chat.'))
*/


/* 
function broadcast(message , messageSender)
this function takes the message (as a param)to send it to every one in the group chat,
 and messageSender(as a param) so that the sender don't receive the message he send him self.

 then I check if the message that messageSender is 'quit' so that mean they msut be removed from the users array by using 
 users.indexOf(messageSender) 
 -> const senderSocket = users.indexOf(messageSender) then splice methode that remove Items from arrays
 -> (message.toString() === 'quit') ? users.splice(senderSocket , 1) 

 if message is not 'quit' so I wanna to broadcast to all users in the array by looping throgh the array of useres, except the one who sende the message.
 -> users.forEach(user => {if(user !== messageSender) user.werite(message)})

 and if the message is not quit
*/













//tcp transition controll protocol


/* 
create server createServer(socket=>{})
make array of users
socket.on('data' , data=>{})
socket.on('error' , error=>{})
socket.on('close' , ()=>)
__
listen to a specific portnumber
__


server = net.createServer() listens for incomming connections -> when it receive one it creates a net.socket object to communicate with whoever connected
*Server -> event emitter is a moduel that facilitata communication between nodejs objects
array contained sockets(socket is an end point connection between 2 program) users in other word. this arrays work is to send the message to all users in this array 
________
must make the server listen to the messages through socket.on(){the one that should be passed in createServer(socket)}
-> socket.on('data' , (data)=> {}) data is the messages that sendes from the client then use broadcast methode to send the messages to the users

__________
broadcast function must take 2 param a- the sent message , b- the user that sent this message through his socket number

*/