import { useMemo } from "react";
import { Button, Grid2, Typography } from "@mui/material";
import { ExternalIoTextField } from "../io/shells/ExternalIoTextField";
import { useAppDispatch, useAppSelector } from "../storage/hooks";
import { selectALabFormSubRow, setSubRowTextChange } from "./labformSlice";

import labicd10 from "../public/labform/labicd10.json";
import { ExternalIoSelect } from "../io/shells/ExternalIoSelect";

interface LabFormSubRowProps {
	id: number;
	// parentId: number;
	onRemoveLabSubRow: (parentId: number) => void;
};

export function LabFormSubRow({
	id,
	// parentId,
	onRemoveLabSubRow,
}: LabFormSubRowProps) {
	const labFormSubRow = useAppSelector(state => selectALabFormSubRow(state, id));
	const dispatch = useAppDispatch();

	const labicd10codes = useMemo(() => {
		return labicd10.map(l => l.code) as string[];
	}, []);

	const labicd10description = useMemo(() => {
		if (labicd10.filter(l => l.code === labFormSubRow.textfield1).length === 0) {
			return "";
		};

		return labicd10.filter(l => l.code === labFormSubRow.textfield1)[0].description;
	}, [
		labFormSubRow.textfield1
	]);

	const onHandleExternalChange = (
		event: React.SyntheticEvent<Element, Event>,
		value: string,
		id: string,
	) => {
		dispatch(
			setSubRowTextChange({
				type: "setSubRowTextChange",
				id: Number(id),
				textfieldid: "textfield1",
				value: value,
			})
		);
	};

	return (
		<Grid2
			container
			spacing={2} // this needs to be set since being in component breaks inheritance
			size={{
				xs: 12,
			}}
		>
			<Grid2
				offset={{
					xs: 1,
				}}
			>
				<Button
					variant="contained"
					color="error"
					onClick={() => onRemoveLabSubRow(id)}
				>
					X
				</Button>
			</Grid2>
			<Grid2>
				<ExternalIoSelect
					id={labFormSubRow.id.toString()}
					label={labFormSubRow.textfield1}
					value={labFormSubRow.textfield1}
					options={labicd10codes}
					onHandleChange={onHandleExternalChange}
				/>
				{/* <ExternalIoTextField
					id={labFormSubRow.id.toString()}
					label={"ICD-10 Description"}
					value={labFormSubRow.textfield1}
					setExternalState={(value: string, id: string) => onHandleExternalChange(value, id, "textfield1")}
				/> */}
			</Grid2>
			<Grid2>
				<Typography>
					{labicd10description}
				</Typography>
				{/* <ExternalIoTextField
					id={labFormSubRow.id.toString()}
					label={"ICD-10 Code"}
					value={labFormSubRow.textfield2}
					setExternalState={(value: string, id: string) => onHandleExternalChange(value, id, "textfield2")}
				/> */}
			</Grid2>
		</Grid2>
	);
};