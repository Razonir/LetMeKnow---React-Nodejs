import cron from 'node-cron';
import logger from '../logger.js';
import { start as startAliceCrawler } from '../apps/alice/alice.crawler.js';
import { start as startGulliverCrawler } from '../apps/gulliver/gulliver.crawler.js';
import { start as startEventimCrawler } from '../apps/eventim/eventim.crawler.js';
import { start as starHotelsCrawler } from '../apps/hotels/hotels.crawler.js';
import SubscriptionModel from "../models/subscription.model.js";
import config from '../config.js';

/**
 * This method is called periodically by the node-cron and is starting all crawlers.
 */
async function startAllCrawlers() {
    logger.info("Starting crawling cycle...")
    const aliceSubscriptions = await SubscriptionModel.find({ appName: 'alice' });
    const gulliverSubscriptions = await SubscriptionModel.find({ appName: 'gulliver' });
    const evetimSubscriptions = await SubscriptionModel.find({ appName: 'eventim' });
    const hotelsSubscriptions = await SubscriptionModel.find({ appName: 'hotels' });

    if (aliceSubscriptions && aliceSubscriptions.length > 0) {
        aliceSubscriptions.forEach(async subsrciption => {
            await startAliceCrawler(subsrciption);
        });
    }
    if (gulliverSubscriptions && gulliverSubscriptions.length > 0) {
        gulliverSubscriptions.forEach(async subsrciption => {
            await startGulliverCrawler(subsrciption);
        });
    }
    if (evetimSubscriptions && evetimSubscriptions.length > 0) {
        evetimSubscriptions.forEach(async subsrciption => {
            await startEventimCrawler(subsrciption);
        });
    }
    if (hotelsSubscriptions && hotelsSubscriptions.length > 0) {
        hotelsSubscriptions.forEach(async subsrciption => {
            await starHotelsCrawler(subsrciption);
        });
    }
}

export function initService() {
    startAllCrawlers();
    
    // Running all crawlers every two minutes
    cron.schedule(`*/${config.crawlers.interval} * * * * *`, () => {
        startAllCrawlers();
    });
}