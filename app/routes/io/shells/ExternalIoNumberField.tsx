import type { ChangeEvent } from 'react';
import { useMemo } from 'react';
import { Box, TextField } from '@mui/material';
import type { IoInputProps } from '../../types/types';

export interface ExternalIoNumberFieldProps {
	id: string,
	label: string,
	value: string,
	setExternalState: (
		value: string,
		id: string,
	) => void;
};

export function ExternalIoNumberField({
	id,
	label,
	value,
	setExternalState,
}: ExternalIoNumberFieldProps) {
	const inputProps: IoInputProps = useMemo(() => {
		return {
			"data-testid": `${id ? id : "lolz"}-textfield`,
		};
	}, [id]);

	const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newValue = event.target.value;
		if (/^\d+$/.test(newValue)) {
			setExternalState(newValue, id);
		};
	};

	return (
		<Box
			component="form"
			sx={{
				'& > :not(style)': { width: '25ch' },
				margin: 0,
			}}
			autoComplete="off"
		>
			<TextField
				inputProps={inputProps}
				id={id}
				label={label}
				variant="filled"
				value={value}
				onChange={onChange}
			/>
		</Box>
	);
};
