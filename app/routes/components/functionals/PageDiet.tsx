import { Fragment, useEffect } from "react";
import {
	FormControl,
	FormLabel,
	FormGroup,
	Grid,
} from "@mui/material";

import { ZodDietType } from "../../types/types_zod";
import { parseZodReaderFriendly } from "../../io/errorhandling/ioZod";
import { PageDietRow } from "./PageDietRow";
import type { DietType } from "../../types/types";

interface PageDietProps {
	localFunctionalsCopyDiet: DietType;
	handleDietQuestionChange: (value: number, id: string) => void;
};

export function PageDiet({
	localFunctionalsCopyDiet,
	handleDietQuestionChange,
}: PageDietProps) {
	useEffect(() => {
		parseZodReaderFriendly(ZodDietType, localFunctionalsCopyDiet);
		if (localFunctionalsCopyDiet === null) {
			throw Error("Diet was null!")
		};
	}, [localFunctionalsCopyDiet]);

	return (
		<FormControl
			sx={{ m: 3 }}
			component="fieldset"
			variant="standard"
		>
			<FormLabel
				component="legend"
			>
				Diet
			</FormLabel>
			<FormGroup>
				<Grid
					id="toplevelgrid-Diet"
					container
					rowGap={1}
				>
					{localFunctionalsCopyDiet.questions
						.map((localFunctionalsCopyDietQuestion, _index) => {
							return (
								<Fragment
									key={localFunctionalsCopyDietQuestion.id}
								>
									<PageDietRow
										localFunctionalsCopyDietQuestion={localFunctionalsCopyDietQuestion}
										handleDietQuestionChange={handleDietQuestionChange}
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
