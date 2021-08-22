var seeder = require('mongoose-seed');
var mongoose = require('mongoose');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://ThinkWin:w1npreneur@cluster0-shard-00-00.9vgut.mongodb.net:27017,cluster0-shard-00-01.9vgut.mongodb.net:27017,cluster0-shard-00-02.9vgut.mongodb.net:27017/db_sinarsTravindo?ssl=true&replicaSet=atlas-8dpqln-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, function () {

  // Load Mongoose models
  seeder.loadModels([
    "./models/Customer"
  ]);

  // Clear specified collections
  seeder.clearModels(['Customer'], function () {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });

  });
});

var data = [
  // start customer
  {
    'model': 'Customer',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('611b0a9ea677644ad8612f79'),
        name: 'Aryandhi Arief Windiarto',
        email: 'mansoriHack@gmail.com',
        phone: '0853545874',
        capacity: '4',
        destination: 'Tegalmas',
        packages: 'Private Trip',
        departure_date: '04/02/2022'
      }
    ]
  },
  // end customer
];