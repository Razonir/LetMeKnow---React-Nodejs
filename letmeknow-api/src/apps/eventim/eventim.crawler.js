import logger from '../../logger.js';
import { pushSubscriptionNotification, removeSubscriptionNotification} from '../../services/notification-service.js';
import { sendMail } from '../../services/mail-notifications-service.js'
import UserModel from "../../models/user.model.js";

import axios from "axios";
import cheerio from "cheerio";
const AVAILABLE_STRING = "זמין";

export async function start(subscription) {
    try {
        let notification = null;

        try {
            const details = subscription.details;
            let result = await checkAvailability(details.url, details.date);
            try {
                if (result) {
                    notification = {
                        title: 'Your show is avialable on Eventim!',
                        info: `Your show on ${details.date} is now available.
                        Checkout your show here: ${details.url}.`,
                        type: 'success',
                        appName: 'eventim'
                    };
                } else {
                    logger.error(`Subscription not available ${details.url}`);
                    return;
                }
            } catch (err) {
                logger.error(`Failed to fetch data from ${details.url}: ${err}`);
                // No results, ignore and don't create notification and remove existing one
                await removeSubscriptionNotification(subscription._userId, subscription._id);
                return;
            }
        } catch (err) {
            logger.error(`Failed to handle subscription ${JSON.stringify(subscription)}`, err);
            return;
        }

        const wasNotificationUpdated = await pushSubscriptionNotification(subscription._userId, subscription._id, notification);

        if (wasNotificationUpdated) {
           const userMail = await UserModel.find({ _userId: subscription._userId });
           sendMail(userMail[0].email, notification.title, notification.info)
        }
    } catch (err) {
        logger.error(`Failed fetch data for subscription ${JSON.stringify(subscription)}`, err);
    }
}


async function checkAvailability(url, date) {
    let available = await scrapeData(url, date);
    return await available.includes(AVAILABLE_STRING);
}

async function scrapeData(url, date) {
    let available = '';
    try {
        // Fetch HTML of the page we want to scrape
        const { data } = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);
        const dates = $(".event-listing-date-box");
        dates.each((idx, el) => {
            const child = $(el).children().children().attr("datetime");
            let availability = $(el).next().children().children().find('span:first').text();
            if (child.includes(date)) {
                available = availability;
            }
        })
    } catch (err) {
        throw err;
    }
    if (available == '')
        return 'no date'
    else
        return available
}

