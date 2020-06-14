const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + '/dist/'));
app.post('/test',(req,res)=>{
    res.end('ssssssss');
});
app.get(/.*/,(req,res)=>{
    res.sendFile(__dirname + '/dist/index.html');
})

app.listen(port);