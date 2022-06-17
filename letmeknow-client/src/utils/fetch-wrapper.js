import { useRecoilState } from "recoil";

import { history } from "utils";
import { authAtom } from "state";
import { isAdminAtom } from "state";

export { useFetchWrapper };

function useFetchWrapper() {
	const [auth, setAuth] = useRecoilState(authAtom);
	const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);

	return {
		get: request("GET"),
		post: request("POST"),
		put: request("PUT"),
		delete: request("DELETE"),
	};
	function request(method) {
		return (url, body) => {
			const requestOptions = {
				method,
				headers:{}
			};
			requestOptions.headers['Authorization']=authHeader(url);
			requestOptions.headers['isadmin']=isAdminHeader(url);
			if (body) {
				requestOptions.headers["Content-Type"] = "application/json";
				requestOptions.body = JSON.stringify(body);
			}
			return fetch(url, requestOptions).then(handleResponse);
		};
	}

	// helper functions

	function authHeader(url) {
		// return auth header with jwt if user is logged in and request is to the api url
		const token = auth;
		const isLoggedIn = !!token;
		const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
		if (isLoggedIn && isApiUrl) {
			return `{Bearer ${token}` ;
		} else {
			return {};
		}
	}
	function isAdminHeader(url) {
		// return isAdmin header with jwt if user is logged in and request is to the api url
		const token = auth;
		const isLoggedIn = !!token;
		const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
		if (isLoggedIn && isApiUrl) {
			return `Bearer ${isAdmin}` ;
		} else {
			return {};
		}
	}
	

	function handleResponse(response) {
		return response.text().then((text) => {
			const data = text && JSON.parse(text);
			if (!response.ok) {
				if ([401, 403].includes(response.status) && auth?.token) {
					// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
					localStorage.removeItem("user");
					localStorage.removeItem('isadmin')
					setAuth(null);
					setIsAdmin(null)
					history.push("/login");
				}

				const error = (data && data.message) || response.statusText;
				return Promise.reject(error);
			}

			return data;
		});
	}
}
