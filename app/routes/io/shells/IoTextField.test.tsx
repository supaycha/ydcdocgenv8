import { render, screen, waitFor } from "@testing-library/react";

import { IoTextField } from "./IoTextField";
import type { UserEvent } from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";
import type { ElementType } from "react";
import { useEffect, useState } from "react";
import type { Mock } from "vitest";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type SetExternalStateFnType = (
	value: string,
	id: string,
	error?: boolean,
) => void;

interface TestEvironmentResultProps {
	user: UserEvent;
	setExternalState: Mock<SetExternalStateFnType>;
};

export const renderWithoutProvidersButWithState = (
	FormComponent: ElementType,
	props: { id: string; label: string; },
) => {
	let setExternalState: Mock<SetExternalStateFnType> = vi.fn(() => { });
	function TestEnvironment() {
		const [value, setValue] = useState<string>("");
		useEffect(() => {
			console.log(value);
		}, [value]);

		setExternalState = vi.fn((value) => setValue(value));

		return (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<FormComponent
					id={props.id}
					label={props.label}
					value={value}
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

describe("IoTextField", it => {
	it("should NOT accept numbers", async () => {
		const { user } = renderWithoutProvidersButWithState(
			IoTextField,
			{
				id: "idtext",
				label: "labeltext",
			},
		);
		const textfield = await screen.findByTestId("idtext-textfield");
		await user.type(textfield, "123");
		await user.tab();
		// expected result will not have repeating {} or [], those doubles are needed for user.type to function properly
		await waitFor(() => {
			// expect(setExternalState).toHaveLastReturnedWith("");
			expect(textfield).toHaveValue("");
		});
	});

	it("should accept any other character", async () => {
		const { user, setExternalState } = renderWithoutProvidersButWithState(
			IoTextField,
			{
				id: "idtext",
				label: "labeltext",
			},
		);
		const textfield = await screen.findByTestId("idtext-textfield");
		await user.type(textfield, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=~`<>?:\"{{}_+|,./;'[[]-=\\");
		await user.tab();
		await waitFor(() => {
			expect(setExternalState).toBeCalled();
			// expect(textfield).toHaveValue("");
		});
		// expected result will not have repeating {} or [], those doubles are needed for user.type to function properly
		await waitFor(() => {
			expect(textfield).toHaveValue("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=~`<>?:\"{}_+|,./;'[]-=\\");
		});
	});

	// it("should NOT accept any other character", async () => {
	// 	const { user, setExternalState } = renderWithoutProvidersButWithState(
	// 		IoTextField,
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

