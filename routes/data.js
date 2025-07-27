const express = require('express');
const router = express.Router();
const Data=require('../models/Data');//Importing Model to acces database

router
  .get('/api/display', async (req, res) => {
    try{
      const data=await  Data.find();
      res.json(data);
    }catch(err){
     res.status(500).json({ error: err.message });
    }
   
  })
  .get('/api/display/:id', async (req, res) => {
    try{
    const id=req.params.id;
    const single_Data=await Data.findById(id);
    
    if (!single_Data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json(single_Data);
    }
    catch(err){
      res.status(500).json({error:err.message});
    }
    
  })
  .post('/api/create',async (req, res) => {
    try{
     const {id,title,content}=req.body;
     const newData=Data.create({id,title,content});
      res.status(201).json({ message: 'Created', data: newData });
    }
    catch(err){
      res.status(500).json({error:err.message});
    }


  })
  .delete('/api/delete/:id',async (req, res) => {
    try {
    const id = req.params.id;

    // This matches your custom 'id' field, not MongoDB's '_id'
    const deleted = await Data.findOneAndDelete({ id });

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  })
  .patch('/api/modify/:id', async (req, res) => {

    try {
    const updated = await Data.findOneAndUpdate(
      { id: req.params.id },   // Find by custom 'id'
      req.body,                // Update with data from request body
      { new: true }            // Return the updated document
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
