import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.MY_SQL_DB_HOST,
    user: process.env.MY_SQL_DB_USER,
    password: process.env.MY_SQL_DB_PASSWORD,
    database: process.env.MY_SQL_DB_DATABASE,
    port: Number(process.env.MY_SQL_DB_PORT)
});

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL successfully!");
    }
    connection.end();
});
