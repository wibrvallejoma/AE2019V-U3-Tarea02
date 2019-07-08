const http = require("http");
const path = require("path");
const status = require("http-status");

let _product;

const createProduct = (req, res) => {
  const product = req.body;

  _product
    .create(product)
    .then(data => {
      res.status(200);
      res.json({ msg: "Producto creado correctamente", data: data });
    })
    .catch(err => {
      res.status(400);
      res.json({ msg: "Error!!!!", data: err });
    });
};

const findAll = (req, res) => {
  _product
    .find()
    .populate("brand")
    .then(data => {
      if (data.length == 0) {
        res.status(status.NOT_FOUND);
        res.json({ msg: "No se encontraron productos" });
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

const deleteProductById = (req, res) => {
  //    const {id, otro, otro2, otro3} = req.params;
  const { id } = req.params;

  _product
    .findByIdAndRemove(id)
    .then(data => {
      res.status(status.OK);
      res.json({ msg: "Exito, producto eliminado", data: data });
    })
    .catch(err => {
      res.status(status.NOT_FOUND);
      res.json({ msg: "Error", err: err });
    });
};

const updateProductById = (req, res) => {
  //    const {id, otro, otro2, otro3} = req.params;
  const { id } = req.params;
  const product = req.body;

  _product
    .findByIdAndUpdate(id, product)
    .then(data => {
      res.status(status.OK);
      res.json({ msg: "Exito, producto actualizado", data: product });
    })
    .catch(err => {
      res.status(status.NOT_FOUND);
      res.json({ msg: "Error, no se encontro producto", err: err });
    });
};

const findProductById = (req, res) => {
  //    const {id, otro, otro2, otro3} = req.params;
  const { id } = req.params;

  _product
    .findById(id)
    .populate("brand")
    .then(data => {
      res.status(status.OK);
      res.json({ msg: "Exito, producto encontrado", data: data });
    })
    .catch(err => {
      res.status(status.NOT_FOUND);
      res.json({ msg: "Error, no se encontro producto", err: err });
    });
};

module.exports = Product => {
  _product = Product;
  return {
    createProduct,
    findAll,
    deleteProductById,
    findProductById,
    updateProductById
  };
};
