const mongoose = require('mongoose')

const todosSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"title is required"],
            minlength:[3,"title must be at least 3 characters"],
            maxlength:[200,"title must be at most 200 characters"],
            unique:true,
            trim:true,
        },
        status:{
            type:String,
            enum:["done","in progress","todo"],
            default:"todo",
            trim:true,
        },
        // [3]
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User', 
        }
    }       
)// [1]

const todosModel = mongoose.model('todo',todosSchema) // [2]

module.exports = todosModel; // [3]

/* 
 [1] create schema 
 [2] create model (nameCollection, todosSchema)
 [3] export model
*/  


/* 
 - Tasks 
  [1] create schema of user and tasks 
  [2] create folder controller, models and routes 
  [3] relate user and tasks with _ID of users 
  [4] add user validation and authentication
*/