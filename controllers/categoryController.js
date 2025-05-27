const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.createCategory = async (req, res) => {
    const { name, type } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (!name || !type) {
        return res.status(400).json({ message: 'Name and type are required' });
    }

    if (existingCategory) {
        return res.status(400).json({ message: 'Category with this name already exists' });
    }

    try {
        const category = new Category({
            name,
            type
        });

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (!name || !type) {
        return res.status(400).json({ message: 'Name and type are required' });
    }

    if (existingCategory && existingCategory._id.toString() !== id) {
        return res.status(400).json({ message: 'Category with this name already exists' });
    }

    try {
        const category = await Category.findByIdAndUpdate(id, { name, type }, { new: true });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}