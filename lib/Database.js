const cTable = require('console.table');

class Database{

    connect() {
        // Get client
        const mysql = require('mysql2');
        // Create connection
        const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '$wampScriptwisp123', database: 'company'});

        return connection; 
    }

    async getDepartments() {
        const connection = await this.connect();

        const sql = `SELECT * FROM departments`;

        connection.promise().query(sql)
            .then( ([rows]) => {
                return console.table(rows);
            })
            .catch(console.log)
            .then(() => connection.end());
    }

    async addDepartment(name) {
        const connection = await this.connect();

        const sql = `INSERT INTO departments (name) VALUES(?)`;

        const params = name; 

       connection.promise().query(sql,params)
        .then( (rows, err) => {
            if (err) {
                console.log(err.message);
                return; 
            }
            return this.getDepartments();
        })
        .then(() => connection.end());
    }
   
}

module.exports = Database; 