const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({
        email: email
    });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const user = new User({
            name,
            email,
            password
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.find({ email });
        if (!user || user.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, {
            // expiresIn: 1 * 60 // 1 minute for testing, change to '1h' for production
            expiresIn: '1h' // Token
        });

        res.status(200).json({
            token,
            user: {
                id: user[0]._id,
                name: user[0].name,
                email: user[0].email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.logout = (req, res) => {
    localStorage.removeItem('token'); // Assuming you're using localStorage on the client side
    res.status(200).json({ message: 'User logged out successfully' });
}

