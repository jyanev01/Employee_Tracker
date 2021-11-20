const express = require('express');
const db = require('./db/connections');
const inquirer = require('inquirer');

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


const init = () => {
    return inquirer.prompt([
        {
            type: 'list',
                name: 'inital screen',
                message: "What would you like to do?",
                choises: ['View All Employees',
                    'View All Employees by Department',
                    'View All Employees by Manager',
                    'Add New Employee',
                    'Remove Employee',
                    '',
                    ''],
        }
    ]).then((answers) => {
        return;
    })
};
console.log(init());

init();
