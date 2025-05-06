const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const stripeRoutes = require('./routes/stripeRoutes');

const PORT = process.env.PORT || 8080;
const app = express();

connectDB();

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

app.use(express.json());
app.use(cors({
  origin: '*'/*process.env.Hosted_Domain*/,
  credentials: true,
}));

// app.use(express.static("public"));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stripe', stripeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});