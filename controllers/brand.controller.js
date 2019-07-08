const http = require("http");
const path = require("path");
const status = require("http-status");

let _brand;

const createBrand = (req, res) => {
  const brand = req.body;

  _brand
    .create(brand)
    .then(data => {
      res.status(200);
      res.json({ msg: "Marca creada correctamente", data: data });
    })
    .catch(err => {
      res.status(400);
      res.json({ msg: "Error!!!!", data: err });
    });
};

const findAll = (req, res) => {
  _brand
    .find()
    .then(data => {
      if (data.length == 0) {
        res.status(status.NOT_FOUND);
        res.json({ msg: "No se encontraron marcas" });
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

const deleteBrandById = (req, res) => {
  //    const {id, otro, otro2, otro3} = req.params;
  const { id } = req.params;

  _brand
    .findByIdAndRemove(id)
    .then(data => {
      res.status(status.OK);
      res.json({ msg: "Exito, marca eliminada", data: data });
    })
    .catch(err => {
      res.status(status.NOT_FOUND);
      res.json({ msg: "Error", err: err });
    });
};

const updateBrandById = (req, res) => {
  //    const {id, otro, otro2, otro3} = req.params;
  const { id } = req.params;
  const brand = req.body;

  _brand
    .findByIdAndUpdate(id, brand)
    .then(data => {
      res.status(status.OK);
      res.json({ msg: "Exito, marca actualizada", data: brand });
    })
    .catch(err => {
      res.status(status.NOT_FOUND);
      res.json({ msg: "Error, no se encontro marca", err: err });
    });
};

const findBrandById = (req, res) => {
  //    const {id, otro, otro2, otro3} = req.params;
  const { id } = req.params;

  _brand
    .findById(id)
    .then(data => {
      res.status(status.OK);
      res.json({ msg: "Exito, marca encontrada", data: data });
    })
    .catch(err => {
      res.status(status.NOT_FOUND);
      res.json({ msg: "Error, no se encontro marca", err: err });
    });
};

module.exports = Brand => {
  _brand = Brand;
  return {
    createBrand,
    findAll,
    deleteBrandById,
    findBrandById,
    updateBrandById
  };
};
