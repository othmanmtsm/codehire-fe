const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const http = require('http').Server(app);
let io = require('socket.io')(http);

io.sockets.on('connection',socket=>{
    console.log('user connected');
    socket.on('join',id=>{
        socket.join(`room-${id}`);
        console.log(`joined room-${id}`);
        socket.on('message', data=>{
            io.sockets.in(`room-${data.id}`).emit('message', {from: id,to: data.id, text: data.message, type: data.type, created_at: data.created_at});
        })
    })  
})

app.use(express.static(__dirname + '/dist/'));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.get(/.*/,(req,res)=>{
    res.sendFile(__dirname + '/dist/index.html');
})

http.listen(port, ()=>{
    console.log('listening');
});