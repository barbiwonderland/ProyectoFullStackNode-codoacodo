//const productos = require('../data/products.json');
require('dotenv').config()
const db = require("../models/connection.js");

const indexGet = function (req, res)
{

    let sql = "SELECT * FROM productos WHERE destacado = 1";
    db.query(sql, (err, data) =>
    {
        if (err) throw err;
        console.log(data);
        res.render('index', {
            titulo: "Mi página web",
            productos: data
        });

    });
};

const comoComprarGet = function (req, res)
{
    res.render('como-comprar', {
        titulo: "Como comprar",
        productos: productos.products
    });
};
const contactoGet = function (req, res)
{
    res.render('contacto', {
        titulo: "Contacto",
        productos: productos.products
    });
};
const productoDetalleGet = function (req, res)
{
    res.render('producto-detalle', {
        titulo: "Detalle del producto",
        productos: productos.products
    });
};
const sobreNosotrosGet = function (req, res)
{
    res.render('sobre-nosotros', {
        titulo: "Sobre nosotros",
        productos: productos.products
    });
};

module.exports = {
    sobreNosotrosGet, productoDetalleGet, indexGet, contactoGet, comoComprarGet
};
