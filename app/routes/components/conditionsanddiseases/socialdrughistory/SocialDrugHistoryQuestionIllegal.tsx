import type { MouseEvent, ChangeEvent } from "react";
import { useCallback } from "react";
import {
	FormControl,
	ToggleButtonGroup,
	ToggleButton,
	Collapse,
} from "@mui/material";
import { useAppDispatch } from "../../../storage/hooks";
import { ExternalIoFormControlLabel } from "../../../io/wrappers/ExternalIoFormControlLabel";
import type { SocialDrugHistoryIllegalIndivType } from "../../../types/types";
import { setCheckbox, setToggleButtonGroup } from "./socialdrughistorySlice";

interface SocialDrugHistoryQuestionIllegalProps {
	questionsGroup: SocialDrugHistoryIllegalIndivType; // used to be a subtype when subtypes was the unneccessary level between parent structure and child data
};

export function SocialDrugHistoryQuestionIllegal({
	questionsGroup,
}: SocialDrugHistoryQuestionIllegalProps) {
	const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	console.log(questionsGroup);
	// }, [questionsGroup])

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

	const handleCheckbox = useCallback((
		_event: ChangeEvent<HTMLInputElement>,
		checked: boolean,
		id: string,
		_which?: string,
	) => {
		dispatch(
			setCheckbox({
				type: "setCheckbox",
				parentId: questionsGroup.id,
				id: id,
				value: checked,
			})
		);
	}, [
		dispatch,
		questionsGroup.id,
	]);

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
				<ExternalIoFormControlLabel
					id={questionsGroup.attemptedrehab.id}
					checked={questionsGroup.attemptedrehab.value}
					onExternalChange={handleCheckbox}
					which="checked"
				/>
			</Collapse>
			<Collapse
				in={questionsGroup.toggleButtonValue !== "NEVER USED"}
				timeout="auto"
				unmountOnExit
			>
				<ExternalIoFormControlLabel
					id={questionsGroup.hospitalized.id}
					checked={questionsGroup.hospitalized.value}
					onExternalChange={handleCheckbox}
					which="checked"
				/>
			</Collapse>
		</>
	);
};
