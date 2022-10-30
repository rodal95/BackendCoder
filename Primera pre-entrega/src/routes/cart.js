const express = require("express");
const carritoContenedor = require("../managers/cartContenedor");
const cartsRouter = express.Router();

const contenedorProductos = new carritoContenedor("cartProducts.json");

