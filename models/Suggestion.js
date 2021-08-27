const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Suggestion', suggestionSchema);