import { AdminNavBar } from "./AdminNavBar";
import { Verification } from "./Verification";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddNewEmployee = () => {
	const defaultManager = {
		contact: "",
		email: null,
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
	const [manager, setManager] = useState([defaultManager]);
	const [employee, setEmployee] = useState({});
	const [newManagerName, setNewManagerName] = useState();

	//For finding all the managers and setting the list into one drop down
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = { Authorization: BearerToken };
			fetch("http://localhost:9000/home/all/role/manager", { headers })
				.then((res) => res.json())
				.then((result) => {
					setManager(result);
				});
		}
	}, []);

	//Retrieving manager full name based on the selected manager email and
	//setting that to a new manager name variable
	if (isExpired(Cookies.get("Token"))) {
		Cookies.remove("Token");
	} else {
		const BearerToken = "Bearer " + Cookies.get("Token");
		const headers = { Authorization: BearerToken };
		if (employee.managerEmail !== undefined) {
			fetch("http://localhost:9000/home/all/" + employee.managerEmail, {
				headers,
			})
				.then((res) => res.json())
				.then((result) => {
					setNewManagerName(result.firstName + " " + result.lastName);
				});
		}
	}

	//setting the new employee manager name into employee variable
	useEffect(() => {
		setEmployee((employee) => ({
			...employee,
			role: "EMPLOYEE",
			managerName: newManagerName,
		}));
	}, [newManagerName]);

	//Add Employee handler for setting the final value and sending it to database (POST operation)
	const AddEmployeeHandler = (e) => {
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
			fetch("http://localhost:9000/home/add", {
				method: "POST",
				headers,
				body: JSON.stringify(employee),
			}).then((res) => {
				if (res.status === 208) {
					toast.error("Email Id already Exists.", {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 1500,
					});
				} else if (res.status === 201) {
					toast.success("New Employee Registration Successful", {
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
			<AdminNavBar />
			<br />
			{verified && (
				<div>
					<h3
						style={{
							textAlign: "center",
							color: "#07428e",
							fontWeight: "bold",
						}}
					>
						Welcome to New Employee Registration Portal
					</h3>
					<br />
					<h5 style={{ marginLeft: "200px" }}>
						Enter the Details of New Employee
					</h5>
				</div>
			)}
			{verified && (
				<form
					onSubmit={AddEmployeeHandler}
					className="row g-3 border border-2"
					style={{
						marginLeft: "200px",
						marginRight: "200px",
						marginTop: "20px",
						padding: "30px",
						borderRadius: "10px",
					}}
				>
					<div className="col-md-6">
						<label className="form-label">
							First Name<span style={{ color: "red" }}>*</span>
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter Employee's First Name"
							required
							onChange={(e) =>
								setEmployee((employee) => ({
									...employee,
									firstName: e.target.value,
								}))
							}
						/>
					</div>
					<div className="col-md-6">
						<label className="form-label">Last Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter Employee's Last Name"
							onChange={(e) =>
								setEmployee((employee) => ({
									...employee,
									lastName: e.target.value,
								}))
							}
						/>
					</div>
					<div className="col-md-6">
						<label className="form-label">
							Email<span style={{ color: "red" }}>*</span>
						</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter Employee's Email Address"
							required
							onChange={(e) =>
								setEmployee((employee) => ({
									...employee,
									email: e.target.value,
								}))
							}
						/>
					</div>
					<div className="col-md-6">
						<label className="form-label">
							Password<span style={{ color: "red" }}>*</span>
						</label>
						<input
							type="password"
							className="form-control"
							placeholder="Set a Password for Employee"
							required
							onChange={(e) =>
								setEmployee((employee) => ({
									...employee,
									password: e.target.value,
								}))
							}
						/>
					</div>
					<div className="col-12">
						<label className="form-label">Contact Number</label>
						<input
							type="tel"
							pattern="[1-9][0-9]{9}"
							maxLength="10"
							minLength="10"
							className="form-control"
							placeholder="Enter Employee's 10 digit Mobile Number"
							onChange={(e) =>
								setEmployee((employee) => ({
									...employee,
									contact: e.target.value,
								}))
							}
						/>
					</div>
					<div className="col-12">
						<label className="form-label">Job Location</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter the Employee's job City"
							onChange={(e) =>
								setEmployee((employee) => ({
									...employee,
									jobLocation: e.target.value,
								}))
							}
						/>
					</div>
					<div className="col-md-6">
						<label className="form-label">Manager Email</label>
						<select
							required
							className="form-select"
							defaultValue={"DEFAULT"}
							onChange={(e) =>
								setEmployee((employee) => ({
									...employee,
									managerEmail: e.target.value,
								}))
							}
						>
							<option value="DEFAULT" disabled hidden>
								Select an Option
							</option>
							{manager.map((user, index) => {
								return (
									<option key={index} value={user.email}>
										{user.email}
									</option>
								);
							})}
						</select>
					</div>
					<div className="col-md-6">
						<fieldset disabled>
							<label className="form-label">Manager Name</label>
							<select className="form-control">
								<option>{newManagerName}</option>
							</select>
						</fieldset>
					</div>
					<div>
						<fieldset disabled className="col-md-6">
							<div className="form-group" style={{ width: "96%" }}>
								<label className="form-label">Role</label>
								<select className="form-control">
									<option value="EMPLOYEE">Employee</option>
								</select>
							</div>
						</fieldset>
					</div>
					<div className="col-12">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</div>
				</form>
			)}
			<ToastContainer />
		</div>
	);
};
