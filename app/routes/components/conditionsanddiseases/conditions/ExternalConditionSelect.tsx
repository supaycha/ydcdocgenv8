import {
	FocusEventHandler,
	SyntheticEvent,
	useState
} from 'react';

import {
	Autocomplete,
	AutocompleteChangeDetails,
	AutocompleteChangeReason,
	AutocompleteInputChangeReason,
	TextField,
} from '@mui/material';

interface ExternalConditionSelectProps {
	id: string;
	value: string | boolean | null;
	conditions: string[];
	onHandleChange: (
		event: SyntheticEvent<Element, Event>,
		value: string | boolean,
		id: string,
	) => void;
};

export function ExternalConditionSelect({
	id,
	value,
	conditions,
	onHandleChange,
}: ExternalConditionSelectProps) {
	const [internalValue, setInternalValue] = useState<string | boolean | null>(() => {
		return value === null ? null : value;
	});
	const [inputValue, setInputValue] = useState<string | undefined>('');

	const onChange = (
		_event: SyntheticEvent<Element, Event>,
		internalValue: string | null,
		_reason: AutocompleteChangeReason,
		_details?: AutocompleteChangeDetails<string> | undefined
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
		onHandleChange(event, internalValue as string, id);
	};

	return (
		<Autocomplete
			disablePortal
			size="small"
			value={internalValue as string | null}
			onChange={onChange}
			inputValue={inputValue}
			onInputChange={onInputChange}
			onBlur={onBlur}
			id={id}
			options={conditions}
			sx={{ width: 300 }}
			renderInput={(params) =>
				<TextField
					{...params}
					label="Name"
				/>
			}
		/>
	);
};
