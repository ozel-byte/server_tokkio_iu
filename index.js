const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
const sequelize = require("./DATABASE/db");
const {Server} = require("socket.io");
const userRouter = require('./routes/UserRoutes');
const io = require('socket.io')(server, {
    cors:  {origin: "*"}
});
var bodyParser = require('body-parser')

let  mapArreglo = new Map();



io.on('connection', socket => {
    console.log("Nueva conexion user"+ socket.id + " "+socket.data);

    mapArreglo.set(socket.id , socket.data);

    socket.on('message', (data) => {
        console.log("mensaje"+data)
    });

});

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/user',userRouter);
app.get('/', (req,res)=> {
    res.send("hola ")
});



app.listen(3001, ()=> {
    console.log("server conectado");
    sequelize.sync({force:false}).then(() => {
        console.log("conexion")
    }).catch(e => console.log("error"))
})