import { render, screen, waitFor } from "@testing-library/react";

import { IoToggleButtonGroup } from "./IoToggleButtonGroup";
import type { UserEvent } from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";
import type { ChangeEvent , MouseEvent } from "react";
import { useEffect, useState } from "react";
import type { Mock } from "vitest";
import type { IoToggleButtonGroupProps } from "./IoToggleButtonGroup";
import type { SingleScreeningIndivType } from "../../types/types";

type SetExternalStateFnType = (
	event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
	value: string,
	id: string,
	parentId?: string,
) => void;

interface TestEvironmentResultProps {
	user: UserEvent;
	setExternalState: Mock<SetExternalStateFnType>;
};

export const renderWithoutProvidersButWithState = (
	FormComponent: typeof IoToggleButtonGroup,
	props: Omit<IoToggleButtonGroupProps, "onHandleChange">,
) => {
	let setExternalState: Mock<SetExternalStateFnType> = vi.fn(() => { });
	function TestEnvironment() {
		const [value, setValue] = useState<string | undefined>("");
		useEffect(() => {
			console.log(value);
		}, [value]);

		setExternalState = vi.fn((event, value, id, parentId) => setValue(parentId));

		return (
			<FormComponent
				// screeningOrDiagnostic={props.screeningOrDiagnostic}
				// group={props.group}
				id={props.id}
				parentid={props.parentid}
				onHandleChange={setExternalState}
			/>
		);
	}

	render(<TestEnvironment />);

	return {
		user: userEvent.setup(),
		setExternalState,
	} as TestEvironmentResultProps;
};

describe("IoToggleButtonGroup", it => {
	it("should initialize unchecked", async () => {
		const { setExternalState } = renderWithoutProvidersButWithState(
			IoToggleButtonGroup,
			{
				// screeningOrDiagnostic: {} as SingleScreeningIndivType,
				// group: undefined,
				id: "",
				parentid: "",
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

	// it("should be checkable", async () => {
	// 	const { user, setExternalState } = renderWithoutProvidersButWithState(
	// 		IoToggleButtonGroup,
	// 		{
	// 			screeningOrDiagnostic: {} as SingleScreeningIndivType,
	// 			group: undefined,
	// 		},
	// 	);
	// 	const externalioformcontrollabel = await screen.findByTestId("idtext-formcontrollabel");
	// 	// await user.click(datepicker);
	// 	await user.click(externalioformcontrollabel);

	// 	await waitFor(() => {
	// 		expect(setExternalState).toBeCalled()
	// 	});
	// 	await waitFor(() => {
	// 		expect(externalioformcontrollabel).toBeChecked();
	// 	});
	// });

	// it("should NOT accept any other character", async () => {
	// 	const { user, setExternalState } = renderWithoutProvidersButWithState(
	// 		IoToggleButtonGroup,
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

