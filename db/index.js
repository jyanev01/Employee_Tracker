const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = require('./connections');

function beginQuestions () {
    const allQuestions =  await inquirer.prompt([
        {
            type: 'list',
            name: 'initialQuestions',
            message: "Please select a function",
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role',
                'Exit'],
        }
    ]);
    switch (allQuestions.initialQuestions) {
        case 'view all departments':
            viewAllDepartments();
            break;
        case 'view all roles':
            viewAllRoles();
            break;
        case 'view all employees':
            viewAllEmployees();
            break;
        case 'add a department':
            addDepartment();
            break;
        case 'add a role':
            addRole();
            break;
        case 'add an employee':
            addEmployee();
            break;
        case 'update an employee role':
            updateEmployee();
            break;
        case 'Exit':
            exit();
            break;
    }
};

function viewAllEmployees() {
    db.query(
        `SELECT * FROM department`,
        function (err, res) {
            if (err) throw err
            console.log("\n");
            console.table(res);
            beginQuestions();
        }
    );
}

function viewAllRoles() {
    db.query(
        `SELECT role.title, role.salary, role.department_id AS dept_id, department.name AS name_of_dept
        FROM role
        LEFT JOIN department ON department.id = role.department_id
        ORDER BY department_id;`,
        function (err, res) {
            if (err) throw err
            console.log("\n");
            console.table(res);
            beginQuestions();
        }
    );
}

function viewAllEmployees() {
    db.query(
        `SELECT employees.id, employees.first_name, role.title, department.name AS department, role.salary, CONCAT_WS('', manager.first_name, manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON department.id = role.department_id
            LEFT JOIN employee manager ON employee.manager_id = manager.id;`,
        function (err, res) {
            if (err) throw err
            console.log("\n");
            console.table(res);
            beginQuestions();
        }
    );
}

function addDepartment() {

    const res = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What Deparment would you like to add?'

        },
        {
            name: 'id',
            type: 'input',
            message: "what is the new Deparment's ID?"
        }
    ]).then(function (answers) {
        connection.query('INSERT INTO department SET ?',
            { name: answers.name, id: answers.id },
            function (err, res) {
                if (err) throw err
                console.log("\n");
                console.table(res);
                beginQuestions();

            }
        )
    });
}

function addRole () {
    let departments = [];

    db.query(`SELECT *FROM department`, (err, rows) => {
        if (err) throw err;
        for (let i = 0; i < rows.length; i++) {
            departments.push({ name: rows[i], name, value: rows[i], id });
        }
    });

    const res = await inquirer.prompt([
        {
            name: 'role',
            type: 'input',
            message: 'What is the name of the new role?',
            validate: role => {
                if (role) {
                    return true;
                } else {
                    console.log('Please enter a valid role');
                    return false;
                }
            }
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the name of the new salary?',
            validate: salary => {
                if (salary) {
                    return true;
                } else {
                    console.log('Please enter a valid role');
                    return false;
                }
            }
        },
        {
            name: 'department',
            type: 'rawlist',
            message: "Select a department for this new role",
            choices: departments
        }

    ]);

    const sql = `INSERT role( title, salary, department_id) VALUES (?,?,?)`;
    const params = [res.role, res.salary, res.department];

    db.query(sql, params, (err, row) => {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        beginQuestions();

    });
}

function addEmployee() {
    
    let roles = [];

    db.query(`SELECT *FROM role`, (err, rows) => {
        if (err) throw err;

        for (let i= 0; i < rows.length; i++) {
            roles.push({name: rows[i].title, value: rows[i].id});
        }
    });

    let managers = [];
    db.query(`SELECT CONCAT_WS(' ',employee.first_name,employee.last_name) AS manager, employee.id AS manager_id FROM employee`, (err, rows) => {
        if (err) throw err;

        for (let i= 0; i < rows.length; i++) {
            managers.push({name: rows[i].manager, value: rows[i].manager_id});
        }
    });

    const res =  await  inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'FIrst Name: ',
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Last Name: ',
        },
        {
            name: 'role',
            type: 'list',
            message: 'What is the role for this employee?',
            choices: roles,
        },
        {
            name: 'manager',
            type: 'list',
            message: 'Who is the manager for this employee?',
            choices: managers
        }
    ]);

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [res.firstName, res.lastName, res.role, res.manager];
    db.query(sql, params, (err, row) => {
        if (err) throw err
        console.log("\n");
        beginQuestions();
    });
}

function updateEmployee () {
    let employees = [];
    db.query(`SELECT CONCACT_WS('', employee.first_name, employee.last_name) AS employee_id FROM employee `, (err, rows) => {
        if (err) throw err;
        for (let i =0; i < rows.lenght; i++) {
            employees.push({ name: rows[i].employee, value: rows[i].employee_id});
        }
    });

    let roles = [];
    dqb.query(`SELECT * FROM role`, (err, rows) => {
        if (err) throw err;
        for (let i = 0; i < rows.length; i++) {
            roles.push({ name: rows[i].title, values: rows[i].id});
        }
    });

    const res = await  inquirer.prompt([
        {
            name: 'name',
            type: 'list',
            message: 'What is the name of the employee?',
            choices: employees
            
        },
        {
            name: 'role',
            type: 'list',
            message: "What is the employee's new role?",
            choices: roles
        }
    ]);

    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [res.role, res.name];
    db.query(sql, params, (err, row) => {
        if (err) throw err;
        console.log("\n");
        beginQuestions();
    });
}

// function deleteEmployee() {

// }


function exit () {
    process.exit();
}

module.exports = { beginQuestions};