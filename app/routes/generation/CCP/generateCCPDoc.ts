import dayjs from "dayjs";
import type { Paragraph, Table } from "docx";
import { Document, Header, AlignmentType, Packer } from "docx";
import saveAs from "file-saver";

import { generateChronicConditions } from "./generateChronicConditions";
import { generateCoverPage } from "./generateCoverPage";
import { generateMedicationAllergyLists } from "./generateMedicationAllergyLists";
import { generatePreventativeCare } from "./generatePreventativeCare";
import { generatePsychoSocialFunctional } from "./generatePsychoSocialFunctional";
import { generateSummary } from "./generateSummary";
import { generateGuidelines } from "./generateGuidelines";

import type {
	PhysiciansDraftType,
	MedicationAllergiesDraftType,
	CheckedConditionsDraftType,
	GroupedScreeningDraftType,
	ToggledScreeningDraftType,
	SingleScreeningDraftType,
	DiagnosticsDraftType,
	PneumococcalVaccineDraftType,
	DosesVaccineDraftType,
	BothVaccineDraftType,
	OnlyVaccineDraftType,
	FunctionalsDraftType,
	DemographicsDraftType,
	AppointmentDraftType,
	PhysicalInformationDraftType,
	SocialDrugHistoryDraftType,
	SocialDeterminantsDraftType,
} from "../../types/types";
import { styles } from "../docxstyles";
import { ioParagraph } from "../../io/layout/ioParagraph";
import type { MedicationsBrokenDownDraftType } from "../../components/medications/medicationsSlice";

function getAge(dateOfBirth: string | null): [unit: "years" | "months", value: number] {
	const currentAge = dayjs().diff(dateOfBirth, "years");
	if (currentAge >= 6) {
		return [
			"years",
			currentAge,
		];
	};
	return [
		"months",
		dayjs().diff(dateOfBirth, "months"),
	];
};

export async function generateCCPDoc(
	mode: string,
	demographics: DemographicsDraftType,
	appointments: AppointmentDraftType,
	physicians: PhysiciansDraftType,
	medications: MedicationsBrokenDownDraftType,
	medicationAllergies: MedicationAllergiesDraftType,
	physicalInformation: PhysicalInformationDraftType,
	pneumococcalVaccine: PneumococcalVaccineDraftType,
	allBothVaccines: BothVaccineDraftType,
	allDosesVaccines: DosesVaccineDraftType,
	allOnlyVaccines: OnlyVaccineDraftType,
	allGroupScreenings: GroupedScreeningDraftType,
	allSingleScreenings: SingleScreeningDraftType,
	allToggleScreenings: ToggledScreeningDraftType,
	functionals: FunctionalsDraftType,
	conditions: CheckedConditionsDraftType,
	allSingleDiagnostics: DiagnosticsDraftType,
	socialDrugHistory: SocialDrugHistoryDraftType,
	socialDeterminants: SocialDeterminantsDraftType,
) {
	const topInfo = [
		...generateCoverPage(mode, demographics, physicalInformation, physicians),
		...(mode === "All" ? generateMedicationAllergyLists(physicians, medications, medicationAllergies) : []),
		...generatePreventativeCare(
			mode,
			(physicalInformation.filter(n => n.id === "patientGender")[0].value as number),
			getAge(demographics.filter(n => n.id === "dateOfBirth")[0].value)[1],
			allGroupScreenings,
			allToggleScreenings,
			allSingleScreenings,
			allSingleDiagnostics,
			pneumococcalVaccine,
			allDosesVaccines,
			allBothVaccines,
			allOnlyVaccines,
		),
		...generateGuidelines(
			getAge(demographics.filter(n => n.id === "dateOfBirth")[0].value)[1],
			pneumococcalVaccine,
		),
		...(mode === "All" ? generatePsychoSocialFunctional(allSingleScreenings, functionals, socialDrugHistory, socialDeterminants) : []),
		...(mode === "All" ? generateChronicConditions(conditions) : []),
		...(mode === "All" ? generateSummary(
			(physicalInformation.filter(n => n.id === "patientGender")[0].value as number),
			allGroupScreenings,
			allToggleScreenings,
			allSingleScreenings,
			allDosesVaccines,
			allBothVaccines,
			allOnlyVaccines,
			appointments,
			medications,
		) : []),
	];

	const document = new Document({
		styles: styles,
		sections: [{
			properties: {
				page: {
					margin: {
						top: 720,
						right: 720,
						bottom: 720,
						left: 720,
					},
				},
			},
			headers: {
				default: new Header({
					children: [
						ioParagraph(
							`${demographics.filter(n => n.id === "dateOfBirth")[0].value}`,
							undefined,
							undefined,
							undefined,
							AlignmentType.RIGHT,
						),
						// new Paragraph({
						// 	// text: `${(administrative.filter(n => n.id === "patientName")[0] as AdministrativeStrIndivType).value} ${physical.filter(n => n.id === "dateOfBirth")[0].value}`,
						// 	text: `${demographics.filter(n => n.id === "dateOfBirth")[0].value}`,
						// 	alignment: AlignmentType.RIGHT,
						// }),
					],
				}),
			},
			children: topInfo as (Paragraph | Table)[]
		}],
	});

	Packer.toBlob(document).then(async (blob) => {
		saveAs(blob, "example.docx");
		console.log("Document created successfully");
	});
};