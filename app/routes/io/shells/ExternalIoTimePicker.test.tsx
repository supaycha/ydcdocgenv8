import { render, screen, waitFor } from "@testing-library/react";

import type { ExternalIoTimePickerProps } from "./ExternalIoTimePicker";
import { ExternalIoTimePicker } from "./ExternalIoTimePicker";
import type { UserEvent } from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";
import type { ElementType } from "react";
import { useEffect, useState } from "react";
import type { Mock } from "vitest";
import type { Dayjs } from "dayjs";
import type { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";
import type { TimeValidationError } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import type { PickerStateType } from "../../types/types";

type SetExternalStateFnType = (
	value: PickerStateType
) => void

interface TestEvironmentResultProps {
	user: UserEvent;
	setExternalState: Mock<SetExternalStateFnType>;
};

export const renderWithoutProvidersButWithState = (
	FormComponent: typeof ExternalIoTimePicker,
	props: Omit<ExternalIoTimePickerProps, "setExternalState">,
) => {
	let setExternalState: Mock<SetExternalStateFnType> = vi.fn(() => { });
	function TestEnvironment() {
		const [value, setValue] = useState<Dayjs | null>(props.value);
		// useEffect(() => {
		// 	console.log(value);
		// }, [value]);

		setExternalState = vi.fn(({ value, validationError }) => setValue(value));

		return (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<FormComponent
					id={props.id}
					label={props.label}
					value={dayjs(value, "hh:mm A")}
					setExternalState={setExternalState}
				/>
			</LocalizationProvider>
		);
	}

	render(<TestEnvironment />);

	return {
		user: userEvent.setup(),
		setExternalState,
	} as TestEvironmentResultProps;
};

describe("ExternalIoTimePicker", it => {
	it("should accept standard date", async () => {
		const { user, setExternalState } = renderWithoutProvidersButWithState(
			ExternalIoTimePicker,
			{
				id: "idtext",
				label: "labeltext",
				value: null,
			},
		);
		const timepicker = await screen.findByTestId("idtext-timepicker");
		// await user.click(timepicker);
		await user.type(timepicker, "01:23 AM");
		// await user.keyboard("Tab");

		await waitFor(() => {
			expect(setExternalState).toBeCalled()
		});
		await waitFor(() => {
			expect(timepicker).toHaveValue("01:23 AM");
		});
	});

	// it("should NOT accept any other character", async () => {
	// 	const { user, setExternalState } = renderWithoutProvidersButWithState(
	// 		ExternalIoTimePicker,
	// 		{
	// 			id: "idtext",
	// 			label: "labeltext",
	// 			value: "",
	// 		},
	// 	);
	// 	const textfield = await screen.findByTestId("idtext-textfield");

	// 	await user.click(textfield);
	// 	await user.type(textfield, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=~`<>?:\"{{}}_+|,./;'[[]]-=\\");

	// 	await waitFor(() => {
	// 		expect(setExternalState).toBeCalledTimes(0);
	// 	});
	// 	await waitFor(() => {
	// 		expect(textfield).toHaveValue("");
	// 	});
	// });
})

