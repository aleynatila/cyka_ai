const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });

const app = express();
/*
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});*/

app.use(session({
    secret: 'secret', // Ensure a long random string for production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set secure: true if using HTTPS
}));


const publicDirectory = path.join(__dirname, 'public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

console.log(__dirname);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL connected...");
    }
});

// Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(80, () => {
    console.log("Server started on port 5000");
});
