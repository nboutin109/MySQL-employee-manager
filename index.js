var mysql = require("mysql");
var inquirer = require("inquirer");
var ct = require("console.table");
var path = require('path');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    startup();
});

function startup() {
    inquirer.prompt({
        name: "BLM",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View current workplace",
            "Add to workplace",
            "Remove from workplace"
        ]
    })
        .then(function (answer) {
            switch (answer.BLM) {
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

function viewSwitch() {
    inquirer.prompt({
        name: "view",
        type: "rawlist",
        message: "What would you like to view?",
        choices: [
            "View departments",
            "View employees",
            "View roles",
            "Return to menu"
        ]
    }).then(function (answer) {
        switch (answer.view) {
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

function addSwitch() {
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
    }).then(function (answer) {
        switch (answer.add) {
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

function removeSwitch() {
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
    }).then(function (answer) {
        switch (answer.remove) {
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

//menu functions level 2 (view)

function viewDepartment() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
    })
};

function viewRole() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end
    })
};


function viewEmployee() {
    inquirer.prompt(
        {
            name: "sortselect",
            type: "rawlist",
            message: "What would you like to sort by?",
            choices: [
                "Last name",
                "First name",
                "Department",
                "Return to menu"
            ]
        }).then(function (answer) {
            switch (answer.sortselect) {
                case "Last name":
                    eSortLN();
                    break;

                case "First name":
                    eSortFN();
                    break;

                case "Department":
                    eSortRole();
                    break;

                case "Return to Menu":
                    startup();
                    break;
            }
        })
};


//menu functions level 3 (view-employee)

function eSortLN() {
    connection.query("SELECT * FROM employees ORDER BY last_name", function (err, res) {
        if (err) throw err;
        console.table(res)
    })
};

function eSortFN() {
    connection.query("SELECT * FROM employees ORDER BY first_name", function (err, res) {
        if (err) throw err;
        console.table(res)
    })
};

function eSortRole() {
    connection.query("SELECT * FROM employees ORDER BY role_id", function (err, res) {
        if (err) throw err;
        console.table(res)
    })
};

//menu functions level 2 (add items)


function addDepartment() {
    inquirer.prompt({
        name: "addDep",
        type: "input",
        message: "What is the name of the department?"
    }).then(function (answer) {
        var query = "INSERT INTO departments (name) VALUES (?)"
        connection.query(query, answer.addDep, function (err, res) {
            if (err) throw err;
            connection.end();
        })
    })
}

function addEmployee() {
    inquirer.prompt([{
        name: "fName",
        type: "input",
        message: "What is the employee's first name?"
    },
    {
        name: "lName",
        type: "input",
        message: "What is the employees last name?"
    },
    {
        name: "roleID",
        type: "number",
        message: "What is the system ID of the employee's role?"
    },
    {
        name: "depID",
        type: "input",
        message: "What is the system ID of the employee's department?"
    }]).then(function (answer) {
        var query = "INSERT INTO employees (first_name, last_name, role_id, department_id) VALUES (?, ?, ?, ?)"
        connection.query(query, [answer.fName, answer.lName, answer.roleID, answer.depID], function (err, res) {
            if (err) throw err;
            connection.end();
        })
    })
};

function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of the role?"
        },
        {
            name: "salary",
            type: "number",
            message: "What is the salary for this position?"
        },
        {
            name: "depID",
            type: "number",
            message: "What is the system ID of the department this role belonds to?"
        }]).then(function (answer) {
            var query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)"
            connection.query(query, [answer.title, answer.salary, answer.depID], function (err, res) {
                if (err) throw err;
                connection.end();
            })
        })
}

//menu functions level 2 (remove)

function remDepartment() {
    inquirer.prompt({
        name: "remDep",
        type: "input",
        message: "What is the name of the department?"
    }).then(function (answer) {
        var query = "DELETE FROM departments WHERE name=?"
        connection.query(query, answer.remDep, function (err, res) {
            if (err) throw err;
            connection.end();
        })
    })
};

function remEmployee() {
    inquirer.prompt({
        name: "remEmp",
        type: "number",
        message: "What is the assigned ID of the employee?"
    }).then(function (answer) {
        var query = "DELETE FROM employees WHERE id=?"
        connection.query(query, answer.remEmp, function (err, res) {
            if (err) throw err;
            connection.end();
        })
    })
};

function remRole() {
    inquirer.prompt({
        name: "remRole",
        type: "number",
        message: "What is the system ID of the role you would like to remove?"
    }).then(function (answer) {
        var query = "DELETE FROM roles WHERE id=?"
        connection.query(query, answer.remRole, function (err, res) {
            if (err) throw err;
            connection.end();
        })
    })
};
