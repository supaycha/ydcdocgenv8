import type { MouseEvent, ChangeEvent } from 'react';
import { useCallback } from 'react';
import { Collapse, Stack } from '@mui/material'

import type { RadioOptionsIndivType } from '../../types/types';

import { IoDatePicker } from '../../io/shells/IoDatePicker';
import { IoFormControlLabel } from '../../io/wrappers/IoFormControlLabel';
import { IoLinkedDates } from '../../io/wrappers/IoLinkedDates';
import { IoToggleButtonGroup } from '../../io/wrappers/IoToggleButtonGroup';
import dayjs from 'dayjs';
import { ExternalIoFormControlLabel } from '../../io/wrappers/ExternalIoFormControlLabel';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import {
	selectAToggledScreening,
	setCheckbox,
	setDateDue,
	setDatePerformed,
	setDateReceived,
	setLinkChecked,
	toggleDateDueModifier
} from './toggledscreeningsSlice'


interface ToggledScreeningProps {
	// screening: ToggleScreeningIndivType;
	id: string;
};

export function ToggledScreening({
	id,
}: ToggledScreeningProps) {
	const toggledScreening = useAppSelector(state => selectAToggledScreening(state, id));
	const dispatch = useAppDispatch();

	const handleCheckbox = useCallback((
		_event: ChangeEvent<HTMLInputElement>,
		checked: boolean,
		id: string,
		which?: string
	) => {
		dispatch(
			setCheckbox({
				type: "setCheckbox",
				id: id,
				value: checked,
				which: which!,
			})
		);
	}, [dispatch])

	const handleToggleButtonChange = (
		_event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
		value: string,
		screeningId: string,
	) => {
		dispatch(
			toggleDateDueModifier({
				type: "toggleDateDueModifier",
				id: screeningId,
				value: value,
			})
		);

	};

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

	const handleDatePerformed = (
		value: string | null,
		id: string,
		parent: string,
	) => {
		dispatch(
			setDatePerformed({
				type: "setDatePerformed",
				id: id,
				value: value,
				parent: parent,
			})
		);
	};

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
			key={toggledScreening.id}
		>
			<ExternalIoFormControlLabel
				id={toggledScreening.id}
				checked={toggledScreening.checked}
				onExternalChange={handleCheckbox}
				which="checked"
			/>
			<Collapse
				orientation="horizontal"
				in={toggledScreening.checked}
				unmountOnExit
			>
				<IoLinkedDates
					id={toggledScreening.id}
					// externalDateReceived={dayjs(toggledScreening.dateReceived)}
					// externalDateDue={dayjs(toggledScreening.dateDue)}
					// externallinkChecked={toggledScreening.linkChecked}
					handleDateReceived={handleDateReceived}
					handleDateDue={handleDateDue}
					handleLinkChecked={handleLinkChecked}
					slot2={
						<Collapse
							sx={{ marginLeft: 2 }}
							orientation="horizontal"
							in={toggledScreening.checked}
							unmountOnExit
						>
							<IoToggleButtonGroup
								// screeningOrDiagnostic={(toggledScreening as unknown as RadioOptionsIndivType)}
								id={toggledScreening.id}
								onHandleChange={handleToggleButtonChange}
							/>
						</Collapse>
					}
					slot4={
						<>
							<Collapse
								orientation="horizontal"
								in={(toggledScreening.checked) &&
									(toggledScreening.toggleButtonValue === "HYSTERECTOMY")}
								unmountOnExit
							>
								<IoFormControlLabel
									id="dateUnknown"
									which="dateUnknown"
									onExternalChange={(
										event: ChangeEvent<HTMLInputElement>,
										checked: boolean,
										id: string,
										which?: string,
									) =>
										handleCheckbox(event, checked, toggledScreening.id, which)}
								/>
							</Collapse>
							<Collapse
								orientation="horizontal"
								in={(toggledScreening.checked) &&
									(toggledScreening.toggleButtonValue === "HYSTERECTOMY") &&
									(toggledScreening.dateUnknown === false)}
								unmountOnExit
							>
								<IoDatePicker
									id={toggledScreening.id}
									label="Date Performed"
									onHandleChange={(value, id) =>
										handleDatePerformed(value, id, toggledScreening.id)}
								/>
							</Collapse>
						</>
					}
				/>
			</Collapse>
		</Stack>
	);
};
