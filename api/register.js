const mongoose = require('mongoose');

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

// Avoid OverwriteModelError in serverless environments
const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
    
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(mongoURI);
        }
        
        const newReg = new Registration(req.body);
        await newReg.save();
        res.status(200).json({ success: true, message: 'Registration successful' });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};
