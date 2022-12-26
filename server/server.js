const users = require('./users')
const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))

const P = BigInt(4691)
const g = BigInt(4332)

const io = new Server(server, {
    cors: {
        // origin: 'http://localhost:5173',
        origin: [
            'http://localhost:5173',
            'https://transcendent-piroshki-aabaf5.netlify.app/chat',
            'https://transcendent-piroshki-aabaf5.netlify.app/',
        ],
        methods: ['POST', 'GET'],
    },
})

app.get('/serverKeys', (req, res) => {
    res.send({ P: P.toString(), g: g.toString() })
})

app.get('/chatcode/:chatcode', async (req, res) => {
    const { chatcode } = req.params
    console.log(chatcode)
    const chat = await users.chatCodeExists(chatcode)
    res.send(chat)
})

app.post('/addContact', async (req, res) => {
    const body = req.body
    const user = await users.joinChat({
        username: body.username,
        publicKey: body.publicKey,
    })
    res.send(body)
})

io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('joinChat', (data) => {
        console.log('user joined with given data: ', data)

        const user = users.joinChat({
            username: data.username,
            chatcode: data.chatcode,
            publicKey: data.publicKey,
            socketId: socket.id,
        })

        socket.join(user.chatcode)

        socket.emit('notif', {
            sender: 'system',
            message: `welcome to the chat ${user.username}`,
        })

        socket.broadcast.to(user.chatcode).emit('notif', {
            sender: 'system',
            message: `${user.username} has joined the chat`,
        })

        io.in(user.chatcode).emit('members', {
            members: users.getMembers(user.chatcode),
        })
    })

    socket.on('privateMessage', (message) => {
        console.log('message sent: ', message)

        const senderPublicKey = users.getPublicKey(
            message.sender,
            message.chatcode
        )

        socket.to(message.chatcode).emit('privateMessage', {
            chatcode: message.chatcode,
            sender: message.sender,
            senderPublicKey: senderPublicKey.data.publicKey,
            message: message.message,
        })
    })

    socket.on('leave', (data) => {
        console.log(data)
        const user = users.getUser(data.username, data.chatcode)
        const userLeft = users.leaveChat(user.socketId)

        socket.broadcast.to(user.chatcode).emit('notif', {
            sender: 'system',
            message: `${user.username} left the conversation`,
        })

        io.in(user.chatcode).emit('members', {
            members: users.getMembers(userLeft.chatcode),
        })
    })

    socket.on('disconnect', () => {
        console.log('user left the chat')
    })
})

server.listen(PORT, () => console.log(`listening in port ${PORT}`))
