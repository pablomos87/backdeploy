const mongoose = require('mongoose');

const VisitsSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  }
});

const Visits = mongoose.model('Visits', VisitsSchema);

module.exports = Visits;