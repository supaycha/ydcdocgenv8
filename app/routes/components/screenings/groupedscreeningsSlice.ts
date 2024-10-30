import { createSelector, type PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../storage/createAppSlice"
import type { GroupedScreeningDraftType } from "../../types/types";

import groupedScreenings from '../../public/screenings/groupedscreenings.json';
import dayjs from "dayjs";
import { modifyDateAccordingToTest } from "../../io/wrappers/IoLinkedDates";
import { parseZodReaderFriendly } from "../../io/errorhandling/ioZod";
import { ZodGroupedScreeningDraftType } from "../../types/types_zod";

parseZodReaderFriendly(ZodGroupedScreeningDraftType, groupedScreenings);

export interface GroupedScreeningsCheckboxActionType {
	type: string,
	id: string,
	value: boolean,
};

export interface GroupedScreeningsLinkCheckedInGroupActionType {
	type: string,
	id: string,
	value: boolean,
	parent: string;
};

export interface GroupedScreeningsScreeningInGroupActionType {
	type: string;
	id: string;
	parent: string;
};

export interface GroupedScreeningsDateReceivedinGroupActionType {
	type: string;
	id: string;
	value: string | null;
	parent: string;
};

export interface GroupedScreeningsToggleDateDueModifierActionType {
	type: string;
	id: string;
	value: string;
	parent: string;
};

export interface GroupedScreeningsDateDueInGroupActionType {
	type: string;
	id: string;
	value: string | null;
	parent: string;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const groupedScreeningsSlice = createAppSlice({
	name: "groupedScreenings",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (groupedScreenings as GroupedScreeningDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setCheckbox: create.reducer((state, action: PayloadAction<GroupedScreeningsCheckboxActionType>) => {
			const group = state.filter(n => n.id === action.payload.id)[0];
			group.checked = action.payload.value;
			group.radioButtonValue = null;
			group.radioOptions = group.radioOptions.map(screening => {
				return {
					...screening,
					toggleButtonValue: screening.toggleOptions[0].id,
					dateReceived: null,
					dateDue: null,
				}
			});
		}),
		setLinkChecked: create.reducer((state, action: PayloadAction<GroupedScreeningsLinkCheckedInGroupActionType>) => {
			const group = state.filter(n => n.id === action.payload.parent)[0];
			const screening = group.radioOptions.filter(n => n.id === action.payload.id)[0];

			screening.linkChecked = action.payload.value;
		}),
		setScreeningInGroup: create.reducer((state, action: PayloadAction<GroupedScreeningsScreeningInGroupActionType>) => {
			const group = state.filter(n => n.id === action.payload.parent)[0];
			group.radioButtonValue = action.payload.id;

			const screening = group.radioOptions.filter(m => m.id === action.payload.id)[0]
			screening.toggleButtonValue = screening.toggleOptions[0].id;

			screening.dateReceived = null;
			screening.dateDue = null;

			const notChoice = group.radioOptions.filter(m => m.id !== action.payload.id)[0];
			notChoice.toggleButtonValue = screening.toggleOptions[0].id;

			notChoice.dateReceived = null;
			notChoice.dateDue = null;
		}),
		setDateReceivedinGroup: create.reducer((state, action: PayloadAction<GroupedScreeningsDateReceivedinGroupActionType>) => {
			const group = state.filter(n => n.id === action.payload.parent)[0];
			const screening = group.radioOptions.filter(n => n.id === action.payload.id)[0];

			screening.dateReceived = action.payload.value;
		}),
		toggleDateDueModifier: create.reducer((state, action: PayloadAction<GroupedScreeningsToggleDateDueModifierActionType>) => {
			const group = state.filter(n => n.id === action.payload.parent)[0];
			const screening = group.radioOptions.filter(m => m.id === action.payload.id)[0];
			screening.toggleButtonValue = action.payload.value;
			if (screening.toggleButtonValue === null && screening.dateReceived !== null) {
				const moddedVal = modifyDateAccordingToTest(action.payload.parent, dayjs(screening.dateReceived), "screening");
				const val = moddedVal.format('MM/DD/YYYY')
				screening.dateDue = val;
			}
			else {
				screening.dateDue = null;
			};
		}),
		setDateDueInGroup: create.reducer((state, action: PayloadAction<GroupedScreeningsDateDueInGroupActionType>) => {
			const group = state.filter(n => n.id === action.payload.parent)[0];
			const screening = group.radioOptions.filter(n => n.id === action.payload.id)[0];
			screening.dateDue = action.payload.value;
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectAllGroupScreenings: state => state,
		selectAllGroupScreeningIds: createSelector(
			state => state,
			(groupedScreenings: GroupedScreeningDraftType) => {
				return groupedScreenings.map(s => s.id);
			},
		),
		selectAGroupedScreening: (state, id) => {
			const a = state.filter(s => s.id === id);
			if (a.length === 0) {
				return undefined;
			}
			else {
				return a[0];
			};
		},
		selectAGroupedScreeningRadioOptions: (state, id, subId) => {
			const a = state.filter(s => s.id === id);
			if (a.length === 0) {
				return undefined;
			}
			else {
				const b = a[0].radioOptions.filter(r => r.id === subId);
				if (b.length === 0) {
					return undefined;
				}
				else {
					return b[0];
				};
			};
		},
		selectGroupUsingRadioOption: (state, unit) => {
			if ("parentId" in unit) {
				return state.filter(s => s.id === unit.parentId)[0];
			}
			else {
				return undefined;
			};
		},
	},
})

// Action creators are generated for each case reducer function.
export const {
	setCheckbox,
	setLinkChecked,
	setScreeningInGroup,
	setDateReceivedinGroup,
	toggleDateDueModifier,
	setDateDueInGroup,
} = groupedScreeningsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectAllGroupScreenings,
	selectAllGroupScreeningIds,
	selectAGroupedScreening,
	selectAGroupedScreeningRadioOptions,
	selectGroupUsingRadioOption,
} = groupedScreeningsSlice.selectors
