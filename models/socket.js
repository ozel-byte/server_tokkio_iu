class Sockets{
    
    constructor(io){
        this.io = io;
        this.socketEvents();
        this.mapArreglo = [];
        
    }

    /* Eventos para los sockets */
    socketEvents(){

        /* Evento cuando se conecta un usuario */
        this.io.on('connection', socket => {
            
            /* Evento para mandar el id del socket */
            socket.emit("enviar-id", socket.id);

            /* Evento para mandar arreglo de usuarios */
            socket.on('message', (data) => {
               this.mapArreglo.push({
                   idUser: socket.id,
                   user: data.username,
                   imgUser: data.imgUser
               });

               /*Evento que emite el arreglo a los Usuarios */
               this.io.emit('emitir',this.mapArreglo);
               
            });

            /* Evento para las notificaciones */
            socket.on("notificacion-user", (data) => {

                /*Evento que emite la notificacion al usuario */
              this.io.to(data.idReceptor).emit("notificacion", data)
            })

            /* Evento para aceptar la invitacion */
            socket.on("aceptar-invitacion", (data) => {

                /*Evento usuario acepta invitacion */
                this.io.to(data.id).emit("invitacion-acpetada", data)
            })

            /*Evento que trae imagen del user conectado al room */
            socket.on("send-image-user-conected-room", data => {

                /* Evento que emite al usuario en espesifico la imagen del usuario */
                this.io.to(data.id).emit("send-image-user-conected-room-catch",data)
            })
            // Recibiendo los parametrosd la imagen al usuario
            socket.on("enviandoParametros", (data) => {
                //Enviando los parametrosd la imagen al usuario
                this.io.to(data.id).emit("recibeParametros", data)
            })

            /* Evento que conoce que usuario se desconecta y lo borra del arrelo */
            socket.on('disconnect',() => {
                console.log("user desconectado" + socket.id);
               for (let index = 0; index < this.mapArreglo.length; index++) {
                   const element = this.mapArreglo[index];
                   if(element.idUser === socket.id){
                       this.mapArreglo.splice(index,1);
                       let dato = {
                           idDesconectado: socket.id,
                           arreglo: this.mapArreglo
                       }
                       /*Evento que emite el nuevo arreglo con usuarios en linea */
                      this.io.emit('actualizarAregloUsuario',dato);
                       break;
                   }
               }
               
            })
        
        });
    }
    
}
module.exports = Sockets;
