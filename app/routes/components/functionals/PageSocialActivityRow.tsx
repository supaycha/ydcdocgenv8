import {
	Grid,
	Slider,
} from "@mui/material";

import type { SocialActivityQuestionIndivType } from "../../types/types";

interface PageSocialActivityRowProps {
	localFunctionalsCopySocialActivityQuestion: SocialActivityQuestionIndivType;
	handleSocialActivityQuestionChange: (value: number, id: string) => void;
};

export function PageSocialActivityRow({
	localFunctionalsCopySocialActivityQuestion,
	handleSocialActivityQuestionChange,
}: PageSocialActivityRowProps) {
	function onChange(_event: Event, value: number | number[], _activeThumb: number) {
		handleSocialActivityQuestionChange(value as number, localFunctionalsCopySocialActivityQuestion.id);
	};

	return (
		<Grid
			id="toplevelgrid-gridrow1"
			container
			item
			key={localFunctionalsCopySocialActivityQuestion.id}
		>
			<Grid
				item
				xs={8}
			>
				{localFunctionalsCopySocialActivityQuestion.description}
			</Grid>
			<Grid
				item
				xs={8}
			>
				<Slider
					value={localFunctionalsCopySocialActivityQuestion.value}
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
