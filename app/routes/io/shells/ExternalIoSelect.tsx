import type { FocusEventHandler, SyntheticEvent } from 'react'
import { useState } from 'react'

import type { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason } from '@mui/material'
import { Autocomplete, TextField } from '@mui/material'

interface ExternalIoSelectProps {
	id: string;
	label: string;
	value: string | null;
	options: string[];
	onHandleChange: (
		event: SyntheticEvent<Element, Event>,
		value: string,
		id: string,
	) => void;
};

export function ExternalIoSelect({
	id,
	label,
	value,
	options,
	onHandleChange,
}: ExternalIoSelectProps) {
	const [internalValue, setInternalValue] = useState<string | null>(() => {
		return value === null ? null : value;
	});
	const [inputValue, setInputValue] = useState<string | undefined>('');

	const onChange = (
		_event: SyntheticEvent<Element, Event>,
		internalValue: string | null,
		_reason: AutocompleteChangeReason,
		_details?: AutocompleteChangeDetails<string>
	) => {
		setInternalValue(internalValue);
	};

	const onInputChange = (
		_event: SyntheticEvent<Element, Event>,
		inputValue: string | boolean,
		_reason: AutocompleteInputChangeReason
	) => {
		setInputValue(inputValue as string | undefined);
	};
	
	const onBlur: FocusEventHandler<HTMLDivElement> = (event) => {
		onHandleChange(event, internalValue!, id);
	};

	return (
		<Autocomplete
			disablePortal
			size="small"
			value={value as string | null}
			onChange={onChange}
			inputValue={inputValue}
			onInputChange={onInputChange}
			onBlur={onBlur}
			id={id}
			options={options}
			sx={{ width: 300 }}
			renderInput={(params) =>
				<TextField
					{...params}
					label={label}
				/>
			}
		/>
	);
};
