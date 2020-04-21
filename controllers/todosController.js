//here in this controller we are doing the shit of the filling random data
var Todo = require("../models/todoModel");
var listOfTodos = [
  {
    toDoName: "Todo1",
    todo: "This is the todo1 descriptions",
  },
  {
    toDoName: "Todo2",
    todo: "This is the todo1 descriptions"
  }
];



module.exports = function(app){
  app.get('/createTodos',function(req,res){
    var promise = new Promise(function(resolve,reject){
      Todo.create(listOfTodos,function(err,results){
        if(err){
          reject();  
        }
        else{
          resolve();
        } 
      })
    }).then(function(response){
      console.log("Inside the then block")
      let todos
      Todo.find({}, function (err, todos) {
        todos.forEach((toDo)=>{
          console.log(`toDoItem: ${toDo.toDoName}`);
          console.log(`toDo: ${toDo.todo}`)
        })
        // docs.forEach
      });
    }).catch(function(err){
      console.log("INside of the error block")
      console.log(err);  
    })  
  })
  
  app.get('/',function(req,res){
    console.log("The list of the Todos are")
    let listOfTodos = Todo.find((err,results)=>{
      let toDoNames = (results.map((todo)=>{return todo.toDoName}));
      console.log(toDoNames);
      res.send(toDoNames);
    })
  })
}