const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
