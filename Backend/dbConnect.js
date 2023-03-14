const mysql = require("mysql2");

const connectToMysql = mysql.createConnection({
        
        host     : 'localhost',
        user     : 'root',
        password : 'Ajtdmwgp@1',
        database : 'enotesdb',
    });

connectToMysql.connect((err) => {
        if(err){
            console.log('Error in DB connection'+JSON.stringify(err,undefined,2));
        } else {
            console.log("Mysql DB connected successfully")
        }
    })
    module.exports = connectToMysql;


    