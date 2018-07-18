process.on('message', data=>{
  console.log(data);
  process.send('I am child.');
});