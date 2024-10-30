import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { useEffect } from 'react';

import { Grid } from '@mui/material'

// import { useAppointments, useAppointmentsDispatch } from './AppointmentsContext';

import { ExternalIoDatePicker } from '../../../io/shells/ExternalIoDatePicker';

import { ExternalIoTimePicker } from '../../../io/shells/ExternalIoTimePicker';
import { useAppDispatch, useAppSelector } from '../../../storage/hooks';
import { selectDrAppointment, selectLabAppointment, setAppointmentDateChange, setAppointmentTimeChange } from './appointmentsSlice'

export type AppointmentsProps = {
};

// eslint-disable-next-line no-empty-pattern
export function Appointments({
}: AppointmentsProps) {
	const drAppointment = useAppSelector(selectDrAppointment);
	const labAppointment = useAppSelector(selectLabAppointment);
	const dispatch = useAppDispatch();

	const handleAppointmentDateChange = (
		value: {
			value: Dayjs | null;
			validationError: string | null;
		},
		id: string,
		key: string,
	) => {
		dispatch(
			setAppointmentDateChange({
				type: "setAppointmentDateChange",
				id: id,
				value: value.value === null ? null : value.value.format('MM/DD/YYYY'),
				key: key
			})
		);
	};

	const handleAppointmentTimeChange = (
		value: {
			value: Dayjs | null;
			validationError: string | null;
		},
		id: string,
		key: string,
	) => {
		dispatch(
			setAppointmentTimeChange({
				type: "setAppointmentTimeChange",
				id: id,
				value: value.value === null ? null : value.value.format("hh:mm A"),
				key: key
			})
		);
	};

	// useEffect(() => {
	// 	console.log(`${appointments.filter(a => a.id === "Dr Olga Appointment")[0].time}`)
	// }, [appointments])

	return (
		<Grid
			id="appointments-toplevelgrid"
			sx={{
				alignContent: "flex-start"
			}}
			item
			container
		>
			<Grid
				id="appointments-toplevelgrid-item-level1-drappointments"
				item
			>
				<ExternalIoDatePicker
					id="Dr Olga Appointment"
					label="Dr. Olga"
					value={dayjs(drAppointment.date)}
					setExternalState={(value: {
						value: Dayjs | null;
						validationError: string | null;
					}) => handleAppointmentDateChange(value, "Dr Olga Appointment", "date")}
				/>
				<ExternalIoTimePicker
					id="Dr Olga Appointment"
					label="Dr. Olga"
					value={dayjs(drAppointment.time, "hh:mm A")}
					setExternalState={(value: {
						value: Dayjs | null;
						validationError: string | null;
					}) => handleAppointmentTimeChange(value, "Dr Olga Appointment", "time")}
				/>
			</Grid>
			<Grid
				id="appointments-toplevelgrid-item-level1-labappointments"
				item
			>
				<ExternalIoDatePicker
					id="Lab Appointment"
					label="Lab"
					value={dayjs(labAppointment.date)}
					setExternalState={(value: {
						value: Dayjs | null;
						validationError: string | null;
					}) => handleAppointmentDateChange(value, "Lab Appointment", "date")}
				/>
				<ExternalIoTimePicker
					id="Lab Appointment"
					label="Lab"
					value={dayjs(labAppointment.time, "hh:mm A")}
					setExternalState={(value: {
						value: Dayjs | null;
						validationError: string | null;
					}) => handleAppointmentTimeChange(value, "Lab Appointment", "time")}
				/>
			</Grid>
		</Grid >
	);
};
