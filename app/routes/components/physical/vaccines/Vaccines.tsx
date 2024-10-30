import { FormLabel, FormControl, FormGroup, Grid } from '@mui/material'

import { BothVaccine } from './BothVaccine';
import { DosesVaccine } from './DosesVaccine';
import { OnlyVaccine } from './OnlyVaccine';
import { PneumococcalVaccine } from './pneumococcalvaccine/PneumococcalVaccine';
import { useAppSelector } from '../../../storage/hooks';
import { selectPneumococcalVaccine } from './pneumococcalvaccine/pneumococcalvaccinesSlice';
import { selectAllBothVaccines } from './bothvaccinesSlice';
import { selectAllDosesVaccines } from './dosesvaccinesSlice';
import { selectAllOnlyVaccines } from './onlyvaccinesSlice';

export function Vaccines(
) {
	const pneumococcalVaccine = useAppSelector(selectPneumococcalVaccine);
	// const a = useAppSelector(selectagerange)
	const allDosesVaccines = useAppSelector(selectAllDosesVaccines);
	const allBothVaccines = useAppSelector(selectAllBothVaccines);
	const allOnlyVaccines = useAppSelector(selectAllOnlyVaccines);

	// useEffect(() => {
	// 	console.log("dateReceived: ", allBothVaccines.filter(a => a.id === "Influenza")[0].dateReceived);
	// }, [allBothVaccines]);
	// useEffect(() => {
	// 	console.log("dateDue: ", allBothVaccines.filter(a => a.id === "Influenza")[0].dateDue);
	// }, [allBothVaccines]);
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
				Choose vaccines:
			</FormLabel>
			<FormGroup>
				{pneumococcalVaccine.ageRange === "" ?
					<></> :
					<Grid
						key={pneumococcalVaccine!.id}
						item
					>
						<PneumococcalVaccine
						// vaccine={pneumococcalVaccine}
						/>
					</Grid>}
				{allBothVaccines.map(bVaccine => {
					return (
						<Grid
							key={bVaccine.id}
							item
						>
							<BothVaccine
								id={bVaccine.id}
							/>
						</Grid>
					);
				})}
				{allOnlyVaccines.map(oVaccine => {
					return (
						<Grid
							key={oVaccine.id}
							item
						>
							<OnlyVaccine
								vaccine={oVaccine}
							/>
						</Grid>
					);
				})}
				{allDosesVaccines.map(dVaccine => {
					return (
						<Grid
							key={dVaccine.id}
							item
						>
							<DosesVaccine
								vaccine={dVaccine}
							/>
						</Grid>
					);
				})}
			</FormGroup>
		</FormControl>
	);
};
