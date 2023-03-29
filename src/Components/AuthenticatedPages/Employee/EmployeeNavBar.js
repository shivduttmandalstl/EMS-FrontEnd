import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Unauthorized } from "../../UI/Unauthorized";

export const EmployeeNavBar = () => {
	const [logout, setLogout] = useState(false);
	const [employee, setEmployee] = useState({});
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
					setEmployee(result);
				});

			if (employee.role === "EMPLOYEE") {
				setAuth("true");
				return;
			} else {
				setAuth("false");
			}
		}
	}, [employee.role]);

	if (employee.lastName === null) {
		employee.lastName = "";
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
					className="navbar navbar-expand-lg navbar-light "
					style={{
						background: "rgba(28, 209, 209, 0.774)",
						paddingBottom: "0",
					}}
				>
					<div className="container-fluid ">
						<a
							className="navbar-brand"
							href="/employee"
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
								marginRight: "30px",
								marginLeft: "10px",
								fontSize: "20px",
							}}
						>
							<a
								className="nav-link dropdown-toggle"
								href="/employee"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Leave Management
							</a>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
								<li>
									<a className="dropdown-item" href="/employee/leave/apply">
										Apply Leave
									</a>
								</li>
								<li>
									<a className="dropdown-item" href="/employee/leaves/status">
										Check Leave Status
									</a>
								</li>
							</ul>
						</div>
						<div
							className="nav-item dropdown navbar-brand"
							style={{ fontSize: "20px", marginRight: "30px" }}
						>
							<a
								className="nav-link dropdown-toggle"
								href="/employee"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Task
							</a>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
								<li>
									<a className="dropdown-item" href="/employee/task/check">
										Check Task
									</a>
								</li>
								<li>
									<a className="dropdown-item" href="/employee/task/progress">
										Update Progress
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
						<a
							className="navbar-brand"
							href="/employee/update"
							style={{ fontSize: "20px" }}
						>
							Update Profile
						</a>

						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent"
						>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
							<div className="d-flex">
								<div>
									<h4 style={{ marginRight: "40px", marginTop: "2px" }}>
										Welcome, {employee.firstName + " " + employee.lastName}
									</h4>
									<h5 style={{ textAlign: "right", marginRight: "40px" }}>
										{employee.role}
									</h5>
								</div>
								<button
									className="btn btn-outline-success"
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
