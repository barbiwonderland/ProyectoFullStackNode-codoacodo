const mysql = require("mysql2")

// create the connection to database
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || " ",
  database: process.env.DB_DATABASE || "productos",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

/* connection.connect()
// truco para mantener la conexión
setInterval(function () {
  connection.query("SELECT 1")
  // console.log("manteniendo viva la conexion")
}, 50000)
*/
module.exports = pool
