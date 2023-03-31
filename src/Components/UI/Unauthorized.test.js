import { render, screen } from "@testing-library/react";
import { Unauthorized } from "./Unauthorized";

test("Unauthorized text in the document", () => {
	render(<Unauthorized />);
	const unauth = screen.getByText("You are Unauthorized to access this page");
	expect(unauth).toBeInTheDocument();
});
