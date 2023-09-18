// main.js app.js server.js index.js //

// Modules
// const { sayHello } = require('./folder/sayHello');
// sayHello();

// Global variables
// console.log('FROM APP.JS')
// console.log('dirname', __dirname);
// console.log('filename', __filename);
// console.log('process cwd', process.cwd());

// Path
// const path = require('node:path');
// Users/l4pukhh/WebstormProjects/march-2023 - Unix systems
// D:\\l4pukhh\\WebstormProjects\\march-2023 - Windows

// const joinedPath = path.join(__dirname, 'folder', 'sayHello.js')
// const normalizedPath = path.normalize('////test///test2///test23///////test45');
// const resolvedPath = path.resolve('folder', 'sayHello.js');

// OS
// const os = require('os');
// console.log(os.cpus());
// console.log(os.arch());
// console.log(os.release());

// FS
const fs = require('node:fs');
const path = require('node:path');


const filePath = path.join(__dirname, 'folder2')
// fs.writeFile(filePath, 'Hello from Okten !!!', (err) => {
//   if (err) throw new Error(err.message);
// })
// fs.appendFile(filePath, 'hello again\n', (err)=>{
//   if (err) throw new Error(err.message);
// })
// fs.truncate(filePath, (err)=>{
//   if (err) throw new Error(err.message);
// })
// fs.unlink(filePath, (err)=>{
//   if (err) throw new Error(err.message);
// });
// fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
//   if (err) throw new Error(err.message);
//   console.log(data);
// })
// fs.readdir(filePath, (err, files)=>{
//   console.log(files);
// })
// fs.mkdir(filePath, (err)=>{})
// fs.rmdir(filePath, (err)=>{})




