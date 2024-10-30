import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { ChangeEvent, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Stack, Checkbox, Collapse } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { ExternalIoDatePicker } from "../shells/ExternalIoDatePicker";
import { useValidityCheck } from "../functions/useValidityCheck";

import type {
	BothVaccineIndivType,
	DosesVaccineIndivType,
	GroupedScreeningIndivType,
	OnlyVaccineIndivType,
	RadioOptionsIndivType,
	SingleScreeningIndivType,
	ToggledScreeningIndivType
} from "../../types/types";
import { useAppSelector } from "../../storage/hooks";
import { selectAGroupedScreeningRadioOptions } from "../../components/screenings/groupedscreeningsSlice";
import { createSelector } from "@reduxjs/toolkit";
import { selectAToggledScreening } from "../../components/screenings/toggledscreeningsSlice";
import { selectASingleScreening } from "../../components/screenings/singlescreeningsSlice";
import type { RootState } from "../../storage/store";
import { selectABothVaccine } from "../../components/physical/vaccines/bothvaccinesSlice";
import { selectASingleDiagnostic } from "../../components/conditionsanddiseases/diagnostics/diagnosticsSlice";

export type UseHaveParentReturnObjType = {
	parent: string,
	child: string,
	testType: string,
};

export function useHaveParent(
	unit: SingleScreeningIndivType | BothVaccineIndivType | ToggledScreeningIndivType | RadioOptionsIndivType
	// group?: GroupedScreeningIndivType,
	// screening?: ToggledScreeningIndivType | SingleScreeningIndivType | RadioOptionsIndivType,
	// vaccine?: BothVaccineIndivType | OnlyVaccineIndivType | DosesVaccineIndivType,
	// groupId? : string,
	// screeningId?: string,
	// vaccineId?: string,
): UseHaveParentReturnObjType {
	const hasParent = useMemo(() => {
		// if (vaccine === undefined) {
		switch (unit.type) {
			case "singlediagnostic": {
				return {
					parent: unit.id,
					child: unit.id,
					testType: (unit as ToggledScreeningIndivType | SingleScreeningIndivType).type
				};
			}
			case "singlescreening": {
				return {
					parent: unit.id,
					child: unit.id,
					testType: (unit as ToggledScreeningIndivType | SingleScreeningIndivType).type
				};
			}
			case "bothvaccine": {
				return {
					parent: unit.id,
					child: unit.id,
					// parent: vaccine,
					// child: vaccine,
					testType: "vaccine",
				};
			}
			case "toggledscreening": {
				return {
					parent: unit.id,
					child: unit.id,
					testType: (unit as ToggledScreeningIndivType | SingleScreeningIndivType).type
				};
			}
			case "radiooptions": {
				return {
					parent: (unit.parentId as string),
					child: unit.id,
					testType: "radiooptions"
				};
			}
			default: {
				throw Error("useHaveParent should always have a parent/child combo.")
			}
		}
		// if (vaccine === undefined) {
		// 	if (group === undefined) {
		// 		return {
		// 			parent: screening!.id,
		// 			child: screening!.id,
		// 			testType: (screening as ToggledScreeningIndivType | SingleScreeningIndivType).type
		// 		};
		// 	}
		// 	else {
		// 		return {
		// 			parent: group!.id,
		// 			child: screening!.id,
		// 			testType: "group and/or radiooptionsindivtype"
		// 		};
		// 	};
		// }
		// else if (screening === undefined && group === undefined) {
		// 	return {
		// 		parent: vaccine.id,
		// 		child: vaccine.id,
		// 		// parent: vaccine,
		// 		// child: vaccine,
		// 		testType: "vaccine",
		// 	};
		// }
		// else {
		// 	throw Error("useHaveParent should always have a parent/child combo.")
		// };
		// }
		// }, [group, screening, vaccine]);
	}, [unit]);

	// const hasParent = useMemo(() => {
	// 	// if (vaccine === undefined) {
	// 	if (vaccine === undefined) {
	// 		if (group === undefined) {
	// 			return {
	// 				parent: screening!.id,
	// 				child: screening!.id,
	// 				testType: (screening as ToggledScreeningIndivType | SingleScreeningIndivType).type
	// 			};
	// 		}
	// 		else {
	// 			return {
	// 				parent: group!.id,
	// 				child: screening!.id,
	// 				testType: "group and/or radiooptionsindivtype"
	// 			};
	// 		};
	// 	}
	// 	else if (screening === undefined && group === undefined) {
	// 		return {
	// 			parent: vaccine.id,
	// 			child: vaccine.id,
	// 			// parent: vaccine,
	// 			// child: vaccine,
	// 			testType: "vaccine",
	// 		};
	// 	}
	// 	else {
	// 		throw Error("useHaveParent should always have a parent/child combo.")
	// 	};
	// 	// }, [group, screening, vaccine]);
	// }, [group, screening, vaccine]);

	return hasParent;
};

export type IoLinkedDatesProps = {
	// group?: GroupedScreeningIndivType;
	// screening?: ToggledScreeningIndivType | SingleScreeningIndivType | RadioOptionsIndivType;
	// vaccine?: BothVaccineIndivType;
	id: string;
	subId?: string;
	type: "singlescreening" | "diagnostic";
	// vaccineId?: string;
	// externalDateReceived: Dayjs | null;
	// externalDateDue: Dayjs | null;
	// externallinkChecked: boolean;
	handleDateReceived: (
		value: string | null,
		id: string,
		parent: string,
	) => void;
	handleDateDue: (
		value: string | null,
		id: string,
		parent: string,
	) => void;
	handleLinkChecked: (
		value: boolean,
		id: string,
		parent: string,
	) => void;
	// slot1?: ReactNode;
	slot2?: ReactNode;
	// slot3?: ReactNode;
	slot4?: ReactNode;
};

export function modifyDateAccordingToTest(childId: string, date: Dayjs, testType: string): Dayjs {
	if (childId === "Diabetes") {
		if (testType.includes("screening")) {
			return date.add(1, "year");
		}
		else if (testType.includes("diagnostic")) {
			return date.add(3, "month");
		}
	}
	else if (childId === "Lipid Panel") {
		if (testType.includes("screening")) {
			return date.add(6, "month");
		}
		else if (testType.includes("diagnostic")) {
			return date.add(3, "month");
		}
	}
	else if (childId === "Mammogram") {
		if (testType.includes("screening")) {
			return date.add(1, "year");
		}
		else if (testType.includes("diagnostic")) {
			return date.add(6, "month");
		}
	}
	else if (childId === "DEXA Scan") {
		if (testType.includes("screening")) {
			return date.add(2, "year");
		}
		else if (testType.includes("diagnostic")) {
			return date.add(1, "year");
		}
	}
	else if (childId === "Vision/Glaucoma") {
		if (testType.includes("screening")) {
			return date.add(1, "year");
		}
		else if (testType.includes("diagnostic")) {
			return date.add(6, "month");
		}
	}
	else if (childId === "PSA") {
		if (testType.includes("screening")) {
			return date.add(1, "year");
		}
		else if (testType.includes("diagnostic")) {
			return date.add(6, "month");
		}
	}
	else if (childId === "Depression screening (PHQ-9)" || childId === "Annual Wellness Exam") {
		return date.add(1, "year").add(1, "day");
	}
	else if (childId === "Tetanus") {
		return date.add(10, "year");
	}
	// else {
	return date.add(1, "year");
	// };
};

export const selectAUnit = createSelector(
	[
		(state: RootState) => state,
		(state: RootState, id: string | undefined, subId: string | undefined, type: string | undefined) => selectASingleDiagnostic(state, id, type),
		(state: RootState, id: string | undefined, subId: string | undefined, type: string | undefined) => selectASingleScreening(state, id, type),
		(state: RootState, id: string | undefined) => selectABothVaccine(state, id),
		(state: RootState, id: string | undefined) => selectAToggledScreening(state, id),
		(state: RootState, id: string | undefined, subId: string | undefined) => selectAGroupedScreeningRadioOptions(state, id, subId),
	],
	(state, singleDiagnostic, singleScreening, bothVaccine, toggledScreening, radioOption) => {
		if (radioOption !== undefined) {
			return radioOption;
		}
		else if (toggledScreening !== undefined) {
			return toggledScreening;
		}
		else if (bothVaccine !== undefined) {
			return bothVaccine;
		}
		else if (singleDiagnostic !== undefined) {
			return singleDiagnostic;
		}
		else if (singleScreening !== undefined) {
			return singleScreening;
		}
		else {
			// throw Error(singleScreening)
			throw Error("selectAUnit error, for now make sure the source file, variable name should be similar to its name, is error free");
		}
	},
);

export function IoLinkedDates({
	// group,
	// screening,
	// vaccine,
	// groupId,
	id,
	subId,
	type,
	// screeningId,
	// vaccineId,
	// externalDateReceived = null,
	// externalDateDue = null,
	// externallinkChecked = true,
	handleDateReceived,
	handleDateDue,
	handleLinkChecked,
	// slot1, never used
	slot2 = false,
	// slot3, never used
	slot4 = false,
}: IoLinkedDatesProps) {
	const unit = useAppSelector(state => selectAUnit(state, id, subId, type));
	// const group = useAppSelector(state => selectAGroupedScreening(state, groupId));
	// const screening = useAppSelector(state => selectToggleScreenOrSingleScreenOrGrpRadioOpt(state, groupId, screeningId));
	// const vaccine = useAppSelector(state => selectABothVaccine(state, vaccineId));

	const [dateReceived, setDateReceived] = useState<{ value: Dayjs | null, validationError: string | null }>(() => (
		{
			value: dayjs(unit.dateReceived),
			validationError: null,
		}
	));
	const [linkChecked, setLinkChecked] = useState(() => (unit.linkChecked));
	const [dateDue, setDateDue] = useState<{ value: Dayjs | null, validationError: string | null }>(() => (
		{
			value: dayjs(unit.dateDue),
			validationError: null,
		}
	));

	// const validity = useValidityCheck(group, screening, vaccine);
	const validity = useValidityCheck(unit);
	// const hasParent = useHaveParent(group, screening, vaccine);
	const hasParent = useHaveParent(unit);

	useEffect(() => {
		if (dateReceived.validationError === null || dateReceived.validationError === "invalidDate") {
			if (dateReceived.value !== null && dateReceived.value.isValid()) {
				const val = dateReceived.value.format('MM/DD/YYYY');
				handleDateReceived(val, hasParent.child, hasParent.parent);
			}
			else {
				handleDateReceived(null, hasParent.child, hasParent.parent);
			};
		};
	}, [dateReceived, handleDateReceived, hasParent.child, hasParent.parent, linkChecked]);

	useEffect(() => {
		if (dateReceived.validationError === null || dateReceived.validationError === "invalidDate") {
			if (linkChecked) {
				if (dateReceived.value !== null && dateReceived.value.isValid()) {
					const moddedVal = modifyDateAccordingToTest(hasParent.child, dateReceived.value, hasParent.testType);
					const val = moddedVal.format('MM/DD/YYYY');
					setDateDue({
						value: dayjs(val),
						validationError: null,
					});
				}
				else {
					setDateDue({
						value: null,
						validationError: "invalidDate",
					});
				};
			};
		};
	}, [dateReceived, hasParent.child, hasParent.testType, linkChecked]);

	useEffect(() => {
		if (dateDue.validationError === null || dateDue.validationError === "invalidDate") {
			if (dateDue.value !== null && dateDue.value.isValid()) {
				const val = dateDue.value.format('MM/DD/YYYY');
				handleDateDue(val, hasParent.child, hasParent.parent);
			}
			else {
				handleDateDue(null, hasParent.child, hasParent.parent);
			};
		};
	}, [dateDue, handleDateDue, hasParent.child, hasParent.parent]);

	// useEffect(() => {
	// }, [linkChecked]);

	const onHandleCheckbox = useCallback((
		_event: ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => {
		setLinkChecked(checked);
		// handleLinkChecked(checked, hasParent.child, hasParent.parent);
	}, [
		// handleLinkChecked,
		// hasParent.child,
		// hasParent.parent,
	]);

	useEffect(() => {
		handleLinkChecked(linkChecked, hasParent.child, hasParent.parent);
		// if (dateDue.validationError === null || dateDue.validationError === "invalidDate") {
		// 	if (dateDue.value !== null && dateDue.value.isValid()) {
		// 		const val = dateDue.value.format('MM/DD/YYYY');
		// 		handleDateDue(val, hasParent.child, hasParent.parent);
		// 	}
		// 	else {
		// 		handleDateDue(null, hasParent.child, hasParent.parent);
		// 	};
		// };
	}, [linkChecked, handleLinkChecked, hasParent.child, hasParent.parent]);

	// const onHandleCheckbox = (
	// 	_event: ChangeEvent<HTMLInputElement>,
	// 	checked: boolean,
	// ) => {
	// 	setLinkChecked(checked);
	// 	handleLinkChecked(val, hasParent.child, hasParent.parent);
	// };

	return (
		<Stack
			direction="row"
		>
			{/* {slot1} */}
			<Collapse
				orientation="horizontal"
				in={validity.dateReceived}
				unmountOnExit
			>
				<ExternalIoDatePicker
					label="dateReceived"
					value={dateReceived.value}
					setExternalState={setDateReceived}
				/>
			</Collapse>
			{slot2}
			<Collapse
				orientation="horizontal"
				in={validity.dateDue}
				unmountOnExit
			>
				<Checkbox
					checked={linkChecked}
					onChange={onHandleCheckbox}
					icon={
						<LockOutlinedIcon
							fontSize="small"
						/>
					}
					checkedIcon={
						<LockIcon
							fontSize="small"
						/>
					}
					size="small"
				/>
			</Collapse>
			{/* {slot3} */}
			<Collapse
				orientation="horizontal"
				in={validity.dateDue}
				unmountOnExit
			>
				<ExternalIoDatePicker
					label="dateDue"
					value={dateDue.value}
					readOnly={linkChecked}
					setExternalState={setDateDue}
				/>
			</Collapse>
			{slot4}
		</Stack>
	);
};
