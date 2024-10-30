import type { ChangeEvent } from 'react';
import {
	FormControlLabel,
	Radio,
	RadioGroup,
	Grid,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../storage/hooks';
import { ExternalIoNumberField } from '../../../io/shells/ExternalIoNumberField';
import { selectPhysicalInformation, setNumChange } from './physicalinformationSlice';



interface CoverPageProps {
};

// eslint-disable-next-line no-empty-pattern
export function PhysicalInformation({
}: CoverPageProps) {
	const physicalInformation = useAppSelector(selectPhysicalInformation);
	const dispatch = useAppDispatch();

	const handleTextChange = (value: string, id: string) => {
		dispatch(
			setNumChange({
				type: "setNumChange",
				id: id,
				value: Number.isNaN(Number(value)) ? 0 : Number(value),
			})
		);
	};

	const handleRadioButtonChange = (
		event: ChangeEvent<HTMLInputElement>,
		value: string
	) => {
		dispatch(
			setNumChange({
				type: "setNumChange",
				id: "patientGender",
				value: Number(value),
			})
		);
	};

	return (
		<Grid
			id="physicalinformation-toplevelgrid"
			sx={{
				alignContent: "flex-start"
			}}
			item
			container
		>
			<Grid
				id="physicalinformation-toplevelgrid-item-container-level1-info1"
				item
				container
				xs={3}
				alignContent="flex-start"
			>
				<Grid
					item
				>
					<ExternalIoNumberField
						id="patientHeight" // inches
						label="Patient Height"
						value={physicalInformation.filter(p => p.id === "patientHeight")[0].value.toString()}
						setExternalState={handleTextChange}
					/>
				</Grid>
				<Grid
					item
				>
					<ExternalIoNumberField
						id="patientWeight" // pounds
						label="Patient Weight"
						value={physicalInformation.filter(p => p.id === "patientWeight")[0].value.toString()}
						setExternalState={handleTextChange}
					/>
				</Grid>
				<Grid
					item
				>
					<ExternalIoNumberField
						id="patientBMI"
						label="Patient BMI"
						value={physicalInformation.filter(p => p.id === "patientBMI")[0].value.toString()}
						setExternalState={handleTextChange}
					/>
				</Grid>
			</Grid>
			<Grid
				id="physicalinformation-toplevelgrid-item-container-level1-info2"
				item
				container
				xs={3}
				alignContent="flex-start"
			>
				<Grid
					item
				>
					<ExternalIoNumberField
						id="patientBloodPressure"
						label="Patient Blood Pressure"
						value={physicalInformation.filter(p => p.id === "patientBloodPressure")[0].value.toString()}
						setExternalState={handleTextChange}
					/>
				</Grid>
				<Grid
					item
				>
					<ExternalIoNumberField
						id="GFR"
						label="GFR"
						value={physicalInformation.filter(p => p.id === "GFR")[0].value.toString()}
						setExternalState={handleTextChange}
					/>
				</Grid>
			</Grid>
			<Grid
				id="physicalinformation-toplevelgrid-item-container-level1-info3"
				item
				container
				sx={{
					alignContent: "space-between",
				}}
			>
				<Grid
					item
				>
					<RadioGroup
						sx={{
							padding: 0,
						}}
						id="patientGender"
						name="Gender"
						value={(physicalInformation.filter(n => n.id === "patientGender")[0].value as number)}
						onChange={handleRadioButtonChange}
					>
						<FormControlLabel
							value={2}
							control={<Radio size="small" />}
							label="Female"
						/>
						<FormControlLabel
							value={1}
							control={<Radio size="small" />}
							label="Male"
						/>
					</RadioGroup>
				</Grid>
				<Grid
					item
				>
					<ExternalIoNumberField
						id="visualAcuity"
						label="Visual Acuity"
						value={physicalInformation.filter(p => p.id === "visualAcuity")[0].value.toString()}
						setExternalState={handleTextChange}
					/>
				</Grid>
			</Grid>
		</Grid >
	);
};
