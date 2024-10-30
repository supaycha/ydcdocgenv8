import { render, screen, waitFor, within } from "@testing-library/react";

import { ExternalIoSelect } from "./ExternalIoSelect";
import type { UserEvent } from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";
import type { ElementType, SyntheticEvent } from "react";
import { useState } from "react";
import type { Mock } from "vitest";

interface TestEvironmentResultProps {
	user: UserEvent;
	setExternalState: Mock<(
		event: SyntheticEvent<Element, Event>,
		value: string,
		id: string,
	) => void>;
}

export const renderWithoutProvidersButWithState = (
	FormComponent: ElementType,
	props: {
		id: string;
		label: string;
		value: string | null;
		options: string[];
	},
) => {
	let setExternalState: Mock<(
		event: SyntheticEvent<Element, Event>,
		value: string,
		id: string,
	) => void> = vi.fn(() => { });

	function TestEnvironment() {
		const [value, setValue] = useState<string | null>(props.value);
		// useEffect(() => {
		// 	console.log(value);
		// }, [value]);
		setExternalState = vi.fn((
			event: SyntheticEvent<Element, Event>,
			value: string,
			id: string,
		) => setValue(value));

		return (
			<FormComponent
				id={props.id}
				label={props.label}
				value={value}
				options={props.options}
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

describe("ExternalIoSelect", it => {
	it("should select a valid option", async () => {
		const { user, setExternalState } = renderWithoutProvidersButWithState(
			ExternalIoSelect,
			{
				id: "idtext",
				label: "labeltext",
				value: null,
				options: ["hello", "1", "2"],
			},
		);
		const combobox = await screen.findByRole("combobox");
		await user.click(combobox);

		const listbox = await screen.findByRole("listbox");
		
		await user.selectOptions(listbox, ["2"]);
		// await user.tab();
		expect(combobox).toHaveValue("2");
	});

	// it("should NOT accept any other character", async () => {
	// 	const { user, setExternalState } = renderWithoutProvidersButWithState(
	// 		ExternalIoSelect,
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
});
