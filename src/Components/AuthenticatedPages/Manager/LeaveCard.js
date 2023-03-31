import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isExpired } from "react-jwt";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment/moment";

export const LeaveCard = (props) => {
	const [name, setName] = useState("");
	const [color, setColor] = useState("lightblue");
	const [leave, setLeave] = useState(props.data);

	useEffect(() => {
		if (props.data.status === "Accepted") {
			setColor("lightgreen");
		} else if (props.data.status === "Rejected") {
			setColor("lightcoral");
		}
	}, [props.data.status]);

	//Retrieving Employee full name and setting that to a name variable
	if (isExpired(Cookies.get("Token"))) {
		Cookies.remove("Token");
	} else {
		const BearerToken = "Bearer " + Cookies.get("Token");
		const headers = { Authorization: BearerToken };
		if (props.data.email !== undefined) {
			fetch("http://localhost:9000/home/all/" + props.data.email, {
				headers,
			})
				.then((res) => res.json())
				.then((result) => {
					setName(result.firstName + " " + result.lastName);
				});
		}
	}

	const SubmitHandler = (e) => {
		e.preventDefault();
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
			window.location.reload(false);
		} else {
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = {
				Authorization: BearerToken,
				"Content-Type": "application/json",
			};
			fetch("http://localhost:9001/leave/update", {
				method: "PUT",
				headers,
				body: JSON.stringify(leave),
			}).then((res) => {
				if (res.status === 200) {
					toast.success("Successfully Updated Leave Status", {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 1500,
					});
					setTimeout(function () {
						props.onStatusSet();
					}, 2500);
				}
			});
		}
	};
	console.log(leave);
	return (
		<div>
			<div className="col">
				<div className="card">
					<div className="card-header" style={{ background: color }}>
						Leave ID: {props.data.leaveId}
					</div>
					<div className="card-body">
						<h5 className="card-title">{name}</h5>
						<p className="card-text">Email ID: {props.data.email}</p>
						<p className="card-text">
							Leave From Date:{" "}
							{moment(props.data.fromDate).format("Do MMMM YYYY")}
						</p>
						<p className="card-text">
							Leave To Date: {moment(props.data.toDate).format("Do MMMM YYYY")}
						</p>
						<p className="card-text">Duration: {props.data.duration} Day</p>
						<p className="card-text">Leave Type: {props.data.leaveType}</p>
						<p className="card-text">Reason: {props.data.reason}</p>
						<p className="card-text">Status: {props.data.status}</p>
						<form onSubmit={SubmitHandler}>
							<select
								className="form-select border-2"
								aria-label="Default select example"
								required
								onChange={(e) =>
									setLeave((leave) => ({
										...leave,
										status: e.target.value,
									}))
								}
							>
								<option value="" hidden>
									Select an Option
								</option>
								<option value="Accepted">Accept Leave Request</option>
								<option value="Rejected">Reject Leave Request</option>
							</select>
							<br />
							<button type="submit" className="btn btn-info ">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};
