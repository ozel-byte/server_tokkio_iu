const User = require('../models/UserDAO');
const bcrypt = require('bcrypt');


/* metodo para validar el inicio de sesion */
const getUserId = async (req,res) => {
   let response = await User.findAll({
        where: {
            correo: req.query.correo,
        },
    })
    if(response.length > 0){
        let result = bcrypt.compareSync(req.query.pass,response[0].pass);
        if(result){
             res.send({
                 find: "true",
                 body: response
             });
        }else{
             res.send({
                 find: "false",
                 message: "no coinciden las credenciales"
             });
        }
    }else{
        res.send({
            find: "false",
            message: "no existe ningun correo o password"
        })
    }

}


/* metodo para obtener los datos del usuario  */
const getUserUsername = async (req,res) => {

    let response = await User.findAll({
        where: {
            username: req.query.username
        }
    });
    if(response.length>0){
        res.send(response);
    }else{
        res.send("no se pudo obtener")
    }
}


/*Metodo para agregar un nuevo usuario */
const addUser = async (req,res) => {
    
    const passwordCifrado = bcrypt.hashSync(req.body.pass,10);

  let response = await User.create({
        username: req.body.username,
        correo: req.body.correo,
        pass: passwordCifrado,
        imgPerfil: req.body.imgPerfil
    });

    if(response){
        res.send({
            find: "true",
            message: "usuario se creo correctamente"
        });
    }else{
        res.send({
            find: "false",
            message: "no se pudo crear el usuario"
        });
    }
}

/* Metodo para validar si existe ya un usuario con ese nombre */
const validationUsername = async (req,res) => {
    console.log(req.query.username)
   let response = await User.findAll({
        where: {
            username: req.query.username
        }
    });
    if(response.length>0){
        res.send({
            find:"false",
            body:"username ocupado"
        })
    }else{
        res.send({
            find:"true",
            body:"username disponible"
        })
    }
}

/* Metodo para validar si existe ya un usuario con ese correo */
const validationCorreo = async (req,res)  =>  {
  let response = await  User.findAll({
        where: {
            correo: req.query.correo
        }
    });

    if(response.length > 0){
        res.send({
            find: "false",
            body:"correo ocupado"
        });
    }else{
        res.send({
            find:"true",
            body:"correo disponible"
        })
    }
}


module.exports = {
    getUserId,
    addUser,
    getUserUsername,
    validationCorreo,
    validationUsername
};