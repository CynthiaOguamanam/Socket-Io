const express = require('express');
const app = express();
const http = require('http');
const mongoose  = require('mongoose');
const server = http.createServer(app);

const { Server } = require("socket.io");
const url = "mongodb+srv://Socket_IO:Socket_IO@cluster0.omgw7x0.mongodb.net/?retryWrites=true&w=majority";

const io = new Server(server, {cors:{
    origin: "*",}, pingTimeout: 9000})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});
app.use(express.json())
app.use('/api', require('./Router/router'))


mongoose.connect(url).then(()=>{
  console.log('database connected')
})

const db = mongoose.connection;
db.on("open", () =>{
  const observer = db.collection("users").watch();

observer.on("change", (change) =>{
  if(change.operationType === "insert"){
    const newData = {
      name: change.fullDocument.name,
      _id: change.fullDocument._id,
      like: change.fullDocument.like
    }
  io.emit('newEntry', newData)
  }
})
// change is a predefined key word
})

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

  socket.on("disconnected", () =>{
    console.log("user has been disconnected")
  })

    socket.on("chat message", (text) =>{
      console.log(text)
    })
  });

server.listen(1234, () => {
  console.log('server is now connected');
});
