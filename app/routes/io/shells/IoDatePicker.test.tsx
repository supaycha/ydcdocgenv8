import type { Dayjs } from "dayjs";

import type { ElementType } from "react";
import { useEffect, useState } from "react";

import { render, screen, waitFor } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";

import { IoDatePicker } from "./IoDatePicker";
import userEvent from "@testing-library/user-event";
import type { Mock } from "vitest";
import type { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";
import { LocalizationProvider, type DateValidationError } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { PickerStateType } from "../../types/types";

interface TestEvironmentResultProps {
	user: UserEvent;
	setExternalState: Mock<(value: string | null, id: string) => void>;
};

export const renderWithoutProvidersButWithState = (
	FormComponent: ElementType,
	props: { id: string; label: string; },
) => {
	let setExternalState: Mock<(value: string | null, id: string) => void> = vi.fn(() => { });
	function TestEnvironment() {
		const [value, setValue] = useState<string | null>(null);
		useEffect(() => {
			console.log(value);
		}, [value]);
		setExternalState =
			vi.fn((value: string | null, id: string) => setValue(value));

		return (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<FormComponent
					id={props.id}
					label={props.label}
					onHandleChange={setExternalState}
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

describe("IoDatePicker", it => {
	it("should accept standard date", async () => {
		const { user, setExternalState } = renderWithoutProvidersButWithState(
			IoDatePicker,
			{
				id: "idtext",
				label: "labeltext",
			},
		);

		const datepicker = await screen.findByTestId("idtext-datepicker");
		await user.type(datepicker, "12/22/1992");
		await user.keyboard("Tab");

		await waitFor(() => {
			expect(setExternalState).toBeCalled()
		});
		await waitFor(() => {
			expect(datepicker).toHaveValue("12/22/1992");
		});
	});
});
