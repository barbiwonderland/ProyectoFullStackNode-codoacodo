const productos = require('../data/products.json');
require('dotenv').config();
const db = require("../models/connection.js");
const adminGet = function (req, res)
{
    res.render('admin', {
        titulo: "Administracion",
        productos: productos.products
    });
};
const agregarProductoGet = function (req, res)
{
    res.render('agregar-producto', {
        titulo: "agregar-producto",
        productos: productos.products
    });
};
const editarProductoGet = function (req, res)
{
    res.render('editar-producto', {
        titulo: "editar-producto",
        productos: productos.products
    });
};
const loginGet = function (req, res)
{
    res.render('login', {
        titulo: "login",
        productos: productos.products
    });
};

module.exports = {
    adminGet,
    agregarProductoGet,
    editarProductoGet,
    loginGet

};