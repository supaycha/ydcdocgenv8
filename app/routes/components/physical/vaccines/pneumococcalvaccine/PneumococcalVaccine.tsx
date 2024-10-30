import type { Dayjs } from 'dayjs';
import type { MouseEvent, ChangeEvent } from 'react';
import { useCallback } from 'react';
import { FormControl, FormGroup } from '@mui/material';

import type { AgeRangeType } from '../../../../types/types';

import { PageConditions } from './PageConditions';
import { PageVacVersions } from './PageVacVersions';
import { useAppDispatch, useAppSelector } from '../../../../storage/hooks';
import { selectDOB } from '../../../administrative/demographics/demographicsSlice';
import {
	selectPneumococcalVaccine,
	addVaccineVersions,
	removeVaccineVersions,
	toggleWhichVaccineVersion,
	setCheckboxRiskConditions,
	setDateReceived,
} from './pneumococcalvaccinesSlice';

interface PneumococcalVaccineProps {
};

// eslint-disable-next-line no-empty-pattern
export function PneumococcalVaccine({
}: PneumococcalVaccineProps) {
	const pneumococcalVaccine = useAppSelector(selectPneumococcalVaccine);
	const dateOfBirth = useAppSelector(selectDOB);
	const dispatch = useAppDispatch();

	const handleAddVaccineVersion = useCallback((
		_event: MouseEvent<HTMLButtonElement>,
	) => {
		dispatch(
			addVaccineVersions({
				type: "addVaccineVersions",
				dob: dateOfBirth,
			})
		)
	},
		[
			dispatch,
			dateOfBirth,
		]
	);

	const handleRemoveVaccineVersion = useCallback((
		_event: MouseEvent<HTMLButtonElement>,
		localVaccineCopyVersionId: number,
	) => {
		dispatch(
			removeVaccineVersions({
				type: "removeVaccineVersions",
				dob: dateOfBirth,
				id: localVaccineCopyVersionId,
			})
		);
	},
		[
			dispatch,
			dateOfBirth,
		]
	);

	const handleToggleWhichVaccineVersion = useCallback((
		_event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
		value: string,
		localVaccineCopyVersionId: number,
	) => {
		dispatch(
			toggleWhichVaccineVersion({
				type: "toggleWhichVaccineVersion",
				dob: dateOfBirth,
				id: localVaccineCopyVersionId,
				value: value,
			})
		);
	},
		[
			dispatch,
			dateOfBirth,
		]
	);
	const handleCheckboxRiskConditions = useCallback((
		event: ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => {
		dispatch(
			setCheckboxRiskConditions({
				type: "setCheckboxRiskConditions",
				dob: dateOfBirth,
				ageRange: pneumococcalVaccine.ageRange,
				eventName: event.target.name,
				checkboxChecked: checked,
			})
		);
	},
		[
			dispatch,
			dateOfBirth,
			pneumococcalVaccine.ageRange,
		]
	);

	// currently, this event handler only updates vacversion datereceived
	// - i need to know which dose to update the dateReceived of, meaning i need a unique id, index good enough?
	const handleDateReceived = useCallback((
		value: {
			value: Dayjs | null,
			validationError: string | null,
		},
		id: number,
	) => {
		dispatch(
			setDateReceived({
				type: "setDateReceived",
				dob: dateOfBirth,
				id: id,
				value: value.value,
			})
		);
	},
		[
			dispatch,
			dateOfBirth,
		]
	);

	return (
		<FormControl
			sx={{
				overflow: "auto",
				width: "100%"
			}}
			component="fieldset"
			variant="standard"
		>
			<FormGroup>
				<PageVacVersions // must be first page since risk conditions become a factor based on vaccine selection
					localVaccineCopyVersions={pneumococcalVaccine.versions}
					handleAddVaccineVersion={handleAddVaccineVersion}
					handleRemoveVaccineVersion={handleRemoveVaccineVersion}
					handleToggleWhichVaccineVersion={handleToggleWhichVaccineVersion}
					handleDateReceived={handleDateReceived}
				/>
				<PageConditions
					allRiskConditions={(pneumococcalVaccine[pneumococcalVaccine.ageRange] as AgeRangeType).riskConditions}
					handleCheckboxRiskConditions={handleCheckboxRiskConditions}
				/>
			</FormGroup>
		</FormControl>
	);
};
