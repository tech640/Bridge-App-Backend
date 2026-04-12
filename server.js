const express = require('express');
require('dotenv').config();
const path = require('path');
const otpRoutes = require('./routes/otpRoutes');

const app = express();

// Database connection
require('./config/database');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth/otp', otpRoutes);

//Test 
app.get('/test', (req, res) => {
    res.json({ message: 'Backend working' });
});
//auth
// POST
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // تجربة مبدئية (بعدين نربط DB)
  if (email === 'test@test.com' && password === '1234') {
    return res.json({
      success: true,
      token: 'abc123', // لاحقًا JWT
      user: {
        id: 1,
        email: email
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials'
  });
});

app.get("/", (req, res) => {
  res.send("Bridge Backend Running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});