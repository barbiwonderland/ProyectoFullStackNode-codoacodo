//const productos = require('../data/products.json');
require('dotenv').config();
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

    });
};
const contactoGet = function (req, res)
{
    res.render('contacto', {
        titulo: "Contacto",

    });
};
const productoDetalleGet = function (req, res)
{
    res.render('producto-detalle', {
        titulo: "Detalle del producto",
    });
};
const sobreNosotrosGet = function (req, res)
{
    res.render('sobre-nosotros', {
        titulo: "Sobre nosotros",
    });
};

module.exports = {
    sobreNosotrosGet, productoDetalleGet, indexGet, contactoGet, comoComprarGet
};
