//menu functions level 2 (view)

function viewDepartment (){
    connection.query("SELECT * FROM departments", function(err, res){
        if (err) throw err;
        console.table(res);
        connection.end();
        })
    };
  
    function viewRole(){
        connection.query("SELECT * FROM roles", function(err,res){
            if (err) throw err;
            console.table(res);
            connection.end
        })
    };
        
    
    function viewEmployee (){
        inquirer.prompt({
            name: "sortselect",
            type: "rawlist",
            message: "What would you like to sort by?",
            choices: [
                "Last name",
                "First name",
                "Department",
                "Return to menu"
            ]
        }).then (function(answer){
            switch(answer.action){
                case "Last name":
                    eSortLN();
                    break;
    
                case "First name":
                    eSortFN();
                    break;
    
                case "Role":
                    eSortRole();
                    break;
    
                case "Return to Menu":
                    startup();
                    break;
            }
        })
    };
   
    
    //menu functions level 3 (view-employee)
    
    function eSortLN () {
        connection.query("SELECT * FROM employees ORDER BY last_name", function(err, res){
        if (err) throw err;
        console.table(res)
        })
    };
    
    function eSortFN() {
        connection.query("SELECT * FROM employees ORDER BY first_name", function(err, res){
            if (err) throw err;
            console.table(res)
        })
    };
    
    function eSortRole() {
        connection.query("SELECT * FROM employees ORDER BY role_id", function(err, res){
            if (err) throw err;
            console.table(res)
        })
    };
    