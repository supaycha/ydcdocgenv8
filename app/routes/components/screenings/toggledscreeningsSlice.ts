import dayjs from "dayjs";
import { createSelector, type PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../storage/createAppSlice"
import type { ToggledScreeningDraftType } from "../../types/types";

import { modifyDateAccordingToTest } from "../../io/wrappers/IoLinkedDates";

import toggledScreenings from '../../public/screenings/toggledscreenings.json';
import { ZodToggledScreeningDraftType } from "../../types/types_zod";
import { parseZodReaderFriendly } from "../../io/errorhandling/ioZod";

parseZodReaderFriendly(ZodToggledScreeningDraftType, toggledScreenings);

export interface ToggledScreeningsCheckboxActionType {
	type: string;
	id: string;
	value: boolean;
	which: string;
};

export interface ToggledScreeningsLinkCheckedActionType {
	type: string;
	id: string;
	value: boolean;
	parent: string;
};

export interface ToggledScreeningsToggleDateDueModifierActionType {
	type: string;
	id: string;
	value: string;
};

export interface ToggledScreeningsDateDueActionType {
	type: string;
	id: string;
	value: string | null;
	parent: string;
};
export interface ToggledScreeningsDateReceivedActionType {
	type: string;
	id: string;
	value: string | null;
	parent: string;
};
export interface ToggledScreeningsDatePerformedActionType {
	type: string;
	id: string;
	value: string | null;
	parent: string;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const toggledScreeningsSlice = createAppSlice({
	name: "toggledScreenings",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (toggledScreenings as ToggledScreeningDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setCheckbox: create.reducer((state, action: PayloadAction<ToggledScreeningsCheckboxActionType>) => {
			const screening = state.filter(n => n.id === action.payload.id)[0];
			switch (action.payload.which) {
				case "checked": {
					screening.checked = action.payload.value;
					screening.toggleButtonValue = screening.toggleOptions[0].id;
					screening.dateReceived = null;
					screening.dateDue = null;
					screening.dateUnknown = false;
					screening.datePerformed = null;
					break;
				}
				case "dateUnknown": {
					screening.dateUnknown = action.payload.value;
					screening.datePerformed = null;
					break;
				}
				default: {
					break;
				}
			};
		}),
		setLinkChecked: create.reducer((state, action: PayloadAction<ToggledScreeningsLinkCheckedActionType>) => {
			const screening = state.filter(n => n.id === action.payload.id)[0];
			screening.linkChecked = action.payload.value;		
		}),
		setDateReceived: create.reducer((state, action: PayloadAction<ToggledScreeningsDateReceivedActionType>) => {
			const screening = state.filter(n => n.id === action.payload.id)[0];
			screening.dateReceived = action.payload.value;		
		}),
		toggleDateDueModifier: create.reducer((state, action: PayloadAction<ToggledScreeningsToggleDateDueModifierActionType>) => {
			const screening = state.filter(n => n.id === action.payload.id)[0];
			screening.toggleButtonValue = action.payload.value;
			if (screening.toggleButtonValue === null && screening.dateReceived !== null) {
				const moddedVal = modifyDateAccordingToTest(action.payload.id, dayjs(screening.dateReceived), "screening");
				const val = moddedVal.format('MM/DD/YYYY')
				screening.dateDue = val;
			}
			else {
				screening.dateDue = null;
			};		
		}),
		setDateDue: create.reducer((state, action: PayloadAction<ToggledScreeningsDateDueActionType>) => {
			const screening = state.filter(n => n.id === action.payload.parent)[0];
			screening.dateDue = action.payload.value;
		}),
		setDatePerformed: create.reducer((state, action: PayloadAction<ToggledScreeningsDatePerformedActionType>) => {
			const screening = state.filter(n => n.id === action.payload.parent)[0];
			screening.datePerformed = action.payload.value;		
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectAllToggledScreenings: state => state,
		// selectAllToggledScreeningIds: (state, gender) => {
		// 	const filtered = state.filter(s => {
		// 		return gender === undefined || s.gender === gender;
		// 	});
		// 	return filtered.map(s => s.id);
		// },
		selectAllToggledScreeningIds: createSelector(
			state => state,
			(_, gender) => gender,
			(toggledScreenings: ToggledScreeningDraftType, gender) => {
				const filtered = toggledScreenings.filter(s => {
					return s.gender === undefined || s.gender === gender;
				});
				return filtered.map(s => s.id);
			},
		),
		selectAToggledScreening: (state, id) => (state.filter(s => s.id === id)[0]),
	},
})

// Action creators are generated for each case reducer function.
export const {
	setCheckbox,
	setLinkChecked,
	setDateReceived,
	toggleDateDueModifier,
	setDateDue,
	setDatePerformed,
} = toggledScreeningsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectAllToggledScreenings,
	selectAllToggledScreeningIds,
	selectAToggledScreening,
} = toggledScreeningsSlice.selectors
