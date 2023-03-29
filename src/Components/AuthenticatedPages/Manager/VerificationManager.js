import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";

export const VerificationManager = () => {
	const [manager, setManager] = useState({});
	const [auth, setAuth] = useState(false);

	//for verifying if the user is manager only or any other user is trying a breach entry
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			const myToken = decodeToken(Cookies.get("Token"));
			const email = myToken.sub;
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = { Authorization: BearerToken };

			fetch("http://localhost:9000/home/all/" + email, { headers })
				.then((res) => res.json())
				.then((result) => {
					setManager(result);
				});
			if (manager.role === "MANAGER") {
				setAuth(true);
				return;
			} else {
				setAuth(false);
			}
		}
	}, [manager.role]);
	return auth;
};
