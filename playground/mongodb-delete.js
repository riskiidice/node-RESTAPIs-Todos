const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (e, db) => {
    if (e) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('connected to MongoDB server');

    //deleteMany
    db.collection('Users').deleteMany({ name: 'Tikumporn Wankvar' })
        .then((result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        })

    /* db.collection('Todos').deleteMany({ text: 'Have lunch' })
        .then((result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        }) */
    //deleteOne
    /*   db.collection('Todos').deleteOne({ text: 'Have lunch' })
          .then((result) => {
              console.log(result);
          }, (error) => {
              console.log(error);
          }) */
    //findOneAndDelete
    db.collection('Users').findOneAndDelete({ _id: new ObjectID("59738d04e828eb1720613dc0") })
        .then((result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        })

    //db.close();
});