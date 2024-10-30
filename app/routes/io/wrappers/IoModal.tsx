import { useMemo, useState } from "react";
import { IconButton, Modal } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import type { IoInputProps } from "../../types/types";

export type IoModalProps = {
	id: string;
	children: JSX.Element;
};

export function IoModal({
	id = "",
	children,
}: IoModalProps) {
	const [open, setOpen] = useState(false);
	const inputProps: IoInputProps = useMemo(() => {
		return {
			"data-testid": `${id ? id : "lolz"}-modal`,
		};
	}, [id]);
	
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<IconButton
				onClick={handleOpen}
			>
				<EditIcon
					fontSize="small"
				/>
			</IconButton>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				{children}
			</Modal>
		</div>
	);
};
