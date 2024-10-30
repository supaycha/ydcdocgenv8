import { FormLabel, FormControl, FormGroup, Grid } from '@mui/material'

import { GroupedScreening } from './GroupedScreening';
import { SingleScreening } from './SingleScreening';
import { ToggledScreening } from './ToggledScreening';
import { useAppSelector } from '../../storage/hooks';
import { selectPhysicalInformationGender } from '../physical/physicalinformation/physicalinformationSlice';
import { selectAllGroupScreeningIds } from './groupedscreeningsSlice';
import { selectAllSingleScreeningIds } from './singlescreeningsSlice';
import { selectAllToggledScreeningIds } from './toggledscreeningsSlice';

export function Screenings(
) {
	const physicalInformationGender = useAppSelector(selectPhysicalInformationGender);

	// already filtered for correct gender
	const allSingleScreeningIds = useAppSelector(state => selectAllSingleScreeningIds(state, physicalInformationGender));

	// not filtered for gender yet
	const allGroupScreeningIds = useAppSelector(selectAllGroupScreeningIds);
	const allToggledScreeningIds = useAppSelector(state => selectAllToggledScreeningIds(state, physicalInformationGender));

	return (
		<FormControl
			sx={{
				overflow: "auto",
				width: "100%"
			}}
			component="fieldset"
			variant="standard"
		>
			<FormLabel
				component="legend"
			>
				Choose screenings:
			</FormLabel>
			<FormGroup>
				{allSingleScreeningIds
					.filter(id => (
						id === "Diabetes" ||
						id === "Lipid Panel"
					))
					// .filter(f => (
					// 	f.gender === undefined ||
					// 	f.gender === physicalInformation.filter(n => n.id === "patientGender")[0].value
					// ))
					.map(sScreeningId => {
						return (
							<Grid
								key={sScreeningId}
								item
							>
								<SingleScreening
									id={sScreeningId}
								/>
							</Grid>
						);
					})}
				{/* {allSingleScreenings
					.filter(f => (
						f.id === "Diabetes" ||
						f.id === "Lipid Panel"
					))
					.filter(f => (
						f.gender === undefined ||
						f.gender === physicalInformation.filter(n => n.id === "patientGender")[0].value
					))
					.map(sScreening => {
						return (
							<Grid
								key={sScreening.id}
								item
							>
								<SingleScreening
									screening={sScreening}
								/>
							</Grid>
						);
					})} */}
				{allGroupScreeningIds
					.map(gScreeningId => {
						return (
							<Grid
								key={gScreeningId}
								item
							>
								<GroupedScreening
									id={gScreeningId}
								/>
							</Grid>
						);
					})}
				{allSingleScreeningIds
					.filter(id => (
						id === "Mammogram" ||
						id === "DEXA Scan" ||
						id === "Hepatitis C (1945-1965)" ||
						id === "Lung Cancer (CT)"
					))
					// .filter(f => (
					// 	f.gender === undefined ||
					// 	f.gender === physicalInformationGender
					// ))
					.map(sScreeningId => {
						return (
							<Grid
								key={sScreeningId}
								item
							>
								<SingleScreening
									id={sScreeningId}
								/>
							</Grid>
						);
					})}
				{/* {allSingleScreenings
					.filter(f => (
						f.id === "Mammogram" ||
						f.id === "DEXA Scan" ||
						f.id === "Hepatitis C (1945-1965)" ||
						f.id === "Lung Cancer (CT)"
					))
					.filter(f => (
						f.gender === undefined ||
						f.gender === physicalInformationGender
					))
					.map(sScreening => {
						return (
							<Grid
								key={sScreening.id}
								item
							>
								<SingleScreening
									screening={sScreening}
								/>
							</Grid>
						);
					})} */}
				{allToggledScreeningIds
					// .filter(f => (
					// 	f.gender === undefined ||
					// 	f.gender === physicalInformationGender
					// ))
					.map(tScreeningId => {
						return (
							<Grid
								key={tScreeningId}
								item
							>
								<ToggledScreening
									id={tScreeningId}
								/>
							</Grid>
						);
					})}
				{allSingleScreeningIds
					.filter(id => (
						id === "PSA" ||
						id === "Vision/Glaucoma" ||
						id === "Depression screening (PHQ-9)" ||
						id === "Annual Wellness Exam"
					))
					// .filter(f => (
					// 	f.gender === undefined ||
					// 	f.gender === physicalInformationGender
					// ))
					.map(sScreeningId => {
						return (
							<Grid
								key={sScreeningId}
								item
							>
								<SingleScreening
									id={sScreeningId}
								/>
							</Grid>
						);
					})}
				{/* {allSingleScreenings
					.filter(f => (
						f.id === "PSA" ||
						f.id === "Vision/Glaucoma" ||
						f.id === "Depression screening (PHQ-9)" ||
						f.id === "Annual Wellness Exam"
					))
					.filter(f => (
						f.gender === undefined ||
						f.gender === physicalInformationGender
					))
					.map(sScreening => {
						return (
							<Grid
								key={sScreening.id}
								item
							>
								<SingleScreening
									screening={sScreening}
								/>
							</Grid>
						);
					})} */}
			</FormGroup>
		</FormControl>
	);
};
