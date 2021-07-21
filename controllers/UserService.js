const User = require('../models/UserDAO');
const bcrypt = require('bcrypt');

const getUserId = (req,res) => {
    console.log(req.query.correo);
     User.findAll({
        where: {
            correo: req.query.correo,
        },
    }).then((data) => {
       if(data.length> 0) {

           let result = bcrypt.compareSync(req.query.pass,data[0].pass);

           if(result){
                res.send(data);
           }else{
                res.send("el password no coinside");
           }
       }
    }).catch(e => {
        res.send("no existe correo")
    })
}

const addUser = (req,res) => {
    console.log(req.body.pass)
    const passwordCifrado = bcrypt.hashSync(req.body.pass,10);
    User.create({
        username: req.body.username,
        correo: req.body.correo,
        pass: passwordCifrado,
        imgPerfil: req.body.imgPerfil
    }).then(() => {
        res.send("usuario se creo correctamente")
    }).catch(e => {
        console.log("no se creo el usuario");
    })
}


module.exports = {
    getUserId,
    addUser
};