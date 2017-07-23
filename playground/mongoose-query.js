const {ObjectID} = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

 var id = '5974367764e9e32304244c4b';
/*
if(!ObjectID.isValid(id)){
    console.log('ID not valid');
} */
/* 
Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
})

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
})
 */
/* Todo.findById(id)
    .then((todo) => {
        if (!todo) {
            return console.log('Id not found');
        }
        console.log('Todo By id', todo);
    }).catch((e) => console.log(e)); */

    User.findById(id)
    .then((user)=>{
        if(!user){
            return console.log('Unable to find the user');
        }
        console.log(JSON.stringify(user, undefined, 2));
    },(err)=> console.log(e));