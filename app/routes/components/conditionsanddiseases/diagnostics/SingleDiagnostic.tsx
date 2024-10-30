import dayjs from 'dayjs';
import type { MouseEvent, ChangeEvent } from 'react';
import { useCallback } from 'react';
import { Collapse, Stack } from '@mui/material'

import type { DiagnosticsIndivType, SingleScreeningIndivType } from '../../../types/types';
import { ExternalIoFormControlLabel } from '../../../io/wrappers/ExternalIoFormControlLabel';
import { IoLinkedDates } from '../../../io/wrappers/IoLinkedDates';
import { IoToggleButtonGroup } from '../../../io/wrappers/IoToggleButtonGroup';
import { useAppDispatch, useAppSelector } from '../../../storage/hooks';
import {
	selectASingleDiagnostic,
	setCheckbox,
	setDateDue,
	setDateReceived,
	setLinkChecked,
	toggleDateDueModifier
} from './diagnosticsSlice'

interface SingleDiagnosticProps {
	id: string;
};

export function SingleDiagnostic({
	id,
}: SingleDiagnosticProps) {
	const singleDiagnostic = useAppSelector(state => selectASingleDiagnostic(state, id, "diagnostic"));
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

	const handleToggleButtonChange = (
		_event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
		value: string,
		diagnosticId: string,
	) => {
		dispatch(
			toggleDateDueModifier({
				type: "toggleDateDueModifier",
				id: diagnosticId,
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
			key={singleDiagnostic!.id}
		>
			<ExternalIoFormControlLabel
				id={singleDiagnostic!.id}
				checked={singleDiagnostic!.checked}
				onExternalChange={handleCheckbox}
			/>
			<Collapse
				orientation="horizontal"
				in={singleDiagnostic!.checked}
				unmountOnExit
			>
				<IoLinkedDates
					id={(singleDiagnostic!.id)}
					type="diagnostic"
					// externalDateReceived={dayjs(singleDiagnostic.dateReceived)}
					// externalDateDue={dayjs(singleDiagnostic.dateDue)}
					// externallinkChecked={singleDiagnostic.linkChecked}
					handleDateReceived={handleDateReceived}
					handleDateDue={handleDateDue}
					handleLinkChecked={handleLinkChecked}
					slot2={
						<Collapse
							sx={{ marginLeft: 2 }}
							orientation="horizontal"
							in={singleDiagnostic!.checked}
							unmountOnExit
						>
							<IoToggleButtonGroup
								// screeningOrDiagnostic={(singleDiagnostic as SingleScreeningIndivType)}
								id={singleDiagnostic!.id}
								type="diagnostic"
								onHandleChange={handleToggleButtonChange}
							/>
						</Collapse>
					}
				/>
			</Collapse>
		</Stack>
	);
};
