
import UserModel from "../models/user.model.js";
import NotificationsModel from "../models/notification.model.js";
import SubscriptionModel from "../models/subscription.model.js";

async function analytics(req, res) {
    //samplesPerSite
    const aliceSubscriptions = await SubscriptionModel.find({ appName: "alice" }).count();
    const eventimSubscriptions = await SubscriptionModel.find({ appName: "eventim" }).count();
    const gulliverSubscriptions = await SubscriptionModel.find({ appName: "gulliver" }).count();
    const hotelsSubscriptions = await SubscriptionModel.find({ appName: "Hotels" }).count();
    //notiPerSite
    const aliceNotifications = await NotificationsModel.find({ appName: "alice" }).count();
    const eventimNotifications = await NotificationsModel.find({ appName: "eventim" }).count();
    const gulliverNotifications = await NotificationsModel.find({ appName: "gulliver" }).count();
    const hotelsNotifications = await NotificationsModel.find({ appName: "Hotels" }).count();
    //errSuccess
    const success = await NotificationsModel.find({ type: "success" }).count();
    const error = await NotificationsModel.find({ type: "error" }).count();    
    //usersNum
    const usersNum = await UserModel.find().count();    
    return res.send({
        samplesPerSite: {
            message: 'Successfully Fetched',
            data: { Alice: aliceSubscriptions, Eventim: eventimSubscriptions, Gulliver: gulliverSubscriptions, Hotels: hotelsSubscriptions }
        },
        notiPerSite: {
            message: 'Successfully Fetched',
            data: { Alice: aliceNotifications, Eventim: eventimNotifications, Gulliver: gulliverNotifications, Hotels: hotelsNotifications }
        },
        errSuccess: {
            message: 'Successfully Fetched',
            data: { success, error } 
        },
        usersNum: {
            message: 'Successfully Fetched',
            data: { usersNum } 
        }
    });
}

export default { analytics };