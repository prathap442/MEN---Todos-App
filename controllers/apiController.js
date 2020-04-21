//here in this controller we are doing the shit of the filling random data
var Todo = require("../models/todoModel");
var bodyParser = require('body-parser');

 

module.exports = function(app){
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
 
  // parse application/json
  app.use(bodyParser.json())

  app.get('/api/todos',function(req,res){
    Todo.find(function(err,results){
      if(err) throw err
      res.send(results)  
    })  
  })
  
  app.post('/api/todo',function(req,response){
    new Promise(function(resolve,reject){
      toDoBuilder = {
        toDoName: req.body.toDoName,
        todo: req.body.todo,
        isDone: req.body.isDone
      }  
      Todo.create([toDoBuilder],function(err,results){
        if(err){
          reject();  
        }
        else{
          resolve(results);
        }
      })   
    }).then(function(results){
      console.log("Inside the then block");
      Todo.find({}, function (err, todos) {
        todos.forEach((toDo)=>{
          console.log(`toDoItem: ${toDo.toDoName}`);
          console.log(`toDo: ${toDo.todo}`)
        })
        // docs.forEach
        response.send({id: results[0].id,msg: "Successfully todo is getting created"});
      });
    }).catch(function(err){
      console.log("INside of the error block")
      console.log(err);
      response.send(err);  
    })  
  })


  app.put('/api/todos/:id',function(req,response){
    let toDoId = req.params.id;
    Todo.findByIdAndUpdate(toDoId, {isDone: req.body.isDone, toDoName: req.body.toDoName, todo: req.body.todo}, function(err,results){
       if(err) throw err
       results["msg"] = "Successfully Updated"
       response.send(results);
    }) 
  })

  app.delete('/api/todos/:id',function(req,response){
    let toDoId = req.params.id;
    Todo.findByIdAndDelete(toDoId,function(err,results){
      results['msg'] = "Successfully Todo is being deleted"
      response.send(results);
    })     
  })
}