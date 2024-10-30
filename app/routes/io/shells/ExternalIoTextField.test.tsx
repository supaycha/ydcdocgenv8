import { render, screen, waitFor } from "@testing-library/react";

import { ExternalIoTextField } from "./ExternalIoTextField";
import type { UserEvent } from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";
import type { ElementType} from "react";
import { useState } from "react";
import type { Mock } from "vitest";

interface TestEvironmentResultProps {
	user: UserEvent;
	setExternalState: Mock<(value: string, id: string) => void>;
}

export const renderWithoutProvidersButWithState = (
	FormComponent: ElementType,
	props: { value: string | (() => string); id: any; label: any; }
) => {
	let setExternalState: Mock<(value: string, id: string) => void> = vi.fn(() => { });;
	function TestEnvironment() {
		const [value, setValue] = useState<string>(props.value);
		// useEffect(() => {
		// 	console.log(value);
		// }, [value]);
		setExternalState = vi.fn((value: string, id: string) => setValue(value));

		return (
			<FormComponent
				id={props.id}
				label={props.label}
				value={value}
				setExternalState={setExternalState}
			/>
		);
	}

	render(<TestEnvironment />);

	return {
		user: userEvent.setup(),
		setExternalState,
	} as TestEvironmentResultProps;
};


describe("ExternalIoTextField", it => {
	it("should NOT accept numbers", async () => {
		const { user, setExternalState } = renderWithoutProvidersButWithState(
			ExternalIoTextField,
			{
				id: "idtext",
				label: "labeltext",
				value: "",
			},
		);
		const textfield = await screen.findByTestId("idtext-textfield");

		await user.click(textfield);
		await user.type(textfield, "123");

		await waitFor(() => {
			expect(setExternalState).toBeCalledTimes(0);
		});
		await waitFor(() => {
			expect(textfield).toHaveValue("");
		});
	});

	it("should accept any other character", async () => {
		const { user, setExternalState } = renderWithoutProvidersButWithState(
			ExternalIoTextField,
			{
				id: "idtext",
				label: "labeltext",
				value: "",
			},
		);
		const textfield = await screen.findByTestId("idtext-textfield");

		await user.click(textfield);
		await user.type(textfield, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=~`<>?:\"{{}_+|,./;'[[]-=\\");

		await waitFor(() => {
			expect(setExternalState).toBeCalled();
		});

		// expected result will not have repeating {} or [], those doubles are needed for user.type to function properly
		await waitFor(() => {
			expect(textfield).toHaveValue("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=~`<>?:\"{}_+|,./;'[]-=\\");
		});
	});
})

