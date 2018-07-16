function print(msg) {
  console.log(msg);
}

print('1, start');

setImmediate(print, '5. setImmediate');
setTimeout(print, 0, '4. setTimeout');
setInterval(print, 2000, '6. setInterval');
process.nextTick(print, '3. nextTick');
process.nextTick(()=>print('dkdkk'));
print('2, finish');
