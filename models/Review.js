const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  senderId: String,
  senderName: String,
  receiverId: String,
  campaignId: String,
  title: String,
  description: String,
  stars: Number,
  isRespond: Boolean
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Review', reviewSchema);
