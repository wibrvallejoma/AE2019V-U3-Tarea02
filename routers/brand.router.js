const router = require("express").Router();

module.exports = wagner => {
  const brandCtrl = wagner.invoke((Brand) => require("../controllers/brand.controller")(Brand));

  router.post("/", (req, res) => brandCtrl.createBrand(req, res));

  router.get("/", (req, res) => brandCtrl.findAll(req, res));

  router.get("/:id", (req, res) => brandCtrl.findBrandById(req, res));

  router.put("/:id", (req, res) => brandCtrl.updateBrandById(req, res));

  router.delete("/:id", (req, res) => brandCtrl.deleteBrandById(req, res));

  return router;
};
