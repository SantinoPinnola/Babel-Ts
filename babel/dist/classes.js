"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Productos = /*#__PURE__*/function () {
  function Productos() {
    _classCallCheck(this, Productos);

    this.arrayProductos = [];
  }

  _createClass(Productos, [{
    key: "guardar",
    value: function () {
      var _guardar = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        var productoNuevo;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!(typeof data.title !== 'string')) {
                  _context.next = 3;
                  break;
                }

                throw new Error('Titulo tiene que ser string');

              case 3:
                if (!isNaN(data.price)) {
                  _context.next = 5;
                  break;
                }

                throw new Error('Price tiene que ser un nro');

              case 5:
                if (!(typeof data.thumbnail !== 'string')) {
                  _context.next = 7;
                  break;
                }

                throw new Error('Thumbnail tiene que ser string de url');

              case 7:
                productoNuevo = {
                  title: data.title,
                  price: data.price,
                  thumbnail: data.thumbnail,
                  id: this.arrayProductos.length + 1
                };
                this.arrayProductos.push(productoNuevo);
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                console.log('ERROR: No se pudo agregar un producto. ' + _context.t0.message);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 11]]);
      }));

      function guardar(_x) {
        return _guardar.apply(this, arguments);
      }

      return guardar;
    }()
  }, {
    key: "getProducto",
    value: function getProducto(idBrowse) {
      return this.arrayProductos.find(function (element) {
        return element.id == idBrowse;
      });
    }
  }, {
    key: "leer",
    value: function leer() {
      return this.arrayProductos;
    }
  }, {
    key: "delete",
    value: function _delete(idDel) {
      this.arrayProductos = this.arrayProductos.filter(function (element) {
        return element.id != idDel;
      });
    }
  }]);

  return Productos;
}();

exports["default"] = Productos;