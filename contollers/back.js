//const productos = require("../data/products.json");
require("dotenv").config();
const db = require("../models/connection.js");
const adminGet = (req, res) =>
{

  const logueado = req.session.logueado; // true | null

  if (logueado)
  {
    let sql = "SELECT * FROM productos";
    db.query(sql, (err, data) =>
    {
      if (err) throw err;
      // console.log(data)
      res.render('admin', {
        titulo: "Panel de control",
        logueado: logueado, // true
        usuario: req.session.nombreUsuario,
        productos: data
      });
    });
  } else
  {
    res.redirect('/login');
  }
};
const agregarProductoGet = function (req, res)
{
  res.render("agregar-producto", {
    titulo: "agregar-producto",
  });
};
//no me funciiona  ver
const agregarProductoPost = (req, res) =>
{
  const info = req.body;
  console.log(info);
  const sql = "INSERT INTO productos SET ?";
  db.query(sql, info, (err, data) =>
  {
    if (err) throw err;
    console.log("Producto agregado");
    res.render("agregar-producto", {
      mensaje: "Producto agregado",
      titulo: "Agregar producto",
    });
  });
};
const editarProductoGet = function (req, res)
{
  const id = req.params.id;
  const producto = req.body;
  const sql = "SELECT * FROM productos WHERE id = ?";
  db.query(sql, id, (err, data) =>
  {
    if (err) throw err;
    console.log(data);
    if (!data.length > 0)
    {
      res.send(`
      <h1>No existe el producto con {{ id }}</h1>
      <a href="/admin">Ver listado de productos</a>
      `);
    } else
    {
      res.render("editar-producto", {
        titulo: "Editar producto",
        producto: data[0],
      });
    }
  });
};
//no me funciiona  ver
const editarProductoPost = function (req, res)
{
  const id = req.params.id;
  const producto = req.body;
  const sql = "UPDATE productos SET ? WHERE id = ?";
  db.query(sql, [producto, id], (err, data) =>
  {
    if (err) throw err;
    console.log(data);
    console.log(data.affected_rows + "Registro actualizado");
    res.redirect("/admin");
  });
};
const borrarProductoGet = (req, res) =>
{
  const id = req.params.id;
  const sql = "DELETE FROM productos WHERE id = ?";
  db.query(sql, id, (err, data) =>
  {
    if (err) throw err;
    console.log(data.affected_rows + "registro borrado");
    res.redirect("/admin");
  });
};
const loginGet = function (req, res)
{
  res.render("login", {
    titulo: "login",
  });
};
const loginPost = function (req, res)
{
  const usuario = req.body.usuario;
  const clave = req.body.clave;
  console.log(clave, usuario);
  if (usuario && clave)
  {
    const sql = "SELECT * FROM cuentas WHERE usuario = ? AND clave = ?";
    db.query(sql, [usuario, clave], (err, data) =>
    {
      if (data.length > 0)
      {
        // se crea solo si se inicia sesion
        req.session.logueado = true;
        req.session.nombreUsuario = usuario;
        console.log(req.session);
        res.redirect('/admin');
      } else
      {
        res.render("login", {
          titulo: "login",
          error: "Nombre o contraseña incorrectos",
        });
      }
    });
  } else
  {
    res.render("login", {
      titulo: "login",
      error: "Por favor, escriba una clave y usuario...",

    });
  }
};

module.exports = {
  adminGet,
  agregarProductoGet,
  editarProductoGet,
  loginGet,
  agregarProductoPost,
  editarProductoPost,
  borrarProductoGet,
  loginPost
};
