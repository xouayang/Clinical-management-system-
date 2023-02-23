const express = require('express');
const cors = require('cors');
require('dotenv').config()
const DB = require('./src/config/db.config')
const app = express();
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({limit:"100mb",extended:true, parameterLimit:500000}));
app.use(cors())

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})