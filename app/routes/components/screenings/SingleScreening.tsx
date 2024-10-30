import type { MouseEvent, ChangeEvent } from 'react';
import { useCallback } from 'react';
import { Collapse, Stack } from '@mui/material'

import type { SingleScreeningIndivType } from '../../types/types';

import { IoLinkedDates } from '../../io/wrappers/IoLinkedDates';
import { IoToggleButtonGroup } from '../../io/wrappers/IoToggleButtonGroup';
import dayjs from 'dayjs';
import { ExternalIoFormControlLabel } from '../../io/wrappers/ExternalIoFormControlLabel';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import {
	setCheckbox,
	toggleDateDueModifier,
	setLinkChecked,
	setDateReceived,
	setDateDue,
	selectASingleScreening
} from './singlescreeningsSlice'

interface SingleScreeningProps {
	id: string;
};

export function SingleScreening({
	id,
}: SingleScreeningProps) {
	const singleScreening = useAppSelector(state => selectASingleScreening(state, id, "singlescreening"));
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
			key={singleScreening!.id}
		>
			<ExternalIoFormControlLabel
				id={singleScreening!.id}
				checked={singleScreening!.checked}
				onExternalChange={handleCheckbox}
			/>
			<Collapse
				orientation="horizontal"
				in={singleScreening!.checked}
				unmountOnExit
			>
				<IoLinkedDates
					id={singleScreening!.id}
					type="singlescreening"
					// externalDateReceived={dayjs(singleScreening.dateReceived)}
					// externalDateDue={dayjs(singleScreening.dateDue)}
					// externallinkChecked={singleScreening.linkChecked}
					handleDateReceived={handleDateReceived}
					handleDateDue={handleDateDue}
					handleLinkChecked={handleLinkChecked}
					slot2={
						<Collapse
							sx={{ marginLeft: 2 }}
							orientation="horizontal"
							in={singleScreening!.checked}
							unmountOnExit
						>
							<IoToggleButtonGroup
								// screeningOrDiagnostic={singleScreening}
								id={singleScreening!.id}
								type="screening"
								onHandleChange={handleToggleButtonChange}
							/>
						</Collapse>
					}
				/>
			</Collapse>
		</Stack>
	);
};
