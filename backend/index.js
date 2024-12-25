const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Product = require("./models/Product");
const User = require("./models/User");
const PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();

connectDB();

app.use(express.json());

app.use(cors());

app.get("/api", (req, res) => {
  res.json({message: "Hello from server!"});
});

app.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(
      {
        name: "Product",
        price: 0,
        description: "Description",
        image: "Image",
        qty: 0,
        category: "Category"
      }
    );
    const product = await newProduct.save();
    res.json(product);
  } catch (error) {
    res.json({message: "Error creating product"});
  }
});

app.get("/api/userVerification", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({verified: true, name: user.name});
    } else {
      res.json({verified: false});
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: "Error verifying user", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});