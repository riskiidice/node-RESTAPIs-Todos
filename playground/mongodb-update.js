const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (e, db) => {
    if (e) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('connected to MongoDB server');

    //findOneAndUpdate
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID("5973fe664dbe3fe4123f1618")
    }, {
            $set: {
                subject: [
                    'maths', 'physics', 'chem', 'special'
                ]
            }
        }, {
            returnOriginal: false
        }

    ).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    })

    //findOneAndUpdate
    db.collection('Users').findOneAndUpdate({ _id: new ObjectID('597392df78a46a17dfe7e6f6') }
        , {
            $set: {
                name: 'Tikumporn Wankvar'
            },
            $inc: {
                age: 0
            }
        }, {
            returnOriginal: false
        }).then((res) => {
            console.log(res);
        })
    //db.close();
});