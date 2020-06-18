const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const database = require('../database/index');
const chalk = require('chalk');
const path = require('path');

app.use(express.static('public'));

app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.use('/auth', routes.auth);
app.use('/userTransaction', routes.transaction);
app.use('/driverTransaction', routes.driver);
app.use('/user', routes.user)
app.use('/driver', routes.driver)
app.use('/notification', routes.notification);

const port = process.env.PORT || 8080;

database.sql.sync({
    force: false
});

const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

// SOCKET IO

const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    console.log(chalk.blueBright('new connection'))
    socket.on('newTransaction', (data) => {
        console.log(chalk.blue('socket is here'));
        console.log(data);
        socket.broadcast.emit('notification', data);
    });

    socket.on('acceptDelivrary', (data) => {
        socket.broadcast.emit('userNotification', data)
    })

    socket.on('doneTransaction', (data) => {
        socket.broadcast.emit('userNotification', data);
    });
});