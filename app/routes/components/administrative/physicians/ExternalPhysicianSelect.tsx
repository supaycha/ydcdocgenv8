import type {
	FocusEventHandler,
	SyntheticEvent} from 'react';
import {
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

import type { PhysicianType } from '../../../types/types';

interface ExternalPhysicianSelectProps {
	id: string;
	value: PhysicianType | null;
	physicians: PhysicianType[];
	onHandleChange: (
		event: SyntheticEvent<Element, Event>,
		value: PhysicianType,
		id: string,
	) => void;
};

export function ExternalPhysicianSelect({
	id,
	value,
	physicians,
	onHandleChange
}: ExternalPhysicianSelectProps) {
	const [internalValue, setInternalValue] = useState<PhysicianType | null>(() => {
		return value === null ? null : value;
	});
	const [inputValue, setInputValue] = useState<string | undefined>('');

	const onChange = (
		_event: SyntheticEvent<Element, Event>,
		internalValue: PhysicianType | null,
		_reason: AutocompleteChangeReason,
		_details?: AutocompleteChangeDetails<PhysicianType>
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
			value={internalValue}
			onChange={onChange}
			inputValue={inputValue}
			onInputChange={onInputChange}
			onBlur={onBlur}
			id={id}
			options={physicians}
			getOptionLabel={(option: PhysicianType) => option.label}
			sx={{
				width: 250,
			}}
			renderInput={(props) =>
				<TextField
					{...props}
					inputProps={{
						...props.inputProps,
					}}
					label="Name"
				/>
			}
		/>
	);
};
