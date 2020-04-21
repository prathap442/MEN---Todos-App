var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var toDoSchema = new Schema({
  toDoName: String,
  todo: String,
  isDone: Boolean
});

var Todos = mongoose.model('Todo',toDoSchema);
module.exports = Todos;