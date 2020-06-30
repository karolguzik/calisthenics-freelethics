const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

console.log(db);

mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log('DB connected...')
  } catch(err) {
    console.log(err.message);

    process.exit(1);
  }

  // mongoose.connect(db, {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
  // }).then(() => console.log('dziala')).catch(err => console.log(err.message));
};

// const connectDB = () => {
//   mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true});
// }

module.exports = connectDB;
