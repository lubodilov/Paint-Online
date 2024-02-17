const express = require('express');
const app = express();

const cors = require('cors')

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

console.clear();

const path = require('path');
require('dotenv').config();

app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/home.html'));
});

app.get('/solo/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/game.html'));
});

app.get('/party/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/game.html'));
});

// const guestDataRouter = require('./routes/GuestData.js');
// app.use('/api/data', guestDataRouter);



const partyControl = require("./controllers/partyController.js");
const gameControl = require("./controllers/gameController.js");

io.on('connection', (socket) => {
    console.log('A user connected');

    partyControl(socket , io);
    gameControl(socket , io);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
