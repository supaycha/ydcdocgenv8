import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { appointmentsSlice } from "../components/administrative/appointments/appointmentsSlice"
import { demographicsSlice } from "../components/administrative/demographics/demographicsSlice"
import { physiciansSlice } from "../components/administrative/physicians/physiciansSlice"
import { conditionsSlice } from "../components/conditionsanddiseases/conditions/conditionsSlice"
import { diagnosticsSlice } from "../components/conditionsanddiseases/diagnostics/diagnosticsSlice"
import { socialDrugHistorySlice } from "../components/conditionsanddiseases/socialdrughistory/socialdrughistorySlice"
import { functionalsSlice } from "../components/functionals/functionalsSlice"
import { medicationAllergiesSlice } from "../components/medications/medicationAllergiesSlice"
import { medicationsSlice } from "../components/medications/medicationsSlice"
import { physicalInformationSlice } from "../components/physical/physicalinformation/physicalinformationSlice"
import { pneumococcalVaccinesSlice } from "../components/physical/vaccines/pneumococcalvaccine/pneumococcalvaccinesSlice"
import { bothVaccinesSlice } from "../components/physical/vaccines/bothvaccinesSlice"
import { dosesVaccinesSlice } from "../components/physical/vaccines/dosesvaccinesSlice"
import { onlyVaccinesSlice } from "../components/physical/vaccines/onlyvaccinesSlice"
import { groupedScreeningsSlice } from "../components/screenings/groupedscreeningsSlice"
import { singleScreeningsSlice } from "../components/screenings/singlescreeningsSlice"
import { toggledScreeningsSlice } from "../components/screenings/toggledscreeningsSlice"
import { socialDeterminantsSlice } from "../components/socialdeterminants/socialdeterminantsSlice"
import { labFormSlice } from "../labform/labformSlice"

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
	appointmentsSlice,
	demographicsSlice,
	physiciansSlice,
	conditionsSlice,
	diagnosticsSlice,
	socialDrugHistorySlice,
	functionalsSlice,
	medicationAllergiesSlice,
	medicationsSlice,
	physicalInformationSlice,
	pneumococcalVaccinesSlice,
	bothVaccinesSlice,
	dosesVaccinesSlice,
	onlyVaccinesSlice,
	groupedScreeningsSlice,
	singleScreeningsSlice,
	toggledScreeningsSlice,
	socialDeterminantsSlice,
	labFormSlice,
);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
	const store = configureStore({
		reducer: rootReducer,
		// Adding the api middleware enables caching, invalidation, polling,
		// and other useful features of `rtk-query`.
		middleware: getDefaultMiddleware => {
			return getDefaultMiddleware().concat()
		},
		preloadedState,
	})
	// configure listeners using the provided defaults
	// optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
	setupListeners(store.dispatch)
	return store
}

export const store = makeStore()

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>
