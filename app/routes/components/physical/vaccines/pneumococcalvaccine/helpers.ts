import type { ManipulateType } from "dayjs";
import dayjs from "dayjs";
import { calculatePneumoVac } from "./calculate";
import type { AgeRangeType, PneumococcalVaccineDraftType, VacVersionsType } from "../../../../types/types";

/**
 * still need to assign null to every property that reaches else statement, draft not assigned each required property when passed to function
 */
// export function resetLocalStateProperty(
// 	draft: PneumococcalVaccineLocalCopyDraftType,
// 	prev: PneumococcalVaccineLocalCopyDraftType,
// 	localStateProperty: string,
// ) {
// 	if (prev[localStateProperty] !== null) {
// 		draft[localStateProperty] = {
// 			riskConditions: (prev[localStateProperty] as AgeRangeType).riskConditions.map(riskCondition => {
// 				return {
// 					...riskCondition,
// 					checked: false,
// 				}
// 			}),
// 			recommendations: (prev[localStateProperty] as AgeRangeType).recommendations.map(recommendation => {
// 				return {
// 					...recommendation,
// 					possibleNextVaccines: recommendation.possibleNextVaccines.map(possibleNextVaccine => {
// 						return {
// 							...possibleNextVaccine,
// 							statements: possibleNextVaccine.statements.map(statement => {
// 								return {
// 									...statement,
// 									value: (recommendation.id === "novaccinestaken" &&
// 										statement.id === "no risk conditions"),
// 								};
// 							}),
// 						};
// 					}),
// 				};
// 			}),
// 		};
// 	}
// 	else {
// 		draft[localStateProperty] = null;
// 	};
// };

// export function resetLocalState(prev: PneumococcalVaccineLocalCopyDraftType) {
// 	const draft = {} as PneumococcalVaccineLocalCopyDraftType;
// 	draft.checked = prev.checked;
// 	draft.id = prev.id;
// 	draft.versions = [];
// 	resetLocalStateProperty(draft, prev, "fourmonthstosixmonths");
// 	resetLocalStateProperty(draft, prev, "sevenmonthstoelevenmonths");
// 	resetLocalStateProperty(draft, prev, "twelvemonthstotwentythreemonths");
// 	resetLocalStateProperty(draft, prev, "twentyfourmonthstofiftyninemonths");
// 	resetLocalStateProperty(draft, prev, "sixtoeighteen");
// 	resetLocalStateProperty(draft, prev, "nineteentosixtyfour");
// 	resetLocalStateProperty(draft, prev, "sixtyfiveandup");

// 	parseZodReaderFriendly(ZodPneumococcalVaccineLocalCopyDraftType, draft);
// 	return draft;
// };

function findLatestDateInVersions(versions: VacVersionsType, mode: "all" | "PPSV23", mode2: "due" | "received") {
	let maxValue = dayjs("01/01/1900");
	if (mode2 === "received") {
		versions.forEach(version => {
			const djsDateReceived = dayjs(version.dateReceived);
			if (mode === "all") { // typically allows latest dose, regardless of type
				if (djsDateReceived.isAfter(maxValue)) {
					maxValue = djsDateReceived;
				};
			}
			// mode === "PPSV23"
			else { // there is one statement type that explicitly requires the latest PPSV23 dose
				if (djsDateReceived.isAfter(maxValue) && version.version === "PPSV23") {
					maxValue = djsDateReceived;
				};
			}
		});
	}
	// mode2 === "due"
	else {
		versions.forEach(version => {
			const djsDateDue = dayjs(version.dateDue);
			if (mode === "all") { // typically allows latest dose, regardless of type
				if (djsDateDue.isAfter(maxValue)) {
					maxValue = djsDateDue;
				};
			}
			// mode === "PPSV23"
			else { // there is one statement type that explicitly requires the latest PPSV23 dose
				if (djsDateDue.isAfter(maxValue) && version.version === "PPSV23") {
					maxValue = djsDateDue;
				};
			}
		});
	};
	return maxValue;
};

export function createNewExternalState(
	structuredClonelocalVaccineCopy: PneumococcalVaccineDraftType,
	demographicsDateOfBirth: string | null,
	externalVaccineAgeRange: string,
) {
	const temp = calculatePneumoVac(demographicsDateOfBirth, externalVaccineAgeRange, structuredClonelocalVaccineCopy);
	// gather all the statements that have been marked as true
	const trueStatements = (temp[externalVaccineAgeRange] as AgeRangeType).recommendations
		.filter(recommendation => {
			return recommendation.possibleNextVaccines.some(possibility => {
				return possibility.statements.some(statement => {
					return statement.value;
				});
			});
		});

	if (trueStatements.length === 1) {
		// // fourmonthstosixmonths
		if (externalVaccineAgeRange === "fourmonthstosixmonths") {
			const trueStatement = trueStatements[0];
			if (trueStatement.id === "0vaccinestaken") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = dayjs().format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenanddose1atleast4weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const dayJSForm = dayjs().add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
						statement.dateDue = dayJSForm.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenanddose1lessthan4weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const dateReceived = structuredClonelocalVaccineCopy.versions[structuredClonelocalVaccineCopy.versions.length - 1].dateReceived;
						const dayJSForm = dayjs(dateReceived).add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
						statement.dateDue = dayJSForm.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenanddose2atleast4weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const patientAt12MonthsOld = dayjs(demographicsDateOfBirth).add(12, "months");
						statement.dateDue = patientAt12MonthsOld.format('MM/DD/YYYY');
					});
				});
			}
			// 2vaccinetakenanddose2lessthan4weeksago
			else {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const dateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received")
						const dayJSForm = dayjs(dateReceived).add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
						statement.dateDue = dayJSForm.format('MM/DD/YYYY');
					});
				});
			};
		}
		// sevenmonthstoelevenmonths
		else if (externalVaccineAgeRange === "sevenmonthstoelevenmonths") {
			const trueStatement = trueStatements[0];
			if (trueStatement.id === "0vaccinestaken") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = dayjs().format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasbefore7mosoldanddose1atleast4weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received")
						const patientAt12MonthsOld = dayjs(demographicsDateOfBirth).add(12, "months");
						const useThisOne = latestDateReceived.add(8, "weeks").isAfter(patientAt12MonthsOld) ? latestDateReceived : patientAt12MonthsOld;
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasbefore7mosoldanddose1lessthan4weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received")
						statement.dateDue = latestDateReceived.add(4, "weeks").format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasafter7mosoldanddose1atleast4weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const todayPlus8Weeks = dayjs().add(8, "weeks");
						const patientAt12MonthsOld = dayjs(demographicsDateOfBirth).add(12, "months");
						const useThisOne = todayPlus8Weeks.isAfter(patientAt12MonthsOld) ? todayPlus8Weeks : patientAt12MonthsOld;
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasafter7mosoldanddose1lessthan4weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received");
						const useThisOne = latestDateReceived.add(4, "weeks");
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenandwasbefore7mosoldanddose2atleast4weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const todayPlus8Weeks = dayjs().add(8, "weeks");
						const patientAt12MonthsOld = dayjs(demographicsDateOfBirth).add(12, "months");
						const useThisOne = todayPlus8Weeks.isAfter(patientAt12MonthsOld) ? todayPlus8Weeks : patientAt12MonthsOld;
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenandwasbefore7mosoldanddose2lessthan4weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received");
						const useThisOne = latestDateReceived.add(4, "weeks");
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			// 2vaccinetakenandwasafter7mosold
			else {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const todayPlus8Weeks = dayjs().add(8, "weeks");
						const patientAt12MonthsOld = dayjs(demographicsDateOfBirth).add(12, "months");
						const useThisOne = todayPlus8Weeks.isAfter(patientAt12MonthsOld) ? todayPlus8Weeks : patientAt12MonthsOld;
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			};
		}
		// twelvemonthstotwentythreemonths
		else if (externalVaccineAgeRange === "twelvemonthstotwentythreemonths") {
			const trueStatement = trueStatements[0];
			if (trueStatement.id === "0vaccinestaken") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = dayjs().add(8, "weeks").format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasbefore12mosoldanddose1atleast4weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = dayjs().add(8, "weeks").format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasbefore12mosoldanddose1lessthan4weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received");
						const useThisOne = latestDateReceived.add(4, "weeks");
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasafter12mosoldanddose1atleast8weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasafter12mosoldanddose1lessthan8weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received");
						const useThisOne = latestDateReceived.add(8, "weeks");
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenandbothbefore12mosoldanddose2atleast8weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenandbothbefore12mosoldanddose2lessthan8weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received");
						const useThisOne = latestDateReceived.add(8, "weeks");
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenandbothafter12mosoldanddose2atleast8weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenandbothafter12mosoldanddose2lessthan8weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received");
						const useThisOne = latestDateReceived.add(8, "weeks");
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenandonlyoneafter12mosold") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "3vaccinetakenandallthreebefore12mosoldanddose3atleast8weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "3vaccinetakenandallthreebefore12mosoldanddose3lessthan8weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received");
						const useThisOne = latestDateReceived.add(8, "weeks");
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			// 3vaccinetakenandatleastoneafter12mosold
			else {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			};
		}
		// twentyfourmonthstofiftyninemonths
		else if (externalVaccineAgeRange === "twentyfourmonthstofiftyninemonths") {
			const trueStatement = trueStatements[0];
			if (trueStatement.id === "0vaccinestaken") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						if (statement.value === true) {
							if (statement.id === "no risk conditions") {
								const dayJSForm = dayjs().add(8, "weeks" as ManipulateType);
								statement.dateDue = dayJSForm.format('MM/DD/YYYY');
							}
							else {
								statement.dateDue = "COMPLETE"
							};
						};
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasbefore12mosold") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasafter12mosoldandwasbefore24mosoldanddose1atleast8weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasafter12mosoldandwasbefore24mosoldanddose1lessthan8weeksago") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received");
						const useThisOne = latestDateReceived.add(8, "weeks");
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasafter12mosoldandafter24mosold") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "1vaccinetakenandwasbefore24mosold") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const dayJSForm = dayjs().add(8, "weeks" as ManipulateType);
						statement.dateDue = dayJSForm.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenandbothbefore12mosold") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenanddose1before12mosoldanddose2after12mosoldanddose2before24mosold") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenanddose1before12mosoldanddose2after12mosoldanddose2after24mosold") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenanddose1after12mosold") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "2vaccinetakenandbothbefore24mosold") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const dayJSForm = dayjs().add(8, "weeks" as ManipulateType);
						statement.dateDue = dayJSForm.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "3vaccinetakenandatleastoneatorafter12mosold") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "3vaccinetakenandallbefore12mosold") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						if (statement.value === true) {
							statement.dateDue = "COMPLETE"
						};
					});
				});
			}
			else if (trueStatement.id === "4vaccinetakenandanypcv20") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "4vaccinetakenandriskconditionsotherthanimmunocompromisingandanyppsv23") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						statement.dateDue = "COMPLETE"
					});
				});
			}
			else if (trueStatement.id === "4vaccinetakenandriskconditionsotherthanimmunocompromisingandnoppsv23") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received");
						const useThisOne = latestDateReceived.add(8, "weeks");
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			else if (trueStatement.id === "4vaccinetakenandimmunocompromisingandanyppsv23") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "PPSV23", "received");
						const useThisOne = latestDateReceived.add(5, "years");
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			}
			// 4vaccinetakenandimmunocompromisingandnoppsv23
			else {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const latestDateReceived = findLatestDateInVersions(structuredClonelocalVaccineCopy.versions, "all", "received");
						const useThisOne = latestDateReceived.add(8, "weeks");
						statement.dateDue = useThisOne.format('MM/DD/YYYY');
					});
				});
			};
		}

		// // sixtoeighteen
		// else 
		else if (externalVaccineAgeRange === "sixtoeighteen") {
			const trueStatement = trueStatements[0];
			if (trueStatement.id === "nopcv1315orpcv20") {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						if (statement.value === true && statement.id !== "no risk conditions" && statement.id !== "who have an immunocompromising condition and have had PPSV23") {
							const latestDate = findLatestDateInVersions(temp.versions, "all", "received");
							const dayJSForm = latestDate.add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
							statement.dateDue = dayJSForm.format('MM/DD/YYYY');
						}
						else if (statement.value === true && statement.id === "who have an immunocompromising condition and have had PPSV23") {
							const latestDate = findLatestDateInVersions(temp.versions, "PPSV23", "received");
							const dayJSForm = latestDate.add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
							statement.dateDue = dayJSForm.format('MM/DD/YYYY');
						}
					})
				})
			}
			// pcv13pcv15before6nopcv20
			else {
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						if (statement.value === true && statement.id !== "no risk conditions" && statement.id !== "who have an immunocompromising condition and have had PPSV23") {
							const latestDate = findLatestDateInVersions(temp.versions, "all", "received");
							const dayJSForm = latestDate.add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
							statement.dateDue = dayJSForm.format('MM/DD/YYYY');
						}
						else if (statement.value === true && statement.id === "who have an immunocompromising condition and have had PPSV23") {
							const latestDate = findLatestDateInVersions(temp.versions, "PPSV23", "received");
							const dayJSForm = latestDate.add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
							statement.dateDue = dayJSForm.format('MM/DD/YYYY');
						}
					})
				})

			}
		}
		// nineteentosixtyfour
		else if (externalVaccineAgeRange === "nineteentosixtyfour") {
			// there's always only one maximum plus if condition confirms this is the case at this point
			const trueStatement = trueStatements[0];

			// determining if there any non-null dateReceived values to even address
			// additonally, different scenarios require different handling:
			// ALL PERMUTATIONS RESULT IN DATEDUE === NULL
			if (trueStatement.id === "novaccinestaken") {
				// INTENTIONALLY BLANK SO CODE MOVES ON WITH DATEDUE STILL BEING NULL
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const empty_case = 1;
			}
			else if (trueStatement.id === "onlyppsv23taken") {
				const ppsv23DateReceived = temp.versions.filter(v => v.version === "PPSV23")[0].dateReceived;
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						if (statement.value === true && statement.id !== "no risk conditions") {
							const dayJSForm = dayjs(ppsv23DateReceived).add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
							statement.dateDue = dayJSForm.format('MM/DD/YYYY');
						}
					})
				})

			}
			else if (trueStatement.id === "onlypcv13pcv15") {
				const pcv13pcv15DateReceived = temp.versions.filter(v => v.version === "PCV13/PCV15")[0].dateReceived;
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						if (statement.value === true && statement.id !== "no risk conditions") {
							const dayJSForm = dayjs(pcv13pcv15DateReceived).add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
							statement.dateDue = dayJSForm.format('MM/DD/YYYY');
						}
					})
				})
			}
			// pcv13andppsv23taken
			else {
				const ppsv23Dayjs = dayjs(temp.versions.filter(v => v.version === "PPSV23")[0].dateReceived);
				const pcv13pcv15Dayjs = dayjs(temp.versions.filter(v => v.version === "PCV13/PCV15")[0].dateReceived);
				const ppsv23After = ppsv23Dayjs.isAfter(pcv13pcv15Dayjs);

				const usedDate = ppsv23After ?
					temp.versions.filter(v => v.version === "PPSV23")[0].dateReceived :
					temp.versions.filter(v => v.version === "PCV13/PCV15")[0].dateReceived;

				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						if (statement.value === true) {
							if (statement.id === "who have an immunocompromising condition") {
								const leastfrompcv13pcv15 = pcv13pcv15Dayjs.add(56, "day");
								const leastfromppsv23 = ppsv23Dayjs.add(5, "year");

								const gowiththisone = leastfromppsv23.isAfter(leastfrompcv13pcv15) ? leastfromppsv23 : leastfrompcv13pcv15;
								const dayJSForm = dayjs(gowiththisone);
								statement.dateDue = dayJSForm.format('MM/DD/YYYY');
							}
							else if (statement.id === "who have a cerebrospinal fluid leak, cochlear implant, or immunocompromising condition") {
								const dayJSForm = dayjs(usedDate).add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
								statement.dateDue = dayJSForm.format('MM/DD/YYYY');
							}
							else {
								// INTENTIONALLY BLANK SO CODE MOVES ON WITH DATEDUE STILL BEING NULL
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								const empty_case = 1;
							};
						};
					});
				});
			};
		}
		// sixtyfiveandup
		else {
			// there's always only one maximum plus if condition confirms this is the case at this point
			const trueStatement = trueStatements[0];

			// determining if there any non-null dateReceived values to even address
			// additonally, different scenarios require different handling:
			// ALL PERMUTATIONS RESULT IN DATEDUE === NULL
			if (trueStatement.id === "novaccinestaken") {
				// INTENTIONALLY BLANK SO CODE MOVES ON WITH DATEDUE STILL BEING NULL
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const empty_case = 1;
			}
			else if (trueStatement.id === "onlyppsv23taken") {
				const ppsv23DateReceived = temp.versions.filter(v => v.version === "PPSV23")[0].dateReceived;
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						if (statement.value === true && statement.id !== "no risk conditions") {
							const dayJSForm = dayjs(ppsv23DateReceived).add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
							statement.dateDue = dayJSForm.format('MM/DD/YYYY');
						}
					})
				})
			}
			else if (trueStatement.id === "onlypcv13pcv15") {
				const pcv13pcv15DateReceived = temp.versions.filter(v => v.version === "PCV13/PCV15")[0].dateReceived;
				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						if (statement.value === true && statement.id !== "no risk conditions") {
							const dayJSForm = dayjs(pcv13pcv15DateReceived).add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
							statement.dateDue = dayJSForm.format('MM/DD/YYYY');
						}
					})
				})
			}
			// ALL PERMUTATIONS RESULT IN DATEDUE === NULL
			else if (trueStatement.id === "pcv13atanyageandppsv23BEFORE65") {
				const ppsv23Dayjs = dayjs(temp.versions.filter(v => v.version === "PPSV23")[0].dateReceived);
				const pcv13pcv15Dayjs = dayjs(temp.versions.filter(v => v.version === "PCV13/PCV15")[0].dateReceived);

				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						if (statement.value === true) {
							if (statement.id === "who have an immunocompromising condition") {
								const leastfrompcv13pcv15 = pcv13pcv15Dayjs.add(1, "year");
								const leastfromppsv23 = ppsv23Dayjs.add(5, "year");

								const gowiththisone = leastfromppsv23.isAfter(leastfrompcv13pcv15) ? leastfromppsv23 : leastfrompcv13pcv15;
								const dayJSForm = dayjs(gowiththisone);
								statement.dateDue = dayJSForm.format('MM/DD/YYYY');
							}
							else if (statement.id === "who have a cerebrospinal fluid leak, cochlear implant, or immunocompromising condition") {
								if (possibleNextVaccine.id === "PCV20") {
									const leastfrompcv13pcv15 = pcv13pcv15Dayjs.add(1, "year");
									const leastfromppsv23 = ppsv23Dayjs.add(5, "year");

									const gowiththisone = leastfromppsv23.isAfter(leastfrompcv13pcv15) ? leastfromppsv23 : leastfrompcv13pcv15;
									const dayJSForm = dayjs(gowiththisone);
									statement.dateDue = dayJSForm.format('MM/DD/YYYY');
								}
								else {
									const leastfrompcv13pcv15 = pcv13pcv15Dayjs.add(56, "days");
									const leastfromppsv23 = ppsv23Dayjs.add(5, "year");

									const gowiththisone = leastfromppsv23.isAfter(leastfrompcv13pcv15) ? leastfromppsv23 : leastfrompcv13pcv15;
									const dayJSForm = dayjs(gowiththisone);
									statement.dateDue = dayJSForm.format('MM/DD/YYYY');
								};
							}
							else if (statement.id === "any risk condition other than an immunocompromising condition, cochlear implant, or cerebrospinal fluid leak") {
								if (possibleNextVaccine.id === "PCV20") {
									const pcv13pcv15DayjsIsAfter = pcv13pcv15Dayjs.isAfter(ppsv23Dayjs);
									const gowiththisone = pcv13pcv15DayjsIsAfter ? pcv13pcv15Dayjs : ppsv23Dayjs;
									const addFiveYears = gowiththisone.add(5, "years").format('MM/DD/YYYY');
									statement.dateDue = addFiveYears;
								}
								else {
									const leastfrompcv13pcv15 = pcv13pcv15Dayjs.add(1, "years");
									const leastfromppsv23 = ppsv23Dayjs.add(5, "year");

									const gowiththisone = leastfromppsv23.isAfter(leastfrompcv13pcv15) ? leastfromppsv23 : leastfrompcv13pcv15;
									const dayJSForm = dayjs(gowiththisone);
									statement.dateDue = dayJSForm.format('MM/DD/YYYY');
								};
							}
							else {
								// INTENTIONALLY BLANK SO CODE MOVES ON WITH DATEDUE STILL BEING NULL
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								const empty_case = 1;
							};
						};
					});
				});
			}
			else if (trueStatement.id === "pcv13atanyageandppsv23AFTER65") {
				const ppsv23Dayjs = dayjs(temp.versions.filter(v => v.version === "PPSV23")[0].dateReceived);
				const pcv13pcv15Dayjs = dayjs(temp.versions.filter(v => v.version === "PCV13/PCV15")[0].dateReceived);
				const ppsv23After = ppsv23Dayjs.isAfter(pcv13pcv15Dayjs);

				const usedDate = ppsv23After ?
					temp.versions.filter(v => v.version === "PPSV23")[0].dateReceived :
					temp.versions.filter(v => v.version === "PCV13/PCV15")[0].dateReceived;

				trueStatement.possibleNextVaccines.forEach(possibleNextVaccine => {
					possibleNextVaccine.statements.forEach(statement => {
						const dayJSForm = dayjs(usedDate).add(statement.dayjsInJsonForm.value, statement.dayjsInJsonForm.unit as ManipulateType);
						statement.dateDue = dayJSForm.format('MM/DD/YYYY');
					});
				});
			};
		};
	}
	else if (trueStatements.length === 0) {
		// INTENTIONALLY BLANK SO CODE MOVES ON WITH DATEDUE STILL BEING NULL
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const empty_case = 1;
	}
	else {
		throw Error(`There should only be 0 or 1 elements in trueStatements not ${trueStatements.length}`);
	};

	return temp;
};