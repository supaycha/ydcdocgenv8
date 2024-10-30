import { useMemo } from "react";
import { Button, Grid2, Typography } from "@mui/material";
import { ExternalIoTextField } from "../io/shells/ExternalIoTextField";
import { useAppDispatch, useAppSelector } from "../storage/hooks";
import { addICD10Code, removeICD10Code, selectALabFormRow, setRowTextChange } from "./labformSlice";
import { LabFormSubRow } from "./LabFormSubRow";
import { ExternalIoSelect } from "../io/shells/ExternalIoSelect";

import labcpt from "../public/labform/labcpt.json";

interface LabFormRowProps {
	id: number;
	onRemoveLabRow: (parentId: number) => void;
};

export function LabFormRow({
	id,
	onRemoveLabRow,
}: LabFormRowProps) {
	const labFormRow = useAppSelector(state => selectALabFormRow(state, id));
	const dispatch = useAppDispatch();

	const labcptcodes = useMemo(() => {
		return labcpt.map(l => l.code) as string[];
	}, []);

	const labcptdescription = useMemo(() => {
		if (labcpt.filter(l => l.code === labFormRow.textfield1).length === 0) {
			return "";
		};
		
		return labcpt.filter(l => l.code === labFormRow.textfield1)[0].description;
	}, [
		labFormRow.textfield1
	]);

	const onHandleExternalChange = (
		event: React.SyntheticEvent<Element, Event>,
		value: string,
		id: string,
	) => {
		dispatch(
			setRowTextChange({
				type: "setRowTextChange",
				id: Number(id),
				textfieldid: "textfield1",
				value: value,
			})
		);
	};

	// const onHandleExternalChange = (
	// 	value: string,
	// 	id: string,
	// 	textfieldid: string,
	// ) => {
	// 	dispatch(
	// 		setRowTextChange({
	// 			type: "setRowTextChange",
	// 			id: Number(id),
	// 			textfieldid: textfieldid,
	// 			value: value,
	// 		})
	// 	);
	// };

	const onClick = () => {
		dispatch(
			addICD10Code({
				type: "addICD10Code",
				parentId: id,
			})
		);
	};
	const onRemoveLabSubRow = (subid: number) => {
		dispatch(
			removeICD10Code({
				type: "removeICD10Code",
				id: subid,
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
			<Grid2>
				<Button
					variant="contained"
					color="error"
					onClick={() => onRemoveLabRow(id)}
				>
					X
				</Button>
			</Grid2>
			<Grid2>
				<ExternalIoSelect
					id={labFormRow.id.toString()}
					label={labFormRow.textfield1}
					value={labFormRow.textfield1}
					options={labcptcodes}
					onHandleChange={onHandleExternalChange}
				/>
				{/* <ExternalIoTextField
					id={labFormRow.id.toString()}
					label={"Lab Description"}
					value={labFormRow.textfield1}
					setExternalState={(value: string, id: string) => onHandleExternalChange(value, id, "textfield1")}
				/> */}
			</Grid2>
			<Grid2>
				<Typography>
					{labcptdescription}
				</Typography>
				{/* <ExternalIoTextField
					id={labFormRow.id.toString()}
					label={"Lab CPT Code"}
					value={labFormRow.textfield2}
					setExternalState={(value: string, id: string) => onHandleExternalChange(value, id, "textfield2")}
				/> */}
			</Grid2>
			<Grid2>
				<Button
					variant="contained"
					color="warning"
					onClick={onClick}
				>
					ADD ICD-10 CODE
				</Button>
			</Grid2>
			{labFormRow.subitemIds.map(subRowId => {
				return (
					<LabFormSubRow
						key={subRowId}
						id={subRowId}
						// parentId={id}
						onRemoveLabSubRow={onRemoveLabSubRow}
					/>
				);
			})}
		</Grid2>
	);
};