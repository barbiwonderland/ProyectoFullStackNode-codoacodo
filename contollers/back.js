//const productos = require("../data/products.json");
require("dotenv").config();
const fs = require('fs'); // fileSystem
const {
  multer,
  almacenamiento,
  maxSizeMB,
  upload
} = require('../views/helpers/multer');
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
const agregarProductoPost = (req, res) =>
{
  const info = req.body;
  console.log(info, "PRODUCTO A AGREGAR");
  // SET LLEVA UN OBJETO
  const sql = "INSERT INTO productos SET ?";
  db.query(sql, info, (err, data) =>
  {
    // if (err) throw err;
    console.log("Producto agregado");
    res.render("agregar-producto", {
      mensaje: "Producto agregado",
      titulo: "Agregar producto",
    });
  }); upload(req, res, err =>
  {
    if (err instanceof multer.MulterError)
    {
      // Error de Multer al subir imagen
      if (err.code === "LIMIT_FILE_SIZE")
      {
        return res.status(400).render('agregar-producto', {
          mensaje: `Imagen muy grande, por favor ahicar a ${maxSizeMB}`,
          clase: "danger"
        });
      }
      return res.status(400).render('agregar-producto', { mensaje: err.code });
    } else if (err)
    {
      // Ocurrió un error desconocido al subir la imagen
      return res.status(400).render('agregar-producto',
        { mensaje: `Ocurrió un error desconocido ${err}` }
      );
    }

    // Si no hubo error entonces...
    const productoDetalles = req.body;
    console.log("AGREGAR-PRODUCTO REQ.FILE", req.file);
    const nombreImagen = req.file.filename;
    productoDetalles.rutaImagen = nombreImagen;

    // Consulta SQL - insertar data en la DB
    let sql = 'INSERT INTO productos SET ?';
    db.query(sql, productoDetalles, (err, result) =>
    {
      if (err) throw err;
      res.render("agregar-producto", {
        mensaje: "Producto agregado correctamente",
        titulo: 'Agregar producto',
        clase: "success"
      });
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
const editarProductoPost = function (req, res)
{
  upload(req, res, function (err)
  {
    if (err instanceof multer.MulterError)
    {
      // Error de Multer al subir imagen
      if (err.code === "LIMIT_FILE_SIZE")
      {
        return res.status(400).render('agregar-producto', {
          mensaje: `Imagen muy grande, por favor ahicar a ${maxSizeMB}`,
          clase: "danger"
        });
      }
      return res.status(400).render('agregar-producto', { mensaje: err.code });
    } else if (err)
    {
      // Ocurrió un error desconocido al subir la imagen
      return res.status(400).render('agregar-producto',
        { mensaje: `Ocurrió un error desconocido ${err}` }
      );
    }

    // todo OK continuando
    const id = req.params.id;
    const productoDetalles = req.body;

    if (req.hasOwnProperty("file"))
    {

      const nombreImagen = req.file.filename;
      productoDetalles.rutaImagen = nombreImagen;

      // Se procede a borrar la imagen del servidor
      const borrarImagen = 'SELECT rutaImagen FROM productos WHERE id = ?';
      /* ej: [ { rutaImagen: lenovo-43242342342.jpg } ]*/

      db.query(borrarImagen, [id], function (err, data)
      {
        if (err) throw err;

        fs.unlink(`public/uploads/${data[0].rutaImagen}`, (err) =>
        {
          if (err) throw err;

          const sql = `UPDATE productos SET ? WHERE id= ?`;

          db.query(sql, [productoDetalles, id], function (err, data)
          {
            if (err) throw err;
            console.log(data.affectedRows + " registro(s) actualizado(s)");
          });
        });

        res.redirect('/admin');

      });


    } else
    {

      const sql = `UPDATE productos SET ? WHERE id= ?`;

      db.query(sql, [productoDetalles, id], function (err, data)
      {
        if (err) throw err;
        console.log(data.affectedRows + " registro(s) actualizado(s)");
        res.redirect('/admin');
      });

    }
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
