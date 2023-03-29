import logo from "../../../src/Logo.jpg";
import brokenMachine from "../../../src/BrokenMachine.png";

export const Error404Page = () => {
	return (
		<div style={{ minHeight: "95vh", marginRight: "0px" }} className="row ">
			<div style={{ marginLeft: "20%", marginTop: "8%" }} className="col">
				<img src={logo} className="rounded" alt="" width={200} />
				<div style={{ marginLeft: "2%" }}>
					<h1>Error 404</h1>
					<h3 style={{ color: "grey" }}>The requested URL was not found </h3>
					<h3 style={{ color: "grey" }}>on this server</h3>
				</div>
			</div>
			<div className="col" style={{ marginTop: "8%" }}>
				<img src={brokenMachine} alt="" height={400} />
			</div>
		</div>
	);
};
