import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../storage/createAppSlice"
import type { DiagnosticsDraftType } from "../../../types/types";

import diagnostics from "../../../public/conditionsanddiseases/singlediagnostics.json";
import { parseZodReaderFriendly } from "../../../io/errorhandling/ioZod";
import { ZodDiagnosticsDraftType } from "../../../types/types_zod";

parseZodReaderFriendly(ZodDiagnosticsDraftType, diagnostics);

export interface DiagnosticsCheckboxActionType {
	type: string;
	id: string;
	value: boolean;
};

export interface DiagnosticsLinkCheckedActionType {
	type: string;
	id: string;
	value: boolean;
	parent: string;
};

export interface DiagnosticsDateReceivedActionType {
	type: string;
	id: string;
	value: string | null;
	parent: string;
};

export interface DiagnosticssToggleDateDueModifierActionType {
	type: string;
	id: string;
	value: string;
};

export interface DiagnosticsDateDueActionType {
	type: string;
	id: string;
	value: string | null;
	parent: string;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const diagnosticsSlice = createAppSlice({
	name: "diagnostics",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (diagnostics as DiagnosticsDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setCheckbox: create.reducer((state, action: PayloadAction<DiagnosticsCheckboxActionType>) => {
			const diagnostic = state.filter(n => n.id === action.payload.id)[0];
			diagnostic.checked = action.payload.value;
			diagnostic.toggleButtonValue = action.payload.value ? diagnostic.toggleOptions[0].id : null;
			diagnostic.dateReceived = null;
			diagnostic.dateDue = null;
		}),
		setLinkChecked: create.reducer((state, action: PayloadAction<DiagnosticsLinkCheckedActionType>) => {
			const diagnostic = state.filter(n => n.id === action.payload.id)[0];
			diagnostic.linkChecked = action.payload.value;
			// diagnostic.toggleButtonValue = action.payload.value ? diagnostic.toggleOptions[0].id : null;
			// diagnostic.dateReceived = null;
			// diagnostic.dateDue = null;		
		}),
		setDateReceived: create.reducer((state, action: PayloadAction<DiagnosticsDateReceivedActionType>) => {
			const diagnostic = state.filter(n => n.id === action.payload.id)[0];
			diagnostic.dateReceived = action.payload.value;
		}),
		toggleDateDueModifier: create.reducer((state, action: PayloadAction<DiagnosticssToggleDateDueModifierActionType>) => {
			const diagnostic = state.filter(n => n.id === action.payload.id)[0];
			diagnostic.toggleButtonValue = action.payload.value;
			// if (diagnostic.toggleButtonValue === null && diagnostic.dateReceived !== null) {
			// 	const moddedVal = modifyDateAccordingToTest(action.payload.id, dayjs(diagnostic.dateReceived), "diagnosis");
			// 	const val = moddedVal.format('MM/DD/YYYY')
			// 	diagnostic.dateDue = val;
			// }
			// else {
			// 	diagnostic.dateDue = null;
			// };
		}),
		setDateDue: create.reducer((state, action: PayloadAction<DiagnosticsDateDueActionType>) => {
			const diagnostic = state.filter(n => n.id === action.payload.id)[0];
			diagnostic.dateDue = action.payload.value;
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectSingleDiagnostics: state => state,
		selectASingleDiagnostic: (state, id, type) => {
			if (type === "diagnostic") {
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
} =
	diagnosticsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectSingleDiagnostics,
	selectASingleDiagnostic,
} = diagnosticsSlice.selectors
