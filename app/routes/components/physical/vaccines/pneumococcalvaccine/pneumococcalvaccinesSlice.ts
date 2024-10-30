import type { Dayjs } from "dayjs"
import type { Draft, PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../../storage/createAppSlice"

import { parseZodReaderFriendly } from "../../../../io/errorhandling/ioZod";
import { ZodPneumococcalVaccineDraftType } from "../../../../types/types_zod";
import { VACCINEVERSIONDOSE_INIT_OBJ } from '../../../../io/functions/iofunctions';
import { createNewExternalState } from './helpers';
import type { AgeRangeType, PneumococcalVaccineDraftType } from "../../../../types/types";

import base from '../../../../public/physical/vaccines/pneumococcalvaccine/base.json';
import fourmonthstosixmonths from '../../../../public/physical/vaccines/pneumococcalvaccine/fourmonthstosixmonths.json';
import sevenmonthstoelevenmonths from '../../../../public/physical/vaccines/pneumococcalvaccine/sevenmonthstoelevenmonths.json';
import twelvemonthstotwentythreemonths from '../../../../public/physical/vaccines/pneumococcalvaccine/twelvemonthstotwentythreemonths.json';
import twentyfourmonthstofiftyninemonths from '../../../../public/physical/vaccines/pneumococcalvaccine/twentyfourmonthstofiftyninemonths.json';
import sixtoeighteen from '../../../../public/physical/vaccines/pneumococcalvaccine/sixtoeighteen.json';
import nineteentosixtyfour from '../../../../public/physical/vaccines/pneumococcalvaccine/nineteentosixtyfour.json';
import sixtyfiveandup from '../../../../public/physical/vaccines/pneumococcalvaccine/sixtyfiveandup.json';

const init = base as PneumococcalVaccineDraftType;
init.fourmonthstosixmonths = fourmonthstosixmonths;
init.sevenmonthstoelevenmonths = sevenmonthstoelevenmonths;
init.twelvemonthstotwentythreemonths = twelvemonthstotwentythreemonths;
init.twentyfourmonthstofiftyninemonths = twentyfourmonthstofiftyninemonths;
init.sixtoeighteen = sixtoeighteen;
init.nineteentosixtyfour = nineteentosixtyfour;
init.sixtyfiveandup = sixtyfiveandup;

export interface PneumococcalVaccinesSetNewStateActionType {
	type: string;
	value: PneumococcalVaccineDraftType;
};

export interface PneumococcalVaccinesAddVaccineVersionsActionType {
	type: string;
	dob: string | null;
};

export interface PneumococcalVaccinesRemoveVaccineVersionsActionType {
	type: string;
	dob: string | null;
	id: number;
};

export interface PneumococcalVaccinesToggleWhichVaccineVersionActionType {
	type: string;
	dob: string | null;
	id: number;
	value: string;
};

export interface PneumococcalVaccinesSetCheckboxRiskConditionsActionType {
	type: string;
	dob: string | null;
	ageRange: string;
	eventName: string;
	checkboxChecked: boolean;
};

export interface PneumococcalVaccinesSetDateReceivedActionType {
	type: string;
	dob: string | null;
	id: number;
	value: Dayjs | null;
};

export interface PneumococcalVaccinesSetInvalidAgeKeyActionType {
	type: string;
	value: boolean;
};

export interface PneumococcalVaccinesSetAgeRangeKeyActionType {
	type: string;
	value: string;
};

export interface PneumococcalVaccinesCheckboxActionType {
	type: string;
	value: boolean;
};

export interface PneumococcalVaccinesDateReceivedActionType {
	type: string;
	id: string;
	value: string | null;
};

/**
 * initial state has properties set to null and reset triggers error unless checked beforehand
 */
function resetExternalStateProperty(draftProperty: AgeRangeType | null) {
	if (draftProperty !== null) {
		draftProperty = {
			riskConditions: draftProperty.riskConditions.map(riskCondition => {
				return {
					...riskCondition,
					checked: false,
				}
			}),
			recommendations: draftProperty.recommendations.map(recommendation => {
				return {
					...recommendation,
					possibleNextVaccines: recommendation.possibleNextVaccines.map(possibleNextVaccine => {
						return {
							...possibleNextVaccine,
							statements: possibleNextVaccine.statements.map(statement => {
								return {
									...statement,
									value: (recommendation.id === "novaccinestaken" &&
										statement.id === "no risk conditions"),
								};
							}),
						};
					}),
				};
			}),
		};
	};
};

/**
 * differs from all resetLocalState functions since assigning to self, as opposed to from prev to draft
 */
function resetExternalState(draft: Draft<PneumococcalVaccineDraftType>) {
	// draft.checked = false;
	draft.versions = [];
	resetExternalStateProperty(draft.fourmonthstosixmonths);
	resetExternalStateProperty(draft.sevenmonthstoelevenmonths);
	resetExternalStateProperty(draft.twelvemonthstotwentythreemonths);
	resetExternalStateProperty(draft.twentyfourmonthstofiftyninemonths);
	resetExternalStateProperty(draft.sixtoeighteen);
	resetExternalStateProperty(draft.nineteentosixtyfour);
	resetExternalStateProperty(draft.sixtyfiveandup);
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const pneumococcalVaccinesSlice = createAppSlice({
	name: "pneumococcalVaccines",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (init as PneumococcalVaccineDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		addVaccineVersions: create.reducer((state, action: PayloadAction<PneumococcalVaccinesAddVaccineVersionsActionType>) => {
			state.versions = [
				...state.versions,
				VACCINEVERSIONDOSE_INIT_OBJ(state.versions.length)
			];
			return createNewExternalState(state, action.payload.dob, state.ageRange);
		}),
		removeVaccineVersions: create.reducer((state, action: PayloadAction<PneumococcalVaccinesRemoveVaccineVersionsActionType>) => {
			state.versions = state.versions.filter(version => {
				return version.id !== action.payload.id;
			});
			state.versions.forEach((version, index) => {
				version.id = index;
			});
			return createNewExternalState(state, action.payload.dob, state.ageRange);
		}),
		toggleWhichVaccineVersion: create.reducer((state, action: PayloadAction<PneumococcalVaccinesToggleWhichVaccineVersionActionType>) => {
			state.versions.forEach(version => {
				if (version.id === action.payload.id) {
					version.version = action.payload.value;
				};
			});
			return createNewExternalState(state, action.payload.dob, state.ageRange);
		}),
		setCheckboxRiskConditions: create.reducer((state, action: PayloadAction<PneumococcalVaccinesSetCheckboxRiskConditionsActionType>) => {
			(state[action.payload.ageRange] as AgeRangeType).riskConditions = (state[action.payload.ageRange] as AgeRangeType).riskConditions.map(p => {
				if (p.id === action.payload.eventName) {
					return {
						...p,
						checked: action.payload.checkboxChecked,
					};
				}
				else {
					return p;
				};
			});
			return createNewExternalState(state, action.payload.dob, state.ageRange);
		}),
		setDateReceived: create.reducer((state, action: PayloadAction<PneumococcalVaccinesSetDateReceivedActionType>) => {
			state.versions = state.versions.map(p => {
				if (p.id === action.payload.id) {
					return {
						...p,
						dateReceived: action.payload.value === null ? null : action.payload.value.format('MM/DD/YYYY'),
					};
				}
				else {
					return p;
				};
			});
			return createNewExternalState(state, action.payload.dob, state.ageRange);
		}),
		setInValidAge: create.reducer((state, action: PayloadAction<PneumococcalVaccinesSetInvalidAgeKeyActionType>) => {
			state.invalidAge = action.payload.value;
		}),
		setAgeRangeKey: create.reducer((state, action: PayloadAction<PneumococcalVaccinesSetAgeRangeKeyActionType>) => {
			state.ageRange = action.payload.value === null ? "" : action.payload.value;
		}),
		setCheckbox: create.reducer((state, action: PayloadAction<PneumococcalVaccinesCheckboxActionType>) => {
			state.checked = action.payload.value;
			resetExternalState(state);
		}),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectPneumococcalVaccine: state => state,
	},
})

// Action creators are generated for each case reducer function.
export const {
	addVaccineVersions,
	removeVaccineVersions,
	toggleWhichVaccineVersion,
	setCheckboxRiskConditions,
	setDateReceived,
	setInValidAge,
	setAgeRangeKey,
	setCheckbox,
} = pneumococcalVaccinesSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectPneumococcalVaccine,
} = pneumococcalVaccinesSlice.selectors
