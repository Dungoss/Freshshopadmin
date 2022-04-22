require('dotenv').config();
const mongoose = require('mongoose');
if(process.env.MONGO_URI){
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.log('not connect to DB !');
      console.log(err);
      return;
    }
    console.log('CONNECTED TO MONGO CLOUD !');
  });
}else{
  console.log('please config MONGO_URI in .env file');
}


module.exports = mongoose;
