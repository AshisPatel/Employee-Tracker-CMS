const cTable = require('console.table');

class Database {

    connect() {
        // Get client
        const mysql = require('mysql2');
        // Create connection
        const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: 'password', database: 'company' });

        return connection;
    }
    // Department functions

    // Get the departments table from the DB
    getDepartments() {
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
            connection.end();
        });
    }

    // Helper function to grab the id of the department for the new role
    getDepartmentId(department) {
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            const sql = `SELECT id FROM departments WHERE departments.name = ?`;
            const params = [department];
            connection.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                // Rows returns an array of objects, use map to grab the id key's value
                // Only grab the first index as there will only be one item in the array
                const departmentId = rows.map(obj => obj.id)[0];
                resolve(departmentId);
            });
            connection.end();
        });

    }

    // Role functions

    // Get the roles table from the DB
    getRoles() {
        return new Promise((resolve, reject) => {
            const connection = this.connect();

            const sql = `SELECT roles.title, roles.salary , departments.name AS department_name
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

    // Add a new role to the roles table 
    async addRole(title, salary, department) {
        // Get the department id based on the name of department entered in the prompt
        const departmentId = await this.getDepartmentId(department);
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [title, salary, departmentId];

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

    // Helper function to grab the id of the role for the new employee
    getRoleId(role) {
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            const sql = `SELECT id FROM roles WHERE roles.title = ?`;
            const params = [role];
            connection.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return; 
                }
                const roleId = rows.map(obj => obj.id)[0];
                resolve(roleId);
            });
            connection.end();
        })
    }

    // Grab all the titles from the roles table
    getRoleTitles() {
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            const sql = `SELECT roles.title FROM roles`;

            connection.query(sql, (err,rows) => {
                if(err) {
                    console.log(err.message);
                    return;
                }
                // Grab all the values from the title key and return them as an array
                const titlesArray = rows.map(obj => obj.title);
                resolve(titlesArray);
            });
            connection.end();
        })
    }

    // Get the employees table from the company db
    getEmployees() {
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            const sql = `SELECT e.id, e.first_name, e.last_name,
            roles.title AS title,
            CONCAT_WS(' ', m.first_name, m.last_name) AS manager
            FROM employees e
            LEFT JOIN roles on e.role_id = roles.id
            LEFT JOIN employees m ON e.manager_id = m.id;`

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

    // Get all the employees names to select as a manager 
    getManagers() {
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            // Combine the employee's first and last name and send it as a column titled 'name'
            const sql = `SELECT CONCAT_WS(' ', employees.first_name, employees.last_name) AS name FROM employees`;
            connection.query(sql, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return; 
                } 
                // Should be able to grab the 'name' values since the first + last name where combined... 
                const managerNames = rows.map(obj => obj.name);
                resolve(managerNames);
            });
            connection.end();
        });
    }

    // Helper function to grab the id of the manager for the new employee IF it exists
    getManagerId(manager) {
        return new Promise((resolve, reject) => {
            if (!manager) {
                resolve(null);
            }
            const connection = this.connect();
            const sql = `SELECT id FROM employees WHERE CONCAT_WS(' ', employees.first_name, employees.last_name) = ?`;
            const params = [manager];
            connection.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                const managerId = rows.map(obj => obj.id)[0];
                resolve(managerId);
            });
            connection.end();
        })
    }

    // Add new employee
    async addEmployee(firstName, lastName, role, manager) {
        // Get the roleId and managerId from the text using helper functions to find the associated id
        const roleId = await this.getRoleId(role); 
        const managerId = await this.getManagerId(manager); 
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
            const params = [firstName, lastName, roleId, managerId];
            connection.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                resolve();
            });
            connection.end();
        })
    }
}

module.exports = Database;