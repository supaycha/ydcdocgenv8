import type { AppStore } from "../../../storage/store";
import { makeStore } from "../../../storage/store";
import type { AppointmentDraftType } from "../../../types/types";

import appointments from '../../../public/administrative/appointments.json';

import {
	appointmentsSlice,
	selectAppointments,
	selectDrAppointment,
	selectLabAppointment,
	setAppointmentDateChange,
	setAppointmentTimeChange,
} from "./appointmentsSlice"

interface LocalTestContext {
	store: AppStore
}

describe<LocalTestContext>("appointments reducer", it => {
	beforeEach<LocalTestContext>(context => {
		const initialState: AppointmentDraftType = appointments;

		const store = makeStore({ appointments: initialState });

		context.store = store;
	});

	it("should handle initial state", () => {
		expect(appointmentsSlice.reducer(undefined, { type: "unknown" })).toStrictEqual(appointments);
	});

	// it("should handle increment", ({ store }) => {
	// 	expect(selectCount(store.getState())).toBe(3)

	// 	store.dispatch(increment())

	// 	expect(selectCount(store.getState())).toBe(4)
	// })

	// it("should handle decrement", ({ store }) => {
	// 	expect(selectCount(store.getState())).toBe(3)

	// 	store.dispatch(decrement())

	// 	expect(selectCount(store.getState())).toBe(2)
	// })

	// it("should handle incrementByAmount", ({ store }) => {
	// 	expect(selectCount(store.getState())).toBe(3)

	// 	store.dispatch(incrementByAmount(2))

	// 	expect(selectCount(store.getState())).toBe(5)
	// })
})
