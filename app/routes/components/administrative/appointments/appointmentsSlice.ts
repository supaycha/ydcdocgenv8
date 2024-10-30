import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../storage/createAppSlice"
import type { AppThunk } from "../../../storage/store"

import appointments from '../../../public/administrative/appointments.json';
import type { AppointmentDraftType, AppointmentIndivType } from "../../../types/types";

export interface AppointmentsDateActionType {
	type: string;
	id: string,
	value: string | null;
	key: string;
};

export interface AppointmentsTimeActionType {
	type: string;
	id: string,
	value: string | null;
	key: string;
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const appointmentsSlice = createAppSlice({
	name: "appointments",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState: (appointments as AppointmentDraftType),
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: create => ({
		setAppointmentDateChange: create.reducer((state, action: PayloadAction<AppointmentsDateActionType>) => {
			// const narrowedAction = action as AppointmentsDateActionType;
			const appointmentsItem = state.filter(n => n.id === action.payload.id)[0] as AppointmentIndivType;

			appointmentsItem[action.payload.key] = action.payload.value;
			// break;
		}),
		setAppointmentTimeChange: create.reducer((state, action: PayloadAction<AppointmentsTimeActionType>) => {
			// console.log(`appointmentsSlice.setAppointmentTimeChange: ${action.payload.value}`)
			// const narrowedAction = action as AppointmentsTimeActionType;
			const appointmentsItem = state.filter(n => n.id === action.payload.id)[0] as AppointmentIndivType;

			appointmentsItem[action.payload.key] = action.payload.value;
			// break;
		}),
		// increment: create.reducer(state => {
		// 	// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// 	// doesn't actually mutate the state because it uses the Immer library,
		// 	// which detects changes to a "draft state" and produces a brand new
		// 	// immutable state based off those changes
		// 	state.value += 1
		// }),
		// decrement: create.reducer(state => {
		// 	state.value -= 1
		// }),
		// // Use the `PayloadAction` type to declare the contents of `action.payload`
		// incrementByAmount: create.reducer(
		// 	(state, action: PayloadAction<number>) => {
		// 		state.value += action.payload
		// 	},
		// ),
		// // The function below is called a thunk and allows us to perform async logic. It
		// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
		// // will call the thunk with the `dispatch` function as the first argument. Async
		// // code can then be executed and other actions can be dispatched. Thunks are
		// // typically used to make async requests.
		// incrementAsync: create.asyncThunk(
		// 	async (amount: number) => {
		// 		const response = await fetchCount(amount)
		// 		// The value we return becomes the `fulfilled` action payload
		// 		return response.data
		// 	},
		// 	{
		// 		pending: state => {
		// 			state.status = "loading"
		// 		},
		// 		fulfilled: (state, action) => {
		// 			state.status = "idle"
		// 			state.value += action.payload
		// 		},
		// 		rejected: state => {
		// 			state.status = "failed"
		// 		},
		// 	},
		// ),
	}),
	// You can define your selectors here. These selectors receive the slice
	// state as their first argument.
	selectors: {
		selectAppointments: state => state,
		selectDrAppointment: appointments => (appointments.filter(a => a.id === "Dr Olga Appointment")[0]),
		selectLabAppointment: appointments => (appointments.filter(a => a.id === "Lab Appointment")[0]),
		// selectStatus: appointments => appointments.status,
	},
})

// Action creators are generated for each case reducer function.
export const {
	setAppointmentDateChange,
	setAppointmentTimeChange,
} =
	appointmentsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
	selectAppointments,
	selectDrAppointment,
	selectLabAppointment,
} = appointmentsSlice.selectors

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
// 	(amount: number): AppThunk =>
// 		(dispatch, getState) => {
// 			const currentValue = selectCount(getState())

// 			if (currentValue % 2 === 1 || currentValue % 2 === -1) {
// 				dispatch(incrementByAmount(amount))
// 			}
// 		}
