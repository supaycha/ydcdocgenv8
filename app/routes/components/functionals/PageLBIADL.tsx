import type { MouseEvent } from "react";
import { Fragment, useEffect } from "react";
import {
	List,
	ListItemText,
	ListSubheader,
} from "@mui/material";

import type { LBIADLType } from "../../types/types";
import { ZodLBIADLType } from "../../types/types_zod";
import { parseZodReaderFriendly } from "../../io/errorhandling/ioZod";
import { PageLBIADLNestedList } from "./PageLBIADLNestedList";

interface PageLBIADLProps {
	localFunctionalsCopyLBIADL: LBIADLType;
	handleToggleActivityOption: (
		event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
		localFunctionalsCopyActivityId: string,
		index: number,
	) => void;
};

export function PageLBIADL({
	localFunctionalsCopyLBIADL,
	handleToggleActivityOption,
}: PageLBIADLProps) {
	useEffect(() => {
		parseZodReaderFriendly(ZodLBIADLType, localFunctionalsCopyLBIADL);
		if (localFunctionalsCopyLBIADL === null) {
			throw Error("LBIADL was null!")
		};
	}, [localFunctionalsCopyLBIADL]);

	return (
		<List
			subheader={
				<ListSubheader
					component="div"
					id="lbiadl-list-subheader"
					sx={{
						backgroundColor: "#DEDEDE",
					}}
				>
					Instrumental Activities of Daily Living
				</ListSubheader>
			}
		>
			{localFunctionalsCopyLBIADL.activities
				.map((localFunctionalsCopyActivity, _index) => {
					return (
						<Fragment
							key={localFunctionalsCopyActivity.id}
						>
							<PageLBIADLNestedList
								localFunctionalsCopyActivityId={localFunctionalsCopyActivity.id}
								localFunctionalsCopyActivityOptions={localFunctionalsCopyActivity.options}
								handleToggleActivityOption={handleToggleActivityOption}
							/>
						</Fragment>
					);
				})
			}
			<ListItemText
				primary={localFunctionalsCopyLBIADL.total}
			/>
		</List>
	);
};
