const Database = require('./lib/Database');
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
                choices: ['View all departments', 'View all roles', 'View all employees', 'Modify departments', 'Modify roles','Modify employees', 'Quit']
            }
        ])
        .then(async (data) => {
            const action = data.action;
            if (action === 'View all departments') {
                const departmentTable = await db.getDepartments();
                console.table(departmentTable);
            }
            if (action === 'View all roles') {
                const rolesTable = await db.getRoles();
                console.table(rolesTable);
            }
            if (action === 'View all employees') {
                const employeesTable = await db.getEmployees();
                console.table(employeesTable);
            }
            if (action === 'Modify departments') {
                return departmentPrompts();
            }

            if (action === 'Modify roles') {
                return rolePrompts();
            }
            if (action === 'Modify employees') {
                return employeePrompts();
            }

            if (action === 'Quit') {
                return;
            }
            return start();
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
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter in the name of the new department');
                    return false; 
                }
            },
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
    const departmentChoices = await db.getDepartmentNames();
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
            validate: titleInput => {
                if(titleInput) {
                    return true;
                } else {
                    console.log('Please enter the new role title!');
                    return false; 
                }
            },
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
            validate: salaryInput => {
                if(isNaN(salaryInput) || !salaryInput) {
                    return "This input is meant to be number! (Start typing to dismiss this message)";
                } else {
                    return true; 
                }
            },
            filter: salaryInput => {
                if (isNaN(salaryInput)) {
                    return "";
                } else {
                    return salaryInput; 
                }
            },
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
            choices: departmentChoices,
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

            if (data.action === 'Add a new role') {
                db.addRole(data.title, data.salary, data.department);
            }
            return start();
        })
}

const employeePrompts = async function() {
    console.log('Taking you to the employee options...');
    const roleChoices = await db.getRoleTitles();
    const managerChoices = await db.getEmployeeNames();
    managerChoices.push('None');
    const employeeChoices = await db.getEmployeeNames();
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add a new employee', "Change an employee's role", 'Go back']
        },
        {
            type: 'input',
            name: 'firstName',
            message: "Enter the new employee's first name: ",
            validate: firstNameInput => {
                if(firstNameInput) {
                    return true; 
                } else {
                    console.log("Please enter the new employee's first name!");
                    return false; 
                }
            },
            when: ({ action }) => {
                if (action === 'Add a new employee') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "Enter the new employee's last name: ",
            validate: lastNameInput => {
                if(lastNameInput) {
                    return true; 
                } else {
                    console.log("Please enter the new employee's last name!");
                    return false; 
                }
            },
            when: ({ action }) => {
                if (action === 'Add a new employee') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: "Select the new employee's role: ",
            choices: roleChoices,
            when: ({action}) => {
                if(action === 'Add a new employee') {
                    return true;
                } else {
                    return false; 
                }
            }
        },
        {
            type: 'list',
            name: 'manager',
            message: "Select the new employee's manager: ",
            choices: managerChoices,
            when: ({action}) => {
                if(action === 'Add a new employee') {
                    return true;
                } else {
                    return false; 
                }
            }
        },
        {
            type: 'list',
            name: 'employee',
            message: "Select the employee whose role will be changed: ",
            choices: employeeChoices,
            when: ({action}) => {
                if(action === "Change an employee's role") {
                    return true; 
                } else {
                    return false; 
                }
            }

        },
        {
            type: 'list',
            name: 'newRole',
            message: "Select the employee's new role: ",
            choices: roleChoices,
            when: ({action}) => {
                if(action === "Change an employee's role" ) {
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

        if(data.action === 'Add a new employee') {
            db.addEmployee(data.firstName, data.lastName, data.role, data.manager);
        }

        if(data.action === "Change an employee's role") {
            db.updateEmployeeRole(data.employee, data.newRole);
        }
        return start();
    });

}

start();








// So I need to create a function I can call to generate lists given a resolved response... 










