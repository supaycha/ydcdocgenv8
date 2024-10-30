import { screen, waitFor } from "@testing-library/react";

import { Appointments } from "./Appointments";
import { renderWithProviders } from "../../../utils/test-utils";
import dayjs from "dayjs";

describe("Appointments", it => {
	it('starts with init placeholder values', async () => {
		const { user } = renderWithProviders(
			<Appointments />
		);
		const drodate = await screen.findByTestId("Dr Olga Appointment-datepicker");
		const drotime = await screen.findByTestId("Dr Olga Appointment-timepicker");
		const labdate = await screen.findByTestId("Lab Appointment-datepicker");
		const labtime = await screen.findByTestId("Lab Appointment-timepicker");
		await waitFor(() => {
			expect(drodate).toHaveValue("MM/DD/YYYY");
		});
		await waitFor(() => {
			expect(drotime).toHaveValue("hh:mm aa");
		});
		await waitFor(() => {
			expect(labdate).toHaveValue("MM/DD/YYYY");
		});
		await waitFor(() => {
			expect(labtime).toHaveValue("hh:mm aa");
		});
	});

	it('should except valid date and time values', async () => {
		const { user } = renderWithProviders(
			<Appointments />
		);
		const drodate = await screen.findByTestId("Dr Olga Appointment-datepicker");
		await user.type(drodate, "01/12/1992");
		await user.keyboard("Tab");
		await waitFor(() => {
			expect(drodate).toHaveValue("01/12/1992");
		});

		const drotime = await screen.findByTestId("Dr Olga Appointment-timepicker");
		await user.type(drotime, "11:23 PM");
		// await user.keyboard("Tab");

		await waitFor(() => {
			expect(drotime).toHaveValue("11:23 PM");
		});

		const labdate = await screen.findByTestId("Lab Appointment-datepicker");
		await user.type(labdate, "12/22/1992");
		await user.keyboard("Tab");
		await waitFor(() => {
			expect(labdate).toHaveValue("12/22/1992");
		});

		const labtime = await screen.findByTestId("Lab Appointment-timepicker");
		await user.type(labtime, "11:00 AM");
		// await user.keyboard("Tab");
		await waitFor(() => {
			expect(labtime).toHaveValue("11:00 AM");
		});
	});
});
