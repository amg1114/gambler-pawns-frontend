importScripts("stockfish.js");

onmessage = function (event) {
  postMessage(event.data);
};

const stockfish = new Worker(self);

stockfish.onmessage = function (event) {
  postMessage(event.data);
};
