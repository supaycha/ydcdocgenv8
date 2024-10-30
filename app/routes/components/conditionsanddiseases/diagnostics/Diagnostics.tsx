import { FormLabel, FormControl, FormGroup, Grid } from '@mui/material'

import { SingleDiagnostic } from './SingleDiagnostic';
import { useAppSelector } from '../../../storage/hooks';
import { selectSingleDiagnostics } from './diagnosticsSlice';

export function Diagnostics(
) {
	const allSingleDiagnostics = useAppSelector(selectSingleDiagnostics);
	// const physicalInformation = useAppSelector(selectPhysicalInformation);

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
				Choose diagnostics:
			</FormLabel>
			<FormGroup>
				{allSingleDiagnostics
					.filter(f => (
						f.id === "Diabetes" ||
						f.id === "Lipid Panel" ||
						f.id === "Colon/Cancer" ||
						f.id === "Mammogram" ||
						f.id === "DEXA Scan" ||
						f.id === "PSA" ||
						f.id === "Vision/Glaucoma"
					))
					// .filter(f => f.gender === undefined || f.gender === physicalInformation.filter(n => n.id === "patientGender")[0].value)
					.map(sDiagnostic => {
						return (
							<Grid
								key={sDiagnostic.id}
								item
							>
								<SingleDiagnostic
									// key={sDiagnostic.id}
									id={sDiagnostic.id}
								/>
							</Grid>
						);
					})}
			</FormGroup>
		</FormControl>
	);
};
