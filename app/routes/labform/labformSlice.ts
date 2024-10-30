// import dayjs from "dayjs";
import { type PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../storage/createAppSlice"

import { ZodLabFormDraftType } from "../types/types_zod";
import { parseZodReaderFriendly } from "../io/errorhandling/ioZod";
import labform from "../public/labform/base.json";
import type { LabFormDraftType } from "../types/types";

parseZodReaderFriendly(ZodLabFormDraftType, labform);

export interface LabFormAddLabActionType {
	type: string;
};

export interface LabFormAddICD10CodeActionType {
	type: string;
	parentId: number;
};

export interface LabFormRemoveLabActionType {
	type: string;
	parentId: number;
};

export interface LabFormRemoveICD10CodeActionType {
	type: string;
	id: number;
};

export interface LabFormSetRowTextChangeActionType {
	type: string;
	id: number;
	textfieldid: string;
	value: string;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const labFormSlice = createAppSlice({
	name: "labform",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (labform as LabFormDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		addLab: create.reducer((state, action: PayloadAction<LabFormAddLabActionType>) => {
			const newItemId = state.itemIdCounter + 1;
			state.items.byId[newItemId.toString()] = {
				"id": newItemId,
				"name": `Item ${newItemId}`,
				"subitemIds": [],
				"textfield1": "",
				"textfield2": ""
			};
			state.items.allIds.push(newItemId);
			state.itemIdCounter = newItemId;
		}),
		addICD10Code: create.reducer((state, action: PayloadAction<LabFormAddICD10CodeActionType>) => {
			const newSubItemId = state.subItemIdCounter + 1;
			state.subitems.byId[newSubItemId.toString()] = {
				"id": newSubItemId,
				"name": `Subitem ${newSubItemId}`,
				"parentId": action.payload.parentId,
				"textfield1": "",
				"textfield2": ""
			};
			state.subitems.allIds.push(newSubItemId);
			state.items.byId[action.payload.parentId.toString()].subitemIds.push(newSubItemId);
			state.subItemIdCounter = newSubItemId;
		}),
		removeLab: create.reducer((state, action: PayloadAction<LabFormRemoveLabActionType>) => {
			const itemId = action.payload.parentId;
			const item = state.items.byId[itemId];

			if (!item) return;

			item.subitemIds.forEach(subitemId => {
				delete state.subitems.byId[subitemId];
				state.subitems.allIds = state.subitems.allIds.filter(id => id !== subitemId);
			});

			delete state.items.byId[itemId];
			state.items.allIds = state.items.allIds.filter(id => id !== itemId);
		}),
		removeICD10Code: create.reducer((state, action: PayloadAction<LabFormRemoveICD10CodeActionType>) => {
			const subitemId = action.payload.id;
			const subitem = state.subitems.byId[subitemId];

			if (!subitem) return;

			const parentItem = state.items.byId[subitem.parentId];

			if (!parentItem) return;

			parentItem.subitemIds = parentItem.subitemIds.filter(id => id !== subitemId);

			delete state.subitems.byId[subitemId];
			state.subitems.allIds = state.subitems.allIds.filter(id => id !== subitemId);
		}),
		setRowTextChange: create.reducer((state, action: PayloadAction<LabFormSetRowTextChangeActionType>) => {
			const itemId = action.payload.id;
			const textfieldId = action.payload.textfieldid;
			const item = state.items.byId[itemId];

			if (textfieldId === "textfield1") {
				item.textfield1 = action.payload.value;
			}
			else {
				item.textfield2 = action.payload.value;	
			};
		}),
		setSubRowTextChange: create.reducer((state, action: PayloadAction<LabFormSetRowTextChangeActionType>) => {
			const subitemId = action.payload.id;
			const textfieldId = action.payload.textfieldid;
			const subitem = state.subitems.byId[subitemId];

			if (textfieldId === "textfield1") {
				subitem.textfield1 = action.payload.value;
			}
			else {
				subitem.textfield2 = action.payload.value;	
			};
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectLabForm: state => state,
		selectAllLabFormRows: (state) => {
			const ids = state.items.allIds;
			return ids;
		},
		selectALabFormRow: (state, rowId) => {
			const selected = state.items.byId[rowId];
			return selected;
		},
		selectALabFormSubRow: (state, subrowId) => {
			const selected = state.subitems.byId[subrowId];
			return selected;
		},
	},
})

// Action creators are generated for each case reducer function.
export const {
	addLab,
	addICD10Code,
	removeLab,
	removeICD10Code,
	setRowTextChange,
	setSubRowTextChange,
} = labFormSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectLabForm,
	selectAllLabFormRows,
	selectALabFormRow,
	selectALabFormSubRow,
} = labFormSlice.selectors
