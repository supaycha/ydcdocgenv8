import type { MouseEvent } from "react";
import { useCallback } from "react";
import {
	FormControl,
	ToggleButtonGroup,
	ToggleButton,
	Collapse,
} from "@mui/material";


import type { SocialDrugHistoryLegalIndivType } from "../../../types/types";
import { useAppDispatch } from "../../../storage/hooks";
import { ExternalIoNumberField } from "../../../io/shells/ExternalIoNumberField";
import { setNum, setToggleButtonGroup } from "./socialdrughistorySlice";

interface SocialDrugHistoryQuestionLegalProps {
	questionsGroup: SocialDrugHistoryLegalIndivType; // used to be a subtype when subtypes was the unneccessary level between parent structure and child data
};

export function SocialDrugHistoryQuestionLegal({
	questionsGroup,
}: SocialDrugHistoryQuestionLegalProps) {
	const dispatch = useAppDispatch();

	const onHandleToggleButtonGroupChange = useCallback((
		event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
		value: string,
		id: string,
	) => {
		dispatch(
			setToggleButtonGroup({
				type: "setToggleButtonGroup",
				id: id,
				value: value,
			})
		);
	},
		[
			dispatch
		]
	);

	const onHandleTextFieldChange = useCallback((
		value: string,
		id: string,
	) => {
		dispatch(
			setNum({
				type: "setNum",
				parentId: questionsGroup.id,
				id: id,
				value: value,
			})
		);
	},
		[
			dispatch,
			questionsGroup.id,
		]
	);

	return (
		<>
			<FormControl
				size="small"
			>
				<ToggleButtonGroup
					size="small"
					value={questionsGroup.toggleButtonValue}
					exclusive
					onChange={(event, value) =>
						onHandleToggleButtonGroupChange(event, value, questionsGroup.id)}
				>
					{questionsGroup.toggleOptions
						.map(tOption => {
							return (
								<ToggleButton
									key={tOption.id}
									value={tOption.id}
								>
									{tOption.id}
								</ToggleButton>
							);
						})
					}
				</ToggleButtonGroup>
			</FormControl>
			<Collapse
				in={questionsGroup.toggleButtonValue !== "NEVER USED"}
				timeout="auto"
				unmountOnExit
			>
				<ExternalIoNumberField
					id={questionsGroup.timesperday.id}
					label={questionsGroup.timesperday.label}
					value={questionsGroup.timesperday.value.toString()}
					setExternalState={onHandleTextFieldChange}
				/>
			</Collapse>
			<Collapse
				in={questionsGroup.toggleButtonValue !== "NEVER USED"}
				timeout="auto"
				unmountOnExit
			>
				<ExternalIoNumberField
					id={questionsGroup.timesperyear.id}
					label={questionsGroup.timesperyear.label}
					value={questionsGroup.timesperyear.value.toString()}
					setExternalState={onHandleTextFieldChange}
				/>
			</Collapse>
		</>
	);
};
