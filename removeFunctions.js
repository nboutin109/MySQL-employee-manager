//menu functions level 2 (remove)

function remDepartment(){
    inquirer.prompt({
        name: "remDep",
        type: "input",
        message: "What is the name of the department?"
    }).then (function(answer){
        var query = "DELETE FROM departments WHERE name=" + answer.remDep
        connection.query(query, function(err, res){
        if (err) throw err;
        connection.end();
        })
    })
};

function remEmployee(){
    inquirer.prompt({
        name: "remEmp",
        type: "number",
        message: "What is the assigned ID of the employee?"
    }).then (function(answer){
        var query = "DELETE FROM employees WHERE id=" + answer.remEmp
        connection.query(query, function(err, res){
        if (err) throw err;
        connection.end();
        })
    })
};

function remRole(){
    inquirer.prompt({
        name: "remRole",
        type: "number",
        message: "What is the system ID of the role you would like to remove?"
    }).then (function(answer){
        var query = "DELETE FROM roles WHERE id=" + answer.remRole
        connection.query(query, function(err, res){
        if (err) throw err;
        connection.end();
        })
    })
};
