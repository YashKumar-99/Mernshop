

const express = require('express');

const cors = require('cors')
const app = express();
const router = require('./Routes/router')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(express.json()); 

// app.use(cors())



app.use(cors());


// app.use(express.urlencoded({ extended: true }))
const dotenv = require('dotenv');
const ErrorHandler = require('./utilis/ErrorHandler');
const path = require('path');
// app.use('/uploads', express.static('/uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {

    require('dotenv').config({
        path: 'backend/config/.env'
    })
}
dotenv.config()
app.use(router)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(express.json());




const connectDatabase = require('./db/Database');
// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error("Shutting down the server due to uncaught exception");
    process.exit(1);
});

// Unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.error(`Shutting down the server for unhandled promise rejection: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
//connect Database
connectDatabase();
// Create Server
const port = process.env.PORT; // Use PORT environment variable or default to 3000
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

