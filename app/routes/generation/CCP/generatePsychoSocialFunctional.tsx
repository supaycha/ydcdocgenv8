import { TableRow, TextRun, AlignmentType } from "docx";
import type {
	FunctionalsDraftType,
	SingleScreeningDraftType,
	SocialDeterminantsCodeType,
	SocialDeterminantsCodeWrapperType,
	SocialDeterminantsCodesWrapperType,
	SocialDeterminantsDraftType,
	SocialDeterminantsQuestionsType,
	SocialDrugHistoryDraftType,
	SocialDrugHistoryIllegalIndivType,
	SocialDrugHistoryIndivType,
	SocialDrugHistoryLegalIndivType,
} from "../../types/types";
import { ioBulletPoint } from "../../io/layout/ioBulletPoint";
import { ioPageTitle } from "../../io/layout/ioPageTitle";
import { ioParagraph } from "../../io/layout/ioParagraph";
import { ioTable } from "../../io/layout/ioTable";
import { ioTableCell } from "../../io/layout/ioTableCell";
import { ioNewLine } from "../../io/layout/ioNewLine";

function getFunctionalsRow(
	c1: string,
	c2: string,
	c3: string,
	bold = [true, false, false]
) {
	if (c2 === "" && c3 === "") {
		return new TableRow({
			children: [
				ioTableCell(
					20,
					[
						new TextRun({
							text: c1,
							bold: bold[0],
						}),
					],
					AlignmentType.LEFT,
				),
				ioTableCell(
					80,
					[
						new TextRun({
							text: "There are "
						}),
						new TextRun({
							text: "no records indicating that you have had this Screening. If you have had this screening, ",
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
	else if (c1 === "Lung Cancer (CT)" && c2 === "" && c3 === "NON-SMOKER") {
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
							text: c3,
							bold: false,
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
				10,
				[
					new TextRun({
						text: c1,
						bold: bold[0],
					}),
				],
				AlignmentType.LEFT,
			),
			ioTableCell(
				45,
				[
					new TextRun({
						text: c2,
						bold: bold[1],
					}),
				],
			),
			ioTableCell(
				45,
				[
					new TextRun({
						text: c3,
						bold: bold[2],
					}),
				],
			),
		]
	});
};

function getSocialDrugHistoryRowA(
	c1: string,
	c2: string,
	c3: string,
	bold = [true, false, false]
) {
	return new TableRow({
		children: [
			ioTableCell(
				10,
				[
					new TextRun({
						text: c1,
						bold: bold[0],
					}),
				],
				AlignmentType.LEFT,
			),
			ioTableCell(
				45,
				[
					new TextRun({
						text: c2,
						bold: bold[1],
					}),
				],
			),
			ioTableCell(
				45,
				[
					new TextRun({
						text: c3,
						bold: bold[2],
					}),
				],
			),
		]
	});
};

function getSocialDrugHistoryRowB(
	c1: string,
	c2: string,
	c3: string,
	bold = [true, false, false]
) {
	return new TableRow({
		children: [
			ioTableCell(
				10,
				[
					new TextRun({
						text: c1,
						bold: bold[0],
					}),
				],
				AlignmentType.LEFT,
			),
			ioTableCell(
				45,
				[
					new TextRun({
						text: c2,
						bold: bold[1],
					}),
				],
			),
			ioTableCell(
				45,
				[
					new TextRun({
						text: c3,
						bold: bold[2],
					}),
				],
			),
		]
	});
};

function generatePsychosocials(allSingleScreenings: SingleScreeningDraftType) {
	const depressionScreening = allSingleScreenings.find(singleScreening => {
		return singleScreening.id === "Depression screening (PHQ-9)";
	})!;

	const dateReceived = depressionScreening.dateReceived ? depressionScreening.dateReceived : "_____";

	return [
		ioBulletPoint(
			`Psychological testing: Last PHQ-9 Test was done on ${dateReceived}. Score:`,
			0.
		),
		ioParagraph(
			"          Positive for Major depressive disorder and bipolar disorder",
		),
		ioNewLine(),
	];
};

function generateFunctionals(functionals: FunctionalsDraftType) {
	const diet = functionals.diet!.questions
		.map(question => {
			return getFunctionalsRow(
				question.id,
				question.description,
				question.value.toString(),
				[
					true,
					false,
					false,
				],
			);
		});

	const KATZADL = functionals.KATZADL!.activities
		.map(activity => {
			const f = activity.options.map(option => option.description);
			return getFunctionalsRow(
				activity.checked ? "1" : "0",
				f[0],
				f[1],
				[
					false,
					activity.checked,
					!activity.checked,
				],
			);
		});

	const LBIADL = functionals.LBIADL!.activities
		.map(activity => {
			const checkedOption = activity.options.filter(option => option.checked)[0];
			return getFunctionalsRow(
				activity.id,
				checkedOption === undefined ? "VALUE NOT SELECTED" : checkedOption.description,
				checkedOption === undefined ? "0" : checkedOption.value.toString(),
				[
					true,
					false,
					false,
				],
			);
		});

	const physicalactivity = functionals.physicalactivity!.questions
		.map(question => {
			return getFunctionalsRow(
				question.id,
				question.description,
				question.value.toString(),
				[
					true,
					false,
					false,
				],
			);
		});

	const socialactivity = functionals.socialactivity!.questions
		.map(question => {
			return getFunctionalsRow(
				question.id,
				question.description,
				question.value.toString(),
				[
					true,
					false,
					false,
				],
			);
		});

	return [
		ioPageTitle(
			"diet",
			false,
		),
		ioTable({
			rows: [
				getFunctionalsRow("id", "question", "amount", [true, true, true]),
				...diet,
			]
		}),
		ioNewLine(),
		ioPageTitle(
			"KATZADL",
			false,
		),
		ioTable({
			rows: [
				getFunctionalsRow("value of selection", "independence", "dependence", [true, true, true]),
				...KATZADL,
			]
		}),
		ioNewLine(),
		ioPageTitle(
			"LBIADL",
			false,
		),
		ioTable({
			rows: [
				getFunctionalsRow("activity", "selected description", "value of selection", [true, true, true]),
				...LBIADL,
			]
		}),
		ioNewLine(),
		ioPageTitle(
			"physicalactivity",
			false,
		),
		ioTable({
			rows: [
				getFunctionalsRow("id", "question", "amount", [true, true, true]),
				...physicalactivity,
			]
		}),
		ioNewLine(),
		ioPageTitle(
			"socialactivity",
			false,
		),
		ioTable({
			rows: [
				getFunctionalsRow("id", "question", "amount", [true, true, true]),
				...socialactivity,
			]
		}),
		ioNewLine(),
	];
};

function generateSocialDrugHistory(
	socialDrugHistory: SocialDrugHistoryDraftType,
) {
	const startingList = socialDrugHistory.filter(sdh => sdh.toggleButtonValue !== "NEVER USED");

	return [
		ioTable({
			rows: [
				getSocialDrugHistoryRowA("LEGAL DRUGS", "TIMES PER DAY", "TIMES PER YEAR", [true, true, true]),
				...startingList
					.filter(f => (
						("timesperday" in f)
					))
					.map((s: SocialDrugHistoryIndivType) => {
						const s2 = s as SocialDrugHistoryLegalIndivType;
						return getSocialDrugHistoryRowA(
							s2.id,
							s2.timesperday.value,
							s2.timesperyear.value,
						);
					}),
				getSocialDrugHistoryRowB("ILLEGAL DRUGS", "ATTEMPTED REHAB", "HOSPITALIZED", [true, true, true]),
				...startingList
					.filter(f => (
						f.id === "marijuana" ||
						f.id === "cocaine" ||
						f.id === "heroin"
					))
					.map((s: SocialDrugHistoryIndivType) => {
						const s2 = s as SocialDrugHistoryIllegalIndivType;
						return getSocialDrugHistoryRowB(
							s2.id,
							s2.attemptedrehab.value.toString(),
							s2.hospitalized.value.toString(),
						);
					}),
			]
		}),
		ioNewLine(),
	];
};

function getSocialDeterminantsRow(
	c1: string,
	c2: string,
	bold = [true, false]
) {
	return new TableRow({
		children: [
			ioTableCell(
				10,
				[
					new TextRun({
						text: c1,
						bold: bold[0],
					}),
				],
				AlignmentType.LEFT,
			),
			ioTableCell(
				45,
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

function checkForOnlyCodes(questionsList: SocialDeterminantsQuestionsType) {
	const codesPresent = questionsList.some(q => ("codes" in q))
	const codePresent = questionsList.some(q => ("code" in q))
	return codesPresent && !codePresent;
}

function checkForOnlyCode(questionsList: SocialDeterminantsQuestionsType) {
	const codesPresent = questionsList.some(q => ("codes" in q))
	const codePresent = questionsList.some(q => ("code" in q))
	return !codesPresent && codePresent;
}

function checkForCodeAndCodes(questionsList: SocialDeterminantsQuestionsType) {
	const codesPresent = questionsList.some(q => ("codes" in q))
	const codePresent = questionsList.some(q => ("code" in q))
	return codesPresent && codePresent;
}
// there are 3 permutations to account for
// 1. questions list with only "codes" objects in it
// 2. questions list with "codes" objects AND "code" objects in it
// 3. questions list with only "code" objects in it
function generateSocialDeterminants(
	socialDeterminants: SocialDeterminantsDraftType,
) {
	const startingList = [] as SocialDeterminantsCodeType[];
	socialDeterminants.forEach(questionGroup => {
		if (checkForOnlyCodes(questionGroup.questions)) {
			questionGroup.questions.forEach(q => {
				const q2 = q as SocialDeterminantsCodesWrapperType;
				q2.codes.forEach(c => {
					if (c.code.checked) {
						startingList.push(c.code);
					};
				});
			});
		}
		else if (checkForOnlyCode(questionGroup.questions)) {
			questionGroup.questions.forEach(q => {
				const q2 = q as SocialDeterminantsCodeWrapperType;
				if (q2.code.checked) {
					startingList.push(q2.code);
				};
			});
		}
		else if (checkForCodeAndCodes(questionGroup.questions)) {
			questionGroup.questions.forEach(q => {
				if ("code" in q) {
					const q2 = q as SocialDeterminantsCodeWrapperType;
					if (q2.code.checked) {
						startingList.push(q2.code);
					};
				}
				else {
					const q2 = q as SocialDeterminantsCodesWrapperType;
					q2.codes.forEach(c => {
						if (c.code.checked) {
							startingList.push(c.code);
						};
					});
				};
			});
		};
	});

	return [
		ioTable({
			rows: [
				getSocialDeterminantsRow("id", "description", [true, true]),
				...startingList.map(code => {
					return getSocialDeterminantsRow(
						code.id,
						code.description,
					);
				}),
			]
		}),
	];
};

export function generatePsychoSocialFunctional(
	allSingleScreenings: SingleScreeningDraftType,
	functionals: FunctionalsDraftType,
	socialDrugHistory: SocialDrugHistoryDraftType,
	socialDeterminants: SocialDeterminantsDraftType
) {
	const c = [
		ioPageTitle(
			"Psychosocial",
			true,
		),
		...generatePsychosocials(allSingleScreenings),
		ioPageTitle(
			"Functionals",
			false,
		),
		ioNewLine(),
		...generateFunctionals(functionals),
		ioPageTitle(
			"Social Drug History",
			false,
		),
		ioNewLine(),
		...generateSocialDrugHistory(socialDrugHistory),
		ioPageTitle(
			"Social Determinants",
			false,
		),
		ioNewLine(),
		...generateSocialDeterminants(socialDeterminants),
	];

	return c;
};
