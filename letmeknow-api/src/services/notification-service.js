import logger from '../logger.js';
import NotificationModel from "../models/notification.model.js";

/**
 * This method deletes notification about user's subscription.
 * 
 * @param {*} userId 
 * @param {*} subscriptionId 
 */
export async function removeSubscriptionNotification(userId, subscriptionId) {
    const subscriptionNotification = await NotificationModel.findOne({ _subscriptionId: subscriptionId, _userId: userId });
    // Check if the user already has notification about this subscription
    if (subscriptionNotification) {
        NotificationModel.deleteOne({ _subscriptionId: subscriptionId, _userId: userId });
        logger.debug(`Deleted notification of user ${userId} for subscription ${subscriptionId}`);
    }
}

/**
 * This method updates the user's subscription notification which describes the status of the subscription.
 * 
 * @param {*} userId 
 * @param {*} subscriptionId 
 * @param {*} notification 
 * @returns whether the notification has been updated or not
 */
export async function pushSubscriptionNotification(userId, subscriptionId, notification) {
    const subscriptionNotification = await NotificationModel.findOne({ _subscriptionId: subscriptionId, _userId: userId });

    // Check if the user already has notification about this subscription
    if (subscriptionNotification) {
        // Check if the notification has changed
        if (subscriptionNotification.type !== notification.type ||
            subscriptionNotification.title !== notification.title ||
            subscriptionNotification.info !== notification.info) {
            const updatedNotification = subscriptionNotification;
            updatedNotification["title"] = notification.title;
            updatedNotification["info"] = notification.info;
            updatedNotification["type"] = notification.type;
            updatedNotification["appName"] = notification.appName;
            const filter = { _id: updatedNotification._id, _userId: updatedNotification._userId };
            // Don't update these fields
            delete updatedNotification["_id"];
            delete updatedNotification["_userId"];
            delete updatedNotification["_subscriptionId"];
            const opts = { new: true };
            await NotificationModel.findOneAndUpdate(filter, updatedNotification, opts);
            logger.debug(`Updated notification for user ${userId} for subscription ${subscriptionId}: ${JSON.stringify(notification)}`);
            return true;
        } else {
            logger.debug(`No changes in notification for user ${userId} for subscription ${subscriptionId}`);
        }
    } else {
        // Push user notification
        const userNotification = new NotificationModel({
            ...notification,
            _userId: userId,
            _subscriptionId: subscriptionId
        });
        await userNotification.save();
        logger.debug(`Pushed notification for user ${userId} for subscription ${subscriptionId}: ${JSON.stringify(notification)}`);
        return true;
    }
}