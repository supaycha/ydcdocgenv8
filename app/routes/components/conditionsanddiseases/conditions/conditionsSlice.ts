import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../storage/createAppSlice"
import type { CheckedConditionsDraftType } from "../../../types/types";

import conditions from "../../../public/conditionsanddiseases/conditions.json";

export interface ConditionsCheckboxActionType {
	type: string;
	id: string;
	value: boolean;
};

export interface ConditionsSelectionActionType {
	type: string;
	id: string;
	value: string;
};

export interface ConditionsSetHBA1CValueActionType {
	type: string;
	id: string;
	value: number;
};

export interface ConditionsSetHBA1CDateActionType {
	type: string;
	id: string;
	value: string | null;
};

export interface ConditionsRemoveTreatmentGoalActionType {
	type: string;
	id: string;
	treatmentGoal: string;
};

export interface ConditionsRemovePlannedInterventionctionType {
	type: string;
	id: string;
	plannedIntervention: string;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const conditionsSlice = createAppSlice({
	name: "conditions",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (conditions as CheckedConditionsDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setCheckbox: create.reducer((state, action: PayloadAction<ConditionsCheckboxActionType>) => {
			const condition = state.filter(n => n.label === action.payload.id)[0];
			condition.checked = action.payload.value;
		}),
		setConditionSelection: create.reducer((state, action: PayloadAction<ConditionsSelectionActionType>) => {
			const condition = state.filter(n => n.id === action.payload.id)[0];
			condition.selection = action.payload.value;
		}),
		setHBA1CValue: create.reducer((state, action: PayloadAction<ConditionsSetHBA1CValueActionType>) => {
			const hba1cCondition = state.filter(n => n.id === "type2diabetesmellitus")[0];
			hba1cCondition.hba1c = hba1cCondition.hba1c!.map(h => {
				return {
					...h,
					value: h.id === action.payload.id ? action.payload.value : h.value,
				};
			});
		}),
		setHBA1CDate: create.reducer((state, action: PayloadAction<ConditionsSetHBA1CDateActionType>) => {
			const hba1cCondition = state.filter(n => n.id === "type2diabetesmellitus")[0];
			hba1cCondition.hba1c = hba1cCondition.hba1c!.map(h => {
				return {
					...h,
					date: h.id === action.payload.id ? action.payload.value : h.date,
				};
			});
		}),
		removeTreatmentGoalinPhysicianType: create.reducer((state, action: PayloadAction<ConditionsRemoveTreatmentGoalActionType>) => {
			const conditionType = state.filter(n => n.id === action.payload.id)[0];
			conditionType.treatmentGoals = conditionType.treatmentGoals.filter(treatmentGoal => treatmentGoal !== action.payload.treatmentGoal);
		}),
		removePlannedInterventioninPhysicianType: create.reducer((state, action: PayloadAction<ConditionsRemovePlannedInterventionctionType>) => {
			const conditionType = state.filter(n => n.id === action.payload.id)[0];
			conditionType.plannedInterventions = conditionType.plannedInterventions.filter(plannedIntervention => plannedIntervention !== action.payload.plannedIntervention);
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectConditions: state => state,
	},
})

// Action creators are generated for each case reducer function.
export const {
	setCheckbox,
	setConditionSelection,
	setHBA1CValue,
	setHBA1CDate,
	removeTreatmentGoalinPhysicianType,
	removePlannedInterventioninPhysicianType,
} =
	conditionsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectConditions,
} = conditionsSlice.selectors
