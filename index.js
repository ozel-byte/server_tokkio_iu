const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
const sequelize = require("./DATABASE/db");
const {Server} = require("socket.io");
const userRouter = require('./routes/UserRoutes');
const io = new Server(server);
var bodyParser = require('body-parser')
const cors = require('cors');
let  mapArreglo = new Map();


app.use(cors());


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