import { render, RenderOptions, screen, waitFor } from "@testing-library/react";

import { IoLinkedDates } from "./IoLinkedDates";
import type { UserEvent } from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import type { Mock } from "vitest";
import type { IoLinkedDatesProps } from "./IoLinkedDates";
import { Provider } from "react-redux";
import type { AppStore } from "../../storage/store";
import { makeStore, RootState } from "../../storage/store";
import { Collapse } from "@mui/material";
import { IoToggleButtonGroup } from "./IoToggleButtonGroup";
import { useAppSelector } from "../../storage/hooks";
import { selectASingleScreening } from "../../components/screenings/singlescreeningsSlice";

type HandleDateReceivedFnType = (
	value: string | null,
	id: string,
	parent: string,
) => void;

type HandleDateDueFnType = (
	value: string | null,
	id: string,
	parent: string,
) => void;

type HandleLinkCheckedFnType = (
	value: boolean,
	id: string,
	parent: string,
) => void;

type HandleToggleButtonChangeFnType = (
	_event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
	value: string,
	screeningId: string,
) => void;

interface TestEvironmentResultProps {
	localStore: AppStore;
	user: UserEvent;
	handleDateReceived: Mock<HandleDateReceivedFnType>;
	handleDateDue: Mock<HandleDateDueFnType>;
	handleLinkChecked: Mock<HandleLinkCheckedFnType>;
};

export const renderWithProvidersAndState = (
	FormComponent: typeof IoLinkedDates,
	props: Omit<IoLinkedDatesProps, "handleDateReceived" | "handleDateDue" | "handleLinkChecked">,
	// extendedRenderOptions: ExtendedRenderOptions = {}
) => {
	let handleDateReceived: Mock<HandleDateReceivedFnType> = vi.fn(() => { });
	let handleDateDue: Mock<HandleDateDueFnType> = vi.fn(() => { });
	let handleLinkChecked: Mock<HandleLinkCheckedFnType> = vi.fn(() => { });
	let handleToggleButtonChange: Mock<HandleToggleButtonChangeFnType> = vi.fn(() => { });

	const localStore = makeStore();

	function TestEnvironment() {
		const singleScreening = useAppSelector(state => selectASingleScreening(state, props.id, "singlescreening"));
		const [dateReceived, setDateReceived] = useState<string | null>(null);
		const [dateDue, setDateDue] = useState<string | null>(null);
		const [linkChecked, setLinkChecked] = useState<boolean>(false);
		const [toggleButtonChange, setToggleButtonChange] = useState<string | null>(null);
		useEffect(() => {
			console.log("dateReceived: ", dateReceived);
		}, [dateReceived]);

		useEffect(() => {
			console.log("dateDue: ", dateDue);
		}, [dateDue]);

		useEffect(() => {
			console.log("linkChecked: ", linkChecked);
		}, [linkChecked]);

		handleDateReceived = vi.fn((value, id, parent) => setDateReceived(value));
		handleDateDue = vi.fn((value, id, parent) => setDateDue(value));
		handleLinkChecked = vi.fn((value, id, parent) => setLinkChecked(value));
		handleToggleButtonChange = vi.fn((event, value, screeningId) => setToggleButtonChange(value));

		return (
			<Provider store={localStore}>
				<FormComponent
					id={props.id}
					type={props.type}
					// externalDateReceived={props.externalDateReceived}
					// externalDateDue={props.externalDateDue}
					// externallinkChecked={props.externallinkChecked}
					handleDateReceived={handleDateReceived}
					handleDateDue={handleDateDue}
					handleLinkChecked={handleLinkChecked}
					slot2={
						<Collapse
							sx={{ marginLeft: 2 }}
							orientation="horizontal"
							in={singleScreening!.checked}
							unmountOnExit
						>
							<IoToggleButtonGroup
								// screeningOrDiagnostic={singleScreening}
								id={singleScreening!.id}
								type="screening"
								onHandleChange={handleToggleButtonChange}
							/>
						</Collapse>
					}
				/>
			</Provider>
		);
	}

	render(<TestEnvironment />);

	return {
		localStore,
		user: userEvent.setup(),
		handleDateReceived,
		handleDateDue,
		handleLinkChecked,
	} as TestEvironmentResultProps;
};

describe("IoLinkedDates", it => {
	it("should render single screening data", async () => {
		const { handleDateReceived, handleDateDue, handleLinkChecked } = renderWithProvidersAndState(
			IoLinkedDates,
			{
				id: "Lung Cancer (CT)",
				type: "singlescreening"
			}
		);
		const externalioformcontrollabel = await screen.findByTestId("Lung Cancer (CT)-formcontrollabel");

		// await user.click(datepicker);
		// await user.click(externalioformcontrollabel);

		await waitFor(() => {
			expect(handleDateReceived).not.toBeCalled()
		});
		// await waitFor(() => {
		// 	expect(externalioformcontrollabel).not.toBeChecked();
		// });
	});

	// it("should be checkable", async () => {
	// 	const { user, setExternalState } = renderWithoutProvidersButWithState(
	// 		IoLinkedDates,
	// 		{
	// 			id: "idtext",
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
	// 		IoLinkedDates,
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

