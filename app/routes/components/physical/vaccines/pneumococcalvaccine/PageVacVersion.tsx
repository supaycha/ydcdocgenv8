import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { MouseEvent } from "react";
import { Stack, IconButton, ToggleButtonGroup, ToggleButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { ExternalIoDatePicker } from "../../../../io/shells/ExternalIoDatePicker";
import type { VacVersionIndivType } from "../../../../types/types";

interface PageVacVersionProps {
	currentIndexInVersionsArr: string;
	localVaccineCopyVersion: VacVersionIndivType;
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

export function PageVacVersion({
	currentIndexInVersionsArr,
	localVaccineCopyVersion,
	handleRemoveVaccineVersion,
	handleToggleWhichVaccineVersion,
	handleDateReceived,
}: PageVacVersionProps) {
	return (
		<Stack
			direction="row"
		>
			<IconButton
				edge="end"
				onClick={(event: MouseEvent<HTMLButtonElement>) => handleRemoveVaccineVersion(event, localVaccineCopyVersion.id)}
			>
				<ClearIcon
					fontSize="small"
				/>
			</IconButton>
			<ToggleButtonGroup
				data-testid={`${localVaccineCopyVersion.id}-togglebuttongroup`}
				size="small"
				value={localVaccineCopyVersion.version}
				exclusive
				onChange={(event: MouseEvent<HTMLElement, globalThis.MouseEvent>, value: string) => handleToggleWhichVaccineVersion(event, value, localVaccineCopyVersion.id)}
			>
				<ToggleButton
					data-testid={`${localVaccineCopyVersion.id}-PCV13/PCV15-togglebutton`}
					key={"PCV13/PCV15"}
					value={"PCV13/PCV15"}
				>
					PCV13/PCV15
				</ToggleButton>
				<ToggleButton
					data-testid={`${localVaccineCopyVersion.id}-PCV20-togglebutton`}
					key={"PCV20"}
					value={"PCV20"}
				>
					PCV20
				</ToggleButton>
				<ToggleButton
					data-testid={`${localVaccineCopyVersion.id}-PPSV23-togglebutton`}
					key={"PPSV23"}
					value={"PPSV23"}
				>
					PPSV23
				</ToggleButton>
			</ToggleButtonGroup>
			<ExternalIoDatePicker
				id={currentIndexInVersionsArr}
				label="dateReceived"
				value={dayjs(localVaccineCopyVersion.dateReceived)}
				setExternalState={(
					value: {
						value: Dayjs | null;
						validationError: string | null;
					}
				) => handleDateReceived(value, localVaccineCopyVersion.id)}
			/>
		</Stack>
	);
};