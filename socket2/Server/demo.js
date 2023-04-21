
const express = require ('express');
const port = 1001;
const app = express();
const http = require('http');
const server = http.createServer(app);

//To prepare our connection
const {Server} = require('socket.io')
//the use of new to extantiate
//use the option to prevent blockage from cors
const io = new Server(server, {
    cors:{
        origin: "*",
        //means it should take any url "*"
        methods: ["GET", "POST"],
    },
})

app.use(express.json());
app.get('/', (req, res)=>{
    res.send('Welcome to Socket IO')
});

io.on('connection', (socket) => {
    console.log('a user connected', socket);
});

app.listen(port, ()=>{
    console.log(`server is listening to ${port}`)
});


//app to create route
//sever to create server and listen to it...