import { render, screen, waitFor } from "@testing-library/react";

import { ExternalIoNumberField } from "./ExternalIoNumberField";
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

describe("ExternalIoNumberField", it => {
	it("should accept numbers", async () => {
		const { user, setExternalState } = renderWithoutProvidersButWithState(
			ExternalIoNumberField,
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
			expect(setExternalState).toBeCalled()
		});
		await waitFor(() => {
			expect(textfield).toHaveValue("123");
		});
	});

	it("should NOT accept any other character", async () => {
		const { user, setExternalState } = renderWithoutProvidersButWithState(
			ExternalIoNumberField,
			{
				id: "idtext",
				label: "labeltext",
				value: "",
			},
		);
		const textfield = await screen.findByTestId("idtext-textfield");

		await user.click(textfield);
		await user.type(textfield, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=~`<>?:\"{{}}_+|,./;'[[]]-=\\");

		await waitFor(() => {
			expect(setExternalState).toBeCalledTimes(0);
		});
		await waitFor(() => {
			expect(textfield).toHaveValue("");
		});
	});
})

