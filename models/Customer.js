const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  capacity: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  packages: {
    type: String,
    required: true
  },
  departure_date: {
    type: Date,
    required: true
  }  
})

module.exports = mongoose.model('Customer', customerSchema);