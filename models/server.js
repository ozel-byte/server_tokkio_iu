const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Sockets = require("./socket");
const sequelize = require("../DATABASE/db");
const userRouter = require('../routes/UserRoutes');
var bodyParser = require('body-parser');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, {});
        this.app.use(cors());
    }

    initSocket() {
        new Sockets(this.io);
    }

    initRoutes() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use('/user', userRouter);

        this.app.get('/', (req,res) => {
            res.send("hola")
        })
    }
    
    initDB() {
        sequelize.sync({ force: false }).then(() => {
            console.log("conexion")
        }).catch(e => console.log("no se realizo la conexion"))
    }


    execute() {
        this.initRoutes()
        this.initSocket();
        this.initDB()
        this.server.listen(this.port, () => {
            console.log("Server en el puerto ", this.port);
        })
    }
}


module.exports = Server;