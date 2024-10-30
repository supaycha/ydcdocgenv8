import { TableRow, AlignmentType, TextRun } from "docx";
import type { MedicationAllergiesDraftType, PhysiciansDraftType } from "../../types/types";
import { ioPageTitle } from "../../io/layout/ioPageTitle";
import { ioParagraph } from "../../io/layout/ioParagraph";
import { ioTable } from "../../io/layout/ioTable";
import { ioTableCell } from "../../io/layout/ioTableCell";
import { ioBulletPoint } from "../../io/layout/ioBulletPoint";
import { ioNewLine } from "../../io/layout/ioNewLine";
import type { MedicationsBrokenDownDraftType } from "../../components/medications/medicationsSlice";


function getMedicationTable(medicationObjs: MedicationsBrokenDownDraftType | null) {
	if (medicationObjs !== null) {
		const medications = medicationObjs.filter(m => m.checked);
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

function getAllergyTable(medicationAllergyObjs: MedicationAllergiesDraftType) {
	const medicationAllergies = medicationAllergyObjs.filter(m => m.checked);
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
								text: "Reaction Type",
								bold: true,
							}),
						],
						AlignmentType.LEFT,
					),
				]
			}),
			...medicationAllergies.map(med => {
				const r = new TableRow({
					children: [
						ioTableCell(
							40,
							[
								new TextRun({
									text: med.value,
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
					]
				});
				return r
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
				]
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
				]
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
				]
			})
		],
	});
};

export function generateMedicationAllergyLists(
	physicianObjs: PhysiciansDraftType,
	medicationObjs: MedicationsBrokenDownDraftType,
	medicationAllergyObjs: MedicationAllergiesDraftType,
) {
	const physicians = physicianObjs.filter(p => {
		return (p.checked && !p.selections.every(s => s === null));
	});

	const physicianList = [
		{
			"physician": "Family Medicine",
			"label": "Olga Duchicela, MD",
			"phone": "979-725-8545"
		},
		...physicians.map(p => {
			const ppx = p.selections
				.filter(x => {
					return !(x === null)
				});
			return ppx;
		}).flat()
	];

	const c = [
		ioPageTitle(
			"Medication List",
			true,
		),
		...physicianList.map(physician => {
			if (physician!.label === "Olga Duchicela, MD") {
				return [
					ioBulletPoint(
						`Managed by ${physician!.label} (${physician!.physician})`,
						0,
						true,
						undefined,
						undefined,
					),
				];
			}
			else {
				return [
					ioBulletPoint(
						`Managed by ${physician!.label} (${physician!.physician})`,
						0,
						true,
						undefined,
						undefined,
					),
				];
			}
		}).flat(),
		ioBulletPoint(
			"Over-the-counter medications:",
			0,
			true,
			undefined,
			undefined,
		),
		getMedicationTable(medicationObjs),
		ioNewLine(),
		ioParagraph(
			"Allergies",
			true,
			true,
		),
		ioBulletPoint(
			"Currently, No Known Allergies",
			0,
			true,
			undefined,
			undefined,
		),
		getAllergyTable(medicationAllergyObjs),
	];

	return c;
};
