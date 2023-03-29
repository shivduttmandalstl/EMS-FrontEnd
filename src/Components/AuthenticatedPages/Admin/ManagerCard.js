import Cookies from "js-cookie";
import { isExpired } from "react-jwt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ManagerCard = (props) => {
	const DeleteHandler = () => {
		//console.log(props.email);
		if (isExpired(Cookies.get("Token"))) {
			Cookies.remove("Token");
		} else {
			const BearerToken = "Bearer " + Cookies.get("Token");
			const headers = { Authorization: BearerToken };
			fetch("http://localhost:9000/home/delete/" + props.email, {
				method: "DELETE",
				headers,
			}).then((res) => {
				if (res.status === 200) {
					toast.success("Successfully Deleted Employee Details", {
						position: toast.POSITION.TOP_RIGHT,
						autoClose: 1500,
					});
					setTimeout(function () {
						props.onDelete();
					}, 2500);
				}
			});
		}
	};
	return (
		<div className="col-sm-4" style={{ marginBottom: "30px" }}>
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{props.name}</h5>
					<p className="card-text">Emp.Id: {props.id}</p>
					<p className="card-text">Email: {props.email}</p>
					<button
						type="button"
						className="btn btn-danger"
						onClick={DeleteHandler}
					>
						Delete
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};
