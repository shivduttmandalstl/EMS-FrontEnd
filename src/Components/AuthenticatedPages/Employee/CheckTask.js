import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VerificationEmployee } from "./VerificationEmployee";
import { EmployeeNavBar } from "./EmployeeNavBar";
import moment from "moment/moment";

export const CheckTask = () => {
	const verifiedEmp = VerificationEmployee();
	const [tasks, setTasks] = useState([]);

	// for getting the data from database
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			const email = decodeToken(Cookies.get("Token")).sub;
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = { Authorization: BearerToken };
			fetch("http://localhost:9002/task/all/" + email, { headers })
				.then((res) => res.json())
				.then((result) => {
					setTasks(result);
				});
		}
	}, []);

	return (
		<div style={{ minHeight: "95vh" }}>
			<EmployeeNavBar />
			<br />
			{verifiedEmp && (
				<div>
					<h3
						style={{
							textAlign: "center",
							color: "#8d0596",
							fontWeight: "bold",
						}}
					>
						Welcome to Task Management Portal
					</h3>
					<h5 style={{ marginLeft: "60px" }}>Tasks Assigned to you are-</h5>
				</div>
			)}
			{verifiedEmp && (
				<div>
					<table
						className="table table-striped table-hover "
						style={{ width: "90%", margin: "20px 40px 0px 60px" }}
					>
						<thead>
							<tr style={{ background: "rgb(52, 50, 50)", color: "white" }}>
								<th scope="col">Task Id</th>
								<th scope="col">Task</th>
								<th scope="col">Due Date</th>
								<th scope="col">Assigned By</th>
								<th scope="col">Assigner's Email</th>
								<th scope="col">Progress</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((data, index) => {
								let due;

								if (data.dueDate === "") {
									due = "";
								} else {
									due = moment(data.dueDate).format("Do MMMM YYYY");
								}

								return (
									<tr key={index}>
										<th scope="row">{data.taskId}</th>
										<td>{data.task}</td>
										<td>{due}</td>
										<td>{data.managerName}</td>
										<td>{data.managerEmail}</td>
										<td>{data.progress}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
			<ToastContainer />
		</div>
	);
};
