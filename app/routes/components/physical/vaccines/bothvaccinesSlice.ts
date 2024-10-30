import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../storage/createAppSlice"
import type { BothVaccineDraftType } from "../../../types/types";

import bothVaccines from '../../../public/physical/vaccines/bothvaccines.json';
import { ZodBothVaccineDraftType } from "../../../types/types_zod";
import { parseZodReaderFriendly } from "../../../io/errorhandling/ioZod";

parseZodReaderFriendly(ZodBothVaccineDraftType, bothVaccines);

export interface BothVaccineCheckboxActionType {
	type: string;
	id: string;
	value: boolean;
};

export interface BothVaccineDateReceivedActionType {
	type: string;
	id: string;
	value: string | null;
	parent: string;
};

export interface BothVaccineDateDueActionType {
	type: string;
	id: string;
	value: string | null;
	parent: string;
};

export interface BothVaccineLinkCheckedActionType {
	type: string;
	id: string;
	value: boolean;
	parent: string;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const bothVaccinesSlice = createAppSlice({
	name: "bothVaccines",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (bothVaccines as BothVaccineDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setCheckbox: create.reducer((state, action: PayloadAction<BothVaccineCheckboxActionType>) => {
			const vaccine = state.filter(n => n.id === action.payload.id)[0];
			vaccine.checked = action.payload.value;
			vaccine.dateReceived = null;
			vaccine.dateDue = null;
		}),
		setDateReceived: create.reducer((state, action: PayloadAction<BothVaccineDateReceivedActionType>) => {
			const vaccine = state.filter(n => n.id === action.payload.id)[0];
			vaccine.dateReceived = action.payload.value;
		}),
		setDateDue: create.reducer((state, action: PayloadAction<BothVaccineDateDueActionType>) => {
			const vaccine = state.filter(n => n.id === action.payload.id)[0];
			vaccine.dateDue = action.payload.value;
		}),
		setLinkChecked: create.reducer((state, action: PayloadAction<BothVaccineLinkCheckedActionType>) => {
			const vaccine = state.filter(n => n.id === action.payload.id)[0];
			vaccine.linkChecked = action.payload.value;
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectAllBothVaccines: state => state,
		selectABothVaccine: (state, id) => {
			const a = state.filter(s => s.id === id);
			if (a.length === 0) {
				return undefined;
			}
			else {
				return a[0];
			};
		},
	},
})

// Action creators are generated for each case reducer function.
export const {
	setCheckbox,
	setDateReceived,
	setDateDue,
	setLinkChecked,
} = bothVaccinesSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectAllBothVaccines,
	selectABothVaccine,
} = bothVaccinesSlice.selectors
