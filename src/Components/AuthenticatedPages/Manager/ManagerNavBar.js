import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Unauthorized } from "../../UI/Unauthorized";

export const ManagerNavBar = () => {
	const [logout, setLogout] = useState(false);
	const [manager, setManager] = useState({});
	const [auth, setAuth] = useState("");

	//for fetching the Employee details
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			toast.error("Session Expired. Please Login Again", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 1500,
			});
			Cookies.remove("Token");
			setTimeout(function () {
				setLogout(true);
			}, 2500);
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
				setAuth("true");
				return;
			} else {
				setAuth("false");
			}
		}
	}, [manager.role]);

	if (manager.lastName === null) {
		manager.lastName = "";
	}

	// to logout whenever logout is pressed
	const LogoutHandler = () => {
		Cookies.remove("Token");
		toast.success("Successfully Logged Out. Redirecting to Loging Page", {
			position: toast.POSITION.TOP_CENTER,
			autoClose: 1500,
		});
		setTimeout(function () {
			setLogout(true);
		}, 2500);
	};

	return (
		<div>
			{auth === "true" && (
				<nav
					className="navbar navbar-expand-lg navbar-dark bg-dark "
					style={{ background: "#c3c4c5", paddingBottom: "0" }}
				>
					<div className="container-fluid ">
						<a
							className="navbar-brand"
							href="/manager"
							style={{ fontSize: "20px" }}
						>
							Home
						</a>
						<button
							className="navbar-toggler "
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="nav-item dropdown navbar-brand"
							style={{
								marginRight: "10px",
								marginLeft: "10px",
								fontSize: "20px",
							}}
						>
							<a
								className="navbar-brand"
								href="/manager/leaves"
								style={{ fontSize: "20px" }}
							>
								Accept/Reject Leaves
							</a>
						</div>
						<div
							className="nav-item dropdown navbar-brand"
							style={{ fontSize: "20px", marginRight: "30px" }}
						>
							<a
								className="nav-link dropdown-toggle"
								href="/manager"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Task
							</a>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
								<li>
									<a className="dropdown-item" href="/manager/task/assign">
										Assign Task
									</a>
								</li>
								<li>
									<a className="dropdown-item" href="/manager/task/progress">
										Check Progress
									</a>
								</li>
							</ul>
						</div>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>

						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent"
						>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
							<div className="d-flex" style={{ color: "white" }}>
								<div>
									<h4 style={{ marginRight: "40px", marginTop: "2px" }}>
										Welcome, {manager.firstName + " " + manager.lastName}
									</h4>
									<h5 style={{ textAlign: "right", marginRight: "40px" }}>
										{manager.role}
									</h5>
								</div>
								<button
									className="btn btn-outline-light"
									type="submit"
									onClick={LogoutHandler}
									style={{ height: "45px", marginTop: "5px" }}
								>
									Log Out
								</button>
							</div>
						</div>
					</div>
				</nav>
			)}
			{logout && <Navigate to="/" />}
			{auth === "false" && <Unauthorized />}
			<ToastContainer />
		</div>
	);
};
