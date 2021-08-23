"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var _products = _interopRequireDefault(require("./routes/products.js"));

var http = _interopRequireWildcard(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _classes = _interopRequireDefault(require("./classes.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var puerto = 8080;

var layoutsFolderPath = _path["default"].resolve(__dirname, '../views/layouts');

var partialsFolderPath = _path["default"].resolve(__dirname, '../views/partials');

var publicFolderPath = _path["default"].resolve(__dirname, '../public/');

app.use(_express["default"]["static"](publicFolderPath));
app.set('view engine', 'hbs');
app.engine('hbs', (0, _expressHandlebars["default"])({
  extname: 'hbs',
  layoutsDir: layoutsFolderPath,
  partialsDir: partialsFolderPath
}));
var myServer = http.Server(app);
myServer.listen(puerto, function () {
  return console.log('Server up en puerto', puerto);
});
app.use('/', _products["default"]);
var myWSServer = (0, _socket["default"])(myServer);
var NuevosProductos = new _classes["default"]();
myWSServer.on('connection', function (socket) {
  console.log('\n\nUn cliente se ha conectado');
  console.log("ID DEL SOCKET DEL CLIENTE => ".concat(socket.client.id));
  console.log("ID DEL SOCKET DEL SERVER => ".concat(socket.id));
  socket.on('inicio-productos', function () {
    console.log('inicio lista de productos productos');
    var productos = NuevosProductos.leer();
    console.log(productos);

    if (productos.length > 0) {
      socket.emit('producto-update', productos);
    }
  });
  socket.on('producto-nuevo', function (products) {
    var title = products.title,
        price = products.price,
        thumbnail = products.thumbnail;
    console.log('nuevo producto');
    NuevosProductos.guardar(products);
    myWSServer.emit('producto-update', [products]);
  });
});