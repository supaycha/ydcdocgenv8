import { Fragment, useEffect } from "react";
import {
	FormControl,
	FormLabel,
	FormGroup,
	Grid,
} from "@mui/material";

import type { PhysicalActivityType } from "../../types/types";
import { ZodPhysicalActivityType } from "../../types/types_zod";
import { parseZodReaderFriendly } from "../../io/errorhandling/ioZod";
import { PagePhysicalActivityRow } from "./PagePhysicalActivityRow";

interface PagePhysicalActivityProps {
	localFunctionalsCopyPhysicalActivity: PhysicalActivityType;
	handlePhysicalActivityQuestionChange: (value: number, id: string) => void;
};

export function PagePhysicalActivity({
	localFunctionalsCopyPhysicalActivity,
	handlePhysicalActivityQuestionChange,
}: PagePhysicalActivityProps) {
	useEffect(() => {
		parseZodReaderFriendly(ZodPhysicalActivityType, localFunctionalsCopyPhysicalActivity);
		if (localFunctionalsCopyPhysicalActivity === null) {
			throw Error("localFunctionalsCopyPhysicalActivity was null!")
		};
	}, [localFunctionalsCopyPhysicalActivity]);

	return (
		<FormControl
			sx={{ m: 3 }}
			component="fieldset"
			variant="standard"
		>
			<FormLabel
				component="legend"
			>
				Physical Activity
			</FormLabel>
			<FormGroup>
				<Grid
					id="toplevelgrid-physicalactivity"
					container
					rowGap={1}
				>
					{localFunctionalsCopyPhysicalActivity.questions
						.map((localFunctionalsCopyPhysicalActivityQuestion, _index) => {
							return (
								<Fragment
									key={localFunctionalsCopyPhysicalActivityQuestion.id}
								>
									<PagePhysicalActivityRow
										localFunctionalsCopyPhysicalActivityQuestion={localFunctionalsCopyPhysicalActivityQuestion}
										handlePhysicalActivityQuestionChange={handlePhysicalActivityQuestionChange}
									/>
								</Fragment>
							);
						})
					}
				</Grid>
			</FormGroup>
		</FormControl>
	);
};
