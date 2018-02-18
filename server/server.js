var express = require('express');
var app = express();
var io = require('socket.io')();

// app.set('port', process.env.PORT || 5000);

let votes = {
  likes: 0,
  dislikes: 0,
};

io.on('connection', (client) => {
  client.on('susbscribeToVotes', () => {
    console.log(`A new user has suscribed to voting events!`);
    client.on('like', () => {
      console.log('User likes!');
      io.emit('updateScore', updateScore('like'));
    });
    client.on('dislike', () => {
      console.log('User dislikes!');
      io.emit('updateScore', updateScore('dislike'));
    });
    client.on('updateScore', () => votes);
    client.on("disconnect", () => console.log("User disconnected"));
  })
});

const port = 5000;

const updateScore = option => {
  if (option === 'like') {
    Object.assign({}, votes, votes.likes++);
  }
  if (option === 'dislike') {
    Object.assign({}, votes, votes.dislikes++);
  }
};

io.listen(port);
console.log(`Listening to port ${port}`);

setInterval(() => {
  io.emit('updateScore', votes);
  console.log(votes);
}, 1000);
