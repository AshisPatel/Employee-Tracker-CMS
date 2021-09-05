const Department = require('./lib/Department');
const Roles = require('./lib/Roles');
const inquirer = require('inquirer');
const cTable = require('console.table');


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
        .then(data => {
            const action = data.action;
            if (action === 'View all departments') {
                const department = new Department;
                return department.getDepartments();
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

        })
};

const departmentPrompts = function () {
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

            const department = new Department;
            if (data.name) {
                return departments.addDepartment(data.name);
            }

        })
}

const rolePrompts = function () {
    console.log('Taking you to the role prompts...')
    const department = new Department;
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
            when: ({action}) => {
                if(action === 'Add a new role') {
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
            when: ({action}) => {
                if(action === 'Add a new role') {
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
            choices: [department.getDepartmentNames()],
            when: ({action}) => {
                if(action === 'Add a new role') {
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

//start();

const test = new Department;

function print(result) {
    console.log(result); 
}

print(test.getDepartmentNames());






