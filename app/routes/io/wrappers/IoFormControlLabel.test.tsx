import { render, screen, waitFor } from "@testing-library/react";

import { IoFormControlLabel } from "./IoFormControlLabel";
import type { UserEvent } from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";
import type { ChangeEvent} from "react";
import { useEffect, useState } from "react";
import type { Mock } from "vitest";
import type { IoFormControlLabelProps } from "./IoFormControlLabel";

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
	FormComponent: typeof IoFormControlLabel,
	props: Omit<IoFormControlLabelProps, "onExternalChange">,
) => {
	let setExternalState: Mock<SetExternalStateFnType> = vi.fn(() => { });
	function TestEnvironment() {
		const [value, setValue] = useState<boolean>(false);
		useEffect(() => {
			console.log(value);
		}, [value]);

		setExternalState = vi.fn((event, checked) => setValue(checked));

		return (
			<FormComponent
				id={props.id}
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

describe("IoFormControlLabel", it => {
	it("should initialize unchecked", async () => {
		const { setExternalState } = renderWithoutProvidersButWithState(
			IoFormControlLabel,
			{
				id: "idtext",
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
			IoFormControlLabel,
			{
				id: "idtext",
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
	// 		IoFormControlLabel,
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

