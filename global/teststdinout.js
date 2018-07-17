process.stdin.on('data', (data)=>{
  // console.log(data.toString());
  process.stdout.write(data);
});