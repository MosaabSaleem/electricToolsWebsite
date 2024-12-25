const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://mmosaab2002:u7VUAQSueJYxjXBY@electricshop.03j7d.mongodb.net/?retryWrites=true&w=majority&appName=electricShop', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;