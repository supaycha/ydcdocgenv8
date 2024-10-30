import type { ChangeEvent} from "react";
import { Fragment } from "react";
import {
	Typography,
	Grid,
	Switch,
	FormControlLabel,
} from "@mui/material";

import type { KATZADLActivityIndivType } from "../../types/types";

interface PageKATZADLRowProps {
	localFunctionalsCopyActivity: KATZADLActivityIndivType;
	handleActivitySwitch: (event: ChangeEvent<HTMLInputElement>, checked: boolean, id: string) => void;
};

export function PageKATZADLRow({
	localFunctionalsCopyActivity,
	handleActivitySwitch,
}: PageKATZADLRowProps) {
	// useEffect(() => {
	// 	console.log(`activity.checked: `, localFunctionalsCopyActivity.checked);
	// }, [localFunctionalsCopyActivity]);

	return (
		<Grid
			id="toplevelgrid-gridrow1"
			container
			item
			key={localFunctionalsCopyActivity.id}
		>
			<Grid
				container
				item
				xs={2}
			>
				<FormControlLabel
					value={0}
					control={
						<Switch
							checked={localFunctionalsCopyActivity.checked}
							onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) =>
								handleActivitySwitch(event, checked, localFunctionalsCopyActivity.id)}
							inputProps={{ 'aria-label': 'controlled' }}
						/>
					}
					label={localFunctionalsCopyActivity.id}
					labelPlacement="top"
				/>
			</Grid>
			<Grid
				container
				item
				xs={10}
			>
				{localFunctionalsCopyActivity.options
					.map((option, _index) => {
						return (
							<Fragment
								key={option.id}
							>
								<Grid
									container
									item
									xs={6}
								>
									<Grid
										item
										xs={12}
									>
										<Typography>
											{option.id}
										</Typography>
									</Grid>
									<Grid
										item
										xs={12}
									>
										<Typography>
											{option.description}
										</Typography>
									</Grid>
								</Grid>
							</Fragment>
						);
					})
				}
			</Grid>
		</Grid>
	);
};
