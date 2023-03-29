import { LoginForm } from "./LoginForm";

export const LoginModal = () => {
	return (
		<div>
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header" style={{ background: "#9ed7ba" }}>
							<h3 className="modal-title" id="exampleModalLabel">
								Login
							</h3>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								id="closeButton"
							></button>
						</div>
						<div className="modal-body">
							<LoginForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
