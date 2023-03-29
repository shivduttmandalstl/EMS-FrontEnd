import { VerificationManager } from "./VerificationManager";
import { ManagerNavBar } from "./ManagerNavBar";
import { AssignedEmployees } from "./AssignedEmployees";
import manager from "../../../../src/manager.jpg";

export const ManagerPage = () => {
	const verifiedMan = VerificationManager();
	return (
		<div style={{ minHeight: "95vh" }}>
			<div>
				<ManagerNavBar />
				<br />
			</div>
			{verifiedMan && (
				<div>
					<div style={{ textAlign: "center" }}>
						<h2>Welcome to Manager Home Page</h2>
						<br />
					</div>
					<div>
						<div style={{ position: "absolute", zIndex: "2" }}>
							<h5 style={{ marginLeft: "60px" }}>
								Employees Assigned to you:-
							</h5>
							<AssignedEmployees />
						</div>
						<div
							style={{
								position: "absolute",
								zIndex: "1",
								marginLeft: "750px",
								marginTop: "20px",
							}}
						>
							<img src={manager} alt="" style={{ width: "100%" }} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
