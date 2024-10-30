import type { ChangeEvent } from "react";
import {
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from "@mui/material";

import type { RiskConditionsType } from "../../../../types/types";

interface PageConditionsProps {
	allRiskConditions: RiskConditionsType;
	handleCheckboxRiskConditions: (
		event: ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => void;
};

export function PageConditions({
	allRiskConditions,
	handleCheckboxRiskConditions,
}: PageConditionsProps) {
	return (
		<FormControl
			sx={{ m: 3 }}
			component="fieldset"
			variant="standard"
		>
			<FormLabel
				component="legend"
			>
				Choose general risk conditions:
			</FormLabel>
			<FormGroup>
				{allRiskConditions
					.filter(a => a.type === "general")
					.map((riskCondition, _index) => {
						return (
							<FormControlLabel
								key={riskCondition.id}
								control={
									<Checkbox
										data-testid={riskCondition.id}
										inputProps={{
											"aria-label": "controlled"
										}}
										checked={riskCondition.checked}
										onChange={handleCheckboxRiskConditions}
										name={riskCondition.id}
										size="small"
									/>
								}
								label={riskCondition.id}
							/>
						);
					})}
			</FormGroup>
			<FormLabel
				component="legend"
			>
				Choose immunocompromising conditions:
			</FormLabel>
			<FormGroup>
				{allRiskConditions
					.filter(a => a.type === "immunocompromising")
					.map((riskCondition, _index) => {
						return (
							<FormControlLabel
								key={riskCondition.id}
								control={
									<Checkbox
										data-testid={riskCondition.id}
										inputProps={{
											"aria-label": "controlled"
										}}
										checked={riskCondition.checked}
										onChange={handleCheckboxRiskConditions}
										name={riskCondition.id}
										size="small"
									/>
								}
								label={riskCondition.id}
							/>
						);
					})}

			</FormGroup>
		</FormControl>
	);
};
