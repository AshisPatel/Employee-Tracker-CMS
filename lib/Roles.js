const Database = require('./Database');
const cTable = require('console.table');

class Roles extends Database {
    getRoles() {
        const connection = this.connect();

        const sql = `SELECT roles.*, departments.name AS department_name
        FROM roles
        LEFT JOIN departments
        ON roles.department_id = departments.id`;

        connection.promise().query(sql)
        .then(([rows]) => {
            return console.table(rows); 
        })
        .catch(console.log)
        .then(() => connection.end())
    }
}


module.exports = Roles; 