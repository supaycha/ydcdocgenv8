import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../storage/createAppSlice"
import type { FunctionalsDraftType } from "../../types/types";

import base from '../../public/functionals/base.json';
import diet from '../../public/functionals/diet.json';
import KATZADL from '../../public/functionals/KATZADL.json';
import LBIADL from '../../public/functionals/LBIADL.json';
import physicalactivity from '../../public/functionals/physicalactivity.json';
import socialactivity from '../../public/functionals/socialactivity.json';

import { parseZodReaderFriendly } from "../../io/errorhandling/ioZod";
import {
	ZodDietType,
	ZodFunctionalsDraftType,
	ZodKATZADLType,
	ZodLBIADLType,
	ZodPhysicalActivityType,
	ZodSocialActivityType,
} from "../../types/types_zod";

parseZodReaderFriendly(ZodFunctionalsDraftType, base);
parseZodReaderFriendly(ZodDietType, diet);
parseZodReaderFriendly(ZodKATZADLType, KATZADL);
parseZodReaderFriendly(ZodLBIADLType, LBIADL);
parseZodReaderFriendly(ZodPhysicalActivityType, physicalactivity);
parseZodReaderFriendly(ZodSocialActivityType, socialactivity);

const init = base as FunctionalsDraftType;
init.diet = diet;
init.KATZADL = KATZADL;
init.LBIADL = LBIADL;
init.physicalactivity = physicalactivity;
init.socialactivity = socialactivity;

export interface FunctionalsSetDietActionType {
	type: string;
	id: string;
	value: number;
};

export interface FunctionalsSetKATZADLActionType {
	type: string;
	id: string;
	value: boolean;
};

export interface FunctionalsSetLBIADLActionType {
	type: string;
	id: string;
	index: number;
};

export interface FunctionalsSetPhysicalActivityActionType {
	type: string;
	id: string;
	value: number;
};

export interface FunctionalsSetSocialActivityActionType {
	type: string;
	id: string;
	value: number;
};

export interface FunctionalsClearStateCauseDialogClosedNotSubmittedActionType {
	type: string;
};

export interface FunctionalsCheckboxActionType {
	type: string,
	id: string,
	value: boolean,
};

export interface FunctionalsSwitchActivityActionType {
	type: string,
	id: string,
	value: boolean,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const functionalsSlice = createAppSlice({
	name: "functionals",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (init as FunctionalsDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setDiet: create.reducer((state, action: PayloadAction<FunctionalsSetDietActionType>) => {
			const dietItem = state.diet!.questions.filter(question => question.id === action.payload.id)[0];
			dietItem.value = action.payload.value;
		}),
		setKATZADL: create.reducer((state, action: PayloadAction<FunctionalsSetKATZADLActionType>) => {
			const KATZADLItem = state.KATZADL!.activities.filter(activity => activity.id === action.payload.id)[0];
			KATZADLItem.checked = action.payload.value;
			state.KATZADL!.total = state.KATZADL!.total + (KATZADLItem.checked ? 1 : 0);
		}),
		setLBIADL: create.reducer((state, action: PayloadAction<FunctionalsSetLBIADLActionType>) => {
			const LBIADLItem = state.LBIADL!.activities.filter(activity => activity.id === action.payload.id)[0];
			LBIADLItem.options = LBIADLItem.options.map((option, localIndex) => {
				if (localIndex === action.payload.index) {
					return {
						...option,
						checked: !option.checked,
					};
				}
				else {
					return {
						...option,
						checked: false,
					};
				}
			});
		}),
		setPhysicalActivity: create.reducer((state, action: PayloadAction<FunctionalsSetPhysicalActivityActionType>) => {
			const physicalActivityItem = state.physicalactivity!.questions.filter(question => question.id === action.payload.id)[0];
			physicalActivityItem.value = action.payload.value;
		}),
		setSocialActivity: create.reducer((state, action: PayloadAction<FunctionalsSetSocialActivityActionType>) => {
			const socialActivityItem = state.socialactivity!.questions.filter(question => question.id === action.payload.id)[0];
			socialActivityItem.value = action.payload.value;
		}),
		clearStateCauseDialogClosedNotSubmitted: create.reducer((state, action: PayloadAction<FunctionalsSetLBIADLActionType>) => {
		}),
		setCheckbox: create.reducer((state, action: PayloadAction<FunctionalsCheckboxActionType>) => {
			state.checked = action.payload.value;
		}),
		switchActivity: create.reducer((state, action: PayloadAction<FunctionalsSwitchActivityActionType>) => {
			state.KATZADL!.activities = state.KATZADL!.activities.map(activity => {
				if (activity.id === action.payload.id) {
					activity.checked = action.payload.value;
				};

				return activity;
			});
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectFunctionals: state => state,
	},
})

// Action creators are generated for each case reducer function.
export const {
	setDiet,
	setKATZADL,
	setLBIADL,
	setPhysicalActivity,
	setSocialActivity,
	clearStateCauseDialogClosedNotSubmitted,
	setCheckbox,
	switchActivity,
} =
	functionalsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectFunctionals,
} = functionalsSlice.selectors
