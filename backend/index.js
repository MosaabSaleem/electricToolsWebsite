require('dotenv').config({ path : '../.env' });
const stripe = require("stripe")(process.env.Stripe_Secret_Key);
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Product = require("./models/Product");
const User = require("./models/User");
const PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

connectDB();

app.use(express.json());

app.use(cors({
  origin: process.env.Hosted_Domain,
  credentials: true
}));


app.use(express.static("public"));

const Domain = process.env.My_Domain;

app.post('/create-checkout-session', async (req, res) => {
  const {items} = req.body;
  console.log("Creating checkout session for items:", items);

  const line_items = items.map(item => ({
    price_data: {
      currency: 'aud',
      product_data: {
        name: item.name,
        images: [item.image_url],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  // try{
  //   const session = await stripe.checkout.sessions.create({
  //     payment_method_types: ['card'],
  //     line_items,
  //     mode: 'payment',
  //     success_url: `${Domain}/return?session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: `${Domain}/`,
  //   });

  //   res.json({ id: session.id });
  // } catch (error) {
  //   console.error("Error creating checkout session:", error);
  //   res.status(500).json({ message: "Error creating checkout session", error: error.message });
  // }

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: line_items,
    mode: 'payment',
    return_url: `${Domain}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({clientSecret: session.client_secret});
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

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
    const products = await Product.find({ _id: { $in: ids } }).lean();
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

const generateToken = (userId) => {
  return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

// app.post("/api/userVerification", async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Verifying user:", email, password);

//   try {
//     const user = await User.findOne({ email, password });
//     if (user) {
//       console.log("User found:", user);
//       res.json({verified: true, name: user.name});
//     } else {
//       console.log("User not found");
//       res.json({verified: false});
//     }
//   } catch (error) {
//     console.error("Error verifying user:", error);
//     res.status(500).json({ message: "Error verifying user", error: error.message });
//   }
// });

app.post("/api/userVerification", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    console.log(await bcrypt.compare(password, user.password));

    if (user) {
      const token = generateToken(user._id);
      console.log("User found:", user._id);
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json({ verified: true, name: user.name });
    } else {
      res.status(401).json({ verified: false});
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: "Error verifying user", error: error.message });
  }
}); 

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});