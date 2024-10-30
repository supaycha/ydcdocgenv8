import type { Dayjs } from "dayjs";
import { useMemo } from "react";

import type { DateValidationError } from "@mui/x-date-pickers";
import { DateField } from "@mui/x-date-pickers";
import type { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";

import type { IoInputProps, PickerStateType } from "../../types/types";

export type ExternalIoDatePickerProps = {
	label: string;
	value: Dayjs | null;
	readOnly?: boolean;
	setExternalState: (
		value: PickerStateType,
	) => void;
	id?: string;
};

export function ExternalIoDatePicker({
	label,
	value,
	readOnly,
	setExternalState,
	id,
}: ExternalIoDatePickerProps) {
	const inputProps: IoInputProps = useMemo(() => {
		return {
			"data-testid": `${id ? id : "lolz"}-datepicker`,
		};
	}, [id]);

	const onChange = (value: Dayjs | null, context: FieldChangeHandlerContext<DateValidationError>) => {
		setExternalState({
			value: value,
			validationError: context.validationError,
		});
	};

	return (
		<DateField
			inputProps={inputProps}
			label={label}
			value={value}
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
