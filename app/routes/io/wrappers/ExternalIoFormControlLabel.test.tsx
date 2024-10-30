import { render, screen, waitFor } from "@testing-library/react";

import type { ExternalIoFormControlLabelProps } from "./ExternalIoFormControlLabel";
import { ExternalIoFormControlLabel } from "./ExternalIoFormControlLabel";
import type { UserEvent } from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";
import type { ChangeEvent} from "react";
import { useEffect, useState } from "react";
import type { Mock } from "vitest";

type SetExternalStateFnType = (
	event: ChangeEvent<HTMLInputElement>,
	checked: boolean,
	id: string,
	which?: string,
) => void;

interface TestEvironmentResultProps {
	user: UserEvent;
	setExternalState: Mock<SetExternalStateFnType>;
};

export const renderWithoutProvidersButWithState = (
	FormComponent: typeof ExternalIoFormControlLabel,
	props: Omit<ExternalIoFormControlLabelProps, "onExternalChange">,
) => {
	let setExternalState: Mock<SetExternalStateFnType> = vi.fn(() => { });
	function TestEnvironment() {
		const [value, setValue] = useState<boolean>(props.checked);
		useEffect(() => {
			console.log(value);
		}, [value]);

		setExternalState = vi.fn((event, checked, id, which) => setValue(checked));

		return (
			<FormComponent
				id={props.id}
				checked={value}
				onExternalChange={setExternalState}
			/>
		);
	}

	render(<TestEnvironment />);

	return {
		user: userEvent.setup(),
		setExternalState,
	} as TestEvironmentResultProps;
};

describe("ExternalIoFormControlLabel", it => {
	it("should initialize unchecked", async () => {
		const { setExternalState } = renderWithoutProvidersButWithState(
			ExternalIoFormControlLabel,
			{
				id: "idtext",
				checked: false,
			},
		);
		const externalioformcontrollabel = await screen.findByTestId("idtext-formcontrollabel");
		// await user.click(datepicker);
		// await user.click(externalioformcontrollabel);

		await waitFor(() => {
			expect(setExternalState).not.toBeCalled()
		});
		await waitFor(() => {
			expect(externalioformcontrollabel).not.toBeChecked();
		});
	});

	it("should be checkable", async () => {
		const { user, setExternalState } = renderWithoutProvidersButWithState(
			ExternalIoFormControlLabel,
			{
				id: "idtext",
				checked: false,
			},
		);
		const externalioformcontrollabel = await screen.findByTestId("idtext-formcontrollabel");
		// await user.click(datepicker);
		await user.click(externalioformcontrollabel);

		await waitFor(() => {
			expect(setExternalState).toBeCalled()
		});
		await waitFor(() => {
			expect(externalioformcontrollabel).toBeChecked();
		});
	});

	// it("should NOT accept any other character", async () => {
	// 	const { user, setExternalState } = renderWithoutProvidersButWithState(
	// 		ExternalIoFormControlLabel,
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

