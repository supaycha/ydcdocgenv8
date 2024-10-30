import type { MouseEvent } from "react";
import { useState } from "react";

import { Stack, Button, Collapse } from "@mui/material"

import { useAppDispatch } from "../../storage/hooks";
import { addPhysicianinPhysicianType } from "../../components/administrative/physicians/physiciansSlice";
import { IoTextField } from "../shells/IoTextField";

interface IoAddPhysicianProps {
	id: string;
};

interface AddPhysicianObj {
	[key: string]: string;
	physician: string;
	label: string;
	phone: string;
};

export function IoAddPhysician({
	id,
}: IoAddPhysicianProps) {
	const dispatch = useAppDispatch();
	const [collapseOpen, setCollapseOpen] = useState(false);
	const [addPhysician, setAddPhysician] = useState<AddPhysicianObj>({
		physician: "",
		label: "",
		phone: "",
	});

	const onHandleChange = (value: string, id: string, _error?: boolean | undefined) => {
		const newAddPhysician = structuredClone(addPhysician);
		newAddPhysician[id] = value;
		setAddPhysician(newAddPhysician);
	};

	const handleOpenDialog = (_event: MouseEvent<HTMLButtonElement>) => {
		setCollapseOpen(true);
	};

	const handleCloseDialog = (_event: MouseEvent<HTMLButtonElement>) => {
		setCollapseOpen(false);
		dispatch(
			addPhysicianinPhysicianType({
				type: "addPhysicianinPhysicianType",
				id: id,
				physician: addPhysician.physician!,
				label: addPhysician.label!,
				phone: addPhysician.phone!,
			})
		);
	};

	return (
		<>
			{collapseOpen ?
				<Button
					onClick={handleCloseDialog}
				>
					CONFIRM ADDITION
				</Button> :
				<Button
					onClick={handleOpenDialog}
				>
					ADD PROVIDER
				</Button>
			}
			<Collapse
				in={collapseOpen}
				unmountOnExit
			>
				<Stack
					direction="row"
				>
					{["physician", "label", "phone"].map(id => {
						return (
							<IoTextField
								key={id}
								id={id}
								label={id}
								onHandleChange={onHandleChange}
							/>
						);
					})}
				</Stack>
			</Collapse>
		</>
	);
};
