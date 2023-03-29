import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { toast, ToastContainer } from "react-toastify";
import { EmployeeNavBar } from "./EmployeeNavBar";
import { VerificationEmployee } from "./VerificationEmployee";
import "react-toastify/dist/ReactToastify.css";

export const ApplyLeave = () => {
	const [leave, setLeave] = useState({});
	const verifiedEmp = VerificationEmployee();
	const [email, setEmail] = useState("");

	//for finding the email of user who logged in
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
		} else {
			setEmail(decodeToken(Cookies.get("Token")).sub);
			setLeave((leave) => ({
				...leave,
				email: email,
			}));
		}
	}, [email]);

	//On clicking apply leave button the data will be sent to database
	const AddLeaveHandler = (e) => {
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
			fetch("http://localhost:9001/leave/add", {
				method: "POST",
				headers,
				body: JSON.stringify(leave),
			}).then((res) => {
				if (res.status === 201) {
					toast.success("New Leave Request Added Successfully", {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 1500,
					});
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
				} else if (res.status === 208) {
					toast.error("Dates in between are already added for leave request", {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 2000,
					});
				}
			});
		}
	};

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
					<br />
					<h5 style={{ marginLeft: "200px" }}>
						Enter the Details for applying new Leave
					</h5>
				</div>
			)}
			{verifiedEmp && (
				<div>
					<form
						onSubmit={AddLeaveHandler}
						className="row g-3 border border-2"
						style={{
							marginLeft: "200px",
							marginRight: "200px",
							marginTop: "20px",
							marginBottom: "100px",
							padding: "30px",
							borderRadius: "10px",
						}}
					>
						<div className="col-md-6" style={{ marginRight: "20px" }}>
							<label className="form-label">
								Email<span style={{ color: "red" }}>*</span>
							</label>
							<input
								type="email"
								disabled
								className="form-control"
								placeholder="Enter Employee's Email Address"
								required
								defaultValue={email}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">
								From Date<span style={{ color: "red" }}>*</span> (Inclusive)
							</label>
							<input
								type="date"
								className="form-control"
								required
								min={new Date().toISOString().split("T")[0]}
								onChange={(e) =>
									setLeave((leave) => ({
										...leave,
										fromDate: e.target.value,
									}))
								}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">
								To Date<span style={{ color: "red" }}>*</span> (Inclusive)
							</label>
							<input
								type="date"
								className="form-control"
								required
								min={leave.fromDate || new Date().toISOString().split("T")[0]}
								onChange={(e) =>
									setLeave((leave) => ({
										...leave,
										toDate: e.target.value,
									}))
								}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">
								Select Leave Type<span style={{ color: "red" }}>*</span>
							</label>
							<select
								className="form-select border-2"
								aria-label="Default select example"
								required
								onChange={(e) =>
									setLeave((leave) => ({
										...leave,
										leaveType: e.target.value,
									}))
								}
							>
								<option value="" hidden>
									Select an Option
								</option>
								<option value="Privilege Leave">Privilege Leave</option>
								<option value="Sick Leave">Sick Leave</option>
								<option value="Maternity Leave">Maternity Leave</option>
								<option value="Paternity Leave">Paternity Leave</option>
								<option value="Compensatory Off">Compensatory Off</option>
								<option value="Bereavement Leave">Bereavement Leave</option>
								<option value="Leave Without Pay (LWP)">
									Leave Without Pay (LWP)
								</option>
							</select>
						</div>
						<div className="col-md-6">
							<label className="form-label">
								Reason<span style={{ color: "red" }}>*</span>
							</label>
							<input
								type="text"
								className="form-control"
								required
								placeholder="Enter the reason for Leave Request"
								onChange={(e) =>
									setLeave((leave) => ({
										...leave,
										reason: e.target.value,
									}))
								}
							/>
						</div>

						<div className="col-12">
							<button type="submit" className="btn btn-primary">
								Apply Leave
							</button>
						</div>
					</form>
				</div>
			)}
			<ToastContainer />
		</div>
	);
};
