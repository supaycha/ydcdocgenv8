import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../storage/createAppSlice"
import type { SocialDeterminantsCodesWrapperType, SocialDeterminantsCodeWrapperType, SocialDeterminantsDraftType } from "../../types/types";

import socialDeterminants from '../../public/socialdeterminants/socialdeterminants.json';

export interface SocialDeterminantsCheckboxActionType {
	type: string;
	questionsGroupId: string;
	codeId: string;
	value: boolean;
	codeorcodes: string | undefined; // undefined due to IoFormControlLabel component prop typing
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const socialDeterminantsSlice = createAppSlice({
	name: "socialDeterminants",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (socialDeterminants as SocialDeterminantsDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setCheckbox: create.reducer((state, action: PayloadAction<SocialDeterminantsCheckboxActionType>) => {
			const socialDeterminantsItem = state.filter(n => n.id === action.payload.questionsGroupId)[0];
			socialDeterminantsItem.questions = socialDeterminantsItem.questions.map(q => {
				if (action.payload.codeorcodes === undefined) {
					throw Error("why is codeorcodes undefined? shouldnt be")
				}

				if (action.payload.codeorcodes in q) {
					if (action.payload.codeorcodes === "code") {
						return {
							...(q as SocialDeterminantsCodeWrapperType),
							code: {
								...(q as SocialDeterminantsCodeWrapperType).code,
								checked: (q as SocialDeterminantsCodeWrapperType).code.id === action.payload.codeId ?
									action.payload.value :
									(q as SocialDeterminantsCodeWrapperType).code.checked,
							}
						};
					}
					else if (action.payload.codeorcodes === "codes") {
						return {
							...(q as SocialDeterminantsCodesWrapperType),
							codes: (q as SocialDeterminantsCodesWrapperType).codes.map(internalC => {
								return {
									...internalC,
									code: {
										...internalC.code,
										checked: internalC.code.id === action.payload.codeId ?
											action.payload.value :
											internalC.code.checked,
									}
								}
							})
						};
					}
				}
				return q
			});
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectSocialDeterminants: state => state,
	},
})

// Action creators are generated for each case reducer function.
export const {
	setCheckbox,
} = socialDeterminantsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectSocialDeterminants,
} = socialDeterminantsSlice.selectors
