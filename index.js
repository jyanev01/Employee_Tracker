// const express = require('express');
// const router = express.Router();
const db = require('./config/connections');
const inquirer = require('inquirer');
const queryFunctions = require('./utils/queryFunctions');
    

const initialQuestions = [
    {
        type: 'list',
        name: 'inital screen',
        message: "What would you like to do?",
        choices: ['View All Employees',
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add A Role',
            'Add An Employee',
            'Update An Employee Role'],
    }
];

const addEmployeeQuestions = [
    {
        name: 'first_name',
        type: 'input',
        message: "Enter employee's first name",
    },
    {
        name: 'last_name',
        type: 'input',
        message: "Enter employee's last name",
    },
    {
        name: 'first_name',
        type: 'input',
        message: "Enter employee's first name",

    }
];

const addDepartmentQuestions = [
    {
        name: 'f_name',
        type: 'input',
        message: "What is the name of the new department that you would like to add?",
    },
];

const addEmployeeQuestions = [
    {
        name: 'first_name',
        type: 'input',
        message: "Enter employee's first name",
    },
    {
        name: 'last_name',
        type: 'input',
        message: "Enter employee's last name",
    },
    {
        name: 'first_name',
        type: 'input',
        message: "Enter employee's first name",

    }
];


function init(){
    inquirer.prompt(initialQuestions)
    .then((answers) => {
        
        return functions
    })
    err => {
        if (err) throw err;
    }
};
console.log(prompt());

// init();
