import "./Home.css";
import userImage from "../../../src/User.png";
import { LoginModal } from "./LoginModal";
import { Verification } from "../AuthenticatedPages/Admin/Verification";
import { VerificationEmployee } from "../AuthenticatedPages/Employee/VerificationEmployee";
import { VerificationManager } from "../AuthenticatedPages/Manager/VerificationManager";
import { Navigate } from "react-router-dom";

export const Home = () => {
	const verified = Verification();
	const verifiedEmp = VerificationEmployee();
	const verifiedMan = VerificationManager();
	return (
		<div>
			<div className="Home">
				<header className="Home-header">
					<h2>Welcome to</h2>
					<h1>Employee Management System</h1>
				</header>
				<br />
				<br />
				<div className="text-center">
					<img src={userImage} className="rounded" alt="" width={250} />
				</div>
				<br />
				<br />
				<button
					type="button"
					className="btn btn-danger btn-lg"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal"
				>
					Login
				</button>
				<LoginModal />
			</div>
			{verified && <Navigate to="/admin" />}
			{verifiedEmp && <Navigate to="/employee" />}
			{verifiedMan && <Navigate to="/manager" />}
		</div>
	);
};
