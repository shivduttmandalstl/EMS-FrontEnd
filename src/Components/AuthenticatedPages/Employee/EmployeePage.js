import { EmployeeNavBar } from "./EmployeeNavBar";
import { VerificationEmployee } from "./VerificationEmployee";
import employee1 from "../../../../src/employee1.jpg";
import employee2 from "../../../../src/employee2.jpg";

export const EmployeePage = () => {
	const verifiedEmp = VerificationEmployee();

	return (
		<div style={{ minHeight: "95vh" }}>
			<div>
				<EmployeeNavBar />
				<br />
			</div>
			{verifiedEmp && (
				<div>
					<div>
						<h2 style={{ textAlign: "center" }}>
							Welcome to Employee Home Page
						</h2>
					</div>
					<div style={{ marginTop: "40px" }}>
						<div style={{ position: "absolute", zIndex: "1" }}>
							<img src={employee1} alt="" style={{ width: "60%" }} />
						</div>
						<div
							style={{ position: "absolute", zIndex: "2", marginLeft: "700px" }}
						>
							<img src={employee2} alt="" style={{ width: "100%" }} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
