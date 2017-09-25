const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

const users = [{
    _id: userOneId,
    email: 'ampamp@ampamp.com',
    password: 'ampamp',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, 'mirakuruu').toString()
    }]
  }, {
    _id: userTwoId,
    email: 'ampamp2@ampamp.com',
    password: 'ampamp',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userTwoId, access: 'auth'}, 'mirakuruu').toString()
    }]
     }]
const populateTodo = (done) => {
  Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
  }).then(() => done())
}

const populateUser = (done) => {
  User.remove({}).then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]).then(() => done());
  }).then(() => done())
}


module.exports = { todos, populateTodo ,users, populateUser};
