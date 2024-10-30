import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../storage/createAppSlice"

import physicians from '../../../public/administrative/physicians.json';
import type { PhysiciansDraftType, PhysicianType } from "../../../types/types";

export interface PhysiciansCheckboxActionType {
	type: string,
	id: string,
	value: boolean,
};

export interface PhysiciansSelectionActionType {
	type: string;
	id: string;
	value: PhysicianType;
	index: number;
};

export interface PhysiciansAddPhysicianActionType {
	type: string;
	id: string;
	physician: string;
	label: string;
	phone: string;
};

export interface PhysiciansRemovePhysicianActionType {
	type: string;
	id: string;
	physician: string;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const physiciansSlice = createAppSlice({
	name: "physicians",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (physicians as PhysiciansDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setCheckbox: create.reducer((state, action: PayloadAction<PhysiciansCheckboxActionType>) => {
			const physicianType = state.filter(n => n.id === action.payload.id)[0];
			physicianType.checked = action.payload.value;
			if (!physicianType.checked) {
				physicianType.selections = [
					null,
					null,
				];
			};
		}),
		setPhysicianSelection: create.reducer((state, action: PayloadAction<PhysiciansSelectionActionType>) => {
			const physicianType = state.filter(n => n.id === action.payload.id)[0];

			// find the physician object associated with the selected physician name and set selection property to it
			const res = physicianType.physicians.find(p => p.label === action.payload.value?.label);
			if (res === undefined) {
				physicianType.selections[action.payload.index] = null;
			}
			else {
				physicianType.selections[action.payload.index] = res;
			}

		}),
		addPhysicianinPhysicianType: create.reducer((state, action: PayloadAction<PhysiciansAddPhysicianActionType>) => {
			const physicianType = state.filter(n => n.id === action.payload.id)[0];
			physicianType.physicians.push({
				physician: action.payload.physician,
				label: action.payload.label,
				phone: action.payload.phone,
			});

		}),
		removePhysicianinPhysicianType: create.reducer((state, action: PayloadAction<PhysiciansRemovePhysicianActionType>) => {
			const physicianType = state.filter(n => n.id === action.payload.id)[0];
			physicianType.physicians = physicianType.physicians.filter(prov => prov.label !== action.payload.physician);

		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectPhysicians: physicians => physicians,
		// selectStatus: physicians => physicians.status,
	},
})

// Action creators are generated for each case reducer function.
export const {
	setCheckbox,
	setPhysicianSelection,
	addPhysicianinPhysicianType,
	removePhysicianinPhysicianType,
} = physiciansSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { 
	selectPhysicians,
} = physiciansSlice.selectors
