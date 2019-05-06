var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "root",

  database: "bamazon_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId)
  start();

});

var start = function () {
  var sqlQuery = "SELECT * FROM products"

  connection.query(sqlQuery, function (err, results) {
    if (err) throw err;

    inquirer
      .prompt(
        {
          name: "product_name",
          type: "rawlist",
          message: "What is the item you would like to view?",
          choices: function (value) {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          }
        }).then(function (answer) {
          var item = GetItem(results, answer.product_name);

          SelectQuantity(item);
        })
  });
}

function GetItem(data, item) {
  //console.log(data)
  //console.log(item)

  //console.log pingpong ball from data
  //console.log(data[2].product_name)

  //data[something].product_name === item
  // return this item

  for (var i = 0; i < data.length; i++) {
    if (data[i].product_name === item) {
      return data[i]
    }
  }
  return null;
}

function SelectQuantity(dbItem) {

  inquirer.prompt({
    name: "quantity",
    type: "input",
    message: "How many do you want?"
  }).then(function (answer) {
    var quantity = parseInt(answer.quantity)

    if (dbItem.stock_quantity < quantity) {
      // ask them  again how many they want

      console.log("We don't have that many! We have " + dbItem.stock_quantity)
      SelectQuantity(dbItem)
    }
    //else if 
    //(dbItem.stock_quantity >= quantity){
    //  console.log("Your purchase is complete!")
    //}
    else {
      // call function that reduces inventory
      console.log("Your purchase is complete!")
      reduceInventory(dbItem, quantity)
    }
  })

}
function reduceInventory(item, amount){
  var sqlQuery = "";

  var totalCost = item.price * amount
  console.log("$" + totalCost)
  
  //connection.query(sqlQuery, function(err, res){
    //if(err) throw err;

    //console.log(res);
  //})
}