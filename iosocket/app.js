const express = require('express');
const { init, User, Todo, Message } = require('./models/init');
const { createServer } = require('http');
const { Server } = require('socket.io');
const axios = require('axios');

//Inialize express
const app = express();
//Open ability to work with JSON
app.use(express.json())

//Inialize socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:8080', "https://admin.socket.io"],
        credentials: true
    }
})
const { instrument } = require("@socket.io/admin-ui");
instrument(io, {
    auth: false,
    mode: "development",
});

//Cors
const cors = require('cors');
app.use(cors())

//Our routes
const users = require('./routes/users');
app.use('/users', users);
const todos = require('./routes/todos');
app.use('/todos', todos);
const messages = require('./routes/messages');
app.use('/messages', messages);

//РЕГИСТРАЦИОННЫЕ_ЛОГИОННЫЕ ТАНЦЫ
const crypto = require('crypto');
app.post('/register', async (req, res) => {
    try {
        const password = crypto.createHash('sha256').update(req.body.password).digest('hex');
        const user = await User.create({
            ...req.body,
            password
        });

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.send('Ошибка');
    }
    
})
const { generateTokens } = require('./utils/tokens');
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        
        if (user != null) {
            //Password chek
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
            if (user.password == hashedPassword) {
                //Generate token
                const tokens = generateTokens({
                    id: user.id,
                    fisrt_name: user.fisrt_name,
                    last_name: user.last_name,
                    email: user.email
                });
                console.log(tokens)
                return res.json({
                    ...user.dataValues,
                    ...tokens
                })
            } else {
                return res.status(401).json({
                    error: "Not password! LOX",
                });
            }
        } else {
            return res.status(401).json({
                error: "Unauothorized",
            });
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
})
const { auth } = require('./middleware/auth');
app.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.authUser.id);
        return res.json(user)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
})
//пока нет
app.post('/refresh-token', async (req, res) => {
    try {
        const { token } = req.body;

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
})


//Server UP
app.listen(3000, async () => {
    await init();
});

//onst mes = ['Test msg.', 'Can I help you?'];

//Socket UP
let activeRoom = 0;
io.on('connection', (socket) => {
    console.log(socket.id)
    
    //console.log("IO connection is ready", socket); 
    socket.emit('connected', {
        message: "IO connection is ready",
        //messages: mes,
    });

    socket.on('message', (arg) => {
        console.log(arg);
        activeRoom = "room:" + arg.roomId;
        socket.join(activeRoom);
        
        socket.emit('message', {
            room: "room:" + arg.roomId,
            msg: `${socket.id}: ${arg.msg}`,
        });
        socket.to("room:" + arg.roomId).emit('message', {
            room: "room:" + arg.roomId,
            msg: `${socket.id}: ${arg.msg}`,
        });
    });

    socket.on('private-message', async (arg) => {
        try {
            let UserId = await axios.post('http://localhost:3000/users/email', {
                email: arg.fromMail
            });
            UserId = UserId.data.id;

            let ToId = await axios.post('http://localhost:3000/users/email', {
                email: arg.toMail
            });
            ToId = ToId.data.id;

            await axios.post('http://localhost:3000/messages/push', { 
                body: arg.msg,
                UserId: UserId,
                ToId: ToId,
            });

            const msg = await axios.post('http://localhost:3000/messages/all', {
                UserId: UserId,
                ToId: ToId,
            });
            console.log(msg);

            socket.emit('private-chat-response', { 
                data: msg.data,
                ToId: arg.toMail,
            });
        } catch (error) {
            console.log(error);
        }
        
    })

    socket.on('disconnect', (reason) => {
        console.log("Клиент был отключен: " + reason)
    });

    setInterval( async () => {
        const sockets = await io.in(activeRoom).fetchSockets();
        socket.to(activeRoom).emit('online', sockets.length);
    }, 5000)
})
httpServer.listen(3001);