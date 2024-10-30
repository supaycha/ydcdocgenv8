import { screen, waitFor } from "@testing-library/react";

import { SingleScreening } from "./SingleScreening";
import { renderWithProviders } from "../../utils/test-utils";
// import dayjs from "dayjs";

describe("SingleScreening", it => {
	it('starts with init placeholder values', async () => {
		renderWithProviders(
			<SingleScreening
				id="Diabetes"
			/>
		);
	
		const topcheckbox = await screen.findByTestId("Diabetes-formcontrollabel");
		await waitFor(() => {
			expect(topcheckbox).not.toBeChecked();
		});
		// const doe = await screen.findByTestId("dateOfEstablishment-datepicker");
		// const dob = await screen.findByTestId("dateOfBirth-datepicker");
		// const antf = await screen.findByTestId("accountNum-textfield");
		// await waitFor(() => {
		// 	expect(doe).toHaveValue("MM/DD/YYYY");
		// });
		// await waitFor(() => {
		// 	expect(dob).toHaveValue("MM/DD/YYYY");
		// });
		// await waitFor(() => {
		// 	expect(antf).toHaveValue("");
		// });
	});

	it('should except valid date and number values', async () => {
		const { user } = renderWithProviders(
			<SingleScreening
				id="Diabetes"
			/>
		);

		const topcheckbox = await screen.findByTestId("Diabetes-formcontrollabel");
		await user.click(topcheckbox);
		await waitFor(() => {
			expect(topcheckbox).not.toBeChecked();
		});
		// screen.debug();
		// const doe = await screen.findByTestId("dateOfEstablishment-datepicker");
		// await user.type(doe, "01/12/1992");
		// await user.keyboard("Tab");
		// await waitFor(() => {
		// 	expect(doe).toHaveValue("01/12/1992");
		// });

		// const dob = await screen.findByTestId("dateOfBirth-datepicker");
		// await user.type(dob, "01/12/1992");
		// // await user.keyboard("Tab");
		// await waitFor(() => {
		// 	expect(dob).toHaveValue("01/12/1992");
		// });

		// const antf = await screen.findByTestId("accountNum-textfield");
		// await user.type(antf, "123");
		// await user.keyboard("Tab");
		// await waitFor(() => {
		// 	expect(antf).toHaveValue("123");
		// });
	});
});
