import type { FocusEvent, ChangeEvent} from 'react';
import { useState, useMemo } from 'react';
import { Box, TextField } from '@mui/material'
import type { IoInputProps } from '../../types/types';

interface IoTextFieldProps {
	id: string,
	label: string,
	onHandleChange: (
		value: string,
		id: string,
		error?: boolean,
	) => void,
};

export function IoTextField({
	id,
	label,
	onHandleChange,
}: IoTextFieldProps) {
	const [value, setValue] = useState("");
	const [error, setError] = useState(true);

	const inputProps: IoInputProps = useMemo(() => {
		return {
			"data-testid": `${id ? id : "lolz"}-textfield`,
		};
	}, [id]);

	const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newValue = event.target.value;
		if (!(/^\d+$/.test(newValue))) {
			setError(false);
			setValue(newValue);
		}
		else {
			setError(true);
		};
		// if (newValue.length === 0) {
		// 	setError(true);
		// 	setValue(newValue);
		// }
		// else {
		// 	setError(false);
		// 	setValue(newValue);
		// };
	};

	const onBlur = (_event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		onHandleChange(error ? "" : value, id, error);
	};

	return (
		<Box
			component="form"
			sx={{
				'& > :not(style)': {
					width: '25ch',
				},
			}}

			autoComplete="off"
		>
			<TextField
				inputProps={inputProps}
				id={id}
				label={label}
				size="small"
				value={value}
				error={error}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</Box>
	);
};
