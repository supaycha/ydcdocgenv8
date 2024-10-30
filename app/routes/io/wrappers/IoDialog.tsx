import type { ReactNode, Dispatch, SetStateAction } from "react";
import {
	Button,
	Dialog,
	DialogContent,
	DialogActions,
	IconButton,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';

interface IoDialogProps {
	children: ReactNode,
	open: boolean,
	setOpen: Dispatch<SetStateAction<boolean>>
	onButtonClose: () => void;
}

export function IoDialog({
	children,
	open,
	setOpen,
	onButtonClose,
}: IoDialogProps) {
	// const isFirst = useIsFirstRender();

	// useEffect(() => {
	// 	console.log(isFirst);
	// }, [isFirst]);

	// export function IoDialog() {
	// const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const onDialogClose = (_event: object, _reason: 'backdropClick' | 'escapeKeyDown') => {
		// DISALLOWS DIALOG CLOSURE BY ANY OTHER MEANS BESIDES PROVIDED BUTTONS
	};

	return (
		<div>
			<IconButton
				onClick={handleClickOpen}
			>
				<EditIcon
					fontSize="small"
				/>
			</IconButton>
			<Dialog
				fullWidth={true} // this + maxWidth controls dimensions of dialog
				maxWidth={"md"} // this + fullWidth controls dimensions of dialog
				open={open}
				onClose={onDialogClose}
				PaperProps={{
					sx: {
						overflowY: "visible" // enables anything in body to not be clipped if needed, like long drop-downs
					}
				}}
			>
				<DialogContent>
					{children}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={onButtonClose}
					>
						DISCARD CHANGES
					</Button>
					<Button
						onClick={onButtonClose}
					>
						SAVE
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};