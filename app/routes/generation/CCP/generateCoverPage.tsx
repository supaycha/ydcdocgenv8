import {
	TableRow,
	AlignmentType,
	TextRun,
	PositionalTab,
	PositionalTabAlignment,
	PositionalTabLeader,
	PositionalTabRelativeTo
} from "docx"

import { ioBulletPoint } from "../../io/layout/ioBulletPoint";
import { ioDocTitle } from "../../io/layout/ioDocTitle";
import { ioNewLine } from "../../io/layout/ioNewLine";
import { ioPageTitle } from "../../io/layout/ioPageTitle";
import { ioParagraph } from "../../io/layout/ioParagraph";
import { ioTable } from "../../io/layout/ioTable";
import { ioTableCell } from "../../io/layout/ioTableCell";

import type { DemographicsDateIndivType, DemographicsDraftType, PhysicalInformationDraftType, PhysiciansDraftType } from "../../types/types"

function generateHealthCarePhysicianTable(physicianObjs: PhysiciansDraftType) {
	const physicians = physicianObjs.filter(p => {
		return (p.checked && !p.selections.every(x => x === null));
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
	].sort((a, b) => {
		if (a!.physician < b!.physician) {
			return -1;
		};
		if (a!.physician > b!.physician) {
			return 1;
		};
		return 0;
	});

	return [
		ioPageTitle(
			"Health Care Physicians",
		),
		ioNewLine(),
		ioTable({
			rows: [
				new TableRow({
					children: [
						ioTableCell(
							33,
							[
								new TextRun({
									text: "Specialty",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
						ioTableCell(
							33,
							[
								new TextRun({
									text: "Care Team Member",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
						ioTableCell(
							33,
							[
								new TextRun({
									text: "Phone Number",
									bold: true,
								}),
							],
							AlignmentType.LEFT,
						),
					]
				}),
				...physicianList.map(psel => {
					const px = new TableRow({
						children: [
							ioTableCell(
								33,
								[
									new TextRun({
										text: psel!.physician,
										bold: false,
									}),
								],
								AlignmentType.LEFT,
							),
							ioTableCell(
								33,
								[
									new TextRun({
										text: psel!.label,
										bold: false,
									}),
								],
								AlignmentType.LEFT,
							),
							ioTableCell(
								33,
								[
									new TextRun({
										text: psel!.phone,
										bold: false,
									}),
								],
								AlignmentType.LEFT,
							),
						]
					});

					return px;
				}),
			],
		}),
	];
};

function generateBoldedPhysicianList(physicianObjs: PhysiciansDraftType) {
	const physicians = physicianObjs.filter(p => {
		return (p.checked && !p.selections.every(x => x === null));
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
					return x !== null;
				});

			return ppx;
		}).flat()
	].sort((a, b) => {
		if (a!.physician < b!.physician) {
			return -1;
		}
		if (a!.physician > b!.physician) {
			return 1;
		}
		return 0;
	});
	return physicianList.map(psel => {
		if (psel!.label === 'Olga Duchicela, MD') {
			return [
				ioParagraph(
					`               ${psel!.physician} (${psel!.label}):`,
					true,
				),
				ioBulletPoint(
					"Age related",
					1,
				),
			];
		};
		return [
			ioNewLine(),
			ioParagraph(
				`               ${psel!.physician} (${psel!.label}):`,
				true,
			),
		];
	}).flat();
};

export function generateCoverPage(
	mode: string,
	demographics: DemographicsDraftType,
	physicalInformation: PhysicalInformationDraftType,
	physicianObjs: PhysiciansDraftType,
) {
	const hcpt = generateHealthCarePhysicianTable(physicianObjs);
	const c = [
		ioDocTitle(
			`COMPREHENSIVE CARE PLAN`,
			true,
		),
		ioNewLine(),
		ioParagraph(
			[
				new TextRun({
					text: `Date of Establishment: ${(demographics.filter(n => n.id === "dateOfEstablishment")[0] as DemographicsDateIndivType).value}`
				}),
				new PositionalTab({
					alignment: PositionalTabAlignment.RIGHT,
					relativeTo: PositionalTabRelativeTo.MARGIN,
					leader: PositionalTabLeader.NONE,
				}),
				new TextRun({
					text: `Date of Revision: ${(demographics.filter(n => n.id === "dateOfRevision")[0] as DemographicsDateIndivType).value}`
				}),
			],
		),
		ioNewLine(),
		ioParagraph(
			[
				(mode === "All" ?
					new TextRun({
						text: "Care Plan for __________________",
					}) :
					new TextRun({
						text: "Preventatives for __________________"
					})),
			],
		),
		ioParagraph(
			`Gender: ${physicalInformation.filter(n => n.id === "patientGender")[0].value === 1 ? "Male" : "Female"}`,
		),
		ioParagraph(
			`Acct #: ${demographics.filter(n => n.id === "accountNum")[0].value}`),
		ioParagraph(
			`Height: ${physicalInformation.filter(n => n.id === "patientHeight")[0].value}`,
		),
		ioParagraph(
			`Weight: ${physicalInformation.filter(n => n.id === "patientWeight")[0].value}`,
		),
		ioParagraph(
			`BMI: ${physicalInformation.filter(n => n.id === "patientBMI")[0].value}`,
		),
		ioParagraph(
			`Blood Pressure: ${physicalInformation.filter(n => n.id === "patientBloodPressure")[0].value}`,
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
		ioParagraph(
			"Primary Care Physician: Olga Duchicela, MD",
			true,
		),
		ioNewLine(),
		...hcpt,
		ioNewLine(),
		ioPageTitle(
			"Problem List",
		),
		ioBulletPoint(
			"Chronic Care Problems with Interphysician Collaboration:",
			0,
			true,
		),
		...generateBoldedPhysicianList(physicianObjs),
		ioBulletPoint(
			"Surgical History",
			0,
			true,
		),
		ioBulletPoint(
			"Hysterectomy",
			1,
		),
		ioBulletPoint(
			"Test/Procedures",
			0,
			true,
		),
	];

	// typescript "strict" mode not allowing the empty arrays to be in array without creating
	//		additional typing errors further down the line
	return c;
};
