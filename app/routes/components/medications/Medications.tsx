import type { ChangeEvent, SyntheticEvent } from 'react';
import { useCallback } from 'react';
import {
	FormLabel,
	FormControl,
	FormGroup,
	Grid,
	Stack,
	Collapse,
} from '@mui/material';

import { ExternalIoFormControlLabel } from '../../io/wrappers/ExternalIoFormControlLabel';
import { ExternalIoSelect } from '../../io/shells/ExternalIoSelect';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import { selectMedications, setCheckbox, setSelection } from './medicationsSlice';


interface MedicationsProps {
};

// eslint-disable-next-line no-empty-pattern
export function Medications({
}: MedicationsProps) {
	const allMedications = useAppSelector(selectMedications);
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

	const displayValueChanged = (
		_event: SyntheticEvent<Element, Event>,
		newInputValue: string,
		id: string,
		_index: number,
	) => {
		dispatch(
			setSelection({
				type: "setSelection",
				id: id,
				value: newInputValue,
			})
		);
	};

	return (
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
				Choose medications:
			</FormLabel>
			<FormGroup>
				{allMedications.map(medication => {
					return (
						<Grid
							key={medication.id}
							item
						>
							<Stack
								direction="row"
							>
								<ExternalIoFormControlLabel
									id={medication.id}
									checked={medication.checked}
									onExternalChange={handleCheckbox}
								/>
								<Collapse
									orientation="horizontal"
									in={medication.checked}
									unmountOnExit
								>
									<Stack
										direction="row"
									>
										<ExternalIoSelect
											id={medication.id}
											label={medication.label}
											value={medication.selectedoption}
											options={medication.options}
											onHandleChange={(_event, newInputValue, id) =>
												displayValueChanged(_event, newInputValue, id, 0)}
										/>
									</Stack>
								</Collapse>
							</Stack>
						</Grid>
					);
				})}
			</FormGroup>
		</FormControl>
	);
};
