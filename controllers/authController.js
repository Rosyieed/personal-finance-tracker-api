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

