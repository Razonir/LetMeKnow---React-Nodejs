import { useSetRecoilState } from "recoil";
import { notificationsAtom } from "state";
import { useFetchWrapper } from "utils";

export { useNotificationActions };

function useNotificationActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;
    const notificationsEndpoint = `${baseUrl}/notification`;
    const fetchWrapper = useFetchWrapper();
    const setNotifications = useSetRecoilState(notificationsAtom);

    return {
        getAllNotifications,
        deleteNotification,
        getAllNotificationsToPage
    };

    function getAllNotifications() {
        return fetchWrapper.get(notificationsEndpoint).then(setNotifications);
    }
    function getAllNotificationsToPage() {
        return fetchWrapper.get(notificationsEndpoint);
    }

    function deleteNotification(id) {
        return fetchWrapper.delete(notificationsEndpoint + '/' + id);
    }
}