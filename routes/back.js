const express = require('express');
const router = express.Router();
const {
    agregarProductoGet, editarProductoGet, loginGet, adminGet
} = require("../contollers/back.js");
router.get('/admin', adminGet);
router.get('/agregar-producto', agregarProductoGet);
router.get('/editar-producto', editarProductoGet);
router.get('/login', loginGet);
module.exports = router;