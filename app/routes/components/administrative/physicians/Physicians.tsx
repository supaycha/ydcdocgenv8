import type { ChangeEvent, SyntheticEvent } from 'react';
import { useCallback, useEffect } from 'react';
import {
	FormLabel,
	FormControl,
	FormGroup,
	Collapse,
	Stack,
	Grid,
} from '@mui/material';

// import { usePhysicians, usePhysiciansDispatch } from './PhysiciansContext';
import type { PhysicianType } from '../../../types/types';

import { PhysicianEditor } from './PhysicianEditor';
import { ExternalPhysicianSelect } from './ExternalPhysicianSelect';
import { ExternalIoFormControlLabel } from '../../../io/wrappers/ExternalIoFormControlLabel';
import { useAppDispatch, useAppSelector } from '../../../storage/hooks';
import { selectPhysicians, setCheckbox, setPhysicianSelection } from './physiciansSlice';

export function Physicians(
) {
	const physicians = useAppSelector(selectPhysicians);
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

	const displayValueChanged = (
		_event: SyntheticEvent<Element, Event>,
		newInputValue: PhysicianType,
		id: string,
		index: number,
	) => {
		dispatch(
			setPhysicianSelection({
				type: "setPhysicianSelection",
				id: id,
				value: newInputValue,
				index: index,
			})
		);
	};

	// const handleAddPhysician = (_event: MouseEvent<HTMLButtonElement>, physicianTypeId: string) => {
	// 	dispatch({
	// 		type: "addPhysicianinPhysicianType",
	// 		id: physicianTypeId,
	// 		physician: prov.label,
	// 		label: string,
	// 		phone: string,
	// 	});
	// };

	// const handleRemovePhysician = (_event: MouseEvent<HTMLButtonElement>, prov: PhysicianType, physicianId: string) => {
	// 	dispatch({
	// 		type: "removePhysicianinPhysicianType",
	// 		id: physicianId,
	// 		physician: prov.label,
	// 	});
	// };

	// useEffect(() => {
	// 	console.log(physicians.filter(p => p.checked));
	// }, [physicians]);

	return (
		// <>
		<FormControl
			sx={{
				// marginLeft: 9,
				// paddingBottom: 20,
				// height: "100%",
				overflow: "auto",
				// height: "400px",
				width: "100%"
			}}
			component="fieldset"
			variant="standard"
		>
			<FormLabel
				component="legend"
			>
				Choose physician type, then the physician:
				<PhysicianEditor
				/>
			</FormLabel>
			<FormGroup>
				{physicians.map(physician => {
					return (
						<Grid
							key={physician.id}
							item
						>
							<Stack
								direction="row"
							// key={physician.id}
							>
								<ExternalIoFormControlLabel
									id={physician.id}
									checked={physician.checked}
									onExternalChange={handleCheckbox}
								/>
								<Collapse
									orientation="horizontal"
									in={physician.checked}
									unmountOnExit
								>
									<Stack
										direction="row"
									>
										<ExternalPhysicianSelect
											id={physician.id}
											value={physician.selections[0]}
											physicians={physician.physicians}
											onHandleChange={(_event, newInputValue, id) =>
												displayValueChanged(_event, newInputValue, id, 0)}
										/>
										<ExternalPhysicianSelect
											id={physician.id}
											value={physician.selections[1]}
											physicians={physician.physicians}
											onHandleChange={(_event, newInputValue, id) =>
												displayValueChanged(_event, newInputValue, id, 1)}
										/>
									</Stack>
								</Collapse>
							</Stack>
						</Grid>
					);
				})}
			</FormGroup>
		</FormControl>
		// </>
	);
};
