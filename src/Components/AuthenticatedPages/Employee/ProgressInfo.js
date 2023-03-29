export const ProgressInfo = () => {
	return (
		<div>
			<form
				className="col-3 border border-2"
				style={{
					marginLeft: "53%",
					marginTop: "6.5%",
					borderRadius: "10px",
				}}
			>
				<div style={{ marginLeft: "20px", marginTop: "20px" }}>
					<h6>Instructions for setting progress</h6>
					<ul>
						<li>Set an integer from 0 to 5</li>
						<li>0 means not started yet</li>
						<li>1 means 20% completed</li>
						<li>2 means 40% completed</li>
						<li>3 means 60% completed</li>
						<li>4 means 80% completed</li>
						<li>5 means 100% completed</li>
					</ul>
				</div>
			</form>
		</div>
	);
};
