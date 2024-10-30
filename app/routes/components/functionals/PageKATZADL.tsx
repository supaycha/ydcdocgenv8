import type { ChangeEvent} from "react";
import { Fragment, useEffect } from "react";
import {
	FormControl,
	FormLabel,
	FormGroup,
	Grid,
	Typography,
} from "@mui/material";

import type { KATZADLType } from "../../types/types";
import { ZodKATZADLType } from "../../types/types_zod";
import { parseZodReaderFriendly } from "../../io/errorhandling/ioZod";
import { PageKATZADLRow } from "./PageKATZADLRow";

interface PageKATZADLProps {
	localFunctionalsCopyKATZADL: KATZADLType;
	handleActivitySwitch: (event: ChangeEvent<HTMLInputElement>, checked: boolean, id: string) => void;
};

export function PageKATZADL({
	localFunctionalsCopyKATZADL,
	handleActivitySwitch,
}: PageKATZADLProps) {
	useEffect(() => {
		parseZodReaderFriendly(ZodKATZADLType, localFunctionalsCopyKATZADL);
		if (localFunctionalsCopyKATZADL === null) {
			throw Error("KATZADL was null!")
		};
	}, [localFunctionalsCopyKATZADL]);

	return (
		<FormControl
			sx={{ m: 3 }}
			component="fieldset"
			variant="standard"
		>
			<FormLabel
				component="legend"
			>
				Activities of Daily Living
			</FormLabel>
			<FormGroup>
				<Grid
					id="toplevelgrid-KATZADL"
					container
					rowGap={1}
				>
					{localFunctionalsCopyKATZADL.activities
						.map((localFunctionalsCopyActivity, _index) => {
							return (
								<Fragment
									key={localFunctionalsCopyActivity.id}
								>
									<PageKATZADLRow
										localFunctionalsCopyActivity={localFunctionalsCopyActivity}
										handleActivitySwitch={handleActivitySwitch}
									/>
								</Fragment>
							);
						})
					}
					<Typography>
						{localFunctionalsCopyKATZADL.total}
					</Typography>
				</Grid>
			</FormGroup>
		</FormControl>
	);
};
