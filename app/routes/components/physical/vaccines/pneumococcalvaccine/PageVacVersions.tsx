import type { Dayjs } from "dayjs";
import type { MouseEvent} from "react";
import { Fragment } from "react";
import {
	FormControl,
	FormLabel,
	FormGroup,
	Stack,
	IconButton,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import type { VacVersionsType } from "../../../../types/types";
import { PageVacVersion } from "./PageVacVersion";

interface PageVacVersionsProps {
	localVaccineCopyVersions: VacVersionsType;
	handleAddVaccineVersion: (
		event: MouseEvent<HTMLButtonElement>
	) => void;
	handleRemoveVaccineVersion: (
		event: MouseEvent<HTMLButtonElement>,
		localVaccineCopyVersionId: number,
	) => void;
	handleToggleWhichVaccineVersion: (
		event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
		value: string,
		localVaccineCopyVersionId: number,
	) => void;
	handleDateReceived: (
		value: {
			value: Dayjs | null,
			validationError: string | null,
		},
		id: number,
	) => void;
};

export function PageVacVersions({
	localVaccineCopyVersions,
	handleAddVaccineVersion,
	handleRemoveVaccineVersion,
	handleToggleWhichVaccineVersion,
	handleDateReceived,
}: PageVacVersionsProps) {
	return (
		<FormControl
			sx={{ m: 3 }}
			component="fieldset"
			variant="standard"
		>
			<FormLabel
				component="legend"
			>
				Choose the vaccine types the patient already had:
			</FormLabel>
			<FormGroup>
				<Stack
					rowGap={1}
				>
					<IconButton
						edge="end"
						onClick={handleAddVaccineVersion}
					>
						<AddIcon
							data-testid={`addicon`}
							fontSize="small"
						/>
					</IconButton>
					<Stack
						rowGap={1}
					>
						{localVaccineCopyVersions
							.map((localVaccineCopyVersion, index) => {
								return (
									<Fragment
										key={localVaccineCopyVersion.id}
									>
										<PageVacVersion
											currentIndexInVersionsArr={index.toString()}
											localVaccineCopyVersion={localVaccineCopyVersion}
											handleRemoveVaccineVersion={handleRemoveVaccineVersion}
											handleToggleWhichVaccineVersion={handleToggleWhichVaccineVersion}
											handleDateReceived={handleDateReceived}
										/>
									</Fragment>
								);
							})
						}
					</Stack>
				</Stack>
			</FormGroup>
		</FormControl>
	);
};
