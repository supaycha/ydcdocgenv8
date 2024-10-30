import type { Paragraph, Table } from "docx";
import { Document, Header, AlignmentType, Packer, TextRun, TableRow } from "docx";
import saveAs from "file-saver";

import type {
	CheckedConditionsDraftType,
	DemographicsDraftType,
} from "../../types/types";

import { ioTable } from "../../io/layout/ioTable";
import { ioTableCell } from "../../io/layout/ioTableCell";
import { ioBulletPoint } from "../../io/layout/ioBulletPoint";
import { ioParagraph } from "../../io/layout/ioParagraph";
import { ioNewLine } from "../../io/layout/ioNewLine";

import { styles } from "../docxstyles";

function getHBA1CRow(
	c1: string,
	c2: number[] | (string | null)[],
	bold = [true, false, false, false, false, false, false]
) {
	return new TableRow({
		children: [
			ioTableCell(
				33,
				[
					new TextRun({
						text: c1,
						bold: bold[0],
					}),
				],
				AlignmentType.LEFT,
			),
			...c2
				.filter(c => (c !== 0 && c !== null))
				.map((c, index) => {
					if (typeof c === "number") {
						return ioTableCell(
							33,
							[
								new TextRun({
									text: c.toFixed(1),
									bold: bold[index + 1],
								}),
							],
							AlignmentType.LEFT,
						);

					};

					return ioTableCell(
						33,
						[
							new TextRun({
								text: c!,
								bold: bold[index + 1],
							}),
						],
						AlignmentType.LEFT,
					);

				}),
		]
	});
};

export async function generateHBA1CDoc(
	demographics: DemographicsDraftType,
	conditions: CheckedConditionsDraftType,
) {
	const hba1cCondition = conditions.filter(condition => condition.id === "type2diabetesmellitus")[0];

	const topInfo = [
		ioParagraph(
			`HBA1C REPORT`,
			true,
			undefined,
			"iosectionheader",
			AlignmentType.CENTER,
		),
		ioParagraph(
			[
				new TextRun({
					text: "DOB:",
					bold: true,
				}),
				new TextRun({
					text: ` ${demographics.filter(n => n.id === "dateOfBirth")[0].value}`,
					bold: true,
				}),
			],
		),
		ioTable({
			rows: [
				getHBA1CRow(
					"DATE",
					hba1cCondition.hba1c!.map(h => h.date),
					[true, false]
				),
				getHBA1CRow(
					"VALUE",
					hba1cCondition.hba1c!.map(h => h.value),
					[true, false]
				),
			]
		}),
		ioBulletPoint(
			hba1cCondition.selection!,
			1,
		),
		ioNewLine(),
		ioParagraph(
			`PATIENT NAME, born ${demographics.filter(n => n.id === "dateOfBirth")[0].value}`,
		),
		ioNewLine(),
		ioParagraph(
			"Action Plan",
			true,
			true,
		),
		ioParagraph(
			"Treatment Goals",
			true,
		),
		...hba1cCondition.treatmentGoals.map(tgoal => {
			const par = ioBulletPoint(
				tgoal,
				0,
			);
			return par;
		}),
		ioParagraph(
			"Planned intervention",
			true,
		),
		...hba1cCondition.plannedInterventions.map(tgoal => {
			const par = ioBulletPoint(
				tgoal,
				0,
			);
			return par;
		}),
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
