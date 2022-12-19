const productos = require('../data/products.json');
const indexGet = function (req, res)
{
    res.render('index', {
        titulo: "Mi pagina web",
        productos: productos.products
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
