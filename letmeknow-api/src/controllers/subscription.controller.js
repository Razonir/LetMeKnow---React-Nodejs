import logger from "../logger.js";
import { getFirstErrMessage } from "../utils/database.js";
import SubscriptionModel from "../models/subscription.model.js";
import aliceValidate from '../apps/alice/alice.validator.js';
import gulliverValidate from '../apps/gulliver/gulliver.validator.js';
import eventimValidate from '../apps/eventim/eventim.validator.js';
import hotelsValidate from '../apps/hotels/hotels.validator.js';
/**
 * This method validates the subscription details because
 * each application consists different details.
 * 
 * @param appName the application name (for example 'alice')
 * @param subscription the subscription object
 * @returns filtered subscription's details object
 * @throws error when the subscription object is not valid
 */
function validateDetails(appName, subscription) {
	if (appName === 'alice') {
		return aliceValidate(subscription);
	} else if (appName === 'eventim') {
		return eventimValidate(subscription);
	} else if (appName === 'gulliver') {
		return gulliverValidate(subscription);
	} else if (appName === 'hotels') {
		return hotelsValidate(subscription);
	} else {
		throw new Error(`Invalid app name ${appName}`)
	}
}

/**
 * This method adds new subscription of a user to the database.
 */
async function add(req, res) {
	try {
		const subscription = req.body;
		const details = validateDetails(subscription.appName, subscription.details)
		subscription.details = details;

		const subscriptionModel = new SubscriptionModel(subscription);
		subscriptionModel['_userId'] = req.user;
		subscriptionModel.save();

		logger.debug(`Added new subscription ${JSON.stringify(subscription)}`);

		return res.send({
			message: `Successfully added subscription`
		});
	} catch (err) {
		logger.error(`Error while adding subscription ${getFirstErrMessage(err)}`);
		return res.status(500).send({
			message: err.message
		});
	}
}

/**
 * This method gets all subscription of a user from the database.
 */
async function getAll(req, res) {
	try {
		const userId = req.user;
		const userSubscriptions = await SubscriptionModel.find({ _userId: userId }, { _userId: 0 });

		return res.send({
			message: `Successfully fetched subscriptions`,
			data: userSubscriptions
		});
	} catch (err) {
		logger.error(`Error while getting subscriptions ${err}`);
		res.status(500).send({
			message: 'Failed to get subscriptions',
		});
	}
}

/**
 * This method removes specific user's subscription from the database by it id.
 */
async function remove(req, res) {
	try {
		const userId = req.user;
		const id = req.params.id;
		await SubscriptionModel.deleteOne({ _id: id, _userId: userId, });

		return res.send({
			message: `Successfully removed subscription`
		});
	} catch (err) {
		logger.error(`Error while removing subscription ${err}`);
		res.status(500).send({
			message: 'Failed to remove subscription',
		});
	}
}

export default { add, getAll, remove };