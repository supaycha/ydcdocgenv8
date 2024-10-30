import type { ChangeEvent, MouseEvent} from "react";
import { useMemo } from "react";
import { Button, Checkbox, FormControlLabel, Modal } from "@mui/material"
import type { IoInputProps } from "../../types/types";

interface IoModalOnFormControlLabelCheckboxProps {
	id: string;
	checked: boolean;
	submitted: boolean;
	invalidAge: boolean;
	open: boolean;
	handleCheckbox: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
	handleClose: (event: object, reason: "backdropClick" | "escapeKeyDown") => void;
	isEditIcon?: boolean;
	children: JSX.Element;
};

export function IoModalOnFormControlLabelCheckbox({
	id,
	checked,
	submitted,
	invalidAge,
	open,
	handleCheckbox,
	handleClick,
	handleClose,
	children,
}: IoModalOnFormControlLabelCheckboxProps) {
	const backgroundColor = useMemo(() => {
		if (checked && submitted) {
			return 'green';
		}
		else if (checked && !submitted) {
			return 'red';
		}
		else {
			return 'grey';
		};
	}, [checked, submitted]);

	const inputProps: IoInputProps = useMemo(() => {
		return {
			"data-testid": `${id ? id : "lolz"}-IoModalOnFormControlLabelCheckbox`,
			// "aria-label": "controlled",
		};
	}, [id]);

	// useEffect(() => {
	// 	console.log("id from IoModalOnFormControlLabelCheckbox: ", id);
	// }, [id]);
	// useEffect(() => {
	// 	console.log("invalidAge: ", invalidAge);
	// }, [invalidAge]);
	// useEffect(() => {
	// 	console.log("disabledButton: ", disabledButton);
	// }, [disabledButton]);

	return (
		<div>
			<Modal
				data-testid="modalMe"
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				{children}
			</Modal>
			<FormControlLabel
				control={
					<Checkbox
						inputProps={inputProps}
						checked={checked}
						disabled={invalidAge}
						onChange={handleCheckbox}
						name={id}
						size="small"
					/>
				}
				label=""
			/>
			<Button
				data-testid={`${id}LabelButton`}
				onClick={handleClick}
				variant="contained"
				size="small"
				disabled={!checked}
				sx={{
					backgroundColor: backgroundColor
				}}
			>
				{id}
			</Button>
		</div>
	);
};
