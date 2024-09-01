const Data = require('../models/Data');

exports.getData = async (req, res) => {
    const data = await Data.find({ user: req.user.id });
    res.json(data);
};

exports.createData = async (req, res) => {
    const { title, description } = req.body;
    const newData = new Data({ title, description, user: req.user.id });
    await newData.save();
    res.status(201).json(newData);
};
