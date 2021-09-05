const cTable = require('console.table');

class Database{

    connect() {
        // Get client
        const mysql = require('mysql2');
        // Create connection
        const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: 'password', database: 'company'});

        return connection; 
    }

    getDepartments () {

        return new Promise((resolve, reject) => {
            const connection = this.connect();

            const sql = `SELECT * FROM departments`;
    
            connection.query(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return; 
                }
                resolve(rows); 
            })

            connection.end()
        });
     
    };

    addDepartment(name) {
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            const sql = `INSERT INTO departments (name) VALUES (?)`;
            const params = name;

            connection.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err.message);
                    return; 
                }
                resolve();
            });
            connection.end();
        });
    }
}

module.exports = Database; 