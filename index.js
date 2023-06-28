const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db.config')
const multer = require('multer')
require('dotenv').config()
const app = express();
app.use(express.json({limit:"700mb"}));
app.use(express.urlencoded({limit:"700mb",extended:true, parameterLimit:500000}));
app.use(cors())

// *** show connected ***
require("./src/routes/patient.routes")(app);
require("./src/routes/register.routes")(app);
require("./src/routes/suppliers.routes")(app);
require("./src/routes/staff.routes")(app);
require("./src/routes/patient.routes")(app);
require("./src/routes/firstcheck.routes")(app);
require("./src/routes/disease.routes")(app);
require("./src/routes/reports.routes")(app);
require("./src/routes/treat.routes")(app);
require("./src/routes/bill.routes")(app);
require("./src/routes/midicines.routes")(app);
require("./src/routes/medicines.type.routes")(app);
require("./src/routes/saleDetails.routes")(app);
require("./src/routes/prescription.routes")(app);
require("./src/routes/import.routes")(app);
require("./src/routes/result.routes")(app);
pool
// *** end ***
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})