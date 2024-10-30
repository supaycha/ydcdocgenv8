import type { ChangeEvent} from "react";
import { useMemo, useState } from "react";
import { Checkbox, FormControlLabel, Radio } from "@mui/material"
import type { IoInputProps } from "../../types/types";

export type IoFormControlLabelProps = {
	id?: string;
	radio?: boolean;
	which?: string;
	onExternalChange?: (
		event: ChangeEvent<HTMLInputElement>,
		checked: boolean,
		id: string,
		which?: string,
	) => void;
	disabled?: boolean;
};

export function IoFormControlLabel({
	id = "",
	radio = false,
	which,
	onExternalChange,
	disabled = false
}: IoFormControlLabelProps) {
	const [checked, setChecked] = useState(false);
	const inputProps: IoInputProps = useMemo(() => {
		return {
			"data-testid": `${id ? id : "lolz"}-formcontrollabel`,
		};
	}, [id]);
	
	const onChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
		if (onExternalChange) {
			onExternalChange(event, checked, id, which ? which : undefined);
		};
		setChecked(checked);
	};

	return (
		<FormControlLabel
			control={radio ?
				<Radio
				/> :
				<Checkbox
					inputProps={{
						...inputProps,
						"aria-label": "controlled"
					}}
					checked={checked}
					onChange={onChange}
					name={id}
					size="small"
					disabled={disabled}
				/>
			}
			label={id}
		/>
	);
};
