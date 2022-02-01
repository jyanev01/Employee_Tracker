const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./connections');

beginQuestions = async () => {
    const allQuestions = await inquirer.prompt([
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
                'Exit' ],
        }
    ]);
    switch(allQuestions.initialQuestions){
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
            AddEmployee();
            break;
        case 'update an employee role':
            UpdateEmployee();
            break;
        case 'Exit':
            exit();
            break;
    }       
};

function viewAllEmployees () {
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

function viewAllRoles () {
    db.query(
        `SELECT role.title, role.salary, role.department_id AS dept_id, department.name AS name_of_dept
        FROM role
        LEFT JOIN department ON department.id = role.department_id
        ORDER BY department_id;`,
    function(err, res) {
        if (err) throw err
        console.log("\n");
        console.table(res);
        beginQuestions();
        }
    );
}

function viewAllEmployees () {
    
}