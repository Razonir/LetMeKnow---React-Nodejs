import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var SubscriptionModelSchema = new mongoose.Schema({
  appName: {
    type: String,
    required: [true, 'Application name is required']
  },
  details: {
    type: Object,
    required: [true, 'Details are required']
  },
  _userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required']
  }
});

var SubscriptionModel = mongoose.model('subscriptions', SubscriptionModelSchema);

export default SubscriptionModel;