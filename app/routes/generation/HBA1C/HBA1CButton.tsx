import type { MouseEvent } from "react";
import {
	Stack,
	Button,
} from "@mui/material";

import { useAppSelector } from "../../storage/hooks";
import { selectDemographics } from "../../components/administrative/demographics/demographicsSlice";
import { selectConditions } from "../../components/conditionsanddiseases/conditions/conditionsSlice";

interface HBA1CButtonProps {
	// mode: string;
};

// eslint-disable-next-line no-empty-pattern
export function HBA1CButton({
	// mode,
}: HBA1CButtonProps) {
	const demographics = useAppSelector(selectDemographics);
	const conditions = useAppSelector(selectConditions);

	const handleGenerationClick = async (_event: MouseEvent<HTMLButtonElement>) => {
		import("./generateHBA1CDoc").then(async (module) => {
			await module.generateHBA1CDoc(
				demographics,
				conditions,
			);
		});
	};
	// useEffect(() => {
	// 	console.log("functionals: ", functionals.KATZADL!.activities.map(a => a.checked))
	// }, [functionals]);
	return (
		<Stack spacing={2} direction="row">
			<Button
				onClick={handleGenerationClick}
				variant="contained"
			>
				HBA1C DOC
			</Button>
		</Stack>
	);
};
