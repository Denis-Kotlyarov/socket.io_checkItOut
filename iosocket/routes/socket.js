// const { createServer } = require('http');
// const { Server } = require('socket.io');

// const express = require('express');
// const router = express.Router();

// module.exports = (io) => {
//     io.on('connection', (socket) => {
//         //console.log("IO connection is ready", socket); 
//         socket.emit('connected', {
//             message: "IO connection is ready",
//             messages: messages,
//         });
    
//         socket.on('message', (arg) => {
//             console.log(arg);
//             socket.emit('message', arg)
//         });
    
//         socket.on('disconnect', (reason) => {
//             console.log("Клиент был отключен: " + reason)
//         });
//     })

//     return router;
// };