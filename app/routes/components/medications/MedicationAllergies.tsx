import type { ChangeEvent } from 'react';
import { Fragment, useCallback } from 'react';
import {
	FormLabel,
	FormControl,
	FormGroup,
} from '@mui/material';

import { ExternalIoFormControlLabel } from '../../io/wrappers/ExternalIoFormControlLabel';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import { selectMedicationAllergies, setCheckbox } from './medicationAllergiesSlice';

export function MedicationAllergies(
) {
	const allMedications = useAppSelector(selectMedicationAllergies);
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

	return (
		<>
			<FormControl
				sx={{
					overflow: "auto",
					width: "100%"
				}}
				component="fieldset"
				variant="standard"
			>
				<FormLabel
					component="legend"
				>
					Choose medication allergies:
				</FormLabel>
				<FormGroup>
					{allMedications.map(medication => {
						return (
							<Fragment
								key={medication.id}
							>
								<ExternalIoFormControlLabel
									id={medication.value} // NOT label, as that comes from breaking down init json
									checked={medication.checked}
									onExternalChange={handleCheckbox}
								/>
							</Fragment>
						);
					})}
				</FormGroup>
			</FormControl>
		</>
	);
};
