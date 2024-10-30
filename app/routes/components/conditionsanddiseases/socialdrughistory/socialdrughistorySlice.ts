import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../storage/createAppSlice"
import type { SocialDrugHistoryDraftType, SocialDrugHistoryIllegalIndivType, SocialDrugHistoryIllegalValueBooleanIndivType, SocialDrugHistoryLegalIndivType, SocialDrugHistoryLegalValueStringIndivType } from "../../../types/types";

import socialDrugHistory from "../../../public/conditionsanddiseases/socialdrughistory.json";

export interface SocialDrugHistoryToggleButtonGroupActionType {
	type: string;
	id: string;
	value: string;
};

export interface SocialDrugHistoryStrActionType {
	type: string;
	parentId: string;
	id: string;
	value: string;
};

export interface SocialDrugHistoryCheckboxActionType {
	type: string;
	parentId: string;
	id: string;
	value: boolean;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const socialDrugHistorySlice = createAppSlice({
	name: "socialDrugHistory",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (socialDrugHistory as SocialDrugHistoryDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setToggleButtonGroup: create.reducer((state, action: PayloadAction<SocialDrugHistoryToggleButtonGroupActionType>) => {
			const socialdrughistorygroup = state.filter(n => n.id === action.payload.id)[0];

			// enforcing that an option MUST be selected, cannot deselect option so togglebuttongroup is "blank"
			if (action.payload.value !== null) {
				socialdrughistorygroup.toggleButtonValue = action.payload.value;
			};
		}),
		setNum: create.reducer((state, action: PayloadAction<SocialDrugHistoryStrActionType>) => {
			// explicit type conversion dependent on either "timesperday" or "timesperyear" being id in action.payload
			const socialdrughistorylegalgroup = (state.filter(n => n.id === action.payload.parentId)[0] as SocialDrugHistoryLegalIndivType);

			// spread objs must be object types and implicit conversion not working so explicit required
			socialdrughistorylegalgroup[action.payload.id] = {
				...(socialdrughistorylegalgroup[action.payload.id] as SocialDrugHistoryLegalValueStringIndivType),
				value: action.payload.value,
			};	
		}),
		setCheckbox: create.reducer((state, action: PayloadAction<SocialDrugHistoryCheckboxActionType>) => {
			// explicit type conversion dependent on either "attemptedrehab" or "hospitalized" being id in action.payload
			const socialdrughistoryillegalgroup = (state.filter(n => n.id === action.payload.parentId)[0] as SocialDrugHistoryIllegalIndivType);

			// spread objs must be object types and implicit conversion not working so explicit required
			socialdrughistoryillegalgroup[action.payload.id] = {
				...(socialdrughistoryillegalgroup[action.payload.id] as SocialDrugHistoryIllegalValueBooleanIndivType),
				value: action.payload.value,
			};
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectSocialDrugHistory: state => state,
	},
})

// Action creators are generated for each case reducer function.
export const {
	setToggleButtonGroup,
	setNum,
	setCheckbox,
} =
	socialDrugHistorySlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectSocialDrugHistory,
} = socialDrugHistorySlice.selectors
