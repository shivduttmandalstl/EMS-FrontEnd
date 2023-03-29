import { AdminNavBar } from "./AdminNavBar";
import { Verification } from "./Verification";
import Cookies from "js-cookie";
import { useState } from "react";
import { isExpired } from "react-jwt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddNewManager = () => {
	const verified = Verification();
	const [manager, setManager] = useState({});

	//for posting the data of manager into database using POST operation
	const AddManagerHandler = (e) => {
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
				body: JSON.stringify(manager),
			}).then((res) => {
				if (res.status === 208) {
					toast.error("Email Id already Exists.", {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 1500,
					});
				} else if (res.status === 201) {
					toast.success("New Manager Registration Successful", {
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
						Welcome to New Manager Registration Portal
					</h3>
					<br />
					<h5 style={{ marginLeft: "200px" }}>
						Enter the Details of New Manager
					</h5>
				</div>
			)}
			{verified && (
				<form
					onSubmit={AddManagerHandler}
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
							placeholder="Enter Manager's First Name"
							required
							onChange={(e) =>
								setManager((manager) => ({
									...manager,
									firstName: e.target.value,
									role: "MANAGER",
								}))
							}
						/>
					</div>
					<div className="col-md-6">
						<label className="form-label">Last Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter Manager's Last Name"
							onChange={(e) =>
								setManager((manager) => ({
									...manager,
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
							placeholder="Enter Manager's Email Address"
							required
							onChange={(e) =>
								setManager((manager) => ({
									...manager,
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
							placeholder="Set a Password for Manager"
							required
							onChange={(e) =>
								setManager((manager) => ({
									...manager,
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
							placeholder="Enter Manager's 10 digit Mobile Number"
							onChange={(e) =>
								setManager((manager) => ({
									...manager,
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
							placeholder="Enter the Manager's job City"
							onChange={(e) =>
								setManager((manager) => ({
									...manager,
									jobLocation: e.target.value,
								}))
							}
						/>
					</div>
					<div>
						<fieldset disabled className="col-md-6">
							<div className="form-group" style={{ width: "96%" }}>
								<label className="form-label">Role</label>
								<select className="form-control">
									<option value="MANAGER">Manager</option>
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
