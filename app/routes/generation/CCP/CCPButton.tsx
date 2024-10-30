import type { MouseEvent } from "react";
import { Stack, Button } from "@mui/material"
import { useAppSelector } from "../../storage/hooks";
import { selectDemographics } from "../../components/administrative/demographics/demographicsSlice";
import { selectAppointments } from "../../components/administrative/appointments/appointmentsSlice";
import { selectPhysicians } from "../../components/administrative/physicians/physiciansSlice";
import { selectMedications } from "../../components/medications/medicationsSlice";
import { selectMedicationAllergies } from "../../components/medications/medicationAllergiesSlice";
import { selectPhysicalInformation } from "../../components/physical/physicalinformation/physicalinformationSlice";
import { selectPneumococcalVaccine } from "../../components/physical/vaccines/pneumococcalvaccine/pneumococcalvaccinesSlice";
import { selectAllBothVaccines } from "../../components/physical/vaccines/bothvaccinesSlice";
import { selectAllDosesVaccines } from "../../components/physical/vaccines/dosesvaccinesSlice";
import { selectAllOnlyVaccines } from "../../components/physical/vaccines/onlyvaccinesSlice";
import { selectAllGroupScreenings } from "../../components/screenings/groupedscreeningsSlice";
import { selectAllSingleScreenings } from "../../components/screenings/singlescreeningsSlice";
import { selectAllToggledScreenings } from "../../components/screenings/toggledscreeningsSlice";
import { selectFunctionals } from "../../components/functionals/functionalsSlice";
import { selectConditions } from "../../components/conditionsanddiseases/conditions/conditionsSlice";
import { selectSingleDiagnostics } from "../../components/conditionsanddiseases/diagnostics/diagnosticsSlice";
import { selectSocialDrugHistory } from "../../components/conditionsanddiseases/socialdrughistory/socialdrughistorySlice";
import { selectSocialDeterminants } from "../../components/socialdeterminants/socialdeterminantsSlice";

interface CCPButtonProps {
	// mode: string;
};

// eslint-disable-next-line no-empty-pattern
export function CCPButton({
	// mode,
}: CCPButtonProps) {
	const demographics = useAppSelector(selectDemographics);
	const appointments = useAppSelector(selectAppointments);
	const physicians = useAppSelector(selectPhysicians);
	const medications = useAppSelector(selectMedications);
	const medicationAllergies = useAppSelector(selectMedicationAllergies);
	const physicalInformation = useAppSelector(selectPhysicalInformation);
	const pneumococcalVaccine = useAppSelector(selectPneumococcalVaccine);
	const allBothVaccines = useAppSelector(selectAllBothVaccines);
	const allDosesVaccines = useAppSelector(selectAllDosesVaccines);
	const allOnlyVaccines = useAppSelector(selectAllOnlyVaccines);
	const allGroupScreenings = useAppSelector(selectAllGroupScreenings);
	const allSingleScreenings = useAppSelector(selectAllSingleScreenings);
	const allToggleScreenings = useAppSelector(selectAllToggledScreenings);
	const functionals = useAppSelector(selectFunctionals);
	const conditions = useAppSelector(selectConditions);
	const allSingleDiagnostics = useAppSelector(selectSingleDiagnostics);
	const socialDrugHistory = useAppSelector(selectSocialDrugHistory);
	const socialDeterminants = useAppSelector(selectSocialDeterminants);

	const handleGenerationClick = async (_event: MouseEvent<HTMLButtonElement>) => {
		import("./generateCCPDoc").then(async (module) => {
			await module.generateCCPDoc(
				"All",
				demographics,
				appointments,
				physicians,
				medications,
				medicationAllergies,
				physicalInformation,
				pneumococcalVaccine,
				allBothVaccines,
				allDosesVaccines,
				allOnlyVaccines,
				allGroupScreenings,
				allSingleScreenings,
				allToggleScreenings,
				functionals,
				conditions,
				allSingleDiagnostics,
				socialDrugHistory,
				socialDeterminants,
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
				GENERATE DOCUMENT
			</Button>
		</Stack>
	);
};
