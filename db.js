const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.hhnshjf.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB " + err.message));

module.exports = mongoose;