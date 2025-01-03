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

app.get("/api/getProducts/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, price, description, image_url, qty, category } = req.body;
    const newProduct = new Product({ name, price, description, image_url, qty, category });
    console.log("Creating product:", newProduct);
    const product = await Product.create(newProduct);
    res.json(product);
  } catch (error) {
    res.json({message: "Error creating product"});
  }
});

app.post("/api/products/bulk", async (req, res) => {
  try {
    const { ids } = req.body;
    const products = await Product.find({ _id: { $in: ids } });
    res.json(products);
  } catch (error) {
    res.json({message: "Error fetching products"});
  }
})

app.put("/api/products/:id", async (req, res) => {
  const { name, price, description, image_url, qty, category } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image_url = image_url;
      product.qty = qty;
      product.category = category;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({message: "Product not found"});
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      console.log(product);
      res.json({message: "Product removed"});
    } else {
      res.status(404).json({message: "Product not found"});
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});

app.post("/api/userVerification", async (req, res) => {
  const { email, password } = req.body;
  console.log("Verifying user:", email, password);
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      console.log("User found:", user);
      res.json({verified: true, name: user.name});
    } else {
      console.log("User not found");
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