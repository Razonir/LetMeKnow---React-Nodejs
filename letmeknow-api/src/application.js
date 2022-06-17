import logger from './logger.js';
import authRouter from './routers/auth.router.js';
import subscriptionRouter from './routers/subscription.router.js';
import notificationRouter from './routers/notifications.router.js';
import { connect as connectDatabase } from './utils/database.js';
import { initService as initCrawlersManager } from './services/crawlers-manager.js';

export default class Application {
    init(app) {
        return new Promise((resolve, reject) => {
            try {
                connectDatabase();
                this.loadRoutes(app);

                try {
                    initCrawlersManager();
                } catch (err) {
                    logger.error(`Failed to initialize crawlers manager: ${err}`);
                    return reject(err);
                }

                logger.info("Application has been successfully initialized")
                resolve();
            } catch (err) {
                logger.error(`Failed to establish database connection: ${err}`);
                reject(err);
            }
        });
    }

    loadRoutes(app) {
        app.use('/api/v1/auth', authRouter);
        app.use('/api/v1/subscription', subscriptionRouter);
        app.use('/api/v1/notification', notificationRouter);
        logger.info("Application loaded routes")
    }
}