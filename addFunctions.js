//menu functions level 2 (add items)


function addDepartment () {
    inquirer.prompt({
        name: "addDep",
        type: "input",
        message: "What is the name of the department?"
    }).then (function(answer){
        connection.query("INSERT INTO departments (name) VALUES (" + answer.addDep +")", function(err, res){
            if (err) throw err;
            connection.end();
        })
    })   
}

function addEmployee () {
    inquirer.prompt({
        name: "fName",
        type: "input",
        message: "What is the employee's first name?"
    },
    {   name: "lName",
        type: "input",
        message: "What is the employees last name?"
    },
    {   name: "roleId",
        type: "number",
        message: "What is the system ID of the employee's role?"
    },
    {   name: "manager",
        type: "input",
        message: "What is the system ID of the employee's manager?"
    }).then (function(answer){
        var query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (" + answer.fname + "," + answer.lname + "," + answer.roleId + "," + answer.manager + ")"
        connection.query(query, function(err, res){
        if (err) throw err;
        connection.end();
        })
    })
}; 

function addRole (){
    inquirer.prompt({
        name: "title",
        type: "input",
        message: "What is the title of the role?"
    },
    {   name: "salary",
        type: "number",
        message: "What is the salary for this position?"
    }).then (function(answer){
        var query = "INSERT INTO roles (title, salary) VALUES (" + answer.title + "," + answer.salary + ")"
        connection.query(query, function(err, res){
        if (err) throw err;
        connection.end();
        })
    })
}