import { render, screen } from "@testing-library/react";
import { AdminPage } from "./AdminPage";
import { AdminNavBar } from "./AdminNavBar";
import { AddNewEmployee } from "./AddNewEmployee";

describe("Admin Page component", () => {
	test("render Logout button in the document", async () => {
		render(<AdminPage />);
		const buttonList = await screen.findAllByRole("button");
		expect(buttonList).toHaveLength(1);
	});


});
