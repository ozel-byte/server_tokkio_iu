
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Sockets = require("./socket");
const sequelize = require("../DATABASE/db");
const userRouter = require('../routes/UserRoutes');

const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, {
            cors: {
                methods: ["GET,POST"]
            }
        });
        this.app.use(cors());
    }

    /*Metodo para inicar los sockets */
    initSocket() {
        new Sockets(this.io);
    }

    /*Metodo que inicia las rutas */
    initRoutes() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use('/user', userRouter);

        this.app.get('/', (req,res) => {
            res.send("hola")
        })
    }
    
    /*Metodo que incia la base de datos */
   initDB() {
   sequelize.authenticate().then(() => {
       console.log("Conexion Exitosa");
   }).catch(e => {
       console.log("no se pudo establecer una conexion")
   })
    }

    /*Metodo para exuctar los metodos anteriores */
    execute() {
        this.initRoutes()
        this.initSocket();
        this.initDB()
        this.server.listen(this.port, () => {
            console.log("Server en el puerto ", this.port);
        });
        
    }
}


module.exports = Server;