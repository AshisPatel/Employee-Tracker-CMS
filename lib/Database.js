const cTable = require('console.table');

class Database{

    connect() {
        // Get client
        const mysql = require('mysql2');
        // Create connection
        const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: 'password', database: 'company'});

        return connection; 
    }
    // Department functions

    // Get the departments table from the DB
    getDepartments () {
        // Create promise
        return new Promise((resolve, reject) => {
            // Open MySql DB connection
            const connection = this.connect();
            // Set sql input and parameters if neccesarry
            const sql = `SELECT * FROM departments`;
            // Make query
            connection.query(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return; 
                }
                // Resolve promise
                resolve(rows); 
            })
            // Close MySql DB connection
            connection.end()
        });
     
    };

    // Add a new department to the departments table
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

    // Grab the names of all the departments in the departments table 
    getDepartmentNames() {
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            // Specificially grab the names column from the departments table
            const sql = `SELECT departments.name FROM departments`;
            
            connection.query(sql, (err, rows) => {
               if (err) {
                   console.log(err.message); 
                   return;
               } 
               // Sort through the array of objects and grab just the name value    
               const rowsArray = rows.map(obj => obj.name);
               resolve(rowsArray); 
            });
        });
    }

    // Role functions

    // Get the roles table from the DB
    getRoles() {
        return new Promise( (resolve, reject) => {
            const connection = this.connect();

            const sql = `SELECT roles.*, departments.name AS department_name
            FROM roles
            LEFT JOIN departments
            ON roles.department_id = departments.id`;

            connection.query(sql, (err, rows) => {
                if (err) {
                    console.log(err.message); 
                    return; 
                } 
                resolve(rows);
            });
            connection.end();
        });
    }
}

module.exports = Database; 