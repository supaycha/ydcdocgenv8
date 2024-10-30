import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../storage/createAppSlice"
import type { OnlyVaccineDraftType } from "../../../types/types";

import onlyVaccines from '../../../public/physical/vaccines/onlyvaccines.json';

export interface OnlyVaccinesCheckboxActionType {
	type: string;
	id: string;
	value: boolean;
};

export interface OnlyVaccinesDateReceivedActionType {
	type: string;
	id: string;
	value: string | null;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const onlyVaccinesSlice = createAppSlice({
	name: "onlyVaccines",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (onlyVaccines as OnlyVaccineDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setCheckbox: create.reducer((state, action: PayloadAction<OnlyVaccinesCheckboxActionType>) => {
			const vaccine = state.filter(n => n.id === action.payload.id)[0];
			vaccine.checked = action.payload.value;
			vaccine.dateReceived = null;
		}),
		setDateReceived: create.reducer((state, action: PayloadAction<OnlyVaccinesDateReceivedActionType>) => {
			const vaccine = state.filter(n => n.id === action.payload.id)[0];
			vaccine.dateReceived = action.payload.value;
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectAllOnlyVaccines: state => state,
	},
})

// Action creators are generated for each case reducer function.
export const {
	setCheckbox,
	setDateReceived,
} = onlyVaccinesSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectAllOnlyVaccines,
} = onlyVaccinesSlice.selectors
