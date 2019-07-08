const http = require("http");
const path = require("path");
const status = require("http-status");
const jwt = require("jsonwebtoken");
const _config = require("../_config");

let _user;

const createUser = (req, res) => {
  const user = req.body;

  _user
    .create(user)
    .then(data => {
      res.status(200);
      res.json({ msg: "Usuario creado correctamente", data: data });
    })
    .catch(err => {
      res.status(400);
      res.json({ msg: "Error!!!!", data: err });
    });
};

const createALotUsers = async (req, res) => {
  const csvFilePath =
    "C:\\Users\\willi\\Documents\\Aplicaciones_empresariales\\U3\\01_EJERCICIO\\usuarios.csv";
  const csv = require("csvtojson");
  csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
      console.log(jsonObj);
      /**
       * [
       * 	{a:"1", b:"2", c:"3"},
       * 	{a:"4", b:"5". c:"6"}
       * ]
       */
    });

  const jsonArray = await csv().fromFile(csvFilePath);

  _user
    .create(jsonArray)
    .then(data => {
      res.status(200);
      res.json({ msg: "Usuarios creados correctamente", data: data });
    })
    .catch(err => {
      res.status(400);
      res.json({ msg: "Error!!!!", data: err });
    });
};

const findAll = (req, res) => {
  _user
    .find()
    .then(data => {
      if (data.length == 0) {
        res.status(status.NOT_FOUND);
        res.json({ msg: "No se encontraron usuarios" });
      } else {
        res.status(status.OK);
        res.json({ msg: "Exito", data: data });
      }
    })
    .catch(err => {
      res.status(status.BAD_REQUEST);
      res.json({ msg: "Error" });
    });
};

const deleteUserById = (req, res) => {
  //    const {id, otro, otro2, otro3} = req.params;
  const { id } = req.params;

  _user
    .findByIdAndRemove(id)
    .then(data => {
      res.status(status.OK);
      res.json({ msg: "Exito", data: data });
    })
    .catch(err => {
      res.status(status.NOT_FOUND);
      res.json({ msg: "Error", err: err });
    });
};

const updateUserById = (req, res) => {
  //    const {id, otro, otro2, otro3} = req.params;
  const { id } = req.params;
  const user = req.body;

  _user
    .findByIdAndUpdate(id, user)
    .then(data => {
      res.status(status.OK);
      res.json({ msg: "Exito, usuario actualizado", data: user });
    })
    .catch(err => {
      res.status(status.NOT_FOUND);
      res.json({ msg: "Error, no se encontro usuario", err: err });
    });
};

const findUserById = (req, res) => {
  //    const {id, otro, otro2, otro3} = req.params;
  const { id } = req.params;

  _user
    .findById(id)
    .then(data => {
      res.status(status.OK);
      res.json({ msg: "Exito, usuario encontrado", data: data });
    })
    .catch(err => {
      res.status(status.NOT_FOUND);
      res.json({ msg: "Error, no se ha encontrado el usuario", err: err });
    });
};

const login = (req, res) => {
  //    const {id, otro, otro2, otro3} = req.params;
  const user = req.body;

  _user
    .findOne(user)
    .then(data => {
      if (data.length == 0) {
        res.status(status.NOT_FOUND);
        res.json({ msg: "Error, Email o password incorrectos" });
      } else if (data.length > 1) {
        res.status(status.BAD_REQUEST);
        res.json({
          msg:
            "Error, Usuarios duplicados, por favor contacte a soporte tecnico",
          err: err
        });
      } else {
        res.status(status.OK);
        res.json({ msg: "Exito, Acceso concedido", data: data });
      }
    })
    .catch(err => {
      res.status(status.NOT_FOUND);
      res.json({ msg: "Error, Email o password incorrectos", err: err });
    });
};

const loginGet = (req, res) => {
  const { email, password } = req.params;
  let query = { email: email, password: password };
  _user
    .findOne(query, "-password")
    .then(user => {
      if (user) {
        const token = jwt.sign({ email: email }, _config.SECRETJWT);
        res.status(status.OK);
        res.json({
          msg: "Acceso exitoso",
          data: {
            user: user,
            token: token
          }
        });
      } else {
        res.status(status.NOT_FOUND);
        res.json({ msg: "Error!!! No se encontro" });
      }
    })
    .catch(err => {
      res.status(status.NOT_FOUND);
      res.json({ msg: "Error!!! No se encontro", err: err });
    });
};

module.exports = User => {
  _user = User;
  return {
    createUser,
    findAll,
    deleteUserById,
    findUserById,
    updateUserById,
    login,
    loginGet,
    createALotUsers
  };
};
