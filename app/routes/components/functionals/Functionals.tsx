import type { ChangeEvent, MouseEvent } from 'react'
import { useCallback } from 'react'
import { FormControl, FormGroup } from '@mui/material'

import { PageKATZADL } from './PageKATZADL'
import { PageLBIADL } from './PageLBIADL'
import { PageDiet } from './PageDiet'
import { PagePhysicalActivity } from './PagePhysicalActivity'
import { PageSocialActivity } from './PageSocialActivity'
import { useAppDispatch, useAppSelector } from '../../storage/hooks'
import {
	setDiet,
	selectFunctionals,
	setKATZADL,
	setLBIADL,
	setPhysicalActivity,
	setSocialActivity
} from './functionalsSlice'

// import { useFunctionals, useFunctionalsDispatch } from './FunctionalsContext';

interface FunctionalsProps {
};

// eslint-disable-next-line no-empty-pattern
export function Functionals({
}: FunctionalsProps) {
	const functionals = useAppSelector(selectFunctionals);
	const dispatch = useAppDispatch();

	const handleDietQuestionChange = useCallback((
		value: number,
		id: string, // questionid
	) => {
		if (functionals.KATZADL === null) {
			throw Error("prev.KATZADL should never be null at this point of program.");
		}
		else if (functionals.LBIADL === null) {
			throw Error("prev.LBIADL should never be null at this point of program.");
		}
		else {
			dispatch(
				setDiet({
					type: "setDiet",
					id: id,
					value: value,
				})
			);
		};
	},
		[
			functionals,
			dispatch,
		],
	);

	const handleActivitySwitch = useCallback((
		_event: ChangeEvent<HTMLInputElement>,
		checked: boolean,
		id: string,
	) => {
		if (functionals.KATZADL === null) {
			throw Error("prev.KATZADL should never be null at this point of program.");
		}
		if (functionals.LBIADL === null) {
			throw Error("prev.LBIADL should never be null at this point of program.");
		}
		else {
			dispatch(
				setKATZADL({
					type: "setKATZADL",
					id: id,
					value: checked,
				})
			);
		};
	},
		[
			functionals,
			dispatch,
		],
	);

	const handleToggleActivityOption = useCallback((
		_event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
		localFunctionalsCopyActivityId: string,
		index: number,
	) => {
		if (functionals.KATZADL === null) {
			throw Error("localFunctionalsCopy.KATZADL in handleToggleActivityOption should never be null at this point of program.");
		}
		else if (functionals.LBIADL === null) {
			throw Error("localFunctionalsCopy.LBIADL in handleToggleActivityOption should never be null at this point of program.");
		}
		else {
			dispatch(
				setLBIADL({
					type: "setLBIADL",
					id: localFunctionalsCopyActivityId,
					index: index,
				})
			);
		};
	},
		[
			functionals,
			dispatch,
		]
	);

	const handlePhysicalActivityQuestionChange = useCallback((
		value: number,
		id: string, // questionid
	) => {
		if (functionals.KATZADL === null) {
			throw Error("prev.KATZADL should never be null at this point of program.");
		}
		else if (functionals.LBIADL === null) {
			throw Error("prev.LBIADL should never be null at this point of program.");
		}
		else {
			dispatch(
				setPhysicalActivity({
					type: "setPhysicalActivity",
					id: id,
					value: value,
				})
			);
		};
	},
		[
			functionals,
			dispatch,
		]
	);

	const handleSocialActivityQuestionChange = useCallback((
		value: number,
		id: string, // questionid
	) => {
		if (functionals.KATZADL === null) {
			throw Error("prev.KATZADL should never be null at this point of program.");
		}
		else if (functionals.LBIADL === null) {
			throw Error("prev.LBIADL should never be null at this point of program.");
		}
		else {
			dispatch(
				setSocialActivity({
					type: "setSocialActivity",
					id: id,
					value: value,
				})
			);
		};
	},
		[
			functionals,
			dispatch,
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
				<PageDiet
					localFunctionalsCopyDiet={functionals.diet!}
					handleDietQuestionChange={handleDietQuestionChange}
				/>
				<PageKATZADL
					localFunctionalsCopyKATZADL={functionals.KATZADL!}
					handleActivitySwitch={handleActivitySwitch}
				/>
				<PageLBIADL
					localFunctionalsCopyLBIADL={functionals.LBIADL!}
					handleToggleActivityOption={handleToggleActivityOption}
				/>
				<PagePhysicalActivity
					localFunctionalsCopyPhysicalActivity={functionals.physicalactivity!}
					handlePhysicalActivityQuestionChange={handlePhysicalActivityQuestionChange}
				/>
				<PageSocialActivity
					localFunctionalsCopySocialActivity={functionals.socialactivity!}
					handleSocialActivityQuestionChange={handleSocialActivityQuestionChange}
				/>
			</FormGroup>
		</FormControl>
	);
};
