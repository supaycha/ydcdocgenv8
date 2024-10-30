import {
	Grid,
	Slider,
} from "@mui/material";

import type { DietQuestionIndivType } from "../../types/types";

interface PageDietRowProps {
	localFunctionalsCopyDietQuestion: DietQuestionIndivType;
	handleDietQuestionChange: (value: number, id: string) => void;
};

export function PageDietRow({
	localFunctionalsCopyDietQuestion,
	handleDietQuestionChange,
}: PageDietRowProps) {
	function onChange(_event: Event, value: number | number[], _activeThumb: number) {
		handleDietQuestionChange(value as number, localFunctionalsCopyDietQuestion.id);
	};

	return (
		<Grid
			id="toplevelgrid-gridrow1"
			container
			item
			key={localFunctionalsCopyDietQuestion.id}
		>
			<Grid
				item
				xs={8}
			>
				{localFunctionalsCopyDietQuestion.description}
			</Grid>
			<Grid
				item
				xs={8}
			>
				<Slider
					value={localFunctionalsCopyDietQuestion.value}
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
