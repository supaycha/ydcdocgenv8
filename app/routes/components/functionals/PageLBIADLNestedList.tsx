import type { MouseEvent } from "react";
import {
	ListItemButton,
	ListItemText,
	ListItem,
	ListItemIcon,
	Checkbox,
} from "@mui/material";

import type { LBIADLActivityOptionsType } from "../../types/types";

interface PageLBIADLNestedListProps {
	localFunctionalsCopyActivityId: string;
	localFunctionalsCopyActivityOptions: LBIADLActivityOptionsType;
	handleToggleActivityOption: (
		event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
		localFunctionalsCopyActivityId: string,
		index: number,
	) => void;
};

export function PageLBIADLNestedList({
	localFunctionalsCopyActivityId,
	localFunctionalsCopyActivityOptions,
	handleToggleActivityOption,
}: PageLBIADLNestedListProps) {
	return (
		<>
			<ListItemText
				primary={localFunctionalsCopyActivityId}
			/>
			{localFunctionalsCopyActivityOptions.map((option, index) => {
				return (
					<ListItem
						key={`${localFunctionalsCopyActivityId}-${index}`}
						disablePadding
					>
						<ListItemButton
							role={undefined}
							onClick={(event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) =>
								handleToggleActivityOption(event, localFunctionalsCopyActivityId, index)}
							dense
						>
							<ListItemIcon>
								<Checkbox
									edge="start"
									checked={option.checked}
									tabIndex={-1}
									disableRipple
								/>
							</ListItemIcon>
							<ListItemText
								id={`option-${index + 1}`}
								primary={option.description}
							/>
						</ListItemButton>
					</ListItem>
				);
			})}
		</>
	);
};
