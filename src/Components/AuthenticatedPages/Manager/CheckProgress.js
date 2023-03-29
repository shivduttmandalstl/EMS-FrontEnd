import { ManagerNavBar } from "./ManagerNavBar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VerificationManager } from "./VerificationManager";
import dateFormat from "dateformat";
import { Progress } from "./Progress";

export const CheckProgress = () => {
	const verifiedMan = VerificationManager();
	const [tasks, setTasks] = useState([]);

	// for getting the data from database
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			const managerEmail = decodeToken(Cookies.get("Token")).sub;
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = { Authorization: BearerToken };
			fetch("http://localhost:9002/task/manager/" + managerEmail, { headers })
				.then((res) => res.json())
				.then((result) => {
					setTasks(result);
				});
		}
	}, []);

	return (
		<div style={{ minHeight: "95vh" }}>
			<ManagerNavBar />
			<br />
			{verifiedMan && (
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
					<h5 style={{ marginLeft: "60px" }}>Tasks Assigned by you are:-</h5>
				</div>
			)}
			{verifiedMan && (
				<div>
					<table
						className="table table-striped table-hover "
						style={{ width: "90%", margin: "20px 40px 0px 60px" }}
					>
						<thead>
							<tr style={{ background: "rgb(52, 50, 50)", color: "white" }}>
								<th scope="col">Task Id</th>
								<th scope="col">Assigned To</th>
								<th scope="col">Task</th>
								<th scope="col">Due Date</th>
								<th scope="col" style={{ width: "25%" }}>
									Progress
								</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((data, index) => {
								let due;

								if (data.dueDate === "") {
									due = "";
								} else {
									due = dateFormat(data.dueDate, "dS mmmm yyyy");
								}

								return (
									<tr key={index}>
										<th scope="row">{data.taskId}</th>
										<td>{data.email}</td>
										<td>{data.task}</td>
										<td>{due}</td>
										<td>{<Progress prog={data.progress} />}</td>
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
