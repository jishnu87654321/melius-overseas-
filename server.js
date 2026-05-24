const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoURI = 'mongodb+srv://jishnu:jishnu123@cluster126.ta3qfbs.mongodb.net/melius?appName=Cluster126';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Define Mongoose Schema
const registrationSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phonePrefix: String,
    phone: String,
    neetScore: String,
    country: String,
    service: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});
const Registration = mongoose.model('Registration', registrationSchema);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes to map to specific HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/roadmap', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'roadmap.html'));
});

app.get('/universities', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'universities.html'));
});

app.get('/stay', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stay.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// API endpoint for registration
app.post('/api/register', async (req, res) => {
    try {
        const newReg = new Registration(req.body);
        await newReg.save();
        res.status(200).json({ success: true, message: 'Registration successful' });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

// Fallback for 404
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
