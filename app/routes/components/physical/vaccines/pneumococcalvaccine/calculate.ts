import type { Dayjs, ManipulateType } from "dayjs";
import dayjs from "dayjs";
import type { PneumococcalVaccineDraftType, RecommendationIndivType, VacVersionsType, AgeRangeType, StatementsType, DemographicsDateIndivValueType } from "../../../../types/types";

/**
 * @param dateOfBirth should match {@link DemographicsDateIndivValueType}
 */
function getAge(dateOfBirth: DemographicsDateIndivValueType): [unit: "years" | "months", value: number] {
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

function returnAgeRanges(recommendation: RecommendationIndivType) {
	return {
		...recommendation,
		possibleNextVaccines: recommendation.possibleNextVaccines.map(possibleNextVaccine => {
			return {
				...possibleNextVaccine,
				statements: possibleNextVaccine.statements.map(statement => {
					return {
						...statement,
						value: false,
					};
				}),
			};
		}),
	};
};

// point is to find out whether today is {mode} to dosedate + x weeks 
function compareDates(date1: Dayjs, mode: string, amount: number, unit: string) {
	if (mode === "lessthanorequal") {
		return dayjs().isAfter(date1.add(amount, (unit as ManipulateType))) || dayjs().isSame(date1.add(amount, (unit as ManipulateType)));
	}
	else if (mode === "greaterthanorequal") {
		return dayjs().isBefore(date1.add(amount, (unit as ManipulateType))) || dayjs().isSame(date1.add(amount, (unit as ManipulateType)));
	}
	else {
		throw Error(`mode must be either lessthanorequal or greaterthanorequal, not ${mode}`);
	};
};

// /**
//  * correcting mismatch caused by function name syntax restrictions
//  */
// function getModdedName(func: () => string) {
// 	// console.log("func: ", func)
// 	// console.log("func name: ", func.name)
// 	if (func.name === "PCV13PCV15") {
// 		return "PCV13/PCV15";
// 	}
// 	return func.name;
// };

/**
 * modifies statement in place:
 * 1. each possibleNextVaccine gets iterated through.
 * 2. when iteration's id matches the string func returns, that's the statement whose value attribute is set to true
 */
function setStatementinPossibleNextVaccine(statements: StatementsType, func: () => string) {
	statements
		.forEach(s => {
			if (s.id === func()) {
				s.value = true;
			}
			else {
				s.value = false;
			};
		});
};

// /**
//  * modifies recommendation in place:
//  * 1. funcArr controls iteration through possibleNextVaccines attribute.
//  * 2. each possibleNextVaccine' statements attribute passed to setStatementinPossibleNextVaccine
//  * @param funcArr each function represents a possibleNextVaccine where checked risk conditions dictate the statement thats returned
//  */
// function setTempRecommendation2(recommendation: RecommendationIndivType, funcArr: (() => string)[]) {
// 	funcArr.forEach(func => {
// 		const funcName = getModdedName(func);
// 		// console.log(funcName)
// 		const b = recommendation.possibleNextVaccines.filter(p => p.id === funcName);
// 		// console.log(b)
// 		const a = b[0];
// 		setStatementinPossibleNextVaccine(
// 			a.statements,
// 			func,
// 		);
// 	});
// };

// function setStatementinPossibleNextVaccine2(statements: StatementsType, obj: {
// 	id: string;
// 	condition: string;
// }) {
// 	statements
// 		.forEach(s => {
// 			if (s.id === obj.id) {
// 				s.value = true;
// 			}
// 			else {
// 				s.value = false;
// 			};
// 		});
// };

function setTempRecommendation2(recommendation: RecommendationIndivType, objArr: {
	func: () => string,
	name: string,
}[]) {
	objArr.forEach(obj => {
		// const funcName = getModdedName(func);
		// console.log(funcName)
		const b = recommendation.possibleNextVaccines.filter(p => p.id === obj.name);
		// console.log(b)
		const a = b[0];
		setStatementinPossibleNextVaccine(
			a.statements,
			obj.func,
		);
	});
};

/**
 * assigns new recommendation to corresponding recommendation in original pneumococcalVaccine obj:
 * 1. and resets all other recommendations in original obj to a false state (checked = false)
 */
function finalizeTempRecommendations(ageRangeStr: string, pneumococcalVaccine: PneumococcalVaccineDraftType, recommendation: RecommendationIndivType) {
	(pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === recommendation.id)[0] = recommendation;
	(pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.map(r => {
		if (r.id === recommendation.id) {
			return recommendation;
		}
		else {
			return returnAgeRanges(r);
		};
	});
};

function finalizeVersionsDateDue(pneumococcalVaccine: PneumococcalVaccineDraftType, dateDueString: string) {
	pneumococcalVaccine.versions.forEach(version => {
		version.dateDue = dateDueString;
	});
};

function calcfourmonthstosixmonths(taken: VacVersionsType, ageRangeStr: string, pneumococcalVaccine: PneumococcalVaccineDraftType) {
	// const checkedConds = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).riskConditions.filter(arc => arc.checked);
	// const anyCondsAtAll = checkedConds.length > 0;
	const takenLength = taken.length;
	if (takenLength === 0) {
		// 0vaccinestaken
		// dose1date today				WITH NEXT DOSE AT		dose2date  >= dose1date + 4 weeks
		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "0vaccinestaken")[0];
		const PCV13PCV15 = {
			func: () => {
				return "regardless of having risk condition";
			},
			name: "PCV13/PCV15",
		};

		const PCV20 = {
			func: () => {
				return "regardless of having risk condition";
			},
			name: "PCV20",
		};
		setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
	}
	else if (takenLength === 1) {
		const dose1 = dayjs(taken[0].dateReceived);
		const res = compareDates(dose1, "lessthanorequal", 4, "weeks");
		if (res) {
			// 1vaccinetakenanddose1atleast4weeksago
			// dose2date today				WITH NEXT DOSE AT		dose3date  >= dose2date + 4 weeks
			const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenanddose1atleast4weeksago")[0];
			const PCV13PCV15 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV13/PCV15",
			};

			const PCV20 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV20",
			};
			setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
			finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
			finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
		}
		else {
			// 1vaccinetakenanddose1lessthan4weeksago
			// dose2date not today			WITH NEXT DOSE AT		dose2date  >= dose1date + 4 weeks
			const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenanddose1lessthan4weeksago")[0];
			const PCV13PCV15 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV13/PCV15",
			};

			const PCV20 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV20",
			};
			setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
			finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
			finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
		};
	}
	else if (takenLength === 2) {
		const dose2 = dayjs(taken[1].dateReceived);
		const res = compareDates(dose2, "lessthanorequal", 4, "weeks");
		if (res) {
			// 2vaccinetakenanddose2atleast4weeksago
			// dose3date today				WITH NEXT DOSE AT		dose4FINAL >= 12 months old
			const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenanddose2atleast4weeksago")[0];
			const PCV13PCV15 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV13/PCV15",
			};

			const PCV20 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV20",
			};
			setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
			finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
			finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
		}
		else {
			// 2vaccinetakenanddose2lessthan4weeksago
			// dose3date not today			WITH NEXT DOSE AT		dose3date  >= dose2date + 4 weeks	
			const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenanddose2lessthan4weeksago")[0];
			const PCV13PCV15 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV13/PCV15",
			};

			const PCV20 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV20",
			};
			setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
			finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
			finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
		};
	}
	else {
		throw Error(`number of versions must be between 0 and 2, inclusive not ${takenLength}`);
	};
	return pneumococcalVaccine;
};

function calcsevenmonthstoelevenmonths(taken: VacVersionsType, dateOfBirth: string | null, ageRangeStr: string, pneumococcalVaccine: PneumococcalVaccineDraftType) {
	const patientAgeInMonths = dayjs().diff(dayjs(dateOfBirth), "months");
	const takenLength = taken.length;
	if (takenLength === 0) {
		// 0vaccinestaken
		// dose1date today				WITH NEXT DOSE AT		dose2date  >= dose1date + 4 weeks
		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "0vaccinestaken")[0];
		const PCV13PCV15 = {
			func: () => {
				return "regardless of having risk condition";
			},
			name: "PCV13/PCV15",
		};

		const PCV20 = {
			func: () => {
				return "regardless of having risk condition";
			},
			name: "PCV20",
		};
		setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
	}
	else if (takenLength === 1) {
		const dose1 = dayjs(taken[0].dateReceived);
		const patient7MosOld = dayjs().subtract(patientAgeInMonths, "months").add(7, "months");
		if (dose1.isBefore(patient7MosOld)) {
			const res = compareDates(dose1, "lessthanorequal", 4, "weeks");
			if (res) {
				// 1vaccinetakenandwasbefore7mosoldanddose1atleast4weeksago
				// dose2 today					WITH NEXT DOSE AT		dose3FINAL >= dose2date + 8 weeks && 12 months old
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasbefore7mosoldanddose1atleast4weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
			}
			else {
				// 1vaccinetakenandwasbefore7mosoldanddose1lessthan4weeksago
				// dose2 not today				WITH NEXT DOSE AT		dose2date  >= dose1date + 4 weeks
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasbefore7mosoldanddose1lessthan4weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
			};
		}
		else {
			const res = compareDates(dose1, "lessthanorequal", 4, "weeks");
			if (res) {
				// 1vaccinetakenandwasafter7mosoldanddose1atleast4weeksago
				// dose2 today					WITH NEXT DOSE AT		dose3FINAL >= dose2date + 8 weeks && 12 months old
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasafter7mosoldanddose1atleast4weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
			}
			else {
				// 1vaccinetakenandwasafter7mosoldanddose1lessthan4weeksago
				// dose2 not today				WITH NEXT DOSE AT		dose2date  >= dose1date + 4 weeks
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasafter7mosoldanddose1lessthan4weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
			};
		};
	}
	else if (takenLength === 2) {
		const dose2 = dayjs(taken[1].dateReceived);
		const patient7MosOld = dayjs().subtract(patientAgeInMonths, "months").add(7, "months");
		if (dose2.isBefore(patient7MosOld)) {
			const res = compareDates(dose2, "lessthanorequal", 4, "weeks");
			if (res) {
				// 2vaccinetakenandwasbefore7mosoldanddose2atleast4weeksago
				// dose3 today					WITH NEXT DOSE AT		dose4FINAL >= dose3date + 8 weeks && 12 months old
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenandwasbefore7mosoldanddose2atleast4weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
			}
			else {
				// 2vaccinetakenandwasbefore7mosoldanddose2lessthan4weeksago
				// dose3 not today				WITH NEXT DOSE AT		dose3date  >= dose2date + 4 weeks
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenandwasbefore7mosoldanddose2lessthan4weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
			};
		}
		else {
			// 2vaccinetakenandwasafter7mosold
			// dose3 not today				WITH NEXT DOSE AT		dose3FINAL >= dose2date + 8 weeks && 12 months old
			const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenandwasafter7mosold")[0];
			const PCV13PCV15 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV13/PCV15",
			};

			const PCV20 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV20",
			};
			setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
			finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
			finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
		};
	}
	else {
		throw Error(`number of versions must be between 0 and 2, inclusive not ${takenLength}`)
	};
	return pneumococcalVaccine;
};

function calctwelvemonthstotwentythreemonths(taken: VacVersionsType, dateOfBirth: string | null, ageRangeStr: string, pneumococcalVaccine: PneumococcalVaccineDraftType) {
	const patientAgeInMonths = dayjs().diff(dayjs(dateOfBirth), "months");
	const takenLength = taken.length;
	if (takenLength === 0) {
		// 0vaccinestaken
		// dose1 today					WITH NEXT DOSE AT		dose2FINAL >= dose1date + 8 weeks
		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "0vaccinestaken")[0];
		const PCV13PCV15 = {
			func: () => {
				return "regardless of having risk condition";
			},
			name: "PCV13/PCV15",
		};

		const PCV20 = {
			func: () => {
				return "regardless of having risk condition";
			},
			name: "PCV20",
		};
		setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
		finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
	}
	else if (takenLength === 1) {
		const dose1 = dayjs(taken[0].dateReceived);
		const patient12MosOld = dayjs().subtract(patientAgeInMonths, "months").add(12, "months");
		if (dose1.isBefore(patient12MosOld)) {
			const res = compareDates(dose1, "lessthanorequal", 4, "weeks");
			if (res) {
				// 1vaccinetakenandwasbefore12mosoldanddose1atleast4weeksago
				// dose2 today				WITH NEXT DOSE AT		dose3FINAL >= dose2date + 8 weeks
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasbefore12mosoldanddose1atleast4weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
			}
			else {
				// 1vaccinetakenandwasbefore12mosoldanddose1lessthan4weeksago
				// dose2 not today			WITH NEXT DOSE AT		dose2date  >= dose1date + 4 weeks
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasbefore12mosoldanddose1lessthan4weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
			};
		}
		else {
			const res = compareDates(dose1, "lessthanorequal", 8, "weeks");
			if (res) {
				// 1vaccinetakenandwasafter12mosoldanddose1atleast8weeksago
				// dose2FINAL today			WITH NEXT DOSE AT		NO FURTHER DOSES
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasafter12mosoldanddose1atleast8weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
			}
			else {
				// 1vaccinetakenandwasafter12mosoldanddose1lessthan8weeksago
				// dose2 not today			WITH NEXT DOSE AT		dose2FINAL >= dose1date + 8 weeks
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasafter12mosoldanddose1lessthan8weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
			};
		};
	}
	else if (takenLength === 2) {
		const dose1 = dayjs(taken[0].dateReceived);
		const dose2 = dayjs(taken[1].dateReceived);
		const patient12MosOld = dayjs().subtract(patientAgeInMonths, "months").add(12, "months");
		if (dose1.isBefore(patient12MosOld) && dose2.isBefore(patient12MosOld)) {
			const res = compareDates(dose2, "lessthanorequal", 8, "weeks");
			if (res) {
				// 2vaccinetakenandbothbefore12mosoldanddose2atleast8weeksago
				// dose3FINAL today			WITH NEXT DOSE AT		NO FURTHER DOSES
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenandbothbefore12mosoldanddose2atleast8weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
			}
			else {
				// 2vaccinetakenandbothbefore12mosoldanddose2lessthan8weeksago
				// dose3 nottoday			WITH NEXT DOSE AT		dose3FINAL >= dose2date + 8 weeks
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenandbothbefore12mosoldanddose2lessthan8weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
			};
		}
		else if (
			[dose1, dose2].filter(dose => {
				return dose.isAfter(patient12MosOld) || dose.isSame(patient12MosOld);
			}).length === 2
		) {
			const res = compareDates(dose2, "lessthanorequal", 8, "weeks");
			if (res) {
				// 2vaccinetakenandbothafter12mosoldanddose2atleast8weeksago
				// dose3FINAL today			WITH NEXT DOSE AT		NO FURTHER DOSES
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenandbothafter12mosoldanddose2atleast8weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
			}
			else {
				// 2vaccinetakenandbothafter12mosoldanddose2lessthan8weeksago
				// dose3 not today			WITH NEXT DOSE AT		dose3FINAL >= dose2date + 8 weeks
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenandbothafter12mosoldanddose2lessthan8weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
			};
		}
		else if (
			[dose1, dose2].filter(dose => {
				return dose.isAfter(patient12MosOld) || dose.isSame(patient12MosOld);
			}).length === 1
		) {
			// 2vaccinetakenandonlyoneafter12mosold
			// dose3 not today				WITH NEXT DOSE AT		NO FURTHER DOSES
			const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenandonlyoneafter12mosold")[0];
			const PCV13PCV15 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV13/PCV15",
			};

			const PCV20 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV20",
			};
			setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
			finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
			finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
		}
		else {
			throw Error(`options are both doses given before patient was 1 year old, only one of either dose given at or after patient was 1 year old, or both doses given at or after patient was 1 year old, sorry haven't figured out hwo to show what values were given that cuased this error`)
		}
	}
	else if (takenLength === 3) {
		const dose1 = dayjs(taken[0].dateReceived);
		const dose2 = dayjs(taken[1].dateReceived);
		const dose3 = dayjs(taken[2].dateReceived);
		const patient12MosOld = dayjs().subtract(patientAgeInMonths, "months").add(12, "months");
		if (dose1.isBefore(patient12MosOld) && dose2.isBefore(patient12MosOld) && dose3.isBefore(patient12MosOld)) {
			const res = compareDates(dose3, "lessthanorequal", 8, "weeks");
			if (res) {
				// 3vaccinetakenandallthreebefore12mosoldanddose3atleast8weeksago
				// dose4FINAL not today		WITH NEXT DOSE AT		NO FURTHER DOSES
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "3vaccinetakenandallthreebefore12mosoldanddose3atleast8weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
			}
			else {
				// 3vaccinetakenandallthreebefore12mosoldanddose3lessthan8weeksago
				// dose4 not today				WITH NEXT DOSE AT		dose4FINAL >= dose3date + 8 weeks
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "3vaccinetakenandallthreebefore12mosoldanddose3lessthan8weeksago")[0];
				const PCV13PCV15 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "regardless of having risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
			};
		}
		else if ((dose1.isAfter(patient12MosOld) || dose1.isSame(patient12MosOld)) || (dose2.isAfter(patient12MosOld) || dose2.isSame(patient12MosOld)) || (dose3.isAfter(patient12MosOld) || dose3.isSame(patient12MosOld))) {
			// 3vaccinetakenandatleastoneafter12mosold
			// dose4 not today				WITH NEXT DOSE AT		NO FURTHER DOSES
			const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "3vaccinetakenandatleastoneafter12mosold")[0];
			const PCV13PCV15 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV13/PCV15",
			};

			const PCV20 = {
				func: () => {
					return "regardless of having risk condition";
				},
				name: "PCV20",
			};
			setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
			finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
			finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
		}
		else {
			throw Error(`options are all three doses given before patient was 1 year old or at least one given at or after patient was 1 year old, sorry haven't figured out hwo to show what values were given that cuased this error`);
		};
	}
	else {
		throw Error(`number of versions must be between 0 and 3, inclusive not ${takenLength}`)
	};
	return pneumococcalVaccine;
};

function calctwentyfourmonthstofiftyninemonths(taken: VacVersionsType, dateOfBirth: string | null, ageRangeStr: string, pneumococcalVaccine: PneumococcalVaccineDraftType) {
	const patientAgeInMonths = dayjs().diff(dayjs(dateOfBirth), "months");
	const checkedConds = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).riskConditions.filter(arc => arc.checked);
	if (checkedConds.length > 0) {
		const takenLength = taken.length;

		// is patient
		if (takenLength === 0) {
			// 0vaccinestaken
			// dose1date today				WITH NEXT DOSE AT		dose2date  >= dose1date + 8 weeks
			const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "0vaccinestaken")[0];
			const PCV13PCV15 = {
				func: () => {
					return "any risk condition";
				},
				name: "PCV13/PCV15",
			};

			const PCV20 = {
				func: () => {
					return "any risk condition";
				},
				name: "PCV20",
			};
			setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
			finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
			finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
		}
		else if (takenLength === 1) {
			const dose1 = dayjs(taken[0].dateReceived);
			const patient24MosOld = dayjs().subtract(patientAgeInMonths, "months").add(24, "months");
			if (dose1.isBefore(patient24MosOld)) {
				// 1vaccinetakenandwasbefore24mosold
				// dose2date today				WITH NEXT DOSE AT		dose3date  >= dose2date + 8 weeks
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasbefore24mosold")[0];
				const PCV13PCV15 = {
					func: () => {
						return "any risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "any risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
			}
			else {
				throw Error(`dunno what to say yet, waiting to see what triggers failing the following: dose1.isBefore(patient24MosOld)`);
			};
		}
		else if (takenLength === 2) {
			const dose1 = dayjs(taken[0].dateReceived);
			const dose2 = dayjs(taken[1].dateReceived);
			const patient24MosOld = dayjs().subtract(patientAgeInMonths, "months").add(24, "months");
			if (dose1.isBefore(patient24MosOld) && dose2.isBefore(patient24MosOld)) {
				// 2vaccinetakenandbothbefore24mosold
				// dose3date today				WITH NEXT DOSE AT		dose4date  >= dose3date + 8 weeks
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenandbothbefore24mosold")[0];
				const PCV13PCV15 = {
					func: () => {
						return "any risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "any risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
			}
			else {
				throw Error(`dunno what to say yet, waiting to see what triggers failing the following: dose1.isBefore(patient24MosOld) && dose2.isBefore(patient24MosOld)`);
			};

		}
		else if (takenLength === 3) {
			const dose1 = dayjs(taken[0].dateReceived);
			const dose2 = dayjs(taken[1].dateReceived);
			const dose3 = dayjs(taken[2].dateReceived);
			const patient12MosOld = dayjs().subtract(patientAgeInMonths, "months").add(12, "months");
			if (dose1.isBefore(patient12MosOld) && dose2.isBefore(patient12MosOld) && dose3.isBefore(patient12MosOld)) {
				// 3vaccinetakenandallbefore12mosold
				// dose4date today				WITH NEXT DOSE AT		NO FURTHER DOSES
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "3vaccinetakenandallbefore12mosold")[0];
				const PCV13PCV15 = {
					func: () => {
						return "any risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "any risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
			}
			else {
				throw Error(`dunno what to say yet, waiting to see what triggers failing the following: dose1.isBefore(patient12MosOld) && dose2.isBefore(patient12MosOld) && dose3.isBefore(patient12MosOld)`);
			};
		}
		else if (takenLength === 4) {
			// const dose1 = taken[0];
			// const dose2 = taken[1];
			// const dose3 = taken[2];
			// const dose4 = taken[3];
			if (taken.some(version => version.version === "PCV20")) {
				// 4vaccinetakenandanypcv20
				// NO FURTHER DOSES
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "4vaccinetakenandanypcv20")[0];
				const PCV13PCV15 = {
					func: () => {
						return "any risk condition";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "any risk condition";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "NO FURTHER DOSES, COMPLETE");
			}
			else {
				// const checkedRiskConditions = riskConditions.filter(riskCondition => riskCondition.checked);
				const anyImmunocompromising = checkedConds.some(checkedRiskCondition => checkedRiskCondition.type === "immunocompromising");

				if (checkedConds.length > 0 && !anyImmunocompromising) {
					if (taken.some(version => version.version === "PPSV23")) {
						// 4vaccinetakenandriskconditionsotherthanimmunocompromisingandanyppsv23
						// NO FURTHER DOSES
						const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "4vaccinetakenandriskconditionsotherthanimmunocompromisingandanyppsv23")[0];
						const PCV13PCV15 = {
							func: () => {
								return "any risk condition other than an immunocompromising condition";
							},
							name: "PCV13/PCV15",
						};

						const PCV20 = {
							func: () => {
								return "any risk condition other than an immunocompromising condition";
							},
							name: "PCV20",
						};

						setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
						finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
						finalizeVersionsDateDue(pneumococcalVaccine, "NO FURTHER DOSES, COMPLETE");
					}
					else {
						// 4vaccinetakenandriskconditionsotherthanimmunocompromisingandnoppsv23
						// none today necessarily written as 				WITH NEXT DOSE AT		PCV20 or PPSV23 at least 8 weeks after the last PCV dose then complete
						const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "4vaccinetakenandriskconditionsotherthanimmunocompromisingandnoppsv23")[0];

						const PCV20 = {
							func: () => {
								return "any risk condition other than an immunocompromising condition";
							},
							name: "PCV20",
						};

						const PPSV23 = {
							func: () => {
								return "any risk condition other than an immunocompromising condition";
							},
							name: "PPSV23",
						};
						setTempRecommendation2(recommendation, [PCV20, PPSV23]);
						finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
						finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
					};
				}
				else if (checkedConds.length > 0 && anyImmunocompromising) {
					if (taken.some(version => version.version === "PPSV23")) {
						// 4vaccinetakenandimmunocompromisingandanyppsv23
						// none today necessarily written as 				WITH NEXT DOSE AT		PCV20 or PPSV23 at least 5 years after last PPSV23 vaccine specifically then complete
						const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "4vaccinetakenandimmunocompromisingandanyppsv23")[0];
						const PCV20 = {
							func: () => {
								return "who have an immunocompromising condition";
							},
							name: "PCV20",
						};

						const PPSV23 = {
							func: () => {
								return "who have an immunocompromising condition";
							},
							name: "PPSV23",
						};
						setTempRecommendation2(recommendation, [PCV20, PPSV23]);
						finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
						finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
					}
					else {
						// 4vaccinetakenandimmunocompromisingandnoppsv23
						// none today necessarily written as 				WITH NEXT DOSE AT		PCV20 or PPSV23 at least 8 weeks after the last PCV dose then  if pcv20 then complete otherwise should be ppsv23 and then 
						// PCV20 or PPSV23 at least 5 years after last PPSV23 vaccine specifically then complete
						const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "4vaccinetakenandimmunocompromisingandnoppsv23")[0];
						const PCV20 = {
							func: () => {
								return "who have an immunocompromising condition";
							},
							name: "PCV20",
						};

						const PPSV23 = {
							func: () => {
								return "who have an immunocompromising condition";
							},
							name: "PPSV23",
						};
						setTempRecommendation2(recommendation, [PCV20, PPSV23]);
						finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
						finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
					};
				}
				else {
					throw Error(`dunno what to say yet, waiting to see what triggers failing the following: checkedRiskConditions.length > 0 && !anyImmunocompromising and then IN SEPARATE CASE: checkedRiskConditions.length > 0 && anyImmunocompromising`);
				};
			}
		}
		else {
			throw Error(`number of versions must be between 0 and 3, inclusive not ${takenLength}`)
		};
	}
	else {
		const takenLength = taken.length;

		// is patient
		if (takenLength === 0) {
			// 0vaccinestaken
			// dose1 today						WITH NEXT DOSE AT		NO FURTHER DOSE
			const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "0vaccinestaken")[0];
			const PCV13PCV15 = {
				func: () => {
					return "no risk conditions";
				},
				name: "PCV13/PCV15",
			};

			const PCV20 = {
				func: () => {
					return "no risk conditions";
				},
				name: "PCV20",
			};

			setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
			finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
			finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
		}
		else if (takenLength === 1) {
			const dose1 = dayjs(taken[0].dateReceived);
			const patient12MosOld = dayjs().subtract(patientAgeInMonths, "months").add(12, "months");
			if (dose1.isBefore(patient12MosOld)) {
				// 1vaccinetakenandwasbefore12mosold
				// dose2FINAL today				WITH NEXT DOSE AT		NO FURTHER DOSES
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasbefore12mosold")[0];
				const PCV13PCV15 = {
					func: () => {
						return "no risk conditions";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "no risk conditions";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
			}
			else {
				const dose1 = dayjs(taken[0].dateReceived);
				const patient24MosOld = dayjs().subtract(patientAgeInMonths, "months").add(24, "months");
				if (dose1.isBefore(patient24MosOld)) {
					const res = compareDates(dose1, "lessthanorequal", 8, "weeks");
					if (res) {
						// 1vaccinetakenandwasafter12mosoldandwasbefore24mosoldanddose1atleast8weeksago
						// dose2FINAL today				WITH NEXT DOSE AT		NO FURTHER DOSES
						const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasafter12mosoldandwasbefore24mosoldanddose1atleast8weeksago")[0];
						const PCV13PCV15 = {
							func: () => {
								return "no risk conditions";
							},
							name: "PCV13/PCV15",
						};

						const PCV20 = {
							func: () => {
								return "no risk conditions";
							},
							name: "PCV20",
						};
						setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
						finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
						finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
					}
					else {
						// 1vaccinetakenandwasafter12mosoldandwasbefore24mosoldanddose1lessthan8weeksago
						// dose2 not today					WITH NEXT DOSE AT		dose2FINAL >= dose1date + 8 weeks
						const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasafter12mosoldandwasbefore24mosoldanddose1lessthan8weeksago")[0];
						const PCV13PCV15 = {
							func: () => {
								return "no risk conditions";
							},
							name: "PCV13/PCV15",
						};

						const PCV20 = {
							func: () => {
								return "no risk conditions";
							},
							name: "PCV20",
						};
						setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
						finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
						finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
					};
				}
				else {
					// 1vaccinetakenandwasafter12mosoldandafter24mosold
					// dose2 not today					WITH NEXT DOSE AT		NO FURTHER DOSES
					const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "1vaccinetakenandwasafter12mosoldandafter24mosold")[0];
					const PCV13PCV15 = {
						func: () => {
							return "no risk conditions";
						},
						name: "PCV13/PCV15",
					};

					const PCV20 = {
						func: () => {
							return "no risk conditions";
						},
						name: "PCV20",
					};
					setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
					finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
					finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
				};
			}
		}
		else if (takenLength === 2) {
			const dose1 = dayjs(taken[0].dateReceived);
			const patient12MosOld = dayjs().subtract(patientAgeInMonths, "months").add(12, "months");
			if (dose1.isBefore(patient12MosOld)) {
				const dose2 = dayjs(taken[1].dateReceived);
				const patient12MosOld = dayjs().subtract(patientAgeInMonths, "months").add(12, "months");
				if (dose2.isBefore(patient12MosOld)) {
					// 2vaccinetakenandbothbefore12mosold
					// dose3FINAL today				WITH NEXT DOSE AT		NO FURTHER DOSES
					const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenandbothbefore12mosold")[0];
					const PCV13PCV15 = {
						func: () => {
							return "no risk conditions";
						},
						name: "PCV13/PCV15",
					};

					const PCV20 = {
						func: () => {
							return "no risk conditions";
						},
						name: "PCV20",
					};
					setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
					finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
					finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
				}
				else {
					const dose2 = dayjs(taken[1].dateReceived);
					const patient24MosOld = dayjs().subtract(patientAgeInMonths, "months").add(24, "months");
					if (dose2.isBefore(patient24MosOld)) {
						// 2vaccinetakenanddose1before12mosoldanddose2after12mosoldanddose2before24mosold
						// dose3FINAL today				WITH NEXT DOSE AT		NO FURTHER DOSES
						const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenanddose1before12mosoldanddose2after12mosoldanddose2before24mosold")[0];
						const PCV13PCV15 = {
							func: () => {
								return "no risk conditions";
							},
							name: "PCV13/PCV15",
						};

						const PCV20 = {
							func: () => {
								return "no risk conditions";
							},
							name: "PCV20",
						};
						setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
						finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
						finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
					}
					else {
						// 2vaccinetakenanddose1before12mosoldanddose2after12mosoldanddose2after24mosold
						// dose3 not today					WITH NEXT DOSE AT		NO FURTHER DOSES
						const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenanddose1before12mosoldanddose2after12mosoldanddose2after24mosold")[0];
						const PCV13PCV15 = {
							func: () => {
								return "no risk conditions";
							},
							name: "PCV13/PCV15",
						};

						const PCV20 = {
							func: () => {
								return "no risk conditions";
							},
							name: "PCV20",
						};
						setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
						finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
						finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
					};
				};
			}
			else {
				// 2vaccinetakenanddose1after12mosold
				// dose3 not today					WITH NEXT DOSE AT		NO FURTHER DOSES
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "2vaccinetakenanddose1after12mosold")[0];
				const PCV13PCV15 = {
					func: () => {
						return "no risk conditions";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "no risk conditions";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
			};
		}
		else if (takenLength === 3) {
			const dose1 = dayjs(taken[0].dateReceived);
			const dose2 = dayjs(taken[1].dateReceived);
			const dose3 = dayjs(taken[2].dateReceived);
			const patient12MosOld = dayjs().subtract(patientAgeInMonths, "months").add(12, "months");
			if (dose1.isAfter(patient12MosOld) || dose2.isAfter(patient12MosOld) || dose3.isAfter(patient12MosOld)) {
				// 3vaccinetakenandatleastoneatorafter12mosold
				// dose4FINAL today				WITH NEXT DOSE AT		NO FURTHER DOSES
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "3vaccinetakenandatleastoneatorafter12mosold")[0];
				const PCV13PCV15 = {
					func: () => {
						return "no risk conditions";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "no risk conditions";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "TODAY");
			}
			else if (dose1.isBefore(patient12MosOld) && dose2.isBefore(patient12MosOld) && dose3.isBefore(patient12MosOld)) {
				// 3vaccinetakenandallbefore12mosold
				// dose4 not today					WITH NEXT DOSE AT		NO FURTHER DOSES					
				const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "3vaccinetakenandallbefore12mosold")[0];
				const PCV13PCV15 = {
					func: () => {
						return "no risk conditions";
					},
					name: "PCV13/PCV15",
				};

				const PCV20 = {
					func: () => {
						return "no risk conditions";
					},
					name: "PCV20",
				};
				setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
				finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);
				finalizeVersionsDateDue(pneumococcalVaccine, "NOT TODAY");
			}
			else {
				throw Error(`options are all three doses given before patient was 1 year old or at least one given at or after patient was 1 year old, sorry haven't figured out hwo to show what values were given that cuased this error`);
			};
		}
		else {
			throw Error(`number of versions must be between 0 and 3, inclusive not ${takenLength}`)
		};
	};
	return pneumococcalVaccine;
};

function calcsixtoeighteen(taken: VacVersionsType, dateOfBirth: string | null, ageRangeStr: string, pneumococcalVaccine: PneumococcalVaccineDraftType) {
	const anyPCV13PCV15 = taken.some(version => version.version === "PCV13/PCV15");
	const anyPCV20 = taken.some(version => version.version === "PCV20");
	const anyPPSV23 = taken.some(version => version.version === "PPSV23");

	const noPCV13PCV15PCV20 = !anyPCV13PCV15 && !anyPCV20;
	const isPCV13PCV15BeforeSix = taken.some(version => {
		if (version.version === "PCV13/PCV15") {
			return dayjs(dateOfBirth).add(6, "years").isAfter(version.dateReceived);
		};

		return false;
	});

	const isPCV13PCV15BeforeSixAndNoPCV20 = isPCV13PCV15BeforeSix && !anyPCV20;
	const checkedConds = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).riskConditions.filter(arc => arc.checked);
	const anyCondsAtAll = checkedConds.length > 0;
	const hasImmunoCompCond = checkedConds.some(arc => (arc.type === "immunocompromising"));
	const hasCerebrospinalOrCochlearCond = (
		checkedConds.some(arc => (arc.id === "Cochlear implant")) ||
		checkedConds.some(arc => (arc.id === "Cerebrospinal fluid leak"))
	);
	const hasCerebrospinalOrCochlearOrImmunoCompCond = (
		hasCerebrospinalOrCochlearCond ||
		hasImmunoCompCond
	);
	// const hasAnyOtherRiskCondition = !hasCerebrospinalOrCochlearOrImmunoCompCond && anyCondsAtAll;
	const hasAnyOtherThanImmunoCompCond = !hasImmunoCompCond && anyCondsAtAll;
	// nopcv1315orpcv20
	if (noPCV13PCV15PCV20) {
		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "nopcv1315orpcv20")[0];
		const PCV13PCV15 = {
			func: () => {
				if (anyCondsAtAll) {
					return "any risk condition";
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV13/PCV15",
		};

		const PCV20 = {
			func: () => {
				if (anyCondsAtAll) {
					return "any risk condition";
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV20",
		};


		setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);

		return pneumococcalVaccine;
	}
	// pcv13pcv15before6nopcv20
	else if (isPCV13PCV15BeforeSixAndNoPCV20) {
		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "pcv13pcv15before6nopcv20")[0];
		const PCV20 = {
			func: () => {
				if (hasAnyOtherThanImmunoCompCond && !anyPPSV23) {
					return "any risk condition other than an immunocompromising condition and have NOT had PPSV23";
				}
				if (hasImmunoCompCond && anyPPSV23) {
					return "who have an immunocompromising condition and have had PPSV23";
				}
				if (hasImmunoCompCond && !anyPPSV23) {
					return "who have an immunocompromising condition and have NOT had PPSV23";
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV20",
		};

		const PPSV23 = {
			func: () => {
				if (hasAnyOtherThanImmunoCompCond && !anyPPSV23) {
					return "any risk condition other than an immunocompromising condition and have NOT had PPSV23";
				}
				if (hasCerebrospinalOrCochlearOrImmunoCompCond && anyPPSV23) {
					return "who have an immunocompromising condition and have had PPSV23";
				}
				if (hasCerebrospinalOrCochlearOrImmunoCompCond && !anyPPSV23) {
					return "who have an immunocompromising condition and have NOT had PPSV23";
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PPSV23",
		};

		setTempRecommendation2(recommendation, [PCV20, PPSV23]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);

		return pneumococcalVaccine;
	}
	else {
		throw Error(`calcsixtoeighteen error: submitted versions HAVE to be noPCV13PCV15PCV20 or isPCV13PCV15BeforeSixAndNoPCV20`);
		// console.error(`calcsixtoeighteen error`);
	};
	return pneumococcalVaccine;
};

function calcnineteentosixtyfour(taken: VacVersionsType, ageRangeStr: string, pneumococcalVaccine: PneumococcalVaccineDraftType) {
	const checkedConds = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).riskConditions.filter(arc => arc.checked);
	const anyCondsAtAll = checkedConds.length > 0;
	const hasImmunoCompCond = checkedConds.some(arc => (arc.type === "immunocompromising"));
	const hasCerebrospinalOrCochlearCond = (
		checkedConds.some(arc => (arc.id === "Cochlear implant")) ||
		checkedConds.some(arc => (arc.id === "Cerebrospinal fluid leak"))
	);
	const hasCerebrospinalOrCochlearOrImmunoCompCond = (
		hasCerebrospinalOrCochlearCond ||
		hasImmunoCompCond
	);
	const hasAnyOtherRiskCondition = !hasCerebrospinalOrCochlearOrImmunoCompCond && anyCondsAtAll;

	// if no versions checked	
	if (taken.length === 0) {
		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "novaccinestaken")[0];
		// const PCV13PCV15 = {
		// 	id: "PCV13/PCV15",
		// 	condition: "",
		// };
		// if (hasCerebrospinalOrCochlearOrImmunoCompCond) {
		// 	PCV13PCV15.condition = "who have an immunocompromising condition, cochlear implant, or cerebrospinal fluid leak";

		// }
		// else if (hasAnyOtherRiskCondition) {
		// 	PCV13PCV15.condition = "any risk condition other than an immunocompromising condition, cochlear implant, or cerebrospinal fluid leak";
		// }
		// else {
		// 	PCV13PCV15.condition = "no risk conditions";
		// };
		const PCV13PCV15 = {
			func: () => {
				if (hasCerebrospinalOrCochlearOrImmunoCompCond) {
					return "who have an immunocompromising condition, cochlear implant, or cerebrospinal fluid leak";
				}
				else if (hasAnyOtherRiskCondition) {
					return "any risk condition other than an immunocompromising condition, cochlear implant, or cerebrospinal fluid leak";
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV13/PCV15",
		};

		// const PCV20 = {
		// 	id: "PCV20",
		// 	condition: "",
		// };
		// if (anyCondsAtAll) {
		// 	PCV20.condition = "any risk condition";
		// }
		// else {
		// 	PCV20.condition = "no risk conditions";
		// };
		const PCV20 = {
			func: () => {
				if (anyCondsAtAll) {
					return "any risk condition";
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV20",
		};

		setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);

		return pneumococcalVaccine;
	}
	// if only ppsv23
	else if (taken.length === 1 && taken.some(t => t.version === "PPSV23")) {
		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "onlyppsv23taken")[0];
		const PCV13PCV15 = {
			func: () => {
				if (anyCondsAtAll) {
					return "any risk condition";
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV13/PCV15",
		};

		const PCV20 = {
			func: () => {
				if (anyCondsAtAll) {
					return "any risk condition";
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV20",
		};
		setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);

		return pneumococcalVaccine;
	}
	// if only pcv13
	else if (taken.length === 1 && taken.some(t => t.version === "PCV13/PCV15")) {
		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "onlypcv13pcv15")[0];
		const PCV20 = {
			func: () => {
				// has any condition at all
				if (anyCondsAtAll) {
					return "who have a risk condition"
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV20",
		};

		const PPSV23 = {
			func: () => {
				// has an immunocompromising condition
				if (hasImmunoCompCond) {
					return "who have an immunocompromising condition"
				}
				// has cerebrospinal fluid leak or cochlear implant
				else if (hasCerebrospinalOrCochlearCond) {
					return "who have a cerebrospinal fluid leak or cochlear implant"
				}

				// any other risk condition, DOES NOT ACCOUNT FOR NO CONDITIONS
				else if (hasAnyOtherRiskCondition) {
					return "who have any other risk condition"
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PPSV23",
		};
		setTempRecommendation2(recommendation, [PCV20, PPSV23]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);

		return pneumococcalVaccine;
	}
	// if pcv13 and ONE dose of ppsv23
	else if (taken.length === 2 && taken.some(t => t.version === "PCV13/PCV15") && taken.some(t => t.version === "PPSV23")) {
		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "pcv13andppsv23taken")[0];
		const PCV20 = {
			func: () => {
				// has cerebrospinal fluid leak or cochlear implant or immunocompromising condition
				if (hasCerebrospinalOrCochlearOrImmunoCompCond) {
					return "who have a cerebrospinal fluid leak, cochlear implant, or immunocompromising condition"
				}
				// any other risk condition, DOES NOT ACCOUNT FOR NO CONDITIONS
				else if (hasAnyOtherRiskCondition) {
					return "who have any other risk condition"
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV20",
		};

		const PPSV23 = {
			func: () => {
				// has cerebrospinal fluid leak or cochlear implant
				if (hasCerebrospinalOrCochlearCond) {
					return "who have a cerebrospinal fluid leak or cochlear implant"
				}
				// has an immunocompromising condition
				else if (hasImmunoCompCond) {
					return "who have an immunocompromising condition"
				}
				// any other risk condition, DOES NOT ACCOUNT FOR NO CONDITIONS
				else if (hasAnyOtherRiskCondition) {
					return "who have any other risk condition"
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PPSV23",
		};
		// recommendation.possibleNextVaccines.filter(p => p.id === "PCV20")[0].statements.forEach(s => {
		// 	if (s.id === PCV20.name) {
		// 		s.value = true;
		// 	}
		// 	else {
		// 		s.value = false;
		// 	};
		// });
		// recommendation.possibleNextVaccines.filter(p => p.id === "PPSV23")[0].statements.forEach(s => {
		// 	if (s.id === PPSV23.name) {
		// 		s.value = true;
		// 	}
		// 	else {
		// 		s.value = false;
		// 	};
		// });

		setTempRecommendation2(recommendation, [PCV20, PPSV23]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);

		return pneumococcalVaccine;
	}
	else {
		throw Error(`calcsixtoeighteen error: submitted versions HAVE to conform to defined case options`);
	};
	// return pneumococcalVaccine;
};

function calcsixtyfiveandup(age: number, taken: VacVersionsType, ageRangeStr: string, pneumococcalVaccine: PneumococcalVaccineDraftType) {
	const checkedConds = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).riskConditions.filter(arc => arc.checked);
	const anyCondsAtAll = checkedConds.length > 0;

	const hasImmunoCompCond = checkedConds.some(arc => (arc.type === "immunocompromising"));
	const hasCerebrospinalOrCochlearCond = (
		checkedConds.some(arc => (arc.id === "Cochlear implant")) ||
		checkedConds.some(arc => (arc.id === "Cerebrospinal fluid leak"))
	);
	const hasCerebrospinalOrCochlearOrImmunoCompCond = (
		hasCerebrospinalOrCochlearCond ||
		hasImmunoCompCond
	);
	const hasAnyOtherRiskCondition = !hasCerebrospinalOrCochlearOrImmunoCompCond && anyCondsAtAll;

	// if no versions checked	
	if (taken.length === 0) {
		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "novaccinestaken")[0];

		const PCV13PCV15 = {
			func: () => {
				if (hasCerebrospinalOrCochlearOrImmunoCompCond) {
					return "who have an immunocompromising condition, cochlear implant, or cerebrospinal fluid leak";
				}
				else if (hasAnyOtherRiskCondition) {
					return "any risk condition other than an immunocompromising condition, cochlear implant, or cerebrospinal fluid leak";
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV13/PCV15",
		};
		const PCV20 = {
			func: () => {
				if (anyCondsAtAll) {
					return "any risk condition";
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV20",
		};

		setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);

		return pneumococcalVaccine;
	}
	// if only ppsv23
	else if (taken.length === 1 && taken.some(t => t.version === "PPSV23")) {
		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "onlyppsv23taken")[0];
		const PCV13PCV15 = {
			func: () => {
				// has any condition at all
				if (anyCondsAtAll) {
					return "any risk condition"
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV13/PCV15",
		};
		const PCV20 = {
			func: () => {
				// has any condition at all
				if (anyCondsAtAll) {
					return "any risk condition"
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV20",
		};
		setTempRecommendation2(recommendation, [PCV13PCV15, PCV20]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);

		return pneumococcalVaccine;
	}
	// if only pcv13
	else if (taken.length === 1 && taken.some(t => t.version === "PCV13/PCV15")) {
		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "onlypcv13pcv15")[0];
		const PCV20 = {
			func: () => {
				// has any condition at all
				if (hasCerebrospinalOrCochlearOrImmunoCompCond) {
					return "who have a cerebrospinal fluid leak, cochlear implant, or immunocompromising condition"
				}
				// any other risk condition, DOES NOT ACCOUNT FOR NO CONDITIONS
				else if (hasAnyOtherRiskCondition) {
					return "any risk condition other than an immunocompromising condition, cochlear implant, or cerebrospinal fluid leak"
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV20",
		};

		const PPSV23 = {
			func: () => {
				if (hasCerebrospinalOrCochlearOrImmunoCompCond) {
					return "who have a cerebrospinal fluid leak, cochlear implant, or immunocompromising condition"
				}
				// any other risk condition, DOES NOT ACCOUNT FOR NO CONDITIONS
				else if (hasAnyOtherRiskCondition) {
					return "any risk condition other than an immunocompromising condition, cochlear implant, or cerebrospinal fluid leak"
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PPSV23",
		};
		setTempRecommendation2(recommendation, [PCV20, PPSV23]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);

		return pneumococcalVaccine;
	}
	// if pcv13 and ONE dose of ppsv23
	else if (taken.length === 2 && taken.some(t => t.version === "PCV13/PCV15") && taken.some(t => t.version === "PPSV23")) {
		const a = taken.filter(t => t.version === "PPSV23")[0].dateReceived;
		const todayDate = dayjs();
		const b = todayDate.diff(a, "year");
		const ageWhenPPSV23Taken = age - b;

		// pcv13atanyageandppsv23AFTER65
		if (ageWhenPPSV23Taken >= 65) {
			const PCV20 = {
				func: () => {
					return "regardless of having risk condition or not";
				},
				name: "PCV20",
			};

			const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "pcv13atanyageandppsv23AFTER65")[0];
			setTempRecommendation2(recommendation, [PCV20]);
			finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);

			return pneumococcalVaccine;
		};

		// pcv13atanyageandppsv23BEFORE65
		const PCV20 = {
			func: () => {
				if (hasCerebrospinalOrCochlearOrImmunoCompCond) {
					return "who have a cerebrospinal fluid leak, cochlear implant, or immunocompromising condition";
				}
				else if (hasAnyOtherRiskCondition) {
					return "any risk condition other than an immunocompromising condition, cochlear implant, or cerebrospinal fluid leak";
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PCV20",
		};

		const PPSV23 = {
			func: () => {
				if (hasCerebrospinalOrCochlearOrImmunoCompCond) {
					return "who have a cerebrospinal fluid leak, cochlear implant, or immunocompromising condition";
				}
				else if (hasAnyOtherRiskCondition) {
					return "any risk condition other than an immunocompromising condition, cochlear implant, or cerebrospinal fluid leak";
				}
				else {
					return "no risk conditions";
				};
			},
			name: "PPSV23",
		};

		const recommendation = (pneumococcalVaccine[ageRangeStr] as AgeRangeType).recommendations.filter(r => r.id === "pcv13atanyageandppsv23BEFORE65")[0];
		setTempRecommendation2(recommendation, [PCV20, PPSV23]);
		finalizeTempRecommendations(ageRangeStr, pneumococcalVaccine, recommendation);

		return pneumococcalVaccine;
	};

	return pneumococcalVaccine;
};

/**
 * changes **LOCAL** vaccine copy based on:
 * - checked versions being changed
 * - checked risk conditions being changed
 */
export function calculatePneumoVac(dateOfBirth: string | null, ageRange: string, pneumococcalVaccine: PneumococcalVaccineDraftType) {
	const taken = pneumococcalVaccine.versions;
	const currentAge = getAge(dateOfBirth)

	switch (ageRange) {
		case "fourmonthstosixmonths": {
			pneumococcalVaccine = calcfourmonthstosixmonths(taken, ageRange, pneumococcalVaccine);
			break;
		};
		case "sevenmonthstoelevenmonths": {
			pneumococcalVaccine = calcsevenmonthstoelevenmonths(taken, dateOfBirth, ageRange, pneumococcalVaccine);
			break;
		};
		case "twelvemonthstotwentythreemonths": {
			pneumococcalVaccine = calctwelvemonthstotwentythreemonths(taken, dateOfBirth, ageRange, pneumococcalVaccine);
			break;
		};
		case "twentyfourmonthstofiftyninemonths": {
			pneumococcalVaccine = calctwentyfourmonthstofiftyninemonths(taken, dateOfBirth, ageRange, pneumococcalVaccine);
			break;
		};
		case "sixtoeighteen": {
			pneumococcalVaccine = calcsixtoeighteen(taken, dateOfBirth, ageRange, pneumococcalVaccine);
			break;
		};
		case "nineteentosixtyfour": {
			pneumococcalVaccine = calcnineteentosixtyfour(taken, ageRange, pneumococcalVaccine);
			break;
		};
		case "sixtyfiveandup": {
			pneumococcalVaccine = calcsixtyfiveandup(currentAge[1], taken, ageRange, pneumococcalVaccine);
			break;
		};
		default: {
			throw Error("ageRange must be one of a set list of options. Re-check ageRange value")
		};
	};

	return pneumococcalVaccine;
};