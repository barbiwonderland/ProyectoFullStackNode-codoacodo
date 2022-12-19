const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || " ",
    database: process.env.DB_DATABASE || "productos",
    port: process.env.DB_PORT || 3306
});
connection.connect();
module.exports = connection;