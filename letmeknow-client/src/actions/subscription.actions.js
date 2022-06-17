import { useFetchWrapper } from "utils";

export { useSubscriptionActions };

function useSubscriptionActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;
    const subscriptionsEndpoint = `${baseUrl}/subscription`;
    const fetchWrapper = useFetchWrapper();

    return {
        getAllSubscriptions,
        deleteSubsription,
        addSubscription,
        updateSubscription
    };

    function getAllSubscriptions() {
        return fetchWrapper.get(subscriptionsEndpoint);
    }

    function deleteSubsription(id) {
        return fetchWrapper.delete(subscriptionsEndpoint + '/' + id);
    }

    function addSubscription(appName, details) {
        return new Promise((resolve, reject) => {
            fetchWrapper.post(subscriptionsEndpoint, { appName: appName, details: details })
                .then((res) => {
                    resolve();
                })
                .catch((err) => {
                    reject(`Failed to subscribe (${err})`);
                });
        });
    }

    function updateSubscription(subscription) {
        return fetchWrapper.put(subscriptionsEndpoint, subscription);
    }
}