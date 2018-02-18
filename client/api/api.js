import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

const susbscribeToVotes = (cb) => {
  socket.on(
    'updateScore',
    (votes) => {
      cb(votes);
    }
  );
  socket.emit('susbscribeToVotes');
};

const like = () => {
  socket.emit('like');
};

const dislike = () => {
  socket.emit('dislike');
};


export {
  susbscribeToVotes,
  like,
  dislike,
};