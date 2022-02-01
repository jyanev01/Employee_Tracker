const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = require('./connections');

beginQuestions = async () => {
    const allQuestions =  await inquirer.prompt([
        {
            
            name: 'initialQuestions',
            type: 'list',
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

viewAllEmployees= async () => {
    db.query(
        `SELECT * FROM departments`,
        function (err, res) {
            if (err) throw err
            console.log("\n");
            console.table(res);
            beginQuestions();
        }
    );
}

viewAllRoles = async () => {
    db.query(
        `SELECT roles.title, roles.salary, role.department_id AS dept_id, department.name AS name_of_dept
        FROM role
        LEFT JOIN department ON departments.id = role.department_id
        ORDER BY department_id;`,
        function (err, res) {
            if (err) throw err
            console.log("\n");
            console.table(res);
            beginQuestions();
        }
    );
}

viewAllEmployees= async () => {
    db.query(
        `SELECT employees.id, employees.first_name, roles.title, departments.name AS departments, roles.salary, CONCAT_WS('', manager.first_name, manager.last_name) AS manager
            FROM employees
            LEFT JOIN roles ON employee.role_id = role.id
            LEFT JOIN departments ON department.id = role.department_id
            LEFT JOIN employees manager ON employees.manager_id = manager.id;`,
        function (err, res) {
            if (err) throw err
            console.log("\n");
            console.table(res);
            beginQuestions();
        }
    );
}

addDepartment = async () => {

    const res = await inquirer.prompt([
        {
            type: 'input',
            name: 'nameDept',
            message: 'What Deparment would you like to add?'

        },
    ]);

    const dept= db.query(
        'INSERT INTO departments SET ?',{ name: res.nameDept},
            function (err, res) {
                if (err) throw err
                console.log("\n");
                console.table(res);
                beginQuestions();

            }
        
    );
}

addRole = async () => {
    let departments = [];

    db.query(`SELECT *FROM departments`, (err, rows) => {
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

    const sql = `INSERT roles( title, salary, department_id) VALUES (?,?,?)`;
    const params = [res.role, res.salary, res.department];

    db.query(sql, params, (err, row) => {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        beginQuestions();

    });
}

addEmployee = async () => {
    
    let roles = [];

    db.query(`SELECT * FROM roles`, (err, rows) => {
        if (err) throw err;

        for (let i= 0; i < rows.length; i++) {
            roles.push({name: rows[i].title, value: rows[i].id});
        }
    });

    let managers = [];
    db.query(`SELECT CONCAT_WS(' ',employees.first_name,employees.last_name) AS manager, employees.id AS manager_id FROM employees`, (err, rows) => {
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

    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [res.firstName, res.lastName, res.role, res.manager];
    db.query(sql, params, (err, row) => {
        if (err) throw err
        console.log("\n");
        beginQuestions();
    });
}

updateEmployee = async () => {
    let employees = [];
    db.query(`SELECT CONCACT_WS('', employees.first_name, employees.last_name) AS employees_id FROM employees `, (err, rows) => {
        if (err) throw err;
        for (let i =0; i < rows.lenght; i++) {
            employees.push({ name: rows[i].employee, value: rows[i].employee_id});
        }
    });

    let roles = [];
    dqb.query(`SELECT * FROM roles`, (err, rows) => {
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


exit =() => {
    process.exit();
}

module.exports = {beginQuestions};