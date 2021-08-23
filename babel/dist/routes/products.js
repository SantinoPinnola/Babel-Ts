"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _classes = _interopRequireDefault(require("../classes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var MisProductos = new _classes["default"]();
router.get('/', function (req, res) {
  res.render('main', {
    layout: 'index.hbs'
  });
});
router.get('/productos/vista', function (req, res) {
  res.render('productlist', {
    layout: 'index',
    products: MisProductos.leer(),
    productExist: MisProductos.leer().length === 0 ? false : true
  });
});
router.get('/productos/listar', function (req, res) {
  if (MisProductos.leer().length == 0) {
    res.status(400).json({
      error: 'no hay productos cargados'
    });
  } else {
    res.json(MisProductos.leer());
  }
});
router.get('/productos/listar/:id', function (req, res) {
  var idProducto = req.params.id;

  if (MisProductos.getProducto(idProducto) == undefined) {
    res.status(400).json({
      error: 'producto no encontrado'
    });
  } else {
    res.json(MisProductos.getProducto(idProducto));
  }

  ;
});
router.put('/productos/actualizar/:id', function (req, res) {
  var idUpdate = req.params.id;
  var body = req.body;
  var productoUpdate = MisProductos.getProducto(idUpdate);
  productoUpdate.nombre = body.nombre;
  productoUpdate.precio = body.precio;
  productoUpdate.thumbnail = body.thumbnail;
  res.json(productoUpdate);
});
router.post('/productos/guardar', function (req, res) {
  var newProduct = req.body;
  console.log(newProduct);
  var nuevoProducto = {
    id: MisProductos.leer().length + 1,
    nombre: newProduct.nombre,
    precio: newProduct.precio,
    thumbnail: newProduct.thumbnail
  };
  MisProductos.guardar(nuevoProducto);
});
router["delete"]('/productos/borrar/:id', function (req, res) {
  var idDelete = req.params.id;

  if (idDelete > MisProductos.leer().length || idDelete < 1) {
    res.status(400).json({
      error: 'parametro invalido'
    });
  }

  res.json(MisProductos.getProducto(idDelete));
  MisProductos["delete"](idDelete);
});
var _default = router;
exports["default"] = _default;