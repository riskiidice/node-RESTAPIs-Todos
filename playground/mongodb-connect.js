//const MongoClient = require('mongodb').MongoClient;
const { MongoClient,ObjectID } = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (e, db) => {
    if (e) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('connected to MongoDB server');

    /*  db.collection('Todos').insertOne({
         text: 'Some thing todo',
         completed: false
     }, (err, result) => {
         if(err){
             return   console.log('Unable to insert to do ',err);
         }
         console.log(JSON.stringify(result.ops, undefined, 2));
     });
  */

    //Insert new doc into Users (name, age, location)

    /*  db.collection('Users').insertOne({
         name: 'Tikumporn Wankvar',
         age: 26,
         location: 'Nonthaburi'
     }, (err, res) => {
         if (err) {
             return console.log('Unable to insert users', err);
         }
        // console.log(JSON.stringify(res.ops, undefined, 2));
         console.log(res.ops[0]._id.getTimestamp());
         
     }) */
    db.close();
});