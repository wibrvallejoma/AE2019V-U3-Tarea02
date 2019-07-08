const router = require("express").Router();

module.exports = wagner => {
  const userCtrl = wagner.invoke((User) => require("../controllers/user.controller")(User));

  router.post("/", (req, res) => userCtrl.createUser(req, res));

  router.post("/login/", (req, res) => userCtrl.login(req, res));

  router.get("/login/:email/:password", (req, res) => userCtrl.loginGet(req, res));

  router.get("/", (req, res) => userCtrl.findAll(req, res));

  router.get("/:id", (req, res) => userCtrl.findUserById(req, res));

  router.post('/createUsers', (req, res) => userCtrl.createALotUsers(req, res))

  router.put("/:id", (req, res) => userCtrl.updateUserById(req, res));

  router.delete("/:id", (req, res) => userCtrl.deleteUserById(req, res));

  return router;
};
