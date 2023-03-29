import { Home } from "./Components/UI/Home";
import { Unauthorized } from "./Components/UI/Unauthorized";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminPage } from "./Components/AuthenticatedPages/Admin/AdminPage";
import { AddNewEmployee } from "./Components/AuthenticatedPages/Admin/AddNewEmployee";
import { AddNewManager } from "./Components/AuthenticatedPages/Admin/AddNewManager";
import { UpdateEmployee } from "./Components/AuthenticatedPages/Admin/UpdateEmployee";
import { ViewEmployees } from "./Components/AuthenticatedPages/Admin/ViewEmployees";
import { DeleteEmployee } from "./Components/AuthenticatedPages/Admin/DeleteEmployee";
import { ViewManager } from "./Components/AuthenticatedPages/Admin/ViewManager";
import { DeleteManager } from "./Components/AuthenticatedPages/Admin/DeleteManager";
import { Error404Page } from "./Components/UI/Error404Page";
import { EmployeePage } from "./Components/AuthenticatedPages/Employee/EmployeePage";
import { ManagerPage } from "./Components/AuthenticatedPages/Manager/ManagerPage";
import { UpdateProfile } from "./Components/AuthenticatedPages/Employee/UpdateProfile";
import { ApplyLeave } from "./Components/AuthenticatedPages/Employee/ApplyLeave";
import { ViewLeaves } from "./Components/AuthenticatedPages/Employee/ViewLeaves";
import { LeaveApprove } from "./Components/AuthenticatedPages/Manager/LeaveApprove";
import { AssignTask } from "./Components/AuthenticatedPages/Manager/AssignTask";
import { CheckTask } from "./Components/AuthenticatedPages/Employee/CheckTask";
import { UpdateProgress } from "./Components/AuthenticatedPages/Employee/UpdateProgress";
import { CheckProgress } from "./Components/AuthenticatedPages/Manager/CheckProgress";

function App() {
	return (
		<div className="App">
			<header>
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />

						{/* Admin Pages */}
						<Route path="/admin" element={<AdminPage />} />
						<Route path="/admin/employee/add" element={<AddNewEmployee />} />
						<Route path="/admin/manager/add" element={<AddNewManager />} />
						<Route path="/admin/employee/update" element={<UpdateEmployee />} />
						<Route path="/admin/employees/view" element={<ViewEmployees />} />
						<Route path="/admin/managers/view" element={<ViewManager />} />
						<Route path="/admin/employee/delete" element={<DeleteEmployee />} />
						<Route path="/admin/manager/delete" element={<DeleteManager />} />

						{/* Employee Pages */}
						<Route path="/employee" element={<EmployeePage />} />
						<Route path="/employee/update" element={<UpdateProfile />} />
						<Route path="/employee/leave/apply" element={<ApplyLeave />} />
						<Route path="/employee/leaves/status" element={<ViewLeaves />} />
						<Route path="/employee/task/check" element={<CheckTask />} />
						<Route
							path="/employee/task/progress"
							element={<UpdateProgress />}
						/>

						{/* Manager Pages */}
						<Route path="/manager" element={<ManagerPage />} />
						<Route path="/manager/leaves" element={<LeaveApprove />} />
						<Route path="/manager/task/assign" element={<AssignTask />} />
						<Route path="/manager/task/progress" element={<CheckProgress />} />

						<Route path="/unauthorized" element={<Unauthorized />} />
						<Route path="*" element={<Error404Page />} />
					</Routes>
				</Router>
			</header>
			<footer className="App-footer">©Shivdutt_Mandal</footer>
		</div>
	);
}

export default App;
