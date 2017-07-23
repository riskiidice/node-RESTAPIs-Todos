const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (e, db) => {
    if (e) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('connected to MongoDB server');
    /* 
        db.collection('Todos').find({
             _id: new ObjectID('597394b64dbe3fe4123f1145') })
             .toArray().then((docs) => {
            console.log('Todos');
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch Todos', eerr)
        });
     */
    /* 
        db.collection('Todos').find().count()
        .then((count) => {
                console.log(`Todos Count: ${count}`);
            }, (err) => {
                console.log('Unable to fetch count', eerr)
            }); */

    db.collection('Users').find({ name: 'Tikumporn Wankvar' }).toArray()
        .then((docs) => {
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch count', err)
        });
    //db.close();
});