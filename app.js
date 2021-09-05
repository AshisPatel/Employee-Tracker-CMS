const Department = require('./lib/Department');
const Database = require('./lib/Database');
const Roles = require('./lib/Roles');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = new Database;


const start = function () {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'Modify departments', 'Modify roles', 'Quit']
            }
        ])
        .then(async (data) => {
            const action = data.action;
            if (action === 'View all departments') {
                const departmentTable = await db.getDepartments();
                console.table(departmentTable);
            }
            if (action === 'View all roles') {
                const role = new Roles;
                return role.getRoles();
            }

            if (action === 'Modify departments') {
                return departmentPrompts();
            }

            if (action === 'Modify roles') {
                return rolePrompts();
            }

            if (action === 'Quit') {
                return;
            }
            return start();
        })
};

const departmentPrompts = async function () {
    console.log('Taking you to the department options...');
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add a new department', 'Go back']
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter the new department name:',
            when: ({ action }) => {
                if (action === 'Add a new department') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
        .then(data => {
            if (data.action === 'Go back') {
                return start();
            }

            if (data.name) {
                db.addDepartment(data.name);
            }
            return start();
        });
};
const rolePrompts = async function () {
    console.log('Taking you to the role prompts...')
    const department = new Department;
    const options = await print().then(rowsArray => { return rowsArray });
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add a new role', 'Go back']
        },
        {
            type: 'input',
            name: 'title',
            message: 'Enter new role title: ',
            when: ({ action }) => {
                if (action === 'Add a new role') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter new role salary: ',
            when: ({ action }) => {
                if (action === 'Add a new role') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'Choose the department of the new role: ',
            choices: options,
            when: ({ action }) => {
                if (action === 'Add a new role') {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
        .then(data => {
            if (data.action === 'Go back') {
                return start();
            }

            const roles = new Roles;
            if (data.action === 'Add a new role') {
                return roles.addDepartment(data.title, data.salary, data.department)
            }
        })
}

start();


// const print = () => {
//     return new Promise((resolve, reject) => {
//         const mysql = require('mysql2');
//         // Create connection
//         const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: 'password', database: 'company'});
//         const sql = `SELECT departments.name FROM departments`;

//         connection.query(sql, (err, rows) => {
//            if (err) {
//                console.log(err.message); 
//                return;
//            } 
//            const rowsArray = rows.map(obj => obj.name);
//            resolve(rowsArray); 
//         });
//     });
// }


// So I need to create a function I can call to generate lists given a resolved response... 










