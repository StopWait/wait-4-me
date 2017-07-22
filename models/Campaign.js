const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const campaignSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  photoURL: String,
  city: String,
  refCreatorId: String,
  refCreatorName: String,
  refPatientId: String,
  isCompleted: Boolean,
  isGoingToWaitName: String,
  isGoingToWaitId: String,
  isRequest: Boolean,
  lat: Number,
  log: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
module.exports = mongoose.model('Campaign', campaignSchema);
