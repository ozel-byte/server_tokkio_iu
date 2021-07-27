class Sockets{
    
    constructor(io){
        this.io = io;
        this.socketEvents();
        this.mapArreglo = [];
        
    }

    socketEvents(){
        console.log("llego socket");
        this.io.on('connection', socket => {
            console.log(socket.id);
            socket.emit("enviar-id", socket.id);
            socket.on('message', (data) => {

               this.mapArreglo.push({
                   idUser: socket.id,
                   user: data.username,
                   imgUser: data.imgUser
               });
               socket.broadcast.emit("emitir",this.mapArreglo);
               this.io.emit('emitir',this.mapArreglo);
               
            });
            socket.on("notificacion-user", (data) => {
              this.io.to(data.idReceptor).emit("notificacion", data)
            })
            socket.on("aceptar-invitacion", (data) => {
                this.io.to(data.id).emit("invitacion-acpetada", data)
            })
            socket.on("send-image-user-conected-room", data => {
                this.io.to(data.id).emit("send-image-user-conected-room-catch",data)
            })
            socket.on("enviandoParametros", (data) => {
                this.io.to(data.id).emit("recibeParametros", data)
            })

            socket.on("moveponteruser", (data) => {
                this.io.to(data.id).emit("movepointerUser",data)
            })
            socket.on('disconnect',() => {
                console.log("user desconectado" + socket.id);
               for (let index = 0; index < this.mapArreglo.length; index++) {
                   const element = this.mapArreglo[index];
                   if(element.idUser === socket.id){
                       this.mapArreglo.splice(index,1);
                      this.io.emit('emitir',this.mapArreglo);
                   
                       break;
                   }
               }
               
            })
        
        });
    }
    
}
module.exports = Sockets;
