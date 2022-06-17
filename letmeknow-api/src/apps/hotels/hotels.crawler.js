import logger from '../../logger.js';
import { pushSubscriptionNotification, removeSubscriptionNotification } from '../../services/notification-service.js';
import puppeteer from 'puppeteer';
import { sendMail } from '../../services/mail-notifications-service.js'
import UserModel from "../../models/user.model.js";

const API_URL = "https://res.hotels.co.il/reservation/search.php?searchBy=hotel&hhid={hhid}&fromDate={startDate}&toDate={endDate}&adults={adults}&children={children}&infants={infants}";


export async function start(subscription) {
    try {
        let notification = null;

        try {
            const details = subscription.details;
            
            const url=API_URL
            .replace('{hhid}',details.hhid)
                .replace("{startDate}", details.startDate)
                .replace("{endDate}", details.endDate)
                .replace("{adults}", details.adults)
                .replace("{children}", details.children)
                .replace("{infants}", details.infants)
            logger.debug(`Start fetching data from ${url}`)
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            
            try {
                await page.waitForSelector('.results', { timeout: 10000 });
                notification = {
                    title: 'Your hotel request is available on Hotels!',
                    info: `Your hotel at ${subscription.details.startDate} until ${subscription.details.endDate} is now available.
                    Checkout your hotel ${url}`,
                    type: 'success',
                    appName: 'Hotels'
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
        logger.error(`Failed fetch data for subscription ${JSON.stringify(subscription)}`, err);
    }
}