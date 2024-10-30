import {
	Grid,
	Slider,
} from "@mui/material";

import type { PhysicalActivityQuestionIndivType } from "../../types/types";

interface PagePhysicalActivityRowProps {
	localFunctionalsCopyPhysicalActivityQuestion: PhysicalActivityQuestionIndivType;
	handlePhysicalActivityQuestionChange: (value: number, id: string) => void;
};

export function PagePhysicalActivityRow({
	localFunctionalsCopyPhysicalActivityQuestion,
	handlePhysicalActivityQuestionChange,
}: PagePhysicalActivityRowProps) {
	function onChange(_event: Event, value: number | number[], _activeThumb: number) {
		handlePhysicalActivityQuestionChange(value as number, localFunctionalsCopyPhysicalActivityQuestion.id);
	};

	return (
		<Grid
			id="toplevelgrid-gridrow1"
			container
			item
			key={localFunctionalsCopyPhysicalActivityQuestion.id}
		>
			<Grid
				item
				xs={8}
			>
				{localFunctionalsCopyPhysicalActivityQuestion.description}
			</Grid>
			<Grid
				item
				xs={8}
			>
				<Slider
					value={localFunctionalsCopyPhysicalActivityQuestion.value}
					onChange={onChange}
					step={1}
					marks
					min={0}
					max={10}
					valueLabelDisplay="auto"
				/>
			</Grid>
		</Grid>
	);
};
