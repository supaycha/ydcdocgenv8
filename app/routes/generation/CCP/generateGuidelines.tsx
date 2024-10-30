import { TableRow, AlignmentType, TextRun } from "docx";
import type { AgeRangeType, PneumococcalVaccineDraftType } from "../../types/types";
import { ioPageTitle } from "../../io/layout/ioPageTitle";
import { ioTable } from "../../io/layout/ioTable";
import { ioTableCell } from "../../io/layout/ioTableCell";
import { ioNewLine } from "../../io/layout/ioNewLine";

function getVaccinationRowB(
	c1: string,
	c2: string,
	bold = [true, false],
) {
	if (c1 !== "RSV" && c2 === "") {
		return new TableRow({
			children: [
				ioTableCell(
					40,
					[
						new TextRun({
							text: c1,
							bold: bold[0],
						}),
					],
				),
				ioTableCell(
					60,
					[
						new TextRun({
							text: "There are "
						}),
						new TextRun({
							text: "no records indicating that you have had this Vaccine. If you have had this vaccine, ",
							bold: true,
						}),
						new TextRun({
							text: "please sign a records release in order for those records to be obtained."
						}),
					],
					undefined,
					undefined,
					2,
				),
			]
		});
	}
	else if (c1 === "RSV" && c2 === "") {
		return new TableRow({
			children: [
				ioTableCell(
					40,
					[
						new TextRun({
							text: c1,
							bold: true,
						}),
					],
				),
				ioTableCell(
					60,
					[
						new TextRun({
							text: "Recommended For Individuals >= 60 Using Shared Clinical Decision Making"
						}),
					],
					AlignmentType.CENTER,
					undefined,
					2,
				),
			]
		});
	}
	return new TableRow({
		children: [
			ioTableCell(
				40,
				[
					new TextRun({
						text: c1,
						bold: bold[0],
					}),
				],
				AlignmentType.LEFT,
			),
			ioTableCell(
				60,
				[
					new TextRun({
						text: c2,
						bold: bold[1],
					}),
				],
			),
		]
	});
};

export function generateVaccinationGuidelines(
	patientAge: number,
	pneumococcalVaccine: PneumococcalVaccineDraftType,
) {
	if (pneumococcalVaccine.ageRange === "") {
		return [];
	};

	const trueStatements = (pneumococcalVaccine[pneumococcalVaccine.ageRange] as AgeRangeType).recommendations
		.filter(recommendation => {
			return recommendation.possibleNextVaccines.some(possibility => {
				const temp = possibility.statements.some(statement => {
					return statement.value && statement.pre !== "null" && statement.post !== "null";
				});
				return temp;
			});
		});

	const filteredTrueStatements = trueStatements.map(trueStatement => {
		const nonNullStatements = trueStatement.possibleNextVaccines.map(possibleNextVaccine => {
			const nonNullStatement = possibleNextVaccine.statements.filter(statement => statement.value)[0];
			if (nonNullStatement.pre !== "null" && nonNullStatement.post === "null") {
				const guideLine = `${nonNullStatement.pre}`
				return getVaccinationRowB(
					possibleNextVaccine.id,
					guideLine,
					[true, true],
				);
			}
			const guideLine = `${nonNullStatement.pre} then ${nonNullStatement.post}`
			return getVaccinationRowB(
				possibleNextVaccine.id,
				guideLine,
				[true, true],
			);
		})
		return nonNullStatements;
	}).flat();

	return filteredTrueStatements;
};

export function generateGuidelines(
	patientAge: number,
	pneumococcalVaccine: PneumococcalVaccineDraftType,
) {
	const d = generateVaccinationGuidelines(patientAge, pneumococcalVaccine);

	const c = [
		ioPageTitle(
			"Guidelines",
			true,
		),
		ioNewLine(),
		ioTable({
			rows: [
				getVaccinationRowB("Vaccination", "Guideline", [true, true]),
				...d,
			]
		}),
	];

	return c;
};
