import { Button, Grid2 } from "@mui/material";

import { LabFormRow } from "./LabFormRow";
import { addLab, removeLab, selectAllLabFormRows } from "./labformSlice";

import { useAppDispatch, useAppSelector } from "../storage/hooks";
import { PrintFormButton } from "../generation/LABFORM/PrintFormButton";

interface LabFormProps {

};

export function LabForm({
}: LabFormProps) {
	const labFormRowIds = useAppSelector(state => selectAllLabFormRows(state));
	const dispatch = useAppDispatch();

	const onClick = () => {
		dispatch(
			addLab({
				type: "addLab",
			})
		);
	};

	const onRemoveLabRow = (parentId: number) => {
		dispatch(
			removeLab({
				type: "removeLab",
				parentId: parentId,
			})
		);
	};

	return (
		<Grid2
			container
			spacing={2}
		>
			<Grid2
				container
				size={{
					xs: 12,
				}}
			>
				<Grid2>
					<Button
						variant="contained"
						color="warning"
						onClick={onClick}
					>
						ADD LAB
					</Button>
				</Grid2>
			</Grid2>
			{labFormRowIds.map(rowId => {
				return (
					<LabFormRow
						key={rowId}
						id={rowId}
						onRemoveLabRow={onRemoveLabRow}
					/>
				);
			})}
			<Grid2>
				<PrintFormButton
				/>
			</Grid2>
		</Grid2>
	);
};
