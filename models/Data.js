const mongoose=require("mongoose");
const dataSchema=new mongoose.Schema({
    id:{
        type: String,
    required: true,
    unique: true // ensure uniqueness at DB level
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Data', dataSchema);

 

