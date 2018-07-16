// 확장모듈 테스트

console.log('console.log');
console.info('console.info');
console.error('console.error');
console.warn('console.warn');

var clog = require('clog');

clog.configure({'log level': 1});

clog.debug('clog.debug');//5
clog.error('clog.error');//4
clog.warn('clog.warn');//3
clog.info('clog.info');//2
clog.log('clog.log'); //1

var logger = require('tracer').colorConsole({
  format: '[{{timestamp}}] {{title}}: {{message}} {{file}}:{{line}}',
  dateFormat: 'HH:MM:ss'
});
logger.log('tracer.log');
logger.info('tracer.info');
logger.error('tracer.error');
logger.warn('tracer.warn');
logger.debug('tracer.debug');
logger.trace('tracer.trace');