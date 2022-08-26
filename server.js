const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB Connect successfully!!!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}...`);
});
