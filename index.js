var mysql = require("mysql");
var inquirer = require("inquirer");
var ct = require("console.table")

const connection = mysql.createConnection({
    host: "localhost",
    port: 8000,
    user: "root",
    password: "",
    database: "employees_db"
  });

connection.connect(function(err) {
    if (err) throw err;
    startup();
  });

function startup() {
    inquirer.prompt({
        name: "BLM",
        type: "rawlist",
        message: "What would you like to do?",
        choices:[
            "View current workplace",
            "Add to workplace",
            "Remove from workplace"
        ]
    })
    .then(function(answer){
        switch (answer.action) {
            case "View current workplace":
                viewSwitch();
                break;

            case "Add to workplace":
                addSwitch();
                break;

            case "Remove from workplace":
                removeSwitch();
                break;

        }
    })
};

//menu functions level 1

function viewSwitch(){
    inquirer.prompt({
        name: "add",
        type: "rawlist",
        message: "What would you like to add?",
        choices: [
            "View departments",
            "View employees",
            "View roles",
            "Return to menu"
        ]
    }).then(function (answer){
        switch(answer.action){
            case "View departments":
                viewDepartment();
                break;
            
            case "View employees":
                viewEmployee();
                break;

            case "View roles":
                viewRole();
                break;

            case "Return to menu":
                startup();
                break;
        }
    })
};

function addSwitch(){
    inquirer.prompt({
        name: "add",
        type: "rawlist",
        message: "What would you like to add?",
        choices: [
            "Add new department",
            "Add new employee",
            "Add new role",
            "Return to menu"
        ]
    }).then(function (answer){
        switch(answer.action){
            case "Add new department":
                addDepartment();
                break;
            
            case "Add new employee":
                addEmployee();
                break;

            case "Add new role":
                addRole();
                break;

            case "Return to menu":
                startup();
                break;
        }
    })
};

function removeSwitch(){
    inquirer.prompt({
        name: "remove",
        type: "rawlist",
        message: "What would you like to remove?",
        choices: [
            "Remove department",
            "Remove role",
            "Remove employee",
            "Return to menu"
        ]
    }).then(function (answer){
        switch(answer.action){
            case "Remove department":
                remDepartment();
                break;
            
            case "Remove employee":
                remEmployee();
                break;

            case "Remove role":
                remRole();
                break;

            case "Return to menu":
                startup();
                break;
        }
    })
};







