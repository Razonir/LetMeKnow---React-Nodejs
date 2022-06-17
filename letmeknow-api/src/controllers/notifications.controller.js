import logger from "../logger.js";
import NotificationsModel from "../models/notification.model.js"

/**
 * This method gets all notifications of a user from the database.
 */
async function getAll(req, res) {
	try {
		const userId = req.user;
		const userNotifications = await NotificationsModel.find({ _userId: userId }, { _userId: 0 });

		return res.send({
			message: `Successfully fetched notifications`,
			data: userNotifications
		});
	} catch (err) { 
		logger.error(`Error while getting notifications ${err}`);
		res.status(500).send({
			message: 'Failed to get notifications',
		});
	}
}

/**
 * This method removes specific user's notification from the database by it id.
 */
async function remove(req, res) {
	try {
		const userId = req.user;
		const id = req.params.id;
		await NotificationsModel.deleteOne({ _id: id, _userId: userId, });

		return res.send({
			message: `Successfully removed notification`
		});
	} catch (err) {
		logger.error(`Error while removing notification ${err}`);
		res.status(500).send({
			message: 'Failed to remove notification',
		});
	}
}

export default { getAll, remove };