const net = require("net");

/* 
 1- way to take input from user -> readline.createInterface({input: process.stdin , output: procsess.stdout})
 2- force the user to enter a name otherwise he can not connect to the server 
 3- connect this user to the right port
 4- give a signal to users that a new user get in.
 5- check if user input = quit to quite otherwise show the messages.
 6- receive messages. 
  */

const readLine = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const waitForUsername = new Promise((resolve) => {
  readLine.question("Enter a username to join the chat: ", (answer) =>
    resolve(answer)
  );
});

waitForUsername.then((username) => {
  const socket = net.connect({ port: 8000 });

  readLine.on("line", (data) => {
    if (data === "quit") {
      socket.end();
      socket.write(`${username} has left the chat.`);
    } else {
      socket.write(username + ": " + data);
    }
  });

  socket.on("connect", () => {
    socket.write(username + " has joined the chat.");
  });

  socket.on("data", (data) => {
    console.log("\x1b[33m%s\x1b[0m", data);
  }); // giving color to message

  socket.on("timeout", () => {
    socket.write("quit");
    socket.end();
  });

  socket.on("end", () => process.exit());

  socket.on("error", (error) => console.log(error));
});




/*const net = require('node:net');
const { resolve } = require('node:path'); ,,,,,,,,,,,,,,,,,

const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const username = new Promise(resolve =>{
    rl.question('Enter a username to be able to join the chat : ' , name => resolve(name))
})

username.then(name => {

    const socket = net.connect({port : 8000})

    socket.on('connect', ()=> socket.write(`${name.toString()} has join the chat`).toString())

    // line means whenever the user press enter key when typing into the command line -> excute the callback funciton passing the data that the user typed in
    rl.on('line', data => { if(data === 'quit') { 
            socket.write(`${name} has left the chat`); 
            socket.setTimeout(1000) } // when user wants to leavs the chat, the word quit must have time to send to  the server so that the server can remove the message sender from the chat

            else socket.write(`${name}: ${data} `)  

            //readline.on('line', data => (data === 'quit') ? socket.write(`${name} has left the chat`) : socket.write(`${name}: ${data}`)
    })


    //_____________handling data______________

    // receive data
    socket.on('data' , data => console.log(data))

    socket.on('timeout', ()=>{ socket.write('quit'); socket.end(); })

    socket.on('end' , ()=> process.exit() )

    socket.on('error' , (error)=>console.log(error))

})*/

// socket.on('timeout', () => { socket.write('quit'); socket.end() });
