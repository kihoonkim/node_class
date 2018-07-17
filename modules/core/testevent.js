var EventEmitter = require('events');

var myEvent = new EventEmitter();

myEvent.addListener('event1', print);
myEvent.on('event1', print);
myEvent.once('event1', print);

var count = 0;
myEvent.emit('event1', ++count);
myEvent.emit('event1', ++count);

function print(data) {
  console.log(data);
}