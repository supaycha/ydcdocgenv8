import dayjs from 'dayjs';
import type { MouseEvent, ChangeEvent } from 'react';
import { useCallback } from 'react';
import {
	FormControl,
	Collapse,
	RadioGroup,
	FormControlLabel,
	Radio,
	Stack,
} from '@mui/material';

import type { GroupedScreeningIndivType } from '../../types/types';

import { IoLinkedDates } from '../../io/wrappers/IoLinkedDates';
import { IoToggleButtonGroup } from '../../io/wrappers/IoToggleButtonGroup';
import { ExternalIoFormControlLabel } from '../../io/wrappers/ExternalIoFormControlLabel';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import {
	setCheckbox,
	setScreeningInGroup,
	toggleDateDueModifier,
	setDateReceivedinGroup,
	setDateDueInGroup,
	setLinkChecked,
	selectAGroupedScreening
} from './groupedscreeningsSlice'

interface GroupedScreeningProps {
	// group: GroupedScreeningIndivType;
	id: string;
};

export function GroupedScreening({
	id,
}: GroupedScreeningProps) {
	const groupedScreening = useAppSelector(state => selectAGroupedScreening(state, id));
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

	const handleRadioButtonChange = useCallback((
		_event: ChangeEvent<HTMLInputElement>,
		id: string,
		groupId: string,
	) => {
		dispatch(
			setScreeningInGroup({
				type: "setScreeningInGroup",
				id: id,
				parent: groupId,
			})
		);

	}, [dispatch])

	const handleToggleButtonChange = useCallback((
		_event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
		value: string,
		screeningId: string,
		groupId?: string,
	) => {
		dispatch(
			toggleDateDueModifier({
				type: "toggleDateDueModifier",
				id: screeningId,
				value: value,
				parent: groupId!,
			})
		);
	}, [dispatch]);

	const handleDateReceived = useCallback((
		value: string | null,
		id: string,
		parent: string,
	) => {
		// console.count("GroupedScreening.handleDateReceived")
		dispatch(
			setDateReceivedinGroup({
				type: "setDateReceivedinGroup",
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
		// console.count("GroupedScreening.handleDateDue")
		dispatch(
			setDateDueInGroup({
				type: "setDateDueInGroup",
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
			key={groupedScreening!.id}
		>
			<ExternalIoFormControlLabel
				id={groupedScreening!.id}
				checked={groupedScreening!.checked}
				onExternalChange={handleCheckbox}
			/>
			<Collapse
				orientation="horizontal"
				in={groupedScreening!.checked}
				unmountOnExit
			>
				<FormControl>
					<RadioGroup
						name={groupedScreening!.id}
						value={groupedScreening!.radioButtonValue}
						onChange={(event, value) =>
							handleRadioButtonChange(event, value, groupedScreening!.id)}
					>
						{groupedScreening!.radioOptions
							.map(screening => {
								return (
									<Stack
										direction="row"
										key={screening.id}
									>
										<FormControlLabel
											value={screening.id}
											control={<Radio size="small" />}
											label={screening.id}
										/>
										<IoLinkedDates
											id={groupedScreening!.id}
											subId={screening.id}
											// externalDateReceived={dayjs(screening.dateReceived)}
											// externalDateDue={dayjs(screening.dateDue)}
											// externallinkChecked={screening.linkChecked}
											handleDateReceived={handleDateReceived}
											handleDateDue={handleDateDue}
											handleLinkChecked={handleLinkChecked}
											slot2={
												<Collapse
													sx={{ marginLeft: 2 }}
													orientation="horizontal"
													in={groupedScreening!.checked &&
														(groupedScreening!.radioButtonValue === screening.id)}
													unmountOnExit
												>
													<IoToggleButtonGroup
														// screeningOrDiagnostic={screening}
														id={screening.id}
														parentid={groupedScreening!.id}
														onHandleChange={handleToggleButtonChange}
													/>
												</Collapse>
											}
										/>
									</Stack>
								);
							})
						}
					</RadioGroup>
				</FormControl>
			</Collapse>
		</Stack>
	);
};
