import type { MouseEvent } from 'react';
import { FormControl, ToggleButtonGroup, ToggleButton } from '@mui/material'
import type { SingleScreeningIndivType, RadioOptionsIndivType, GroupedScreeningIndivType } from '../../types/types';
import { createSelector } from '@reduxjs/toolkit';
import { selectASingleDiagnostic } from '../../components/conditionsanddiseases/diagnostics/diagnosticsSlice';
import { selectASingleScreening } from '../../components/screenings/singlescreeningsSlice';
import type { RootState } from '../../storage/store';
import { selectAGroupedScreening } from '../../components/screenings/groupedscreeningsSlice';
import { useAppSelector } from '../../storage/hooks';
import { selectAToggledScreening } from '../../components/screenings/toggledscreeningsSlice';

export const selectSingleScreeningorSingleDiagnosticorToggledScreening = createSelector(
	[
		(state: RootState) => state,
		(state: RootState, id: string | undefined) => selectAToggledScreening(state, id),
		(state: RootState, id: string | undefined, type: string | undefined) => selectASingleScreening(state, id, type),
		(state: RootState, id: string | undefined, type: string | undefined) => selectASingleDiagnostic(state, id, type),
	],
	(state, toggledscreening, singlescreening, singlediagnostic) => {
		if (toggledscreening !== undefined) {
			return toggledscreening;
		}
		else if (singlescreening !== undefined) {
			return singlescreening;
		}
		else {
			return singlediagnostic;
		};
	},
);

export const selectGroupedScreeningorOther = createSelector(
	[
		(state: RootState) => state,
		(state: RootState, id: string, parentId: string | undefined) => id,
		(state: RootState, id: string, parentId: string | undefined) => selectAGroupedScreening(state, parentId),
		(state: RootState, id: string, parentId: string | undefined, type: string | undefined) => type,		
	],
	(state, id, group, type) => {
		if (group === undefined) {
			return selectSingleScreeningorSingleDiagnosticorToggledScreening(state, id, type);
		}
		else {
			return group.radioOptions.filter(r => r.id === id)[0];
		}
	}
)

// toggle - id
// group - parentid, id
// single screening - id
// single diagnostic - id
export type IoToggleButtonGroupProps = {
	// screeningOrDiagnostic: SingleScreeningIndivType | RadioOptionsIndivType;
	// group?: GroupedScreeningIndivType;
	id: string;
	parentid?: string;
	type?: "screening" | "diagnostic";
	onHandleChange: (
		event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
		value: string,
		id: string,
		parentId?: string,
	) => void,
};

export function IoToggleButtonGroup({
	// screeningOrDiagnosticId,
	// group,
	id,
	parentid,
	type,
	onHandleChange,
}: IoToggleButtonGroupProps) {
	const screeningOrDiagnostic = useAppSelector(state => selectGroupedScreeningorOther(state, id, parentid, type));
	return (
		<FormControl
			size="small"
		>
			<ToggleButtonGroup
				size="small"
				value={screeningOrDiagnostic!.toggleButtonValue}
				exclusive
				onChange={(event, value) =>
					onHandleChange(event, value, id, parentid)}
			>
				{screeningOrDiagnostic!.toggleOptions
					.map(tOption => {
						return (
							<ToggleButton
								key={tOption.id}
								value={tOption.id}
							>
								{tOption.id}
							</ToggleButton>
						);
					})
				}
			</ToggleButtonGroup>
		</FormControl>
	);
};
