import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var NotificationModelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  info: {
    type: Object,
    required: [true, 'Information is required']
  },
  type: {
    type: String,
    enum : ['success','error'],
    default: 'error',
    required: [true, 'Type is required']
  },
  appName: { // internal use for manager analytics
    type: String,
    required: [true, 'appName is required']
  },
  _userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required']
  },
  _subscriptionId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Subscription ID is required']
  }
}, { timestamps: true });

var NotificationModel = mongoose.model('notifications', NotificationModelSchema);

export default NotificationModel;