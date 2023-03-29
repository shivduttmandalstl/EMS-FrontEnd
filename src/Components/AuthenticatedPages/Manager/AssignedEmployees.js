import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isExpired } from "react-jwt";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decodeToken } from "react-jwt";

export const AssignedEmployees = () => {
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			const myToken = decodeToken(Cookies.get("Token"));
			const managerEmail = myToken.sub;
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = { Authorization: BearerToken };
			fetch("http://localhost:9000/home/manager/" + managerEmail, { headers })
				.then((res) => res.json())
				.then((result) => {
					setEmployees(result);
				});
		}
	}, []);
	const sortedEmployees = [...employees].sort((a, b) => a.id - b.id);
	return (
		<div>
			<table
				className="table table-striped table-hover "
				style={{ width: "650px", margin: "20px 0px 0px 60px" }}
			>
				<thead>
					<tr style={{ background: "rgb(52, 50, 50)", color: "white" }}>
						<th scope="col">Emp. Id</th>
						<th scope="col">Name</th>
						<th scope="col">Job Location</th>
						<th scope="col">Contact Number</th>
						<th scope="col">Email</th>
					</tr>
				</thead>
				<tbody>
					{sortedEmployees.map((user, index) => {
						if (user.lastName === null) {
							user.lastName = "";
						}
						if (user.contact === 0) {
							user.contact = "";
						}
						return (
							<tr key={index}>
								<th scope="row">{user.id}</th>
								<td>{user.firstName + " " + user.lastName}</td>
								<td>{user.jobLocation}</td>
								<td>{user.contact}</td>
								<td>{user.email}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<ToastContainer />
		</div>
	);
};
