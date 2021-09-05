const Database = require('./lib/Database');
const inquirer = require('inquirer');

const db = new Database; 

const start = function() {
    return inquirer
        .prompt([
            {
                type:'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['View all departments', 'Add a department', 'Quit']
            },
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the new department name: ',
                when: ({ action }) => {
                    if (action === 'Add a department') {
                        return true; 
                    } else {
                        return false; 
                    }
                }
            }
         ])
        .then(answer => {
            const action = answer.action; 
            if (action === 'View all departments') {
                db.getDepartments(); 
            }

            if (answer.departmentName) {
                db.addDepartment(answer.departmentName);
            }
            
            if (action === 'Quit') {
                return;
            }
            return start();
        })
}

start();