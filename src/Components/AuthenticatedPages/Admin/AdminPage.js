import { CarouselImage } from "./CarouselImage";
import { AdminNavBar } from "./AdminNavBar";
import { Verification } from "./Verification";

export const AdminPage = () => {
	const verified = Verification();
	return (
		<div style={{ minHeight: "95vh" }}>
			<div>
				<AdminNavBar />
			</div>

			{verified && (
				<div>
					<div style={{ textAlign: "center" }}>
						<h2>Welcome to Admin Home Page</h2>
					</div>
					<div>
						<CarouselImage />
					</div>
					<div style={{ margin: "70px 0px 0px 50px" }}>
						<h5>About the Portal</h5>
						<div style={{ marginTop: "10px", lineHeight: "3px" }}>
							<p>
								There is an Employee section where you can register new
								employee, view employees
							</p>
							<p>list, update existing employee and also delete employee.</p>
							<p>
								Inside the employee registration you can assign a manager for
								the newly created
							</p>
							<p>
								employee, or you can assign manager later in update employee
								section.
							</p>
							<p>
								There is a manager section where you can register a new manager,
								view managers
							</p>
							<p>list, and delete manager.</p>
						</div>
					</div>
					<br />
				</div>
			)}
		</div>
	);
};
