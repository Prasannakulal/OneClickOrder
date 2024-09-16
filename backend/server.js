const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myNewDatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Order schema
const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  items: [
    {
      name: String,
      quantity: Number,
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

// Authentication route (Login)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(400).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Registration route
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Order submission route
app.post('/api/orders', async (req, res) => {
  const { name, address, phone, items } = req.body;
  try {
    const newOrder = new Order({ name, address, phone, items });
    await newOrder.save();
    res.status(201).json({ message: 'Order submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Search orders based on location
// Get orders based on address (search functionality)
app.get('/api/orders', async (req, res) => {
  const { address } = req.query; // Ensure parameter name matches

  try {
    console.log('Search Address:', address); // Log the search query

    // Validate that address is a string
    if (typeof address !== 'string') {
      return res.status(400).json({ message: 'Address must be a string' });
    }

    // Fetch orders where the address contains the search text
    const orders = await Order.find({ address: { $regex: address, $options: 'i' } });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err); // Log error details
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});






