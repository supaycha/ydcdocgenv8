import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../storage/createAppSlice"
import type { DosesVaccineDraftType } from "../../../types/types";

import dosesVaccines from '../../../public/physical/vaccines/dosesvaccines.json';

export interface DosesVaccinesCheckboxActionType {
	type: string;
	id: string;
	value: boolean;
	parent: string;
};
export interface DosesVaccinesDateReceivedActionType {
	type: string;
	id: string;
	value: string | null;
	parent: string;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const dosesVaccinesSlice = createAppSlice({
	name: "dosesVaccines",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (dosesVaccines as DosesVaccineDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setCheckbox: create.reducer((state, action: PayloadAction<DosesVaccinesCheckboxActionType>) => {
			const vaccine = state.filter(n => n.id === action.payload.parent)[0];
			if (action.payload.id === action.payload.parent) {
				vaccine.checked = action.payload.value;
				vaccine.doses = vaccine.doses.map(dose => {
					return {
						...dose,
						dateReceived: null,
						checked: false,
					}
				});
			}
			else {
				const dose = vaccine.doses.filter(p => p.id === action.payload.id)[0];
				dose.checked = action.payload.value;
				dose.dateReceived = null;
			}
		}),
		setDateReceived: create.reducer((state, action: PayloadAction<DosesVaccinesDateReceivedActionType>) => {
			const vaccine = state.filter(n => n.id === action.payload.parent)[0];
			const dose = vaccine.doses.filter(p => p.id === action.payload.id)[0];
			dose.dateReceived = action.payload.value;
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectAllDosesVaccines: state => state,
	},
})

// Action creators are generated for each case reducer function.
export const {
	setCheckbox,
	setDateReceived,
} = dosesVaccinesSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectAllDosesVaccines,
} = dosesVaccinesSlice.selectors
