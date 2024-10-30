import type { Dayjs } from "dayjs";
import { useMemo } from "react";

import type { TimeValidationError } from "@mui/x-date-pickers";
import { TimeField } from "@mui/x-date-pickers";
import type { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";

import type { IoInputProps } from "../../types/types";

import type { PickerStateType } from "../../types/types";

export type ExternalIoTimePickerProps = {
	label: string;
	value: Dayjs | null;
	readOnly?: boolean;
	setExternalState: (
		value: PickerStateType,
	) => void;
	id?: string;
};

export function ExternalIoTimePicker({
	label,
	value,
	readOnly,
	setExternalState,
	id,
}: ExternalIoTimePickerProps) {
	const inputProps: IoInputProps = useMemo(() => {
		return {
			"data-testid": `${id ? id : "lolz"}-timepicker`,
		};
	}, [id]);

	const onChange = (value: Dayjs | null, context: FieldChangeHandlerContext<TimeValidationError>) => {
		// console.log(`ExternalIoTimePicker.onChange (before if statement): ${value}`)
		if (context.validationError === null || context.validationError === "invalidDate") {
			// console.log(`ExternalIoTimePicker.onChange (context.validationError === null || context.validationError === "invalidDate"): ${value}`)
			setExternalState({
				value: value,
				validationError: context.validationError,
			});
		};
	};

	return (
		<TimeField
			inputProps={inputProps}
			label={label}
			value={value}
			// timepicker needs to be fixed or this wont be a feature i guess
			// the only way this could work is you switch between uncontrolled and controlled somehow?
			// timefield should have a way for it to internally verify validity
			// autocomplete works with how ive validated incomplete values because it had in inputvalue set and value set to distinguish between valid and invalid data
			size="small"
			readOnly={readOnly ? readOnly : false} // logically denotes readonly
			onChange={onChange}
			slotProps={{
				textField: {
					disabled: readOnly ? readOnly : false // visually denotes readonly
				}
			}}
		/>
	);
};
