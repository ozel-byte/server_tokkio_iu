const Server = require('./models/server');
require('dotenv').config();
const server = new Server();


server.execute();

/*   const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server,{
    cors: {
        methods: ["GET,POST"]
    }
});

const sequelize = require("./DATABASE/db");
const userRouter = require('./routes/UserRoutes');
var bodyParser = require('body-parser')
const cors = require('cors');
let  mapArreglo = [];
let mapUser = new Map()

app.use(cors());


io.on('connection', socket => {
    let s = socket.id;
    socket.on('message', (data) => {
        console.log(data)
       mapArreglo.push({
           idUser: socket.id,
           user: data
       })
       emitir(io)
    });


    function emitir(io) {
        io.emit('emitir',mapArreglo);
    }

    socket.on('disconnect',() => {
        console.log(socket.id);
        console.log("user desconectado" + socket.id);
       for (let index = 0; index < mapArreglo.length; index++) {
           const element = mapArreglo[index];
           if(element.idUser === socket.id){
               mapArreglo.splice(index,1);
               emitir(io);
               break;
           }
       }
       
    })

});

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/user',userRouter);

app.get('/', (req,res)=> {
    res.send("hola ")
});


server.listen(3001, ()=> {
    console.log("server conectado");
    sequelize.sync({force:false}).then(() => {
        console.log("conexion")
    }).catch(e => console.log("error"))
}) */