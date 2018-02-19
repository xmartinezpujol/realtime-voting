var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.io = io;

let votes = {
  likes: 0,
  dislikes: 0,
};

app.get('/like', (req, res) => {
  res.send('Like testing!');
  req.app.io.emit('updateScore', updateScore('like'));
});

app.get('/dislike', (req, res) => {
  res.send('Dislike testing!');
  req.app.io.emit('updateScore', updateScore('dislike'));
});

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

const updateScore = option => {
  if (option === 'like') {
    Object.assign({}, votes, votes.likes++);
  }
  if (option === 'dislike') {
    Object.assign({}, votes, votes.dislikes++);
  }
};

setInterval(() => {
  io.emit('updateScore', votes);
  console.log(votes);
}, 200);

http.listen(5000, () => {
  console.log('Listening on *:5000');
});
