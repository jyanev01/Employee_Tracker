const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./connections');

const beginQuestions = require('./queryFunctions');
    

viewAllDepartments = () => {
    db.query(
        `SELECT * FROM department`,
        function(err, res) {
            beginQuestions();
        }
    )
}


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
