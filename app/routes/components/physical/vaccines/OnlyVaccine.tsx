import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import {
	Collapse,
	Stack,
} from '@mui/material';

import type { OnlyVaccineIndivType } from '../../../types/types';

import { IoDatePicker } from '../../../io/shells/IoDatePicker';
import { ExternalIoFormControlLabel } from '../../../io/wrappers/ExternalIoFormControlLabel';
import { useAppDispatch } from '../../../storage/hooks';
import { setCheckbox, setDateReceived } from './onlyvaccinesSlice';

interface OnlyVaccineProps {
	vaccine: OnlyVaccineIndivType
};

export function OnlyVaccine({
	vaccine,
}: OnlyVaccineProps) {
	const dispatch = useAppDispatch();

	const handleCheckbox = useCallback(
		(event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
			dispatch(
				setCheckbox({
					type: "setCheckbox",
					id: event.target.name,
					value: checked,
				})
			);
		}, [dispatch]
	);

	const handleDateReceived = (
		value: string | null,
		id: string,
	) => {
		dispatch(
			setDateReceived({
				type: "setDateReceived",
				id: id,
				value: value,
			})
		);
	};

	return (
		<Stack
			direction="row"
			key={vaccine.id}
		>
			<ExternalIoFormControlLabel
				id={vaccine.id}
				checked={vaccine.checked}
				onExternalChange={handleCheckbox}
			/>
			<Collapse
				orientation="horizontal"
				in={vaccine.checked}
				unmountOnExit
			>
				<IoDatePicker
					id={vaccine.id}
					label="Date Received"
					onHandleChange={handleDateReceived}
				/>
			</Collapse>
		</Stack>
	);
};
