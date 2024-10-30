import { TableRow, TextRun, AlignmentType } from "docx";
import type {
	DosesVaccineDraftType,
	GroupedScreeningDraftType,
	ToggledScreeningDraftType,
	SingleScreeningDraftType,
	DiagnosticsDraftType,
	PneumococcalVaccineDraftType,
	BothVaccineDraftType,
	OnlyVaccineDraftType,
	AgeRangeType,
} from "../../types/types";
import { ioPageTitle } from "../../io/layout/ioPageTitle";
import { ioParagraph } from "../../io/layout/ioParagraph";
import { ioTable } from "../../io/layout/ioTable";
import { ioTableCell } from "../../io/layout/ioTableCell";
import { ioNewLine } from "../../io/layout/ioNewLine";

function getScreeningRow(
	c1: string,
	c2: string,
	c3: string,
	bold = [true, false, false]
) {
	if (c2 === "" && c3 === "") {
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
							bold: bold[1],
						}),
					],
					undefined,
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
				30,
				[
					new TextRun({
						text: c2,
						bold: bold[1],
					}),
				],
			),
			ioTableCell(
				30,
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

function getDiagnosticRow(
	c1: string,
	c2: string,
	c3: string,
	bold = [true, false, false]
) {
	if (c2 === "" && c3 === "") {
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
					undefined,
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
				30,
				[
					new TextRun({
						text: c2,
						bold: bold[1],
					}),
				],
			),
			ioTableCell(
				30,
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

function getVaccinationRowA(
	c1: string,
	c2: string,
	c3: string,
	bold = [true, false, false]
) {
	if (c2 === "" && c3 === "") {
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
				30,
				[
					new TextRun({
						text: c2,
						bold: bold[1],
					}),
				],
			),
			ioTableCell(
				30,
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

function getVaccinationRowB(
	c1: string,
	c2: string,
	bold = [true, false]) {
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
					AlignmentType.LEFT,
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
							bold: bold[0],
						}),
					],
					AlignmentType.LEFT,
				),
				ioTableCell(
					40,
					[
						new TextRun({
							text: "Recommended For Individuals >= 60 Using Shared Clinical Decision Making",
							bold: false,
						}),
					],
					undefined,
					undefined,
					2,
				),
			],
		});
	};
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
		],
	});
};

function getNestedVaccinationRows(
	id: string,
	allVaccineObjs: DosesVaccineDraftType,
) {
	const a = allVaccineObjs.filter(f => f.id === id)[0].doses;
	const b = a.map(s => {
		return getVaccinationRowB(
			s.id,
			s.dateReceived ? s.dateReceived : "",
		);
	});


	return b;
};

export function generatePneumococcalVaccine(patientAge: number, pneumococcalVaccine: PneumococcalVaccineDraftType) {
	if (pneumococcalVaccine.ageRange === "") {
		return [];
	}

	const fullArr = [];
	// check to make sure versions that were checked but left empty dates don't factor in?
	const anyVaccines = pneumococcalVaccine.versions.some(version => version.dateReceived !== null);
	const anyRiskConditions = (pneumococcalVaccine[pneumococcalVaccine.ageRange] as AgeRangeType).riskConditions.some(riskCondition => riskCondition.checked);
	const anyVaccinesOrRiskConditions = anyVaccines && anyRiskConditions;
	const onlyVaccines = anyVaccines && !anyRiskConditions;
	const onlyRiskConditions = !anyVaccines && anyRiskConditions;
	const neitherVaccinesOrRiskConditions = !anyVaccines && !anyRiskConditions;
	if (pneumococcalVaccine.ageRange === "twentyfourmonthstofiftyninemonths" && neitherVaccinesOrRiskConditions) {
		// first record the versions that are checked and have a non-null dateReceived value
		const filteredNonNullVersions = pneumococcalVaccine.versions.filter(version => version.dateReceived !== null);

		if (pneumococcalVaccine.ageRange === "twentyfourmonthstofiftyninemonths") {
			const mappedFilteredNonNullVersions = filteredNonNullVersions.map(pVaccineVersion => {
				return getVaccinationRowA(
					pVaccineVersion.version,
					(pVaccineVersion.dateReceived ? pVaccineVersion.dateReceived : ""),
					pVaccineVersion.dateDue!,
				);
			});
			fullArr.push(...mappedFilteredNonNullVersions);
		}
		else {
			const mappedFilteredNonNullVersions = filteredNonNullVersions.map(pVaccineVersion => {
				return getVaccinationRowA(
					pVaccineVersion.version,
					(pVaccineVersion.dateReceived ? pVaccineVersion.dateReceived : ""),
					"ASAP",
				);
			});
			fullArr.push(...mappedFilteredNonNullVersions);
		};

		//  have to rewrite the logic where statemnets with no risk conditions don't change dateDue from null or DO change dateDue to null
		// if (nonNullVersions.length > 0) {
		// next record the recommendation.possibleNextVaccines.statements that are checked and have a non-null dateDue value
		const matchedRecommendation = (pneumococcalVaccine[pneumococcalVaccine.ageRange] as AgeRangeType).recommendations.filter(recommendation => {
			return recommendation.possibleNextVaccines.some(possibility => {
				return possibility.statements.some(statement => {
					// return statement.value && statement.dateDue !== null;
					return statement.value && statement.pre !== "null" && statement.post !== "null";
				});
			});
		});

		if (matchedRecommendation.length > 0) {
			if (pneumococcalVaccine.ageRange === "twentyfourmonthstofiftyninemonths") {
				const possibleNextVaccines = matchedRecommendation[0].possibleNextVaccines.filter(possibleNextVaccine => {
					return possibleNextVaccine.statements.some(statement => {
						// return statement.value && statement.dateDue !== null;
						return statement.value;
					});
				});

				const filteredPossibleNextVaccines = possibleNextVaccines.map(possibleNextVaccine => {
					const tempStatements = possibleNextVaccine.statements.filter(statement => {
						return statement.value;
					});

					const mappedTempStatements = tempStatements.map(tempStatement => {
						return getVaccinationRowA(
							possibleNextVaccine.id,
							("IF TAKEN"),
							(tempStatement.dateDue ? tempStatement.dateDue : ((!anyVaccines && anyRiskConditions) ? "ASAP" : "")),
						);
					});

					return mappedTempStatements;
				}).flat();

				fullArr.push(...filteredPossibleNextVaccines);
			}
			else if (pneumococcalVaccine.ageRange === "sixtoeighteen") {
				const possibleNextVaccines = matchedRecommendation[0].possibleNextVaccines.filter(possibleNextVaccine => {
					return possibleNextVaccine.statements.some(statement => {
						return statement.value;
					});
				});

				const filteredPossibleNextVaccines = possibleNextVaccines.map(possibleNextVaccine => {
					const tempStatements = possibleNextVaccine.statements.filter(statement => {
						return statement.value && (statement.pre !== "no vaccine recommendations at this time" || statement.dayjsInJsonForm.value !== 0);
					});

					const mappedTempStatements = tempStatements.map(tempStatement => {
						return getVaccinationRowA(
							possibleNextVaccine.id,
							((!anyVaccines && anyRiskConditions) ? "CHOOSE ONLY ONE OF THE TWO" : "IF TAKEN"),
							(tempStatement.dateDue ? tempStatement.dateDue : ((!anyVaccines && anyRiskConditions) ? "ASAP" : "")),
						);
					});

					return mappedTempStatements;
				}).flat();

				fullArr.push(...filteredPossibleNextVaccines);
			}
			else if (pneumococcalVaccine.ageRange === "nineteentosixtyfour") {
				const possibleNextVaccines = matchedRecommendation[0].possibleNextVaccines.filter(possibleNextVaccine => {
					return possibleNextVaccine.statements.some(statement => {
						return statement.value;
					});
				});

				const filteredPossibleNextVaccines = possibleNextVaccines.map(possibleNextVaccine => {
					const tempStatements = possibleNextVaccine.statements.filter(statement => {
						return statement.value && (statement.pre !== "no vaccine recommendations at this time" || statement.dayjsInJsonForm.value !== 0);
					});

					const mappedTempStatements = tempStatements.map(tempStatement => {
						return getVaccinationRowA(
							possibleNextVaccine.id,
							((!anyVaccines && anyRiskConditions) ? "CHOOSE ONLY ONE OF THE TWO" : "IF TAKEN"),
							(tempStatement.dateDue ? tempStatement.dateDue : ((!anyVaccines && anyRiskConditions) ? "ASAP" : "")),
						);
					});

					return mappedTempStatements;
				}).flat();

				fullArr.push(...filteredPossibleNextVaccines);
			}
			// sixtyfiveandup
			else {
				const possibleNextVaccines = matchedRecommendation[0].possibleNextVaccines.filter(possibleNextVaccine => {
					return possibleNextVaccine.statements.some(statement => {
						return statement.value;
					});
				});

				const filteredPossibleNextVaccines = possibleNextVaccines.map(possibleNextVaccine => {
					const tempStatements = possibleNextVaccine.statements.filter(statement => {
						return statement.value && statement.dateDue !== null;
					});

					const mappedTempStatements = tempStatements.map(tempStatement => {
						return getVaccinationRowA(
							possibleNextVaccine.id,
							((!anyVaccines && anyRiskConditions) ? "CHOOSE ONLY ONE OF THE TWO" : "IF TAKEN"),
							(tempStatement.dateDue ? tempStatement.dateDue : ((!anyVaccines && anyRiskConditions) ? "ASAP" : "")),
						);
					});

					return mappedTempStatements;
				}).flat();

				fullArr.push(...filteredPossibleNextVaccines);
			};
		};
	}
	else if (anyVaccinesOrRiskConditions || onlyVaccines || onlyRiskConditions) {
		// first record the versions that are checked and have a non-null dateReceived value
		const filteredNonNullVersions = pneumococcalVaccine.versions.filter(version => version.dateReceived !== null);

		if (
			pneumococcalVaccine.ageRange === "fourmonthstosixmonths"
			|| pneumococcalVaccine.ageRange === "sevenmonthstoelevenmonths"
			|| pneumococcalVaccine.ageRange === "twelvemonthstotwentythreemonths"
			|| pneumococcalVaccine.ageRange === "twentyfourmonthstofiftyninemonths"
		) {
			const mappedFilteredNonNullVersions = filteredNonNullVersions.map(pVaccineVersion => {
				return getVaccinationRowA(
					pVaccineVersion.version,
					(pVaccineVersion.dateReceived ? pVaccineVersion.dateReceived : ""),
					pVaccineVersion.dateDue!,
				);
			});
			fullArr.push(...mappedFilteredNonNullVersions);
		}
		else {
			const mappedFilteredNonNullVersions = filteredNonNullVersions.map(pVaccineVersion => {
				return getVaccinationRowA(
					pVaccineVersion.version,
					(pVaccineVersion.dateReceived ? pVaccineVersion.dateReceived : ""),
					"ASAP",
				);
			});
			fullArr.push(...mappedFilteredNonNullVersions);
		};

		//  have to rewrite the logic where statemnets with no risk conditions don't change dateDue from null or DO change dateDue to null
		// if (nonNullVersions.length > 0) {
		// next record the recommendation.possibleNextVaccines.statements that are checked and have a non-null dateDue value
		const matchedRecommendation = (pneumococcalVaccine[pneumococcalVaccine.ageRange] as AgeRangeType).recommendations.filter(recommendation => {
			return recommendation.possibleNextVaccines.some(possibility => {
				return possibility.statements.some(statement => {
					return statement.value && statement.pre !== "null" && statement.post !== "null";
				});
			});
		});

		if (matchedRecommendation.length > 0) {
			if (pneumococcalVaccine.ageRange === "fourmonthstosixmonths") {
				const possibleNextVaccines = matchedRecommendation[0].possibleNextVaccines.filter(possibleNextVaccine => {
					return possibleNextVaccine.statements.some(statement => {
						return statement.value;
					});
				});

				const filteredPossibleNextVaccines = possibleNextVaccines.map(possibleNextVaccine => {
					const tempStatements = possibleNextVaccine.statements.filter(statement => {
						return statement.value && (statement.pre !== "no vaccine recommendations at this time" || statement.dayjsInJsonForm.value !== 0);
					});

					const mappedTempStatements = tempStatements.map(tempStatement => {
						return getVaccinationRowA(
							possibleNextVaccine.id,
							((!anyVaccines && anyRiskConditions) ? "CHOOSE ONLY ONE OF THE TWO" : "IF TAKEN"),
							(tempStatement.dateDue ? tempStatement.dateDue : ((!anyVaccines && anyRiskConditions) ? "ASAP" : "")),
						);
					});

					return mappedTempStatements;
				}).flat();

				fullArr.push(...filteredPossibleNextVaccines);
			}
			else if (pneumococcalVaccine.ageRange === "sevenmonthstoelevenmonths") {
				const possibleNextVaccines = matchedRecommendation[0].possibleNextVaccines.filter(possibleNextVaccine => {
					return possibleNextVaccine.statements.some(statement => {
						return statement.value;
					});
				});

				const filteredPossibleNextVaccines = possibleNextVaccines.map(possibleNextVaccine => {
					const tempStatements = possibleNextVaccine.statements.filter(statement => {
						return statement.value && (statement.pre !== "no vaccine recommendations at this time" || statement.dayjsInJsonForm.value !== 0);
					});

					const mappedTempStatements = tempStatements.map(tempStatement => {
						return getVaccinationRowA(
							possibleNextVaccine.id,
							((!anyVaccines && anyRiskConditions) ? "CHOOSE ONLY ONE OF THE TWO" : "IF TAKEN"),
							(tempStatement.dateDue ? tempStatement.dateDue : ((!anyVaccines && anyRiskConditions) ? "ASAP" : "")),
						);
					});

					return mappedTempStatements;
				}).flat();

				fullArr.push(...filteredPossibleNextVaccines);
			}
			else if (pneumococcalVaccine.ageRange === "twelvemonthstotwentythreemonths") {
				const possibleNextVaccines = matchedRecommendation[0].possibleNextVaccines.filter(possibleNextVaccine => {
					return possibleNextVaccine.statements.some(statement => {
						return statement.value;
					});
				});

				const filteredPossibleNextVaccines = possibleNextVaccines.map(possibleNextVaccine => {
					const tempStatements = possibleNextVaccine.statements.filter(statement => {
						return statement.value;
					});

					const mappedTempStatements = tempStatements.map(tempStatement => {
						return getVaccinationRowA(
							possibleNextVaccine.id,
							((!anyVaccines && anyRiskConditions) ? "CHOOSE ONLY ONE OF THE TWO" : "IF TAKEN"),
							(tempStatement.dateDue ? tempStatement.dateDue : ((!anyVaccines && anyRiskConditions) ? "ASAP" : "")),
						);
					});

					return mappedTempStatements;
				}).flat();

				fullArr.push(...filteredPossibleNextVaccines);
			}
			else if (pneumococcalVaccine.ageRange === "twentyfourmonthstofiftyninemonths") {
				const possibleNextVaccines = matchedRecommendation[0].possibleNextVaccines.filter(possibleNextVaccine => {
					return possibleNextVaccine.statements.some(statement => {
						return statement.value;
					});
				});

				// the sorting filter is for no risk conditions and any risk condition being reversed but only for 0vaccinestaken
				const filteredPossibleNextVaccines = possibleNextVaccines.map(possibleNextVaccine => {
					const tempStatements = possibleNextVaccine.statements.filter(statement => {
						return !(matchedRecommendation[0].id === "0vaccinestaken") && (statement.value);
					});

					const mappedTempStatements = tempStatements.map(tempStatement => {
						return getVaccinationRowA(
							possibleNextVaccine.id,
							("IF TAKEN"),
							(tempStatement.dateDue ? tempStatement.dateDue : ((!anyVaccines && anyRiskConditions) ? "ASAP" : "")),
						);
					});

					return mappedTempStatements;
				}).flat();

				fullArr.push(...filteredPossibleNextVaccines);
			}
			else if (pneumococcalVaccine.ageRange === "sixtoeighteen") {
				const possibleNextVaccines = matchedRecommendation[0].possibleNextVaccines.filter(possibleNextVaccine => {
					return possibleNextVaccine.statements.some(statement => {
						return statement.value;
					});
				});

				const filteredPossibleNextVaccines = possibleNextVaccines.map(possibleNextVaccine => {
					const tempStatements = possibleNextVaccine.statements.filter(statement => {
						return statement.value && (statement.pre !== "no vaccine recommendations at this time" || statement.dayjsInJsonForm.value !== 0);
					});

					const mappedTempStatements = tempStatements.map(tempStatement => {
						return getVaccinationRowA(
							possibleNextVaccine.id,
							((!anyVaccines && anyRiskConditions) ? "CHOOSE ONLY ONE OF THE TWO" : "IF TAKEN"),
							(tempStatement.dateDue ? tempStatement.dateDue : ((!anyVaccines && anyRiskConditions) ? "ASAP" : "")),
						);
					});

					return mappedTempStatements;
				}).flat();

				fullArr.push(...filteredPossibleNextVaccines);
			}
			else if (pneumococcalVaccine.ageRange === "nineteentosixtyfour") {
				const possibleNextVaccines = matchedRecommendation[0].possibleNextVaccines.filter(possibleNextVaccine => {
					return possibleNextVaccine.statements.some(statement => {
						return statement.value;
					});
				});

				const filteredPossibleNextVaccines = possibleNextVaccines.map(possibleNextVaccine => {
					const tempStatements = possibleNextVaccine.statements.filter(statement => {
						return statement.value && (statement.pre !== "no vaccine recommendations at this time" || statement.dayjsInJsonForm.value !== 0);
					});

					const mappedTempStatements = tempStatements.map(tempStatement => {
						return getVaccinationRowA(
							possibleNextVaccine.id,
							((!anyVaccines && anyRiskConditions) ? "CHOOSE ONLY ONE OF THE TWO" : "IF TAKEN"),
							(tempStatement.dateDue ? tempStatement.dateDue : ((!anyVaccines && anyRiskConditions) ? "ASAP" : "")),
						);
					});

					return mappedTempStatements;
				}).flat();

				fullArr.push(...filteredPossibleNextVaccines);
			}
			// if (pneumococcalVaccine.ageRange === "sixtyfiveandup")
			else {
				const possibleNextVaccines = matchedRecommendation[0].possibleNextVaccines.filter(possibleNextVaccine => {
					return possibleNextVaccine.statements.some(statement => {
						return statement.value;
					});
				});

				const filteredPossibleNextVaccines = possibleNextVaccines.map(possibleNextVaccine => {
					const tempStatements = possibleNextVaccine.statements.filter(statement => {
						return statement.value && statement.dateDue !== null;
					});

					const mappedTempStatements = tempStatements.map(tempStatement => {
						return getVaccinationRowA(
							possibleNextVaccine.id,
							((!anyVaccines && anyRiskConditions) ? "CHOOSE ONLY ONE OF THE TWO" : "IF TAKEN"),
							(tempStatement.dateDue ? tempStatement.dateDue : ((!anyVaccines && anyRiskConditions) ? "ASAP" : "")),
						);
					});

					return mappedTempStatements;
				}).flat();

				fullArr.push(...filteredPossibleNextVaccines);
			};
		};
	};

	return fullArr;
};

export function generatePreventativeCare(
	mode: string,
	patientGender: number,
	patientAge: number,
	allGroupScreenings: GroupedScreeningDraftType,
	allToggleScreenings: ToggledScreeningDraftType,
	allSingleScreenings: SingleScreeningDraftType,
	allSingleDiagnostics: DiagnosticsDraftType,
	pneumococcalVaccine: PneumococcalVaccineDraftType,
	allDosesVaccines: DosesVaccineDraftType,
	allBothVaccines: BothVaccineDraftType,
	allOnlyVaccines: OnlyVaccineDraftType,
) {
	const d = generatePneumococcalVaccine(patientAge, pneumococcalVaccine);
	const c = [
		ioPageTitle(
			"Preventative Care",
			(mode === "All" ? true : false),
		),
		(mode === "All" ? ioParagraph("") : []),
		(mode === "All" ?
			ioTable({
				rows: [
					getScreeningRow("Screening", "Date Received", "Date Due", [true, true, true]),
					...allSingleScreenings
						.filter(f => (
							f.id === "Diabetes" ||
							f.id === "Lipid Panel"
						))
						.filter(f => f.gender === undefined || f.gender === patientGender)
						.map(s => {
							return getScreeningRow(
								s.id,
								s.dateReceived ? s.dateReceived : "",
								(s.toggleButtonValue && s.dateReceived !== undefined) ?
									s.toggleButtonValue :
									(s.dateDue ? s.dateDue : "")
							);
						}),
					...allGroupScreenings
						.map(gScreeningObj => {
							const found = gScreeningObj.radioOptions.find(r => r.id === gScreeningObj.radioButtonValue);
							if (found === undefined) {
								if (gScreeningObj.id === "Colon/Cancer") {
									return getScreeningRow(
										`${gScreeningObj.radioOptions[0].id}/${gScreeningObj.radioOptions[1].id}`,
										"",
										"",
									);
								}
								return getScreeningRow(
									gScreeningObj.radioOptions[0].id,
									"",
									"",
								);
							}
							return getScreeningRow(
								found.id,
								found.dateReceived ? found.dateReceived : "",
								(found.toggleButtonValue && found.dateReceived !== undefined) ?
									found.toggleButtonValue :
									(found.dateDue ? found.dateDue : "")
							);
						}),
					...allSingleScreenings
						.filter(f => (
							f.id === "Mammogram" ||
							f.id === "DEXA Scan" ||
							f.id === "Hepatitis C (1945-1965)" ||
							f.id === "Lung Cancer (CT)"
						))
						.filter(f => f.gender === undefined || f.gender === patientGender)
						.map(s => {
							return getScreeningRow(
								s.id,
								s.dateReceived ? s.dateReceived : "",
								(s.toggleButtonValue && s.dateReceived !== undefined) ?
									s.toggleButtonValue :
									(s.dateDue ? s.dateDue : "")
							);
						}),
					...allToggleScreenings
						.filter(f => {
							return f.gender === undefined || f.gender === patientGender
						})
						.map(s => {
							if (s.checked) {
								switch (s.toggleButtonValue) {
									case "HYSTERECTOMY": {
										if (s.datePerformed !== undefined) {
											return getScreeningRow(
												s.id,
												s.dateReceived ? s.dateReceived : "",
												`Hysterectomy ${s.datePerformed}`,
											);
										}
										return getScreeningRow(
											s.id,
											s.dateReceived ? s.dateReceived : "",
											"Hysterectomy",
										);
									}
									case "PRN": {
										return getScreeningRow(
											s.id,
											s.dateReceived ? s.dateReceived : "",
											"PRN",
										);
									}
									default: {
										return getScreeningRow(
											s.id,
											s.dateReceived ? s.dateReceived : "",
											s.dateDue ? s.dateDue : ""
										)
									}
								}
							}

							return getScreeningRow(
								s.id,
								"",
								"",
							);
						}),
					...allSingleScreenings
						.filter(f => (
							f.id === "PSA" ||
							f.id === "Vision/Glaucoma" ||
							f.id === "Depression screening (PHQ-9)" ||
							f.id === "Annual Wellness Exam"
						))
						.filter(f => f.gender === undefined || f.gender === patientGender)
						.map(s => {
							return getScreeningRow(
								s.id,
								s.dateReceived ? s.dateReceived : "",
								(s.toggleButtonValue && s.dateReceived !== undefined) ?
									s.toggleButtonValue :
									(s.dateDue ? s.dateDue : "")
							);
						}),
				]
			}) :
			[]
		),
		(mode === "All" ? ioParagraph("") : []),
		(mode === "All" ?
			ioTable({
				rows: [
					getScreeningRow("Diagnostic", "Date Received", "Date Due", [true, true, true]),
					...allSingleDiagnostics
						.filter(f => (
							f.id === "Diabetes" ||
							f.id === "Lipid Panel" ||
							f.id === "Mammogram" ||
							f.id === "DEXA Scan" ||
							f.id === "PSA" ||
							f.id === "Vision/Glaucoma"
						))
						.filter(f => f.gender === undefined || f.gender === patientGender)
						.filter(h => {
							return h.dateReceived !== null && h.toggleButtonValue !== null && h.dateReceived !== undefined;
						})
						.map(s => {
							return getDiagnosticRow(
								s.id,
								s.dateReceived ? s.dateReceived : "",
								(s.toggleButtonValue && s.dateReceived !== undefined) ?
									s.toggleButtonValue :
									(s.dateDue ? s.dateDue : "")
							);
						}),
				],
			}) :
			[]
		),
		(mode === "All" ? ioParagraph("") : []),
		ioTable({
			rows: [
				getVaccinationRowA("Vaccination", "Date Received", "Date Due", [true, true, true]),
				...d,
				...allBothVaccines
					.map(bVaccine => {
						return getVaccinationRowA(
							bVaccine.id,
							bVaccine.dateReceived ? bVaccine.dateReceived : "",
							bVaccine.dateDue ? bVaccine.dateDue : ""
						);
					}),
			]
		}),
		ioNewLine(),
		ioTable({
			rows: [
				getVaccinationRowB("Vaccination", "Date Received", [true, true]),
				...allOnlyVaccines
					.map(oVaccine => {
						return getVaccinationRowB(
							oVaccine.id,
							oVaccine.dateReceived ? oVaccine.dateReceived : "",
						);
					}),
			]
		}),
		ioNewLine(),
		ioTable({
			rows: [
				getVaccinationRowB("COVID-19", "Date Received", [true, true]),
				...getNestedVaccinationRows("COVID-19", allDosesVaccines),
			]
		}),
		ioNewLine(),
		ioTable({
			rows: [
				getVaccinationRowB("Shingles", "Date Received", [true, true]),
				...getNestedVaccinationRows("Shingles", allDosesVaccines),
			]
		}),
	];

	return c;
};
