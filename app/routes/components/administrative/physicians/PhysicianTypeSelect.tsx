import type {
	SyntheticEvent} from 'react';
import {
	useEffect,
	useState,
} from 'react';

import type {
	AutocompleteChangeDetails,
	AutocompleteChangeReason,
	AutocompleteInputChangeReason,
} from '@mui/material';
import {
	Autocomplete,
	TextField,
} from '@mui/material';

// import { PhysicianType } from '../../data/types';

interface PhysicianTypeSelectProps {
	id: string;
	physicianTypes: string[];
	onHandleChange: (
		// event: SyntheticEvent<Element, Event>,
		value: string,
		id: string,
	) => void;
};

export function PhysicianTypeSelect({
	id,
	physicianTypes,
	onHandleChange
}: PhysicianTypeSelectProps) {
	const [value, setValue] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState<string | undefined>('');

	useEffect(() => {
		if (value !== null) {
			onHandleChange(value!, id);
		};
	}, [id, onHandleChange, value])

	const onChange = (
		_event: SyntheticEvent<Element, Event>,
		value: string | null,
		_reason: AutocompleteChangeReason,
		_details?: AutocompleteChangeDetails<string>
	) => {
		setValue(value);
	};

	const onInputChange = (
		_event: SyntheticEvent<Element, Event>,
		value: string | boolean,
		_reason: AutocompleteInputChangeReason
	) => {
		setInputValue(value as string | undefined);
	};

	// const onBlur: FocusEventHandler<HTMLDivElement> = (event) => {
	// 	onHandleChange(event, value!, id);
	// };

	return (
		<Autocomplete
			disablePortal
			size="small"
			value={value}
			onChange={onChange}
			inputValue={inputValue}
			onInputChange={onInputChange}
			// onBlur={onBlur}
			id={id}
			options={physicianTypes}
			// getOptionLabel={(option: PhysicianType) => option.label}
			getOptionLabel={(option) => option}
			sx={{
				width: 250,
			}}
			renderInput={(props) =>
				<TextField
					{...props}
					inputProps={{
						...props.inputProps,
					}}
					label="Physician Type"
				/>
			}
		/>
	);
};
