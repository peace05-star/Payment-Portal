const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationPatterns, sanitizeInput } = require('../middleware/security');

const router = express.Router();

// Register user
router.post('/register', sanitizeInput, async (req, res) => {
    try {
        const { name, idNumber, accountNumber, email, password } = req.body;

        // Validate input using RegEx whitelisting
        if (!validationPatterns.name.test(name)) {
            return res.status(400).json({ error: 'Invalid name format' });
        }
        if (!validationPatterns.idNumber.test(idNumber)) {
            return res.status(400).json({ error: 'ID Number must be 13 digits' });
        }
        if (!validationPatterns.accountNumber.test(accountNumber)) {
            return res.status(400).json({ error: 'Account number must be 10-12 digits' });
        }
        if (!validationPatterns.email.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        if (!validationPatterns.password.test(password)) {
            return res.status(400).json({ 
                error: 'Password must be at least 8 characters with uppercase, lowercase, number and special character' 
            });
        }

        // Check if user exists
        let user = await User.findOne({ 
            $or: [
                { email: email },
                { idNumber: idNumber },
                { accountNumber: accountNumber }
            ]
        });
        if (user) {
            return res.status(400).json({ error: 'User with this email, ID number, or account number already exists' });
        }

        // Create user
        user = new User({ 
            name, 
            idNumber, 
            accountNumber, 
            email, 
            password 
        });
        await user.save();

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                accountNumber: user.accountNumber 
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// Login user
router.post('/login', sanitizeInput, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!validationPatterns.email.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: 'Login successful',
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                accountNumber: user.accountNumber 
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// Get current user
router.get('/me', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        res.json({
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                accountNumber: user.accountNumber 
            }
        });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

module.exports = router;