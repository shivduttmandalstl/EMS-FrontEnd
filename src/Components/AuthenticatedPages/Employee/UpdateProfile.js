import { VerificationEmployee } from "./VerificationEmployee";
import { EmployeeNavBar } from "./EmployeeNavBar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UpdateProfile = () => {
	const verifiedEmp = VerificationEmployee();
	const [employee, setEmployee] = useState({});

	//getting the details of employee selected by admin for update
	//so that a prefilled form can be generated
	useEffect(() => {
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			const myToken = decodeToken(Cookies.get("Token"));
			const email = myToken.sub;
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = { Authorization: BearerToken };
			fetch("http://localhost:9000/home/all/" + email, { headers })
				.then((res) => res.json())
				.then((result) => {
					setEmployee(result);
				});
		}
	}, []);

	//Update handler for setting the final value and sending it to database (PUT operation)
	const UpdateEmployeeHandler = (e) => {
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
			fetch("http://localhost:9000/home/update", {
				method: "PUT",
				headers,
				body: JSON.stringify(employee),
			}).then((res) => {
				if (res.status === 200) {
					toast.success("Profile Details Updated Successfully", {
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
							color: "#07428e",
							fontWeight: "bold",
						}}
					>
						Welcome to Profile Details Update Portal
					</h3>
				</div>
			)}
			{verifiedEmp && (
				<div>
					<form
						onSubmit={UpdateEmployeeHandler}
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
								defaultValue={employee.firstName}
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
								defaultValue={employee.lastName}
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
								disabled
								type="email"
								className="form-control"
								placeholder="Enter Employee's Email Address"
								required
								defaultValue={employee.email}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">
								New Password<span style={{ color: "red" }}>*</span>
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
								defaultValue={employee.contact}
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
								defaultValue={employee.jobLocation}
								onChange={(e) =>
									setEmployee((employee) => ({
										...employee,
										jobLocation: e.target.value,
									}))
								}
							/>
						</div>
						<div className="col-md-6">
							<fieldset disabled>
								<label className="form-label">Manager Email</label>
								<select className="form-control">
									<option>{employee.managerEmail}</option>
								</select>
							</fieldset>
						</div>
						<div className="col-md-6">
							<fieldset disabled>
								<label className="form-label">Manager Name</label>
								<select className="form-control">
									<option>{employee.managerName}</option>
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
				</div>
			)}
			<ToastContainer />
		</div>
	);
};
