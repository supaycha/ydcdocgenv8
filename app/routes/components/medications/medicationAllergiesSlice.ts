import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../storage/createAppSlice"
import type { MedicationAllergiesDraftType } from "../../types/types";

import medicationAllergies from '../../public/medications/medicationallergies.json';

export interface MedicationAllergiesCheckboxActionType {
	type: string,
	id: string,
	value: boolean,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const medicationAllergiesSlice = createAppSlice({
	name: "medicationAllergies",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (medicationAllergies as MedicationAllergiesDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setCheckbox: create.reducer((state, action: PayloadAction<MedicationAllergiesCheckboxActionType>) => {
			const medicationAllergy = state.filter(n => n.value === action.payload.id)[0];
			medicationAllergy.checked = action.payload.value;
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectMedicationAllergies: state => state,
	},
})

// Action creators are generated for each case reducer function.
export const {
	setCheckbox,
} = medicationAllergiesSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectMedicationAllergies,
} = medicationAllergiesSlice.selectors
