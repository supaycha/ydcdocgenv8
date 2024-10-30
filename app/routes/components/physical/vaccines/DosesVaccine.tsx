import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import {
	Stack,
	Collapse,
} from '@mui/material';

import type { DosesVaccineIndivType } from '../../../types/types';

import { IoDatePicker } from '../../../io/shells/IoDatePicker';
import { IoFormControlLabel } from '../../../io/wrappers/IoFormControlLabel';
import { ExternalIoFormControlLabel } from '../../../io/wrappers/ExternalIoFormControlLabel';
import { useAppDispatch } from '../../../storage/hooks';
import { setCheckbox, setDateReceived } from './dosesvaccinesSlice';

interface DosesVaccineProps {
	vaccine: DosesVaccineIndivType;
};

export function DosesVaccine({
	vaccine,
}: DosesVaccineProps) {
	const dispatch = useAppDispatch();

	const handleCheckbox = useCallback(
		(event: ChangeEvent<HTMLInputElement>, checked: boolean, parent: string) => {
			dispatch(
				setCheckbox({
					type: "setCheckbox",
					id: event.target.name,
					value: checked,
					parent: parent,
				})
			);
		}, [dispatch])

	const handleDateReceived = (
		value: string | null,
		id: string,
		parent: string,
	) => {
		// console.count(`hnadledatereceived: ${value}`)
		dispatch(
			setDateReceived({
				type: "setDateReceived",
				id: id,
				value: value,
				parent: parent,
			})
		);
	};

	// const onHandleErrorChange = useCallback((error: number) => {
	// 	console.debug(error)
	// }, []);

	return (
		<>
			<ExternalIoFormControlLabel
				id={vaccine.id}
				checked={vaccine.checked}
				which="checked"
				onExternalChange={(event, checked, _id, _which) =>
					handleCheckbox(event, checked, vaccine.id)}
			/>
			{vaccine.doses.map(dose => {
				return (
					<Collapse
						key={dose.id}
						orientation="horizontal"
						in={vaccine.checked}
						unmountOnExit
					>
						<Stack
							direction="row"
						>
							<IoFormControlLabel
								id={dose.id}
								which={dose.id}
								onExternalChange={(event, checked, _id, _which) =>
									handleCheckbox(event, checked, vaccine.id)}
							/>
							<Collapse
								orientation="vertical"
								in={dose.checked}
								unmountOnExit
							>
								<IoDatePicker
									id={dose.id}
									label="Date Received"
									onHandleChange={(value, id) =>
										handleDateReceived(value, id, vaccine.id)}
								// onHandleErrorChange={onHandleErrorChange}
								/>
							</Collapse>
						</Stack>
					</Collapse>
				)
			})}
		</>
	);
};
