const Database = require('./Database');
const cTable = require('console.table');

class Department extends Database{

    getDepartments() {
        const connection = this.connect();

        const sql = `SELECT * FROM departments`;

        connection.promise().query(sql)
            .then( ([rows]) => {
               return console.table(rows);  
            })
            .catch(console.log)
            .then(() => connection.end());

        // connection.query(sql, (err,rows) => {
        //     return console.table(rows); 
        // })
    }

    getDepartmentNames() {
        const connection = this.connect();

        const sql = `SELECT departments.name FROM departments`;

       
        connection.promise().query(sql)
        .then(([rows]) => {
           const namesArray = (rows.map(obj => obj.name));
           console.log(namesArray);
        //    I need to be able to return namesArray. However if I try it will return as 'undefined' since the request happens immediately and this is asynchronous...how do I fix that???
        })
        .catch(console.log)
        .then(() => connection.end());
    }

    addDepartment(name) {
        const connection = this.connect();

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

    deleteDepartment(id) {

    }
}

module.exports = Department; 