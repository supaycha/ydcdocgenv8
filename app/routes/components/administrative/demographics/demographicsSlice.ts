import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../storage/createAppSlice"

import demographics from '../../../public/administrative/demographics.json';
import type { DemographicsDraftType, DemographicsIndivType, DemographicsStrIndivType } from "../../../types/types";

export interface DemographicsStrActionType {
	type: string,
	id: string,
	value: string,
};

export interface DemographicsDateActionType {
	type: string;
	id: string,
	value: string | null;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const demographicsSlice = createAppSlice({
	name: "demographics",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (demographics as DemographicsDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setTextChange: create.reducer((state, action: PayloadAction<DemographicsStrActionType>) => {
			const demographicsItem = state.filter(n => n.id === action.payload.id)[0] as DemographicsIndivType;

			demographicsItem.value = action.payload.value;
		}),
		setNumChange: create.reducer((state, action: PayloadAction<DemographicsStrActionType>) => {
			const demographicsItem = state.filter(n => n.id === action.payload.id)[0] as DemographicsIndivType;

			demographicsItem.value = action.payload.value;
		}),
		setDateChange: create.reducer((state, action: PayloadAction<DemographicsDateActionType>) => {
			console.log(`demographicsSlice.setDateChange: ${action.payload.value}`)
			const demographicsItem = state.filter(n => n.id === action.payload.id)[0] as DemographicsIndivType;

			demographicsItem.value = action.payload.value;
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectDemographics: state => state,
		selectDateOfEstablishment: (demographics) => (demographics.filter((d: { id: string; }) => d.id === "dateOfEstablishment")[0].value),
		selectDOB: (demographics) => (demographics.filter((cp: { id: string; }) => cp.id === "dateOfBirth")[0].value),
		selectAccountNumber: (demographics) => ((demographics.filter((d: { id: string; }) => d.id === "accountNum")[0] as DemographicsStrIndivType).value),
		// selectStatus: demographics => demographics.status,
	},
})

// Action creators are generated for each case reducer function.
export const {
	setTextChange,
	setNumChange,
	setDateChange,
} = demographicsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectDemographics,
	selectDateOfEstablishment,
	selectDOB,
	selectAccountNumber,
} = demographicsSlice.selectors
