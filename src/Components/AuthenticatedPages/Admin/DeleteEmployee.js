import { AdminNavBar } from "./AdminNavBar";
import { Verification } from "./Verification";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isExpired } from "react-jwt";
import { EmployeeCard } from "./EmployeeCard";

export const DeleteEmployee = () => {
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
	const [employees, setEmployees] = useState([defaultUser]);
	const [update, setUpdate] = useState(false);

	//for showing the current data so that the user can choose which one to delete
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = { Authorization: BearerToken };
			fetch("http://localhost:9000/home/all/role/employee", { headers })
				.then((res) => res.json())
				.then((result) => {
					setEmployees(result);
				});
		}
		setUpdate(false);
	}, [update]);
	const sortedEmployees = [...employees].sort((a, b) => a.id - b.id);
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
						Welcome to Employee Deletion Portal
					</h3>
				</div>
			)}
			{verified && (
				<div className="row" style={{ margin: "30px 150px 0px 150px" }}>
					{sortedEmployees.map((user, index) => {
						if (user.lastName === null) {
							user.lastName = "";
						}
						return (
							<EmployeeCard
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
