const mysql = require('mysql')

const DBConfig = mysql.createConnection({
    user:"root",
    password:'',
    database:'employee',
    port:8111
})
DBConfig.connect(() => {
    try {
        console.log("Success"
        )
    } catch (error) {
    console.log(error)    
    }
})
module.exports = DBConfig