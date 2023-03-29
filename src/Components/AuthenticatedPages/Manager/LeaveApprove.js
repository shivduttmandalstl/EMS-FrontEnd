import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { ManagerNavBar } from "./ManagerNavBar";
import { VerificationManager } from "./VerificationManager";
import { LeaveCard } from "./LeaveCard";

export const LeaveApprove = () => {
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
	const verifiedMan = VerificationManager();
	const [leaves, setLeaves] = useState([defaultLeave]);
	const [update, setUpdate] = useState(false);

	// for getting leaves for approval by the approvers name from database
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			const email = decodeToken(Cookies.get("Token")).sub;
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = { Authorization: BearerToken };
			fetch("http://localhost:9001/leave/manager/" + email, { headers })
				.then((res) => res.json())
				.then((result) => {
					setLeaves(result);
				});
		}
		setUpdate(false);
	}, [update]);
	const updateHandler = () => {
		setUpdate(true);
	};
	const sortedLeaves = [...leaves].sort((a, b) => a.id - b.id);

	return (
		<div style={{ minHeight: "95vh" }}>
			<ManagerNavBar />
			<br />
			{verifiedMan && (
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
					<br />
					<h5 style={{ marginLeft: "165px" }}>
						Accept/Reject Leaves from the below leave requests
					</h5>
				</div>
			)}
			{verifiedMan && (
				<div
					className="row row-cols-1 row-cols-md-3 g-4"
					style={{ margin: "0px 150px 0px 150px" }}
				>
					{sortedLeaves.map((data, index) => {
						return (
							<LeaveCard key={index} data={data} onStatusSet={updateHandler} />
						);
					})}
					{leaves.length === 0 ? <h6>No leaves to show</h6> : <p></p>}
				</div>
			)}
		</div>
	);
};
