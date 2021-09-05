const Database = require('./Database');
const cTable = require('console.table');

class Department extends Database{

    async getDepartments () {

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
        });
     
    };

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

    deleteDepartment(id) {

    }
}

module.exports = Department; 