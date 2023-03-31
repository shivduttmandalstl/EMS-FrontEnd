import { render, screen } from "@testing-library/react";
import { Error404Page } from "./Error404Page";

test("Unauthorized text in the document", () => {
	render(<Error404Page />);
	const errorPage = screen.getByText("Error 404");
	expect(errorPage).toBeInTheDocument();
});
