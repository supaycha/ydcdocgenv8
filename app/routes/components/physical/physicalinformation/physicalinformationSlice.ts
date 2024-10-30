import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../storage/createAppSlice"
import type { PhysicalInformationDraftType, PhysicalInformationIndivType } from "../../../types/types";

import physicalInformation from '../../../public/physical/physicalinformation/physicalinformation.json';

export interface PhysicalInformationNumActionType {
	type: string;
	id: string,
	value: number;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const physicalInformationSlice = createAppSlice({
	name: "physicalInformation",
	// `createSlice` will infer the draft type from the `initialState` argument
	initialState: (physicalInformation as PhysicalInformationDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setNumChange: create.reducer((state, action: PayloadAction<PhysicalInformationNumActionType>) => {
			const physicalInformationItem = state.filter(n => n.id === action.payload.id)[0] as PhysicalInformationIndivType;

			physicalInformationItem.value = action.payload.value;
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// draft as their first argument.
	selectors: {
		selectPhysicalInformation: state => state,
		selectPhysicalInformationGender: state => state.filter(n => n.id === "patientGender")[0].value,
	},
})

// Action creators are generated for each case reducer function.
export const {
	setNumChange,
} = physicalInformationSlice.actions

// Selectors returned by `slice.selectors` take the root draft as their first argument.
export const {
	selectPhysicalInformation,
	selectPhysicalInformationGender,
} = physicalInformationSlice.selectors
