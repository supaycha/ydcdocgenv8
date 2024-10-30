import { Fragment, useEffect } from "react";
import {
	FormControl,
	FormLabel,
	FormGroup,
	Grid,
} from "@mui/material";

import type { SocialActivityType } from "../../types/types";
import { ZodSocialActivityType } from "../../types/types_zod";
import { parseZodReaderFriendly } from "../../io/errorhandling/ioZod";
import { PageSocialActivityRow } from "./PageSocialActivityRow";

interface PageSocialActivityProps {
	localFunctionalsCopySocialActivity: SocialActivityType;
	handleSocialActivityQuestionChange: (value: number, id: string) => void;
};

export function PageSocialActivity({
	localFunctionalsCopySocialActivity,
	handleSocialActivityQuestionChange,
}: PageSocialActivityProps) {
	useEffect(() => {
		parseZodReaderFriendly(ZodSocialActivityType, localFunctionalsCopySocialActivity);
		if (localFunctionalsCopySocialActivity === null) {
			throw Error("ZodSocialActivityType was null!")
		};
	}, [localFunctionalsCopySocialActivity]);

	return (
		<FormControl
			sx={{ m: 3 }}
			component="fieldset"
			variant="standard"
		>
			<FormLabel
				component="legend"
			>
				Social Activity
			</FormLabel>
			<FormGroup>
				<Grid
					id="toplevelgrid-socialactivity"
					container
					rowGap={1}
				>
					{localFunctionalsCopySocialActivity.questions
						.map((localFunctionalsCopySocialActivityQuestion, _index) => {
							return (
								<Fragment
									key={localFunctionalsCopySocialActivityQuestion.id}
								>
									<PageSocialActivityRow
										localFunctionalsCopySocialActivityQuestion={localFunctionalsCopySocialActivityQuestion}
										handleSocialActivityQuestionChange={handleSocialActivityQuestionChange}
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
