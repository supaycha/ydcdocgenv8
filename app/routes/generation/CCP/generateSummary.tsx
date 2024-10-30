import { TextRun, HeadingLevel, UnderlineType, TableRow, AlignmentType } from "docx";

import { ioBulletPoint } from "../../io/layout/ioBulletPoint";
import { ioHeader } from "../../io/layout/ioHeader";
import { ioNewLine } from "../../io/layout/ioNewLine";
import { ioPageTitle } from "../../io/layout/ioPageTitle";
import { ioParagraph } from "../../io/layout/ioParagraph";
import { ioTable } from "../../io/layout/ioTable";
import { ioTableCell } from "../../io/layout/ioTableCell";

import type {
	GroupedScreeningDraftType,
	ToggledScreeningDraftType,
	SingleScreeningDraftType,
	DosesVaccineDraftType,
	BothVaccineDraftType,
	OnlyVaccineDraftType,
	AppointmentDraftType,
} from "../../types/types";
import type { MedicationsBrokenDownDraftType } from "../../components/medications/medicationsSlice";

function getMissingScreenings(
	patientGender: number,
	allGroupScreenings: GroupedScreeningDraftType,
	allToggleScreenings: ToggledScreeningDraftType,
	allSingleScreenings: SingleScreeningDraftType,
) {
	const gMissing = allGroupScreenings
		.filter(gsObj => {
			if (gsObj.id === "Colon/Cancer") {
				if (gsObj.radioButtonValue === null) {
					return true;
				}
				else {
					const res = gsObj.radioOptions.find(choice => choice.toggleButtonValue === "DUE NOW");
					if (res) {
						return true;
					};
				};
			};

			return false;
		})
		.map(gsObj2 => {
			if (gsObj2.radioButtonValue === null) {
				return `${gsObj2.radioOptions[0].id} or ${gsObj2.radioOptions[1].id}`;
			}
			else {
				return gsObj2.radioOptions.filter(choice => choice.toggleButtonValue === "DUE NOW")[0].id;
			};
		});

	const tMissing = allToggleScreenings
		.filter(tsObj => {
			if (tsObj.gender === patientGender || tsObj.gender === undefined) {
				if (!tsObj.checked) {
					return true;
				};
			};
			return false;
		}).map(tsObj2 => {
			return tsObj2.id;
		});

	const sMissing = allSingleScreenings
		.filter(ssObj => {
			if (ssObj.gender === patientGender || ssObj.gender === undefined) {
				if (!ssObj.checked) {
					return true;
				}
				else if (ssObj.checked && ssObj.toggleButtonValue === "DUE NOW") {
					return true;
				};
			};
			return false;
		}).map(ssObj2 => {
			return ssObj2.id;
		});

	return [...gMissing, ...tMissing, ...sMissing];
};

function getMissingVaccines(
	allDosesVaccines: DosesVaccineDraftType,
	allBothVaccines: BothVaccineDraftType,
	allOnlyVaccines: OnlyVaccineDraftType,
) {
	// let dMissing = allDosesVaccines.filter(d => d.checked === false).map(m => {
	const dMissing = allDosesVaccines.filter(m => {
		switch (m.id) {
			case "COVID-19": {
				if (m.checked && m.doses[0].checked && m.doses[2].checked) {
					return false;
				}
				else if (m.checked && m.doses[0].checked) {
					return true;
				}
				else {
					return true;
				}
				// return `COVID-19 vaccine, COVID-19 booster`
			}
			case "Shingles": {
				if (m.checked && m.doses[0].checked) {
					return false;
				}
				else {
					return true;
				}
				// return `Shingles vaccine`
			}
			default: {
				throw new Error(`Unknown vaccine id: ${m.id}`)
			}
		};
	}).map(m => {
		if (m.id === "COVID-19") {
			// if (m.checked && m.doses[0].checked && m.doses[2].checked) {
			// 	console.log(`COVID-19 booster 2`)
			// 	return `COVID-19 booster 2`;
			// }
			if (m.checked && m.doses[0].checked) {
				// console.log(`COVID-19 boosters`)
				return `COVID-19 boosters`;
			}
			else {
				// console.log(`COVID-19 vaccine, COVID-19 boosters`)
				return `COVID-19 vaccine, COVID-19 boosters`
			};
			// return `COVID-19 vaccine, COVID-19 booster`
		}
		// console.log(`m.checked from "${m.id}" was false`)
		return m.id;
	});;

	const bMissing = allBothVaccines.filter(d => d.checked === false).map(m => {
		return m.id;
	});

	const oMissing = allOnlyVaccines.filter(d => d.checked === false).map(m => {
		return m.id;
	});

	return [...dMissing, ...bMissing, ...oMissing];
};

function getChangedMedicationsTable(medicationObjs: MedicationsBrokenDownDraftType | null) {
	if (medicationObjs !== null) {
		const medications = medicationObjs.filter(m => m.checked && m.selectedoption === "changed");
		return ioTable({
			rows: [
				new TableRow({
					children: [
						ioTableCell(
							40,
							[
								new TextRun({
									text: "Medication",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
						ioTableCell(
							60,
							[
								new TextRun({
									text: "Status",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
					],
				}),
				...medications.map(med => {
					const row = new TableRow({
						children: [
							ioTableCell(
								40,
								[
									new TextRun({
										text: med.label,
										bold: false,
									}),
								],
								AlignmentType.LEFT,
							),
							ioTableCell(
								60,
								[
									new TextRun({
										text: med.selectedoption,
										bold: false,
									}),
								],
								AlignmentType.LEFT,
							),
						],
					});
					return row;
				}),
			],
		});
	}
	else {
		return ioTable({
			rows: [
				new TableRow({
					children: [
						ioTableCell(
							40,
							[
								new TextRun({
									text: "Medication",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
						ioTableCell(
							60,
							[
								new TextRun({
									text: "Status",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
					],
				}),
				new TableRow({
					children: [
						ioTableCell(
							40,
							[
								new TextRun({
									text: "",
									bold: false,
								}),
							],
							AlignmentType.LEFT,
						),
						ioTableCell(
							60,
							[
								new TextRun({
									text: "",
									bold: false,
								}),
							],
							AlignmentType.LEFT,
						),
					],
				}),
			],
		});
	}
};

function getNewMedicationsTable(medicationObjs: MedicationsBrokenDownDraftType | null) {
	if (medicationObjs !== null) {
		const medications = medicationObjs.filter(m => m.checked && m.selectedoption === "new");
		return ioTable({
			rows: [
				new TableRow({
					children: [
						ioTableCell(
							40,
							[
								new TextRun({
									text: "Medication",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
						ioTableCell(
							60,
							[
								new TextRun({
									text: "Status",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
					],
				}),
				...medications.map(med => {
					const row = new TableRow({
						children: [
							ioTableCell(
								40,
								[
									new TextRun({
										text: med.label,
										bold: false,
									}),
								],
								AlignmentType.LEFT,
							),
							ioTableCell(
								60,
								[
									new TextRun({
										text: med.selectedoption,
										bold: false,
									}),
								],
								AlignmentType.LEFT,
							),
						],
					});
					return row;
				}),
			],
		});
	}
	else {
		return ioTable({
			rows: [
				new TableRow({
					children: [
						ioTableCell(
							40,
							[
								new TextRun({
									text: "Medication",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
						ioTableCell(
							60,
							[
								new TextRun({
									text: "Status",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
					],
				}),
				new TableRow({
					children: [
						ioTableCell(
							40,
							[
								new TextRun({
									text: "",
									bold: false,
								}),
							],
							AlignmentType.LEFT,
						),
						ioTableCell(
							60,
							[
								new TextRun({
									text: "",
									bold: false,
								}),
							],
							AlignmentType.LEFT,
						),
					],
				}),
			],
		});
	}
};

export function generateSummary(
	patientGender: number,
	allGroupScreenings: GroupedScreeningDraftType,
	allToggleScreenings: ToggledScreeningDraftType,
	allSingleScreenings: SingleScreeningDraftType,
	allDosesVaccines: DosesVaccineDraftType,
	allBothVaccines: BothVaccineDraftType,
	allOnlyVaccines: OnlyVaccineDraftType,
	appointments: AppointmentDraftType,
	medications: MedicationsBrokenDownDraftType | null,
) {
	const missingScreenings = getMissingScreenings(
		patientGender,
		allGroupScreenings,
		allToggleScreenings,
		allSingleScreenings,
	);

	const missingVaccines = getMissingVaccines(
		allDosesVaccines,
		allBothVaccines,
		allOnlyVaccines,
	);
	const c = [
		ioPageTitle(
			"Summary of things patient needs to complete",
			true,
		),
		ioHeader(
			"Test to complete:",
			true,
			undefined,
			undefined,
			HeadingLevel.HEADING_2,
		),
		ioBulletPoint(
			`Preventative: ${missingScreenings.join(", ")}`,
			0.
		),
		ioBulletPoint(
			`Lab work`,
			0.
		),
		ioNewLine(),
		ioHeader(
			"Vaccines to complete:",
			true,
			undefined,
			undefined,
			HeadingLevel.HEADING_2,
		),
		ioBulletPoint(
			`${missingVaccines.join(", ")}`,
			0,
		),
		ioNewLine(),
		ioHeader(
			"Other health professionals to see:",
			true,
			undefined,
			undefined,
			HeadingLevel.HEADING_2,
		),
		ioBulletPoint(
			"",
			0,
		),
		ioNewLine(),
		ioHeader(
			[
				new TextRun({
					text: "Changed Medications:",
					bold: true,
				}),
			],
			undefined,
			undefined,
			undefined,
			HeadingLevel.HEADING_2,
		),
		getChangedMedicationsTable(medications),
		ioNewLine(),
		ioHeader(
			[
				new TextRun({
					text: "New Medications:",
					bold: true,
				}),
			],
			undefined,
			undefined,
			undefined,
			HeadingLevel.HEADING_2,
		),
		getNewMedicationsTable(medications),
		ioNewLine(),
		ioHeader(
			"Health-related education to pursue:",
			true,
			undefined,
			undefined,
			HeadingLevel.HEADING_2,
		),
		ioHeader(
			"Review the monthly Educational letter from Youens & Duchicela Clinic",
			false,
			undefined,
			undefined,
			HeadingLevel.HEADING_2,
		),
		ioNewLine(),
		ioHeader(
			"Other activities:",
			true,
			undefined,
			undefined,
			HeadingLevel.HEADING_2,
		),
		ioBulletPoint(
			"Take your medications and blood pressure readings daily as instructed, and record your blood pressure readings on a log.",
			0,
		),
		ioBulletPoint(
			"Take your medications and blood sugar readings as instructed and record your blood sugar readings on a log.",
			0,
			true,
		),
		ioBulletPoint(
			"We ask that you come a week in advance for lab work to ensure that we have your results at your appointment time.",
			0,
			true,
		),
		ioBulletPoint(
			"Please bring your vitamin and medication bottles with you to your next appointment.",
			0,
		),
		ioBulletPoint(
			"Please bring your previous comprehensive care plan to your next appointment if you have questions, new information, or observations.",
			0,
		),
		ioBulletPoint(
			"Please bring your current insurance card or any other form of insurance id.",
			0,
		),
		ioBulletPoint(
			"Please contact the clinic at 979-725-8545, and schedule your next appointment.",
			0,
			true,
		),
		ioNewLine(),
		ioParagraph(
			"Appointments",
			true,
			true,
		),
		ioTable({
			rows: [
				new TableRow({
					children: [
						ioTableCell(
							50,
							[
								new TextRun({
									text: "",
									bold: true,
								}),
							],
						),
						ioTableCell(
							25,
							[
								new TextRun({
									text: "Date",
									bold: true,
								}),
							],
						),
						ioTableCell(
							25,
							[
								new TextRun({
									text: "Time",
									bold: true,
								}),
							],
						),
					]
				}),
				new TableRow({
					children: [
						ioTableCell(
							50,
							[
								new TextRun({
									text: "Next appointment with Dr. Olga",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
						ioTableCell(
							25,
							[
								new TextRun({
									text: (appointments.filter(x => x.id === "Dr Olga Appointment")[0]).date !== null ?
										((appointments.filter(x => x.id === "Dr Olga Appointment")[0]).date as string) :
										"Non-scheduled",
									bold: false,
								}),
							],
						),
						ioTableCell(
							25,
							[
								new TextRun({
									text: (appointments.filter(x => x.id === "Dr Olga Appointment")[0]).time !== null ?
										((appointments.filter(x => x.id === "Dr Olga Appointment")[0]).time as string) :
										"Non-scheduled",
									bold: false,
								}),
							],
						),
					]
				}),
				new TableRow({
					children: [
						ioTableCell(
							50,
							[
								new TextRun({
									text: "Next appointment for labs",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
						ioTableCell(
							25,
							[
								new TextRun({
									text: (appointments.filter(x => x.id === "Lab Appointment")[0]).date !== null ?
										((appointments.filter(x => x.id === "Lab Appointment")[0]).date as string) :
										"Non-scheduled",
									bold: false,
								}),
							],
						),
						ioTableCell(
							25,
							[
								new TextRun({
									text: (appointments.filter(x => x.id === "Lab Appointment")[0]).date !== null ?
										((appointments.filter(x => x.id === "Lab Appointment")[0]).date as string) :
										"Non-scheduled",
									bold: false,
								}),
							],
						),
					]
				}),
			]
		}),
		ioNewLine(),
		ioParagraph(
			[
				new TextRun({
					text: "If you need help arranging care outside this office or have questions or concerns about any information in your comprehensive care plan, you can discuss it with Dr. Olga during your next visit or contact the clinic",
				}),
				new TextRun({
					text: " at ",
					bold: true,
				}),
				new TextRun({
					text: "979-725-8545.",
					bold: true,
					underline: {
						type: UnderlineType.SINGLE,
					},
				})
			]
		),
		ioNewLine(),
		ioParagraph(
			"**Please advise – medical terminology is used in the information above to be interpreted by other medical care professionals if brought to their attention. **",
			true,
			undefined,
			undefined,
			undefined,
			true,
		),
	];

	return c;
};
