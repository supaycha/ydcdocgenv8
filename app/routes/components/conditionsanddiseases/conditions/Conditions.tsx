import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { ChangeEvent, SyntheticEvent, MouseEvent } from 'react'
import { useCallback } from 'react'
import {
	FormLabel,
	FormControl,
	FormGroup,
	Stack,
	Collapse,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Grid,
} from '@mui/material';


import { ExternalConditionSelect } from './ExternalConditionSelect';

// import ClearIcon from '@mui/icons-material/Clear';
import { ExternalIoDatePicker } from '../../../io/shells/ExternalIoDatePicker';
import { ExternalIoNumberField } from '../../../io/shells/ExternalIoNumberField';
import { ExternalIoFormControlLabel } from '../../../io/wrappers/ExternalIoFormControlLabel';
// import { IoAddPhysician } from '../../../io/wrappers/IoAddPhysician';
// import { IoModal } from '../../../io/wrappers/IoModal';
import { useAppDispatch, useAppSelector } from '../../../storage/hooks';
import {
	removePlannedInterventioninPhysicianType,
	removeTreatmentGoalinPhysicianType,
	selectConditions,
	setCheckbox,
	setConditionSelection,
	setHBA1CDate,
	setHBA1CValue
} from './conditionsSlice'

export function Conditions(
) {
	const conditions = useAppSelector(selectConditions);
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
	)

	const selectValueChanged = (
		_event: SyntheticEvent<Element, Event>,
		newInputValue: string | boolean,
		// newInputValue: string,
		id: string,
	) => {
		dispatch(
			setConditionSelection({
				type: "setConditionSelection",
				id: id,
				value: (newInputValue as string),
			})
		);
	};

	const handleRmoveTreatmentGoal = (_event: MouseEvent<HTMLButtonElement>, treatmentGoal: string, conditionId: string) => {
		dispatch(
			removeTreatmentGoalinPhysicianType({
				type: "removeTreatmentGoalinPhysicianType",
				id: conditionId,
				treatmentGoal: treatmentGoal,
			})
		);
	};

	const handleRmovePlannedIntervention = (_event: MouseEvent<HTMLButtonElement>, plannedIntervention: string, conditionId: string) => {
		dispatch(
			removePlannedInterventioninPhysicianType({
				type: "removePlannedInterventioninPhysicianType",
				id: conditionId,
				plannedIntervention: plannedIntervention,
			})
		);
	};
	// const onHandleExternalChange = (
	// 	value: string,
	// 	id: string,
	// ) => {
	// 	// const a = physicians.filter(p => p.id === value)[0].selections;
	// 	dispatch({
	// 		type: "setHBA1CValue",
	// 		id: id,
	// 		value: Number.isNaN(Number(value)) ? 0 : Number(value),
	// 	});
	// 	// setSelectedPhysicianNameObjs(physicians.filter(p => p.id === value)[0].physicians);
	// };

	const handleHBA1CValueChange = (
		value: string,
		id: string,
	) => {
		dispatch(
			setHBA1CValue({
				type: "setHBA1CValue",
				id: id,
				value: Number(value),
			})
		);
	};


	const handleHBA1CDateChange = (
		value: {
			value: Dayjs | null;
			validationError: string | null;
		},
		id: string,
	) => {
		dispatch(
			setHBA1CDate({
				type: "setHBA1CDate",
				id: id,
				value: value.value === null ? null : value.value.format('MM/DD/YYYY'),
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
				Choose applicable conditions:
			</FormLabel>
			<FormGroup>
				{conditions
					.filter(condition => (condition.id === "type2diabetesmellitus"))
					.map(condition => {
						if (condition.id !== "type2diabetesmellitus") {
							throw Error(`condition id should never be ${condition.id}, only "type2diabetesmellitus"`);
						};

						return (
							<Grid
								key={condition.id}
								item
							>
								<Stack
									direction="row"
								>
									{/* <IoModal>
										<Stack
											sx={{
												// eslint-disable-next-line @typescript-eslint/prefer-as-const
												position: 'absolute' as 'absolute',
												top: '50%',
												left: '50%',
												transform: 'translate(-50%, -50%)',
												width: 700,
												height: 600,
												bgcolor: 'gray',
												border: '2px solid #000',
												boxShadow: 24,
											}}
										>
											<IoAddPhysician
												id={condition.id}
											/>
											<List
												sx={{
													overflow: 'auto',
												}}
												dense={true}
											>
												{condition.treatmentGoals.map(
													(treatmentGoal, _index) => {
														return (
															<ListItem
																key={treatmentGoal}
																secondaryAction={
																	<IconButton
																		edge="end"
																		onClick={(event) => handleRmoveTreatmentGoal(event, treatmentGoal, condition.id)}
																	>
																		<ClearIcon
																			fontSize="small"
																		/>
																	</IconButton>
																}
															>
																<ListItemButton
																	role={undefined}
																	dense
																>
																	<ListItemText
																		id={treatmentGoal}
																		primary={treatmentGoal}
																	/>
																</ListItemButton>
															</ListItem>
														);
													}
												)}
											</List>
											<List
												sx={{
													overflow: 'auto',
												}}
												dense={true}
											>
												{condition.plannedInterventions.map(
													(plannedIntervention, _index) => {
														return (
															<ListItem
																key={plannedIntervention}
																secondaryAction={
																	<IconButton
																		edge="end"
																		onClick={(event) => handleRmovePlannedIntervention(event, plannedIntervention, condition.id)}
																	>
																		<ClearIcon
																			fontSize="small"
																		/>
																	</IconButton>
																}
															>
																<ListItemButton
																	role={undefined}
																	dense
																>
																	<ListItemText
																		id={plannedIntervention}
																		primary={plannedIntervention}
																	/>
																</ListItemButton>
															</ListItem>
														);
													}
												)}
											</List>
										</Stack>
									</IoModal> */}
									<ExternalIoFormControlLabel
										id={condition.label}
										checked={condition.checked}
										onExternalChange={handleCheckbox}
									/>
									<Collapse
										orientation="horizontal"
										in={condition.checked}
										unmountOnExit
									>
										<ExternalConditionSelect
											id={condition.id}
											value={condition.selection}
											conditions={condition.choices}
											onHandleChange={selectValueChanged}
										/>
									</Collapse>
									<Stack>
										{condition.hba1c!.map(h => {
											return (
												<Stack
													key={h.id}
													direction="row"
												>
													<Collapse
														orientation="horizontal"
														in={condition.checked}
														unmountOnExit
													>
														<ExternalIoNumberField
															id={h.id}
															label={h.label}
															value={h.value.toString()}
															setExternalState={handleHBA1CValueChange}
														/>
													</Collapse>
													<Collapse
														orientation="horizontal"
														in={condition.checked}
														unmountOnExit
													>
														<ExternalIoDatePicker
															id={condition.id}
															label={h.label}
															value={dayjs(h.date)}
															setExternalState={(value: {
																value: Dayjs | null;
																validationError: string | null;
															}) => handleHBA1CDateChange(value, h.id)}
														/>
													</Collapse>
												</Stack>
											);
										})}
									</Stack>
								</Stack>
							</Grid>
						);
					})
				}
				{conditions
					.filter(condition => (condition.id !== "type2diabetesmellitus"))
					.map(condition => {
						return (
							<Grid
								key={condition.id}
								item
							>
								<Stack
									direction="row"
								>
									{/* <IoModal
										id="A"
									>
										<Stack
											sx={{
												// eslint-disable-next-line @typescript-eslint/prefer-as-const
												position: 'absolute' as 'absolute',
												top: '50%',
												left: '50%',
												transform: 'translate(-50%, -50%)',
												width: 700,
												height: 600,
												bgcolor: 'gray',
												border: '2px solid #000',
												boxShadow: 24,
											}}
										>
											<IoAddPhysician
												id={condition.id}
											/>
											<List
												sx={{
													overflow: 'auto',
												}}
												dense={true}
											>
												{condition.treatmentGoals.map(
													(treatmentGoal, _index) => {
														return (
															<ListItem
																key={treatmentGoal}
																secondaryAction={
																	<IconButton
																		edge="end"
																		onClick={(event) => handleRmoveTreatmentGoal(event, treatmentGoal, condition.id)}
																	>
																		<ClearIcon
																			fontSize="small"
																		/>
																	</IconButton>
																}
															>
																<ListItemButton
																	role={undefined}
																	dense
																>
																	<ListItemText
																		id={treatmentGoal}
																		primary={treatmentGoal}
																	/>
																</ListItemButton>
															</ListItem>
														);
													}
												)}
											</List>
											<List
												sx={{
													overflow: 'auto',
												}}
												dense={true}
											>
												{condition.plannedInterventions.map(
													(plannedIntervention, _index) => {
														return (
															<ListItem
																key={plannedIntervention}
																secondaryAction={
																	<IconButton
																		edge="end"
																		onClick={(event) => handleRmovePlannedIntervention(event, plannedIntervention, condition.id)}
																	>
																		<ClearIcon
																			fontSize="small"
																		/>
																	</IconButton>
																}
															>
																<ListItemButton
																	role={undefined}
																	dense
																>
																	<ListItemText
																		id={plannedIntervention}
																		primary={plannedIntervention}
																	/>
																</ListItemButton>
															</ListItem>
														);
													}
												)}
											</List>
										</Stack>
									</IoModal> */}
									<ExternalIoFormControlLabel
										id={condition.label}
										checked={condition.checked}
										onExternalChange={handleCheckbox}
									/>
									<Collapse
										orientation="horizontal"
										in={condition.checked}
										unmountOnExit
									>
										<ExternalConditionSelect
											id={condition.id}
											value={condition.selection}
											conditions={condition.choices}
											onHandleChange={selectValueChanged}
										/>
									</Collapse>
								</Stack>
							</Grid>
						);
					})
				}
			</FormGroup>
		</FormControl>
	);
};
