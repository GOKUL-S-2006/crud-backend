const express = require('express');
const router = express.Router();
const Data = require('../models/Data'); // Importing Model to access database


router.get('/display', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/display/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const single_Data = await Data.findById(id);

    if (!single_Data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(single_Data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/create', async (req, res) => {
  try {
    const { id, title, content } = req.body;
    const newData = await Data.create({ id, title, content });
    res.status(201).json({ message: 'Created', data: newData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Data.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch('/modify/:id', async (req, res) => {
  try {
    const updated = await Data.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({ message: 'Modified successfully', data: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
