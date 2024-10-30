import type { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import type { DateValidationError } from "@mui/x-date-pickers";
import { DateField } from "@mui/x-date-pickers";
import type { FieldChangeHandlerContext } from "@mui/x-date-pickers/internals";
import type { IoInputProps, PickerStateType } from "../../types/types";

interface IoDatePickerProps {
	id: string;
	label: string;
	onHandleChange: (
		value: string | null,
		id: string,
	) => void;
};

// three date types: valid and in range, valid but out of range, invalid
export function IoDatePicker({
	id,
	label,
	onHandleChange,
}: IoDatePickerProps) {
	const [value, setValue] = useState<PickerStateType>({
		value: null,
		validationError: null,
	});

	const inputProps: IoInputProps = useMemo(() => {
		return {
			"data-testid": `${id ? id : "lolz"}-datepicker`,
		};
	}, [id]);

	// only values in range or null should be passed to external state
	// NOTE: @mui/x-date-pickers sends null or full dayjs obj depending on error type,
	//		so checking validationError important. doc generation shouldn't be given valid but out of range dates
	useEffect(() => {
		if (value.validationError === null || value.validationError === "invalidDate") {
			// console.log(value.value)
			const val = value.value === null ? null : value.value.format('MM/DD/YYYY')
			onHandleChange(val, id)
		}
	}, [id, onHandleChange, value]);

	// value still needs to be displayed, in range or not
	// NOTE: effect required to avoid updating external state with every change
	//		every keystroke triggers change, would induce lag.
	const onChange = (
		value: Dayjs | null,
		context: FieldChangeHandlerContext<DateValidationError>
	) => {
		setValue({
			value: value,
			validationError: context.validationError,
		});
	};

	return (
		<DateField
			inputProps={inputProps}
			value={value.value}
			label={label}
			size="small"
			onChange={onChange}
			sx={{
				marginBottom: "16px",
			}}
		/>
	);
};
