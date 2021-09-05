const cTable = require('console.table');

class Database{

    connect() {
        // Get client
        const mysql = require('mysql2');
        // Create connection
        const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '$wampScriptwisp123', database: 'company'});

        return connection; 
    }
}

module.exports = Database; 