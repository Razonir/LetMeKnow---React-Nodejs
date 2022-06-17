import { useSetRecoilState } from "recoil";
import { history, useFetchWrapper } from "utils";
import { authAtom,isAdminAtom } from "state";

export { useUserActions };

function useUserActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;
    const authEndpoint = `${baseUrl}/auth`;
    const subscriptionEndpoint = `${baseUrl}/subscription`;
    const fetchWrapper = useFetchWrapper();
    const setAuth = useSetRecoilState(authAtom);
    const setIsAdmin = useSetRecoilState(isAdminAtom);

    return {
        login,
        signup,
        logout,
        googleLogin,
        analytics,
        contactUs
    };

    function googleLogin(tokenId) {
        return new Promise((resolve, reject) => {
            fetchWrapper
                .post(`${authEndpoint}/googleLogin`, { tokenId })
                .then((res) => {
                    if (res?.token == null) {
                        reject("Server returned an unexpected resonse");
                    } else {
                        localStorage.setItem("user", res.token);
                        localStorage.setItem("isadmin",res.isAdmin);
                        setAuth(res.token);
                        resolve();
                    }
                })
                .catch((err) => {
                    reject(`Failed to login (${err})`);
                });
        })
    }

    function login(email, password) {
        return new Promise((resolve, reject) => {
            fetchWrapper
                .post(`${authEndpoint}/login`, { email, password })
                .then((res) => {
                    if (res?.token == null) {
                        reject("Server returned an unexpected resonse");
                    } else {
                        localStorage.setItem("user", res.token);
                        localStorage.setItem("isadmin",res.isAdmin);
                        setAuth(res.token);
                        resolve();
                    }
                })
                .catch((err) => {
                    reject(`Failed to login (${err})`);
                });
        });
    }

    function signup(email, password) {
        return new Promise((resolve, reject) => {
            fetchWrapper
                .post(`${authEndpoint}/signup`, { email, password })
                .then((res) => {
                    if (res?.token == null) {
                        reject("Server returned an unexpected resonse");
                    } else {
                        localStorage.setItem("user", res.token);
                        localStorage.setItem("isadmin",res.isAdmin);
                        setAuth(res.token);
                        resolve();
                    }
                })
                .catch((err) => {
                    reject(`Failed to signup (${err})`);
                });
        });
    }

    function logout() {
        // remove data from local storage, set states to null and redirect to login page
        localStorage.removeItem("user");
        localStorage.removeItem("isadmin");
        setAuth(null);
        setIsAdmin(null)
        history.push("/login");
    }

    function analytics() {
        return new Promise((resolve, reject) => {
            fetchWrapper
                .post(`${authEndpoint}/adminChecker`)
                .then(resp=>{
                    fetchWrapper.get(`${authEndpoint}/analytics`)
                    .then((res) => {
                        resolve(res);
                    })
                })
                .catch((err) => {
                    reject(`Failed to Fetch data (${err})`);
                });
        })
    }

    function contactUs(firstName, lastName, email, phonenumber, contant) {
        return new Promise((resolve, reject) => {
            fetchWrapper
                .post(`${authEndpoint}/contactus`,{firstName, lastName, email, phonenumber, contant})
                .then(resp=>{
                    resolve(resp);
                })
                .catch((err) => {
                    reject(`Failed to Fetch data (${err})`);
                });
        })
    }
}