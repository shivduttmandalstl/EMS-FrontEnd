import { EmployeeNavBar } from "./EmployeeNavBar";
import { VerificationEmployee } from "./VerificationEmployee";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProgressInfo } from "./ProgressInfo";

export const UpdateProgress = () => {
	const verifiedEmp = VerificationEmployee();
	const [tasks, setTasks] = useState([]);
	const [id, setId] = useState("");
	const [task, setTask] = useState({});

	// Getting data of all the tasks assigned to the employee
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			const myToken = decodeToken(Cookies.get("Token"));
			const email = myToken.sub;
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = { Authorization: BearerToken };
			fetch("http://localhost:9002/task/all/" + email, { headers })
				.then((res) => res.json())
				.then((result) => {
					setTasks(result);
				});
		}
	}, []);

	// Getting data of specific task by Task Id
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			if (id !== "") {
				const BearerToken = "Bearer " + Cookies.get("Token");
				const headers = { Authorization: BearerToken };
				fetch("http://localhost:9002/task/id/" + id, { headers })
					.then((res) => res.json())
					.then((result) => {
						setTask(result);
					});
			}
		}
	}, [id]);

	const SubmitProgressHandler = (e) => {
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
			fetch("http://localhost:9002/task/update", {
				method: "PUT",
				headers,
				body: JSON.stringify(task),
			}).then((res) => {
				console.log(res);
				if (res.status === 200) {
					toast.success("Progress Updated Successfully", {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 1500,
					});
					setTimeout(function () {
						window.location.reload(false);
					}, 2500);
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
							color: "#8d0596",
							fontWeight: "bold",
						}}
					>
						Welcome to Task Management Portal
					</h3>
				</div>
			)}
			{verifiedEmp && (
				<div>
					<form
						onSubmit={SubmitProgressHandler}
						className="row g-3 border border-2"
						style={{
							marginLeft: "200px",
							marginRight: "200px",
							marginTop: "20px",
							marginBottom: "200px",
							padding: "30px",
							borderRadius: "10px",
							position: "absolute",
							zIndex: "2",
						}}
					>
						<div className="col-md-6" style={{ marginRight: "1px" }}>
							<label className="form-label">
								Task Id for which you want to update progress
								<span style={{ color: "red" }}>*</span>
							</label>
							<select
								className="form-select"
								required
								onChange={(e) => setId(e.target.value)}
							>
								<option value="" hidden>
									Select an Option
								</option>
								{tasks.map((data, index) => {
									return (
										<option key={index} value={data.taskId}>
											{data.taskId}
										</option>
									);
								})}
							</select>
						</div>
						<div className="col-md-6" style={{ marginRight: "1px" }}>
							<label className="form-label">
								Task<span style={{ color: "red" }}>*</span>
							</label>
							<input
								type="text"
								disabled
								className="form-control"
								required
								defaultValue={task.task}
							/>
						</div>

						<div className="col-md-6">
							<label className="form-label">
								Progress<span style={{ color: "red" }}>*</span>
							</label>
							<input
								type="number"
								min={0}
								max={5}
								className="form-control"
								required
								defaultValue={task.progress}
								onChange={(e) =>
									setTask((task) => ({
										...task,
										progress: e.target.value,
									}))
								}
							/>
						</div>
						<div className="col-12">
							<button type="submit" className="btn btn-primary">
								Update
							</button>
						</div>
					</form>
				</div>
			)}
			{verifiedEmp && (
				<ProgressInfo style={{ position: "absolute", zIndex: "1" }} />
			)}
			<ToastContainer />
		</div>
	);
};
