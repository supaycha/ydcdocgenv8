import { useEffect, useMemo, useState } from 'react';
import type {
	GroupedScreeningIndivType,
	ToggledScreeningIndivType,
	SingleScreeningIndivType,
	RadioOptionsIndivType,
	BothVaccineIndivType,
	OnlyVaccineIndivType,
	DosesVaccineIndivType,
	GroupedScreeningDraftType,
} from '../../types/types';
import { useAppSelector } from '../../storage/hooks';
import { selectAGroupedScreening, selectGroupUsingRadioOption } from '../../components/screenings/groupedscreeningsSlice';
import { selectABothVaccine } from '../../components/physical/vaccines/bothvaccinesSlice';
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../storage/store';
import { selectAToggledScreening } from '../../components/screenings/toggledscreeningsSlice';

interface ValidityInitialStateObj {
	dateReceived: boolean;
	dateDue: boolean;
	parent: undefined;
	child: undefined;
};

interface ValidityStateObj {
	dateReceived: boolean;
	dateDue: boolean;
	parent: string;
	child: string;
};

export function useValidityCheck(
	unit: SingleScreeningIndivType | BothVaccineIndivType | ToggledScreeningIndivType | RadioOptionsIndivType,
	// group?: GroupedScreeningIndivType,
	// screening?: ToggledScreeningIndivType | SingleScreeningIndivType | RadioOptionsIndivType,
	// vaccine?: BothVaccineIndivType,
	// groupId?: string,
	// screeningId?: string,
	// vaccineId?: string,
): ValidityStateObj {
	// const groupId = useAppSelector(state => selectAGroupedScreening(state, group === undefined ? undefined : group.id));
	// const screening = useAppSelector(state => selectToggleScreenOrSingleScreenOrGrpRadioOpt(state, groupId));
	// const group = useAppSelector(state => selectAGroupedScreening(state, groupId));
	// const screening = useAppSelector(state => selectToggleScreenOrSingleScreenOrGrpRadioOpt(state, groupId, screeningId));
	// const vaccine = useAppSelector(state => selectABothVaccine(state, vaccineId));

	// useEffect(() => {
	// 	console.log("useValidityCheck.groupId: ", groupId);
	// }, [groupId]);

	// useEffect(() => {
	// 	console.log("useValidityCheck.vaccineId: ", vaccineId);
	// }, [vaccineId]);

	// each possible type of unit, except for RadioOptionsIndivType has info it needs to fill out the returning obj
	//		RadioOptionsIndivType has a parentId for its parent obj so sinfo
	const group = useAppSelector(state => selectGroupUsingRadioOption(state, unit));

	const [validity, setValidity] = useState<ValidityInitialStateObj | ValidityStateObj>({
		dateReceived: false,
		dateDue: false,
		parent: undefined,
		child: undefined,
	});

	useMemo(() => {
		switch(unit.type) {
			case "singlediagnostic": {
				const constrainedScreening = unit as SingleScreeningIndivType;
				setValidity({
					dateReceived: constrainedScreening.checked,
					dateDue: (constrainedScreening.checked) &&
						(constrainedScreening.toggleButtonValue === null),
					parent: constrainedScreening.id,
					child: constrainedScreening.id,
				})
				break;
			}
			case "singlescreening": {
				const constrainedScreening = unit as SingleScreeningIndivType;
				setValidity({
					dateReceived: constrainedScreening.checked,
					dateDue: (constrainedScreening.checked) &&
						(constrainedScreening.toggleButtonValue === null),
					parent: constrainedScreening.id,
					child: constrainedScreening.id,
				})
				break;
			}
			case "bothvaccine": {
				const constrainedScreening = unit as BothVaccineIndivType;
				setValidity({
					dateReceived: constrainedScreening.checked,
					dateDue: constrainedScreening.checked,
					parent: constrainedScreening.id,
					child: constrainedScreening.id,
				});
				break;
			}
			case "toggledscreening": {
				const constrainedScreening = unit as ToggledScreeningIndivType;
				setValidity({
					dateReceived: constrainedScreening.checked,
					dateDue: (constrainedScreening.checked) &&
						(constrainedScreening.toggleButtonValue === null),
					parent: constrainedScreening.id,
					child: constrainedScreening.id,
				})
				break;
			}
			case "radiooptions": {
				const constrainedScreening = unit as RadioOptionsIndivType;
				setValidity({
					dateReceived: (group!.radioButtonValue === constrainedScreening.id),
					dateDue: (group!.checked) &&
						(constrainedScreening.toggleButtonValue === null),
					parent: group!.id,
					child: constrainedScreening.id,
				})
				break;
			}
		}
		// if (vaccine === undefined) {
		// 	if (group === undefined) {
		// 		if (screening !== undefined) {
		// 			const constrainedScreening = screening as ToggledScreeningIndivType | SingleScreeningIndivType;
		// 			setValidity({
		// 				dateReceived: constrainedScreening.checked,
		// 				dateDue: (constrainedScreening.checked) &&
		// 					(constrainedScreening.toggleButtonValue === null),
		// 				parent: constrainedScreening.id,
		// 				child: constrainedScreening.id,
		// 			})
		// 		}
		// 		else {
		// 			throw Error("All three (vaccine, group, screening) should NEVER be undefined")
		// 		};
		// 	}
		// 	else {
		// 		const constrainedScreening = screening as RadioOptionsIndivType;
		// 		setValidity({
		// 			dateReceived: (group.radioButtonValue === constrainedScreening.id),
		// 			dateDue: (group.checked) &&
		// 				(constrainedScreening.toggleButtonValue === null),
		// 			parent: group.id,
		// 			child: constrainedScreening.id,
		// 		})
		// 	};
		// }
		// else if (screening === undefined && group === undefined) {
		// 	setValidity({
		// 		dateReceived: vaccine.checked,
		// 		dateDue: vaccine.checked,
		// 		parent: vaccine.id,
		// 		child: vaccine.id,
		// 	});
		// }
		// else {
		// 	throw Error("useValidityCheck should always have a defined object.")
		// };
	}, [unit, group])

	return validity as ValidityStateObj;
};
