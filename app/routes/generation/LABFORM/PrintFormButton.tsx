import type { MouseEvent } from "react";
import { Stack, Button } from "@mui/material"
import { selectLabForm } from "../../labform/labformSlice";
import { useAppSelector } from "../../storage/hooks";

interface PrintFormButtonProps {
	// mode: string;
};

// eslint-disable-next-line no-empty-pattern
export function PrintFormButton({
	// mode,
}: PrintFormButtonProps) {
	const labForm = useAppSelector(selectLabForm);

	const handleGenerationClick = async (_event: MouseEvent<HTMLButtonElement>) => {
		import("./generateLabFormDoc").then(async (module) => {
			await module.generateLabFormDoc(
				"All",
				labForm,
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
				GENERATE LAB FORM
			</Button>
		</Stack>
	);
};
