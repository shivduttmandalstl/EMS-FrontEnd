import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Home Page tests", () => {
	test("render Home Page component in the document", () => {
		const component = render(<App />);
		const childElement = component.getByText("Employee Management System");
		expect(childElement).toBeInTheDocument();
	});

	test("render Login button in the document", () => {
		const component = render(<App />);
		const childElement = component.getByRole("button");
		expect(childElement).toBeInTheDocument();
	});

	test("render Image in the document", () => {
		const component = render(<App />);
		const childElement = component.getByRole("img");
		expect(childElement).toBeInTheDocument();
	});
});
