import logger from '../../logger.js';
import { pushSubscriptionNotification, removeSubscriptionNotification } from '../../services/notification-service.js';
import puppeteer from 'puppeteer';
import { sendMail } from '../../services/mail-notifications-service.js'
import UserModel from "../../models/user.model.js";

const API_URL = "https://www.gulliver.co.il/flights/results?flightstype=1&origincode={from}&destcode={to}&datefrom={date}&paxcode=a{adults}c{children}i0";

export async function start(subscription) {
    try {
        let notification = null;

        try {
            const details = subscription.details;
            const url = API_URL.replace("{from}", details.from)
                .replace("{date}", details.date)
                .replace("{to}", details.to)
                .replace("{adults}", details.adults)
                .replace("{children}", details.children);
            logger.debug(`Start fetching data from ${url}`)
            const browser = await puppeteer.launch();

            const page = await browser.newPage();

            await page.goto(url);

            try {

                // Wait for results to load
                await page.waitForSelector('.flight-deal-container-wrapper', { timeout: 10000 });

                notification = {
                    title: 'Your flight is avialable on Gulliver!',
                    info: `Your flight to ${subscription.details.to} at ${subscription.details.date} is now available.
                    Checkout your flight ${url}`,
                    type: 'success',
                    appName: 'gulliver'
                };
            } catch (err) {
                logger.error(`Failed to fetch data from ${url}: ${err}`);
                // No results, ignore and don't create notification and remove existing one
                await removeSubscriptionNotification(subscription._userId, subscription._id);
                browser.close();
                return;
            }

            browser.close();
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
        logger.error(`Failed  fetch data for subscription ${JSON.stringify(subscription)}`, err);
    }
}
