import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { useEffect, useMemo } from 'react';

import { Grid } from '@mui/material'

import { ExternalIoDatePicker } from '../../../io/shells/ExternalIoDatePicker';
import { ExternalIoNumberField } from '../../../io/shells/ExternalIoNumberField';

// import { usePneumococcalVaccineDispatch } from 'src/components/physical/vaccines/PneumococcalVaccine/PneumococcalVaccineContext';
// import { useDemographics, useDemographicsDispatch } from './DemographicsContext';
import { useAppDispatch, useAppSelector } from "../../../storage/hooks"

// import { parseZodReaderFriendly } from '../../../io/errorhandling/ioZod';
import type { DemographicsStrIndivType } from '../../../types/types';
// import { ZodDemographicsDraftType } from '../../../types/types_zod';

import {
	selectDateOfEstablishment,
	selectDOB,
	selectAccountNumber,
	setTextChange,
	setDateChange,
} from './demographicsSlice';
import { setAgeRangeKey } from '../../physical/vaccines/pneumococcalvaccine/pneumococcalvaccinesSlice';

export type DemographicsProps = {
};

// eslint-disable-next-line no-empty-pattern
export function Demographics({
}: DemographicsProps) {
	const dateOfEstablishment = useAppSelector(selectDateOfEstablishment);
	const dateOfBirth = useAppSelector(selectDOB);
	const accountNumber = useAppSelector(selectAccountNumber);

	const dispatch = useAppDispatch();
	// const dispatchPneumococcalVaccine = usePneumococcalVaccineDispatch();

	const ageInMonths = useMemo(() => {
		// parseZodReaderFriendly(ZodDemographicsDraftType, demographics);
		const dobToAge = dayjs().diff(dayjs(dateOfBirth), "months");
		return dobToAge;
	}, [dateOfBirth]);

	const inValidAge = useMemo(() => {
		if (ageInMonths < 4) {
			return true;
		};

		return false;
	}, [ageInMonths]);

	const ageRangeKey = useMemo(() => {
		if (inValidAge) {
			return null;
		}
		else {
			if (228 <= ageInMonths && ageInMonths <= 768) { // 19-64
				return "nineteentosixtyfour";
			}
			else if (72 <= ageInMonths && ageInMonths <= 216) { // 6-18
				return "sixtoeighteen";
			}
			else if (24 <= ageInMonths && ageInMonths <= 59) {
				return "twentyfourmonthstofiftyninemonths";
			}
			else if (12 <= ageInMonths && ageInMonths <= 23) {
				return "twelvemonthstotwentythreemonths";
			}
			else if (7 <= ageInMonths && ageInMonths <= 11) {
				return "sevenmonthstoelevenmonths";
			}
			else if (4 <= ageInMonths && ageInMonths <= 6) {
				return "fourmonthstosixmonths";
			}

			return "sixtyfiveandup";
		};
	}, [inValidAge, ageInMonths]);

	// useEffect(() => {
	// 	dispatchPneumococcalVaccine({
	// 		type: "setInValidAge",
	// 		value: inValidAge,
	// 	});
	// }, [dispatchPneumococcalVaccine, inValidAge]);


	useEffect(() => {
		dispatch(
			setAgeRangeKey({
				type: "setAgeRangeKey",
				value: ageRangeKey!,
			})
		);
		// dispatchPneumococcalVaccine({
		// 	type: "changeInitState",
		// 	value: ageRangeKey,
		// });
	}, [dispatch, ageRangeKey]);

	const handleTextChange = (value: string, id: string) => {
		dispatch(
			setTextChange({
				type: "setTextChange",
				id: id,
				value: value,
			})
		);
	};

	const handleDateChange = (
		value: {
			value: Dayjs | null;
			validationError: string | null;
		},
		id: string,
	) => {
		dispatch(
			setDateChange({
				type: "setDateChange",
				id: id,
				value: value.value === null ? null : value.value.format('MM/DD/YYYY'),
			})
		);
	};

	return (
		<Grid
			id="demographics-toplevelgrid"
			sx={{
				alignContent: "flex-start"
			}}
			item
			container
		>
			<Grid
				id="demographics-toplevelgrid-item-container-level1-dates"
				item
				container
			>
				<Grid
					item
				>
					<ExternalIoDatePicker
						id="dateOfEstablishment"
						label="Date of Establishment"
						value={dayjs(dateOfEstablishment)}
						// value={dayjs(demographics.filter((d: { id: string; }) => d.id === "dateOfEstablishment")[0].value)}
						setExternalState={(value: {
							value: Dayjs | null;
							validationError: string | null;
						}) => handleDateChange(value, "dateOfEstablishment")}
					/>
				</Grid>
				<Grid
					item
				>
					<ExternalIoDatePicker
						id="dateOfBirth"
						label="Date of Birth"
						value={dayjs(dateOfBirth)}
						// value={dayjs(demographics.filter((d: { id: string; }) => d.id === "dateOfBirth")[0].value)}
						setExternalState={(value: {
							value: Dayjs | null;
							validationError: string | null;
						}) => handleDateChange(value, "dateOfBirth")}
					/>
				</Grid>
			</Grid>
			<Grid
				id="demographics-toplevelgrid-item-container-level1-accountnum"
				item
				container
			>
				<Grid
					item
				>
					<ExternalIoNumberField
						id="accountNum"
						label="Account Num"
						value={accountNumber}
						// value={(demographics.filter((d: { id: string; }) => d.id === "accountNum")[0] as DemographicsStrIndivType).value}
						setExternalState={handleTextChange}
					/>
				</Grid>
			</Grid>
		</Grid >
	);
};
