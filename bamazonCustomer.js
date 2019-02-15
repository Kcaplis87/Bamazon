var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 8889,
  
    user: "root",
  
    password: "root",
    
    database: "bamazon_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId)
    start();
    
  });

var start = function(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer
        .prompt(
          {
            name: "product_name",
            type: "rawlist",
            choices: function(value) {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name);
              }
              return choiceArray;
            }
        })
  });
}
