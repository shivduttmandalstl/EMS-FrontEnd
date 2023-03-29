import { AdminNavBar } from "./AdminNavBar";
import { Verification } from "./Verification";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isExpired } from "react-jwt";
import { ManagerCard } from "./ManagerCard";

export const DeleteManager = () => {
	const defaultUser = {
		contact: "",
		email: "",
		firstName: "",
		id: "",
		jobLocation: "",
		lastName: "",
		managerEmail: "",
		managerName: "",
		password: "",
		role: "",
	};
	const verified = Verification();
	const [managers, setManagers] = useState([defaultUser]);
	const [update, setUpdate] = useState(false);

	//for showing the current data so that the user can choose which one to delete
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = { Authorization: BearerToken };
			fetch("http://localhost:9000/home/all/role/manager", { headers })
				.then((res) => res.json())
				.then((result) => {
					setManagers(result);
				});
		}
		setUpdate(false);
	}, [update]);
	const sortedManagers = [...managers].sort((a, b) => a.id - b.id);
	const updateHandler = () => {
		setUpdate(true);
	};

	return (
		<div style={{ minHeight: "95vh" }}>
			<AdminNavBar />
			<br />
			{verified && (
				<div>
					<h3
						style={{
							textAlign: "center",
							color: "rgb(240, 56, 56)",
							fontWeight: "bold",
						}}
					>
						Welcome to Manager Deletion Portal
					</h3>
				</div>
			)}
			{verified && (
				<div className="row" style={{ margin: "30px 150px 0px 150px" }}>
					{sortedManagers.map((user, index) => {
						if (user.lastName === null) {
							user.lastName = "";
						}
						return (
							<ManagerCard
								key={index}
								name={user.firstName + " " + user.lastName}
								id={user.id}
								email={user.email}
								onDelete={updateHandler}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
};
