import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginForm = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const [adminStatus, setAdminStatus] = useState(false);
	const [employeeStatus, setEmployeeStatus] = useState(false);
	const [managerStatus, setManagerStatus] = useState(false);

	var blank = false;

	const ResetHandler = () => {
		setEmail("");
		setPassword("");
		setRole("");
	};

	const SubmitHandler = async (e) => {
		e.preventDefault();
		if (email === "" && password === "" && role === "") {
			toast.warning("Email, Password and Role Cannot be Blank", {
				position: toast.POSITION.TOP_RIGHT,
			});
			blank = true;
			return;
		} else {
			if (email === "") {
				toast.warning("Email Cannot be Empty", {
					position: toast.POSITION.TOP_RIGHT,
				});
				blank = true;
			}
			if (password === "") {
				toast.warning("Password Cannot be Empty", {
					position: toast.POSITION.TOP_RIGHT,
				});
				blank = true;
			}
			if (role === "") {
				toast.warning("Role Cannot be Empty", {
					position: toast.POSITION.TOP_RIGHT,
				});
				blank = true;
			}
		}
		if (!blank) {
			const UserCheck = { email, password, role };
			await fetch("http://localhost:9000/home/authenticate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(UserCheck),
			})
				.then((res) => {
					if (res.status === 403) {
						toast.error("Invalid Credentials. Please try again.", {
							position: toast.POSITION.TOP_RIGHT,
						});
						return res.json();
					} else if (res.status === 200) {
						toast.success("Successfully Logged In. Redirecting....", {
							position: toast.POSITION.TOP_RIGHT,
							autoClose: 1500,
						});
						setTimeout(function () {
							document.getElementById("closeButton").click();
						}, 2500);

						return res.json();
					}
				})
				.then((result) => {
					const token = result.token;
					Cookies.set("Token", token);
				});
			if (role === "ADMIN") {
				setTimeout(function () {
					setAdminStatus(true);
				}, 2500);
			} else if (role === "EMPLOYEE") {
				setTimeout(function () {
					setEmployeeStatus(true);
				}, 2500);
			} else if (role === "MANAGER") {
				setTimeout(function () {
					setManagerStatus(true);
				}, 2500);
			}
		}
	};

	return (
		<form onSubmit={SubmitHandler}>
			<div className="row mb-3">
				<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
					Email<span style={{ color: "red" }}>*</span>
				</label>
				<div className="col-sm-10 border-2 ">
					<input
						type="email"
						className="form-control"
						id="inputEmail3"
						placeholder="Enter Your Email ID"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
			</div>
			<div className="row mb-3">
				<label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
					Password<span style={{ color: "red" }}>*</span>
				</label>
				<div className="col-sm-10 border-2">
					<input
						type="password"
						className="form-control"
						id="inputPassword3"
						placeholder="Enter Your Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
			</div>
			<div style={{ textAlign: "center" }}>
				<h6
					style={{
						color: "white",
						background: "#17a2b2",
						width: "30%",
						height: "22px",
						borderRadius: "10px",
					}}
				>
					Select your Role<span style={{ color: "red" }}>*</span>
				</h6>
			</div>
			<select
				className="form-select border-2"
				aria-label="Default select example"
				defaultValue={"DEFAULT"}
				onChange={(e) => setRole(e.target.value)}
			>
				<option value="DEFAULT" disabled hidden>
					Select an Option
				</option>
				<option value="ADMIN">Admin</option>
				<option value="EMPLOYEE">Employee</option>
				<option value="MANAGER">Manager</option>
			</select>
			<fieldset className="row mb-3"></fieldset>
			<div className="modal-footer ">
				<button
					type="reset"
					className="btn btn-secondary btn-lg"
					onClick={ResetHandler}
				>
					Reset
				</button>
				<button
					type="submit"
					className="btn btn-primary btn-lg"
					id="submitButton"
				>
					Login
				</button>
			</div>
			<ToastContainer />
			{adminStatus && <Navigate to="/admin" />}
			{employeeStatus && <Navigate to="/employee" />}
			{managerStatus && <Navigate to="/manager" />}
		</form>
	);
};
