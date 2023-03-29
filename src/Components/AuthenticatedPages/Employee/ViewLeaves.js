import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VerificationEmployee } from "./VerificationEmployee";
import { EmployeeNavBar } from "./EmployeeNavBar";
import dateFormat from "dateformat";

export const ViewLeaves = () => {
	const defaultLeave = {
		leaveId: "",
		email: "",
		fromDate: "",
		toDate: "",
		leaveType: "",
		reason: "",
		managerName: "",
		managerEmail: "",
		status: "",
		duration: "",
	};
	const verifiedEmp = VerificationEmployee();
	const [leaves, setLeaves] = useState([defaultLeave]);

	// for getting the data from database
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			const email = decodeToken(Cookies.get("Token")).sub;
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = { Authorization: BearerToken };
			fetch("http://localhost:9001/leave/all/" + email, { headers })
				.then((res) => res.json())
				.then((result) => {
					setLeaves(result);
				});
		}
	}, [leaves.status]);

	return (
		<div style={{ minHeight: "95vh" }}>
			<EmployeeNavBar />
			<br />
			{verifiedEmp && (
				<div>
					<h3
						style={{
							textAlign: "center",
							color: "#07428e",
							fontWeight: "bold",
						}}
					>
						Welcome to Leave Management Portal
					</h3>
					<h5 style={{ marginLeft: "60px" }}>Leaves Applied by you are-</h5>
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
								<th scope="col">Leave Id</th>
								<th scope="col">From Date</th>
								<th scope="col">To Date</th>
								<th scope="col">Duration</th>
								<th scope="col">Leave Type</th>
								<th scope="col">Reason</th>
								<th scope="col">Approver's Name</th>
								<th scope="col">Approver's Email</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							{leaves.map((data, index) => {
								let from, to, dur;
								if (data.fromDate === "" && data.toDate === "") {
									from = "";
									to = "";
								} else {
									from = dateFormat(data.fromDate, "dS mmmm yyyy");
									to = dateFormat(data.toDate, "dS mmmm yyyy");
								}
								if (data.duration === "") {
									dur = "";
								} else {
									dur = data.duration + " Day";
								}

								return (
									<tr key={index}>
										<th scope="row">{data.leaveId}</th>
										<td>{from}</td>
										<td>{to}</td>
										<td>{dur}</td>
										<td>{data.leaveType}</td>
										<td>{data.reason}</td>
										<td>{data.managerName}</td>
										<td>{data.managerEmail}</td>
										<th>{data.status}</th>
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
