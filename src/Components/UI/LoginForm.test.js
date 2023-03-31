import { LoginForm } from "./LoginForm";
import { render, screen } from "@testing-library/react";

describe("LoginFrom component", () => {
	test("email placeholder in the document", () => {
		render(<LoginForm />);
		const email = screen.getByPlaceholderText("Enter Your Email ID");
		expect(email).toBeInTheDocument();
	});

	test("password label in the document", () => {
		render(<LoginForm />);
		const password = screen.getByLabelText("Password*");
		expect(password).toBeInTheDocument();
	});

	test("role component in the document", () => {
		const component = render(<LoginForm />);
		const childElement = component.getByText("Select your Role");
		expect(childElement).toBeInTheDocument();
	});

	test("find 2 buttons in the document", () => {
		render(<LoginForm />);
		const buttonList = screen.getAllByRole("button");
		expect(buttonList).toHaveLength(2);
	});
});
