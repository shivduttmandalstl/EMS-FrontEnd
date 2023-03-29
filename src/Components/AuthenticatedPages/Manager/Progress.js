import { useEffect, useState } from "react";

export const Progress = (props) => {
	const [width, setWidth] = useState("0%");
	useEffect(() => {
		if (props.prog === 0) {
			setWidth("0%");
		} else if (props.prog === 1) {
			setWidth("20%");
		} else if (props.prog === 2) {
			setWidth("40%");
		} else if (props.prog === 3) {
			setWidth("60%");
		} else if (props.prog === 4) {
			setWidth("80%");
		} else if (props.prog === 5) {
			setWidth("100%");
		}
	}, [props.prog]);

	return (
		<div>
			<div
				className="progress"
				style={{ border: "solid", borderWidth: "1px", height: "20px" }}
			>
				<div
					className="progress-bar "
					role="progressbar"
					aria-valuenow="75"
					aria-valuemin="0"
					aria-valuemax="100"
					style={{ width: width }}
				>
					{width}
				</div>
			</div>
		</div>
	);
};
