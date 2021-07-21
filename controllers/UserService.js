const User = require('../models/UserDAO');
const bcrypt = require('bcrypt');

const getUserId = (req,res) => {
   
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


const getUserUsername = (req,res) => {
    User.findAll({
        where: {
            username: req.query.username
        }
    }).then(data => {
        res.send(data)
    }).catch(e => {
        res.send("error")
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

const validationUsername = (req,res) => {
    User.findAll({
        where: {
            username: req.query.username
        }
    })
}
const validationCorreo = async (req,res)  =>  {
  let response = await  User.findAll({
        where: {
            correo: req.query.correo
        }
    });
    if(response.length > 0){
        res.send("correo ya existe");
    }else{
        res.send("no existe")
    }
}


module.exports = {
    getUserId,
    addUser,
    getUserUsername,
    validationCorreo
};