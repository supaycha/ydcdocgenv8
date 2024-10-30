import { Fragment, useState } from "react";
import { Stack } from "@mui/material";

// import { usePhysicians } from "./PhysiciansContext";
import type { PhysicianType } from "../../../types/types";
import { IoDialog } from "../../../io/wrappers/IoDialog";

import { ExternalIoTextField } from "../../../io/shells/ExternalIoTextField";
import { ExternalIoNumberField } from "../../../io/shells/ExternalIoNumberField";
import { PhysicianTypeSelect } from "./PhysicianTypeSelect";
import { selectPhysicians } from "./physiciansSlice";
import { useAppSelector } from "../../../storage/hooks";

export function PhysicianEditor() {
	// const isFirst = useIsFirstRender();
	const physicians = useAppSelector(selectPhysicians);
	const [selectedPhysicianNameObjs, setSelectedPhysicianNameObjs] = useState<PhysicianType[]>([])
	const [open, setOpen] = useState(false);

	// useEffect(() => {
	// 	console.log(isFirst);
	// }, [isFirst]);

	const onHandleChange = (
		// _event: SyntheticEvent<Element, Event>,
		value: string,
		_id: string,
	) => {
		// const a = physicians.filter(p => p.id === value)[0].selections;
		// setSelectedPhysicianNameObjs((prevState: PhysicianType[]) => {
		// 	const temp = [...prevState];
		// 	return temp;
		// });
		setSelectedPhysicianNameObjs(physicians.filter(p => p.id === value)[0].physicians);
	};

	const onHandleExternalChange = (
		_value: string,
		_id: string,
	) => {
		// const a = physicians.filter(p => p.id === value)[0].selections;
		setSelectedPhysicianNameObjs((prevState: PhysicianType[]) => {
			const temp = [...prevState];
			return temp;
		});
		// setSelectedPhysicianNameObjs(physicians.filter(p => p.id === value)[0].physicians);
	};

	const onButtonClose = () => {
		setOpen(false);
	};

	return (
		<IoDialog
			open={open}
			setOpen={setOpen}
			onButtonClose={onButtonClose}
		>
			<Stack
				rowGap={1}
			>
				<PhysicianTypeSelect
					id={"PhysicianTypeSelect"}
					physicianTypes={physicians.map(p => p.id)}
					onHandleChange={onHandleChange}
				/>
				{selectedPhysicianNameObjs.map(p => {
					return (
						<Fragment
							key={`${p.physician}_${p.label}_${p.phone}`}
						>
							<Stack
								direction="row"
								columnGap={1}
							>
								<ExternalIoTextField
									id={`${p.physician}_${p.phone}`}
									label={"Name"}
									value={p.label}
									setExternalState={onHandleExternalChange}
								/>
								<ExternalIoNumberField
									id={`${p.physician}_${p.phone}`}
									label={"Phone"}
									value={p.phone}
									setExternalState={onHandleExternalChange}
								/>
							</Stack>
						</Fragment>
					);
				})}
			</Stack>
		</IoDialog>
	);
};