import { ManagerNavBar } from "./ManagerNavBar";
import { VerificationManager } from "./VerificationManager";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AssignTask = () => {
	const verifiedMan = VerificationManager();
	const [employees, setEmployees] = useState([]);
	const [task, setTask] = useState({});

	// Getting data of all the employees assigned to the manager selecting employees
	// and assigning task (drop down)
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

	const SubmitTaskHandler = (e) => {
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
			fetch("http://localhost:9002/task/add", {
				method: "POST",
				headers,
				body: JSON.stringify(task),
			}).then((res) => {
				if (res.status === 201) {
					toast.success("Task Assigned Successfully", {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 1500,
					});
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
				} else if (res.status === 208) {
					toast.error("This task is already assigned for this Employee", {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 2000,
					});
				}
			});
		}
	};

	return (
		<div style={{ minHeight: "120vh" }}>
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
					<br />
				</div>
			)}
			{verifiedMan && (
				<div>
					<form
						onSubmit={SubmitTaskHandler}
						className="row g-3 border border-2"
						style={{
							marginLeft: "200px",
							marginRight: "200px",
							marginTop: "20px",
							marginBottom: "200px",
							padding: "30px",
							borderRadius: "10px",
						}}
					>
						<div className="col-md-6" style={{ marginRight: "1px" }}>
							<label className="form-label">
								Select Email of Employee you want to assign Task
								<span style={{ color: "red" }}>*</span>
							</label>
							<select
								className="form-select"
								required
								onChange={(e) =>
									setTask((task) => ({
										...task,
										email: e.target.value,
									}))
								}
							>
								<option value="" hidden>
									Select an Option
								</option>
								{employees.map((user, index) => {
									return (
										<option key={index} value={user.email}>
											{user.email}
										</option>
									);
								})}
							</select>
						</div>
						<div className="col-md-6">
							<label className="form-label">
								Task<span style={{ color: "red" }}>*</span>
							</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter task you want to assign"
								required
								onChange={(e) =>
									setTask((task) => ({
										...task,
										task: e.target.value,
									}))
								}
							/>
						</div>

						<div className="col-md-6">
							<label className="form-label">
								Due Date<span style={{ color: "red" }}>*</span>
							</label>
							<input
								type="date"
								min={new Date().toISOString().split("T")[0]}
								className="form-control"
								required
								onChange={(e) =>
									setTask((task) => ({
										...task,
										dueDate: e.target.value,
									}))
								}
							/>
						</div>
						<div className="col-12">
							<button type="submit" className="btn btn-primary">
								Assign
							</button>
						</div>
					</form>
				</div>
			)}
			<ToastContainer />
		</div>
	);
};
