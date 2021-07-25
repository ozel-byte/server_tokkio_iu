class Sockets{
    
    constructor(io){
        this.io = io;
        this.socketEvents();
        this.mapArreglo = [];
        
    }

    socketEvents(){
        console.log("llego socket");
        this.io.on('connection', socket => {
            socket.emit("enviar-id", socket.id)
            socket.on('message', (data) => {

               this.mapArreglo.push({
                   idUser: socket.id,
                   user: data.username,
                   imgUser: data.imgUser
               });
               
               this.io.emit('emitir',this.mapArreglo);
             
            });
            socket.on("notificacion-user", (data) => {
              this.io.to(data.idReceptor).emit("notificacion", data)
            })
            socket.on("aceptar-invitacion", (data) => {
                this.io.to(data.id).emit("invitacion-acpetada", data)
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
