var fs = require('fs');
var less = require('less');
fs.watch('src/less', {
    persistent: true, // 设为false时，不会阻塞进程。
    recursive: false
}, function (event, filename) {
    console.log(event,filename);
    // if (event === 'change') {
    //     console.log('检测到新增文件。');
    //     if (filename) {
    //         console.log('文件名:', filename);
    //     }
    // }
});