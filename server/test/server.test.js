const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');
const { todos, populateTodo, users, populateUser } = require('./seed/seed')

beforeEach(populateUser);
beforeEach(populateTodo);

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        var text = "Test todo text";

        request(app)
            .post('/todos')
            .send({ text: text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            })
    })

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            })
    })
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
})

describe('GET /todos/:id', () => {
    it('Should get one of todo', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    });
    it('Should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    });

    it('Should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('Should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[1].text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    })
    it('Should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    });
    it('Should return 404 for non-object ids', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/id:', () => {
    it('Should update a todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var body = {
            text: 'This is a edited',
            completed: true,
        }
        request(app)
            .patch(`/todos/${hexId}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(true).toBeA('boolean')
                expect(res.body.todo.text).toBe(body.text)
                expect(res.body.todo.completedAt).toBeA('number')
            }).end(done);
    });

    it('Should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var body = {
            text: 'This is a edited2',
            completed: false,
        }
        request(app)
            .patch(`/todos/${hexId}`)
            .expect(200)
            .send(body)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(false).toBeA('boolean')
                expect(res.body.todo.text).toBe(body.text)
                expect(res.body.todo.completedAt).toNotExist()
            }).end(done)
    });

    it('Should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .patch(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    });

    it('Should return 404 for non-object ids', (done) => {
        request(app)
            .patch('/todos/123')
            .expect(404)
            .end(done);
    });


})

describe('/GET /users/me', () => {
  it('should return user if authenticated', (done) => {
      request(app)
              .get('/users/me')
              .set('x-auth', users[0].tokens[0].token)
              .expect(200)
              .expect((res)=> {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
              })
              .end(done);
  });

  it('should return 401 if user is not authenticated', (done) => {
    request(app)
            .get('/users/me')
            .expect(401)
            .expect((res)=> {
              expect(res.body).toEqual({});

            })
            .end(done);
  })
});
