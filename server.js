/**
 * Required External Modules
 */
// const mongoose = require('mongoose');
const path = require("path");
const dotenv = require('dotenv').config({
    encoding: 'utf8',
});

const port = parseInt((process.env.PORT || "3000"), 10);

const server = require('./src/app');

/**
 * Server Activation
 */
server.on('error', onError);
server.on('listening', onListening);
server.on('connection', function (socket) {
    console.log("A new connection was made by a client.");
    socket.setTimeout(30 * 1000);
    // 30 second timeout. Change this as you see fit.
});

/**
 * Server Activation
 * Connect the database
 */
// mysql.sequelize.sync().then(function () {
// mongodb.connect().then(() => {
// SQLite.sequelize.sync().then(function () {
server.listen(port, () => {
    // if (process.env['NODE_ENV'] === 'production') {
    // require('./jobScheduler')
    // }
    console.log('\x1b[35m%s\x1b[0m', `CORS-enabled web server listening on port ${port}`);
    // require('./services/schedule_data_services').DefaultData
    //     .initData()
    //     .then((result) => {
    //         console.log('\x1b[35m%s\x1b[0m', JSON.stringify(result));
    //     })
    //     .catch(logDebug)
});
// });
// }).catch(logDebug)
// })

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    logDebug({ function: 'onError', error: error, })
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log(`Listening on ${bind}.`);
}