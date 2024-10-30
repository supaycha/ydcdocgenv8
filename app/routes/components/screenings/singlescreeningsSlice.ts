import { createSelector, type PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../storage/createAppSlice"
import type { SingleScreeningDraftType, SingleScreeningIndivType } from "../../types/types";

import singleScreenings from '../../public/screenings/singlescreenings.json';
import { modifyDateAccordingToTest } from "../../io/wrappers/IoLinkedDates";
import dayjs from "dayjs";
import { ZodSingleScreeningDraftType } from "../../types/types_zod";
import { parseZodReaderFriendly } from "../../io/errorhandling/ioZod";

parseZodReaderFriendly(ZodSingleScreeningDraftType, singleScreenings);

export interface SingleScreeningsCheckboxActionType {
	type: string;
	id: string;
	value: boolean;
};

export interface SingleScreeningsLinkCheckedActionType {
	type: string;
	id: string;
	value: boolean;
	parent: string;
};

export interface SingleScreeningsDateReceivedActionType {
	type: string;
	id: string;
	value: string | null;
	parent: string;
};

export interface SingleScreeningsToggleDateDueModifierActionType {
	type: string;
	id: string;
	value: string;
};

export interface SingleScreeningsDateDueActionType {
	type: string;
	id: string;
	value: string | null;
	parent: string;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const singleScreeningsSlice = createAppSlice({
	name: "singleScreenings",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (singleScreenings as SingleScreeningDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setCheckbox: create.reducer((state, action: PayloadAction<SingleScreeningsCheckboxActionType>) => {
			const screening = state.filter(n => n.id === action.payload.id)[0];
			screening.checked = action.payload.value;
			screening.toggleButtonValue = action.payload.value ? screening.toggleOptions[0].id : null;
			screening.dateReceived = null;
			screening.dateDue = null;
		}),
		setLinkChecked: create.reducer((state, action: PayloadAction<SingleScreeningsLinkCheckedActionType>) => {
			const screening = state.filter(n => n.id === action.payload.id)[0];
			screening.linkChecked = action.payload.value;
			// screening.toggleButtonValue = action.payload.value ? screening.toggleOptions[0].id : null;
			// screening.dateReceived = null;
			// screening.dateDue = null;
		}),
		setDateReceived: create.reducer((state, action: PayloadAction<SingleScreeningsDateReceivedActionType>) => {
			const screening = state.filter(n => n.id === action.payload.id)[0];
			screening.dateReceived = action.payload.value;
		}),
		toggleDateDueModifier: create.reducer((state, action: PayloadAction<SingleScreeningsToggleDateDueModifierActionType>) => {
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
		setDateDue: create.reducer((state, action: PayloadAction<SingleScreeningsDateDueActionType>) => {
			const screening = state.filter(n => n.id === action.payload.id)[0];
			screening.dateDue = action.payload.value;
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectAllSingleScreenings: (state) => state,
		// selectAllSingleScreeningIds: (state, gender) => {
		// 	const filtered = state.filter(s => {
		// 		return gender === undefined || s.gender === gender;
		// 	});
		// 	return filtered.map(s => s.id);
		// },
		selectAllSingleScreeningIds: createSelector(
			state => state,
			(_, gender) => gender,
			(singleScreenings: SingleScreeningDraftType, gender) => {
				const filtered = singleScreenings.filter(s => {
					return s.gender === undefined || s.gender === gender;
				});
				return filtered.map(s => s.id);
			},
		),
		selectASingleScreening: (state, id, type) =>  {
			if (type === "singlescreening") {
				// const a = 0;
				return state.filter(s => s.id === id)[0];
			}
			return undefined;
		},
	},
})

// Action creators are generated for each case reducer function.
export const {
	setCheckbox,
	setLinkChecked,
	setDateReceived,
	toggleDateDueModifier,
	setDateDue,
} = singleScreeningsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectAllSingleScreenings,
	selectAllSingleScreeningIds,
	selectASingleScreening,
} = singleScreeningsSlice.selectors
