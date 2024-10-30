import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../storage/createAppSlice"

import medications from '../../public/medications/medications.json';
import type { MedicationByDosePartsType, MedicationByDoseWholeType, MedicationNotByDoseType } from "../../types/types";

export type MedicationsBrokenDownIndivType = {
	id: string;
	checked: boolean;
	label: string;
	selectedoption: string;
	options: string[];
};

export type MedicationsBrokenDownDraftType = MedicationsBrokenDownIndivType[];

export interface MedicationsCheckboxActionType {
	type: string,
	id: string,
	value: boolean,
};

export interface MedicationsSelectionActionType {
	type: string,
	id: string,
	value: string,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const medicationsSlice = createAppSlice({
	name: "medications",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: () => {
		return medications.map(medication => {
			switch (medication.type) {
				case "bydose_whole": {
					const filteredMedication = medication as MedicationByDoseWholeType;
					const constructedId = `${filteredMedication.id}_${filteredMedication.amount}`;
					const constructedLabel = `${filteredMedication.id} ${filteredMedication.amount}${filteredMedication.unit}`;
					return {
						id: constructedId,
						checked: medication.checked,
						label: constructedLabel,
						selectedoption: medication.selectedoption,
						options: medication.options,
					};
				}
				case "bydose_parts": {
					const filteredMedication = medication as MedicationByDosePartsType;
					const constructedId = `${filteredMedication.id}_${filteredMedication.amount1}_${filteredMedication.amount2}`;
					const constructedLabel = `${filteredMedication.id} ${filteredMedication.amount1}/${filteredMedication.amount2}${filteredMedication.unit}`;
					return {
						id: constructedId,
						checked: medication.checked,
						label: constructedLabel,
						selectedoption: medication.selectedoption,
						options: medication.options,
					};
				}
				case "notbydose": {
					const filteredMedication = medication as MedicationNotByDoseType;
					const constructedId = `${filteredMedication.id}`;
					return {
						id: constructedId,
						checked: medication.checked,
						label: constructedId,
						selectedoption: medication.selectedoption,
						options: medication.options,
					};
				}
				// eslint-disable-next-line no-lone-blocks
				default: {
					throw Error(`Medication type should either by bydose_whole, bydose_parts, or notbydose not ${medication.type}!`);
				};
			};
		});
	},
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setCheckbox: create.reducer((state, action: PayloadAction<MedicationsCheckboxActionType>) => {
			const medication = state.filter(n => n.id === action.payload.id)[0];
			medication.checked = action.payload.value;
			medication.selectedoption = "same";
		}),
		setSelection: create.reducer((state, action: PayloadAction<MedicationsSelectionActionType>) => {
			const medication = state.filter(n => n.id === action.payload.id)[0];
			medication.selectedoption = action.payload.value;
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectMedications: state => state,
	},
})

// Action creators are generated for each case reducer function.
export const {
	setCheckbox,
	setSelection,
} = medicationsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectMedications,
} = medicationsSlice.selectors
