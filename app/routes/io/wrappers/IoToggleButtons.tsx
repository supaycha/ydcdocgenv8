import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import type { Dispatch, MouseEvent, SetStateAction } from "react";
import { useState } from "react";

export type IoToggleButtonsProps = {
	mode: string | null;
	setMode: Dispatch<SetStateAction<string | null>>;
	// onHandleChange: (
	// 	event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
	// 	value: string,
	// 	id: string,
	// 	parentId?: string,
	// ) => void,
};

export function IoToggleButtons({
	mode,
	setMode,
}: IoToggleButtonsProps) {
	// const [mode, setMode] = useState<string | null>('ccpgeneration');

	const handleAlignment = (
		event: MouseEvent<HTMLElement>,
		newAlignment: string | null,
	) => {
		setMode(newAlignment);
	};

	return (
		<ToggleButtonGroup
			value={mode}
			exclusive
			onChange={handleAlignment}
			aria-label="text alignment"
		>
			<ToggleButton
				value="labform"
				aria-label="LAB FORM"
			>
				LAB FORM
			</ToggleButton>
			<ToggleButton
				value="ccpgeneration"
				aria-label="CCP GENERATION"
			>
				CCP GENERATION
			</ToggleButton>
		</ToggleButtonGroup>
	);
}