// import dayjs from 'dayjs';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { Collapse, Stack } from '@mui/material'

import type { BothVaccineIndivType } from '../../../types/types';

import { IoLinkedDates } from '../../../io/wrappers/IoLinkedDates';
import { ExternalIoFormControlLabel } from '../../../io/wrappers/ExternalIoFormControlLabel';
import { useAppDispatch, useAppSelector } from '../../../storage/hooks';
import {
	selectABothVaccine,
	setCheckbox,
	setDateDue,
	setDateReceived,
	setLinkChecked
} from './bothvaccinesSlice'

interface BothVaccineProps {
	id: string;
};

export function BothVaccine({
	id,
}: BothVaccineProps) {
	const bothVaccine = (useAppSelector(state => selectABothVaccine(state, id)) as BothVaccineIndivType);
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

	const handleDateReceived = useCallback((
		value: string | null,
		id: string,
		parent: string,
	) => {
		dispatch(
			setDateReceived({
				type: "setDateReceived",
				id: id,
				value: value,
				parent: parent,
			})
		);
	}, [dispatch]);

	const handleDateDue = useCallback((
		value: string | null,
		id: string,
		parent: string,

	) => {
		dispatch(
			setDateDue({
				type: "setDateDue",
				id: id,
				value: value,
				parent: parent,
			})
		);
	}, [dispatch]);

	const handleLinkChecked = useCallback((
		value: boolean,
		id: string,
		parent: string,
	) => {
		dispatch(
			setLinkChecked({
				type: "setLinkChecked",
				id: id,
				value: value,
				parent: parent,
			})
		);
	}, [dispatch]);

	return (
		<Stack
			direction="row"
			key={bothVaccine.id}
		>
			<ExternalIoFormControlLabel
				id={bothVaccine.id}
				checked={bothVaccine.checked}
				onExternalChange={handleCheckbox}
			/>
			<Collapse
				orientation="horizontal"
				in={bothVaccine.checked}
				unmountOnExit
			>
				<IoLinkedDates
					id={bothVaccine.id}
					// externalDateReceived={dayjs(bothVaccine.dateReceived)}
					// externalDateDue={dayjs(bothVaccine.dateDue)}
					// externallinkChecked={bothVaccine.linkChecked}
					handleDateReceived={handleDateReceived}
					handleDateDue={handleDateDue}
					handleLinkChecked={handleLinkChecked}
				/>
			</Collapse>
		</Stack>
	);
};
