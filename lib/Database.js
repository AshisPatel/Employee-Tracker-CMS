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
                resolve(console.log(`${name} department has been added!`));
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

            connection.query(sql, (err, rows) => {
                if (err) {
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
            // We need to perform a self-join to create this table
            // The original 'employee' table is given the alias 'e' and the duplicate 'managers' table is given the alias 'm'. 
            // We also concat together the managers first + last name and return this as one column 'manager' 
            const sql = `SELECT e.id, e.first_name, e.last_name,
            roles.title AS title,
            departments.name AS department,
            roles.salary AS salary, 
            CONCAT_WS(' ', m.first_name, m.last_name) AS manager
            FROM employees e
            LEFT JOIN roles on e.role_id = roles.id
            LEFT JOIN departments on roles.department_id = departments.id
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

    // Get all the employees names 
    getEmployeeNames() {
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
                const employeeNames = rows.map(obj => obj.name);
                resolve(employeeNames);
            });
            connection.end();
        });
    }

    // Helper function to grab the id of a specific employee given a name
    getEmployeeId(fullName) {
        return new Promise((resolve, reject) => {
            if (!fullName) {
                resolve(null);
            }
            const connection = this.connect();
            const sql = `SELECT id FROM employees WHERE CONCAT_WS(' ', employees.first_name, employees.last_name) = ?`;
            const params = [fullName];
            connection.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                const employeeId = rows.map(obj => obj.id)[0];
                resolve(employeeId);
            });
            connection.end();
        })
    }

    // Add new employee
    async addEmployee(firstName, lastName, role, manager) {
        // Get the roleId and managerId from the text using helper functions to find the associated id
        const roleId = await this.getRoleId(role);
        const managerId = await this.getEmployeeId(manager);
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
    // Update an employee's role
    async updateEmployeeRole(employee, newRole) {
        // Get the employeeID that is being updated
        const employeeId = await this.getEmployeeId(employee);
        // Get the roleId of the new role based on the title
        const roleId = await this.getRoleId(newRole);
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
            const params = [roleId, employeeId];

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

    // Update an employee's manager
    async updateEmployeeManager(employee, newManager) {
        // Get the managerId of the new manager based on name
        const managerId = await this.getEmployeeId(newManager);
        // Get the employeeID that is being updated
        const employeeId = await this.getEmployeeId(employee);
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
            const params = [managerId, employeeId];
            connection.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                // Exit promise
                resolve();
            });
            connection.end();
        });
    }

    // View employee's by manager
    async getEmployeesByManager(manager) {
        // Get the managerId from the name
        const managerId = await this.getEmployeeId(manager);
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, departments.name AS department, roles.salary AS salary
            FROM employees
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            WHERE manager_id = ?`;
            const params = [managerId];
            connection.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                resolve(rows);
            });
            connection.end();
        });
    }

    async getEmployeesByDepartment(department) {
        // Get the departmentId from the name
        const departmentId = await this.getDepartmentId(department);
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            // We need to request the employee table with the manager name as well, this means that we will be using a self-join with two tablie alias's 'e' for employee info and 'm' which will have the manager name
            // As we are sorting by department our 'WHERE' statement will check when the roles.department_id (since the e.roles_id has an associated roles.department_id) is equal to our selected departmentId
            const sql = `SELECT e.id, e.first_name, e.last_name, roles.title AS title, roles.salary AS salary, CONCAT_WS(' ', m.first_name, m.last_name) AS manager
            FROM employees e
            LEFT JOIN roles on e.role_id = roles.id
            LEFT JOIN employees m ON e.manager_id = m.id
            WHERE roles.department_id = ?`;
            const params = [departmentId];
            connection.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err);
                    return;
                }
                resolve(rows);
            });
            connection.end();
        });

    }
    // Delete functions
    // These delete functions will reference the .names variables to reduce the number of querires that must be made. Should this be switched to ids for the sake of best practice, or is this ok?
    // Should these values cascade, impying that the deletion of said department or role also deletes all associated employees? Currently set to not do that. 
    // Function to delete departments, roles, and employees
    delete(tableName, removedValue) {
        // Potentially rab id of the department that needs to be deleted
        //const department_id = await this.getDepartmentId(department);
        
        // Make a query to delete from the departments table given the name of the department
        return new Promise((resolve, reject) => {
            const connection = this.connect();
            let column = '';
            if(tableName === 'departments') {
                column = "departments.name";
            }
            if(tableName === 'roles') {
                column = "roles.title";
            }
            if(tableName === 'employees') {
                // Set the column to search the combination of the employee first and last name as thats what will be recieved by the method
                column = "CONCAT_WS(' ', employees.first_name, employees.last_name)";
            }

            const sql = `DELETE FROM ${tableName}
            WHERE ${column} = ?`;

            const params = [removedValue];

            connection.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err.message);
                    return; 
                } 
                resolve(console.log(`${removedValue} has been deleted from ${tableName}!`));
            });
            connection.end();
        });
    }
}

module.exports = Database;