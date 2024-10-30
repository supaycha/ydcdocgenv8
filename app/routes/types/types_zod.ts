import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { string, z } from 'zod';

export const ZodOnlyVaccineIndivType = z.object({
	id: z.string(),
	checked: z.boolean(),
	dateReceived: z.string().nullable(),
}).strict();
export const ZodOnlyVaccineDraftType = z.array(ZodOnlyVaccineIndivType);

export const ZodBothVaccineIndivType = z.object({
	id: z.string(),
	type: z.string(),
	checked: z.boolean(),
	linkChecked: z.boolean(),
	dateReceived: z.string().nullable(),
	dateDue: z.string().nullable(),
}).strict();
export const ZodBothVaccineDraftType = z.array(ZodBothVaccineIndivType);

export const ZodDoseIndivType = z.object({
	id: z.string(),
	checked: z.boolean(),
	dateReceived: z.string().nullable(),
}).strict();
export const ZodDosesType = z.array(ZodDoseIndivType);

export const ZodDosesVaccineIndivType = z.object({
	id: z.string(),
	checked: z.boolean(),
	doses: ZodDosesType,
}).strict();
export const ZodDosesVaccineDraftType = z.array(ZodDosesVaccineIndivType);

export const ZodToggleOptionsIndivType = z.object({
	id: z.string(),
});

export const ZodToggleOptionsType = z.array(ZodToggleOptionsIndivType);

export const ZodRadioOptionsIndivType = z.object({
	id: z.string(),
	type: z.string(),
	parentId: z.string(),
	toggleButtonValue: z.string(),
	toggleOptions: ZodToggleOptionsType,
	linkChecked: z.boolean(),
	dateReceived: z.string().nullable(),
	dateDue: z.string().nullable(),
}).strict();
export const ZodRadioOptionsType = z.array(ZodRadioOptionsIndivType);

export const ZodGroupedScreeningIndivType = z.object({
	id: z.string(),
	checked: z.boolean(),
	radioButtonValue: z.string().nullable(),
	radioOptions: ZodRadioOptionsType,
}).strict();
export const ZodGroupedScreeningDraftType = z.array(ZodGroupedScreeningIndivType);

export const ZodSingleScreeningIndivType = z.object({
	id: z.string(),
	type: z.string(),
	checked: z.boolean(),
	linkChecked: z.boolean(),
	toggleButtonValue: z.string().nullable(),
	toggleOptions: ZodToggleOptionsType,
	gender: z.optional(z.number()),
	dateReceived: z.string().nullable(),
	dateDue: z.string().nullable(),
}).strict();

export const ZodSingleScreeningDraftType = z.array(ZodSingleScreeningIndivType);

export const ZodToggledScreeningIndivType = z.object({
	id: z.string(),
	type: z.string(),
	checked: z.boolean(),
	linkChecked: z.boolean(),
	toggleButtonValue: z.string().nullable(),
	toggleOptions: ZodToggleOptionsType,
	gender: z.number().nullable(),
	dateReceived: z.string().nullable(),
	dateDue: z.string().nullable(),
	dateUnknown: z.boolean(),
	datePerformed: z.string().nullable(),
}).strict();

export const ZodToggledScreeningDraftType = z.array(ZodToggledScreeningIndivType)

export const ZodDiagnosticsIndivType = z.object({
	id: z.string(),
	type: string(),
	checked: z.boolean(),
	linkChecked: z.boolean(),
	toggleButtonValue: z.string().nullable(),
	toggleOptions: ZodToggleOptionsType,
	gender: z.optional(z.number()),
	dateReceived: z.string().nullable(),
	dateDue: z.string().nullable(),
});

export const ZodDiagnosticsDraftType = z.array(ZodDiagnosticsIndivType);

export const ZodConditionsandDiseasesDraftType = z.array(
	ZodDiagnosticsIndivType
);

export const ZodVacVersionIndivType = z.object({
	id: z.number(), // set to current index within array == inits to -1
	version: z.string(), // PCV13/PCV15 | PCV20 | PPSV23 == inits to PCV13/PCV15
	dateReceived: string().nullable(),
	dateDue: string().nullable(),
}).strict();

export const ZodVacVersionsType = z.array(ZodVacVersionIndivType);

export const ZodRiskConditionIndivType = z.object({
	id: z.string(),
	type: z.string(),
	checked: z.boolean(),
}).strict();

export const ZodRiskConditionsType = z.array(ZodRiskConditionIndivType);

export const ZodStatementsIndivType = z.object({
	id: z.string(),
	value: z.boolean(),
	pre: z.string(),
	dateDue: z.union([z.string(), z.null()]),
	dayjsInJsonForm: z.object({
		value: z.number(),
		unit: z.string(), // "weeks" | "years"
	}).strict(),
	post: z.union([z.string(), z.null()]),
}).strict();

export const ZodStatementsType = z.array(ZodStatementsIndivType);

export const ZodPossibleNextVaccinesIndivType = z.object({
	id: z.string(),
	statements: ZodStatementsType,
}).strict();

export const ZodPossibleNextVaccinesType = z.array(ZodPossibleNextVaccinesIndivType);

export const ZodRecommendationIndivType = z.object({
	id: z.string(),
	possibleNextVaccines: ZodPossibleNextVaccinesType,
});

export const ZodRecommendationsType = z.array(ZodRecommendationIndivType);

export const ZodAgeRangeType = z.object({
	riskConditions: ZodRiskConditionsType,
	recommendations: ZodRecommendationsType,
}).strict();

export const ZodPneumococcalVaccineDraftType = z.object({
	id: z.string(),
	invalidAge: z.boolean(),
	ageRange: z.string(),
	checked: z.boolean(),
	versions: ZodVacVersionsType,
	fourmonthstosixmonths: ZodAgeRangeType.nullable(), // starts out null since writing out init obj too much 
	sevenmonthstoelevenmonths: ZodAgeRangeType.nullable(), // starts out null since writing out init obj too much 
	twelvemonthstotwentythreemonths: ZodAgeRangeType.nullable(), // starts out null since writing out init obj too much 
	twentyfourmonthstofiftyninemonths: ZodAgeRangeType.nullable(), // starts out null since writing out init obj too much 
	sixtoeighteen: ZodAgeRangeType.nullable(), // starts out null since writing out init obj too much 
	nineteentosixtyfour: ZodAgeRangeType.nullable(), // starts out null since writing out init obj too much 
	sixtyfiveandup: ZodAgeRangeType.nullable(), // starts out null since writing out init obj too much 
}).strict();

export const ZodAgeRangeInitObjType = z.object({
	pneumofourmonthstosixmonths: ZodAgeRangeType,
	pneumosevenmonthstoelevenmonths: ZodAgeRangeType,
	pneumotwelvemonthstotwentythreemonths: ZodAgeRangeType,
	pneumotwentyfourmonthstofiftyninemonths: ZodAgeRangeType,
	pneumosixtoeighteen: ZodAgeRangeType,
	pneumonineteentosixtyfour: ZodAgeRangeType,
	pneumosixtyfiveandup: ZodAgeRangeType,
}).strict();

export const ZodDietQuestionIndivType = z.object({
	id: z.string(),
	description: z.string(),
	value: z.number(),
}).strict();

export const ZodDietQuestionsType = z.array(ZodDietQuestionIndivType);

export const ZodDietType = z.object({
	questions: ZodDietQuestionsType
}).strict();


export const ZodPhysicalActivityQuestionIndivType = z.object({
	id: z.string(),
	description: z.string(),
	value: z.number(),
}).strict();

export const ZodPhysicalActivityQuestionsType = z.array(ZodPhysicalActivityQuestionIndivType);

export const ZodPhysicalActivityType = z.object({
	questions: ZodPhysicalActivityQuestionsType
}).strict();

export const ZodSocialActivityQuestionIndivType = z.object({
	id: z.string(),
	description: z.string(),
	value: z.number(),
}).strict();

export const ZodSocialActivityQuestionsType = z.array(ZodSocialActivityQuestionIndivType);

export const ZodSocialActivityType = z.object({
	questions: ZodSocialActivityQuestionsType
}).strict();

export const ZodSocialDrugHistoryToggleOptionIndivValueType = z.object({
	id: z.string(),
}).strict();
export const ZodSocialDrugHistoryToggleOptionsValueType = z.array(ZodSocialDrugHistoryToggleOptionIndivValueType);

export const ZodSocialDrugHistoryLegalValueStringIndivType = z.object({
	id: z.string(),
	label: z.string(),
	value: z.string(),
}).strict();

export const ZodSocialDrugHistoryLegalIndivType = z.object({
	id: z.string(),
	toggleButtonValue: z.string(),
	toggleOptions: ZodSocialDrugHistoryToggleOptionsValueType,
	timesperday: ZodSocialDrugHistoryLegalValueStringIndivType,
	timesperyear: ZodSocialDrugHistoryLegalValueStringIndivType,
}).strict();

export const ZodSocialDrugHistoryIllegalValueBooleanIndivType = z.object({
	id: z.string(),
	label: z.string(),
	value: z.boolean(),
}).strict();

export const ZodSocialDrugHistoryIllegalIndivType = z.object({
	id: z.string(),
	toggleButtonValue: z.string(),
	toggleOptions: ZodSocialDrugHistoryToggleOptionsValueType,
	attemptedrehab: ZodSocialDrugHistoryIllegalValueBooleanIndivType,
	hospitalized: ZodSocialDrugHistoryIllegalValueBooleanIndivType,
}).strict();

export const ZodSocialDrugHistoryIndivType = z.union([
	ZodSocialDrugHistoryLegalIndivType,
	ZodSocialDrugHistoryIllegalIndivType,
]);

export const ZodSocialDrugHistoryDraftType = z.array(ZodSocialDrugHistoryIndivType);

export const ZodSocialDeterminantsCodeType = z.object({
	id: z.string(),
	description: z.string(),
	checked: z.boolean(),
}).strict();

export const ZodSocialDeterminantsCodeWrapperType = z.object({
	text: z.string(),
	code: ZodSocialDeterminantsCodeType,
}).strict();

export const ZodSocialDeterminantsCodesWrapperType = z.object({
	text: z.string(),
	codes: z.array(ZodSocialDeterminantsCodeWrapperType),
}).strict();

export const ZodSocialDeterminantsIndivQuestionType = z.union([
	ZodSocialDeterminantsCodeWrapperType,
	ZodSocialDeterminantsCodesWrapperType
]);

export const ZodSocialDeterminantsQuestionsType = z.array(ZodSocialDeterminantsIndivQuestionType);

export const ZodSocialDeterminantsIndivType = z.object({
	id: z.string(),
	label: z.string(),
	questions: ZodSocialDeterminantsQuestionsType
}).strict();

export const ZodSocialDeterminantsDraftType = z.array(ZodSocialDeterminantsIndivType);



export const ZodKATZADLActivityOptionIndivType = z.object({
	id: z.string(),
	description: z.string(),
}).strict();

export const ZodKATZADLActivityOptionsType = z.array(ZodKATZADLActivityOptionIndivType);

export const ZodKATZADLActivityIndivType = z.object({
	id: z.string(),
	options: ZodKATZADLActivityOptionsType,
	checked: z.boolean(),
}).strict();

export const ZodKATZADLActivitiesType = z.array(ZodKATZADLActivityIndivType);

export const ZodKATZADLActivityResultType = z.object({
	high: z.string(),
	low: z.string(),
}).strict();

export const ZodKATZADLType = z.object({
	activities: ZodKATZADLActivitiesType,
	result: ZodKATZADLActivityResultType,
	total: z.number(),
}).strict();

export const ZodLBIADLActivityOptionIndivType = z.object({
	description: z.string(),
	value: z.number(),
	checked: z.boolean(),
}).strict();

export const ZodLBIADLActivityOptionsType = z.array(ZodLBIADLActivityOptionIndivType);

export const ZodLBIADLActivityIndivType = z.object({
	id: z.string(),
	femaleonly: z.boolean(),
	selectedvalue: z.number(),
	options: ZodLBIADLActivityOptionsType,
}).strict();

export const ZodLBIADLActivitiesType = z.array(ZodLBIADLActivityIndivType);

export const ZodLBIADLType = z.object({
	total: z.number(),
	activities: ZodLBIADLActivitiesType,
}).strict();

export const ZodFunctionalsDraftType = z.object({
	id: z.string(),
	checked: z.boolean(),
	diet: ZodDietType.nullable(),
	KATZADL: ZodKATZADLType.nullable(),
	LBIADL: ZodLBIADLType.nullable(),
	physicalactivity: ZodPhysicalActivityType.nullable(),
	socialactivity: ZodSocialActivityType.nullable(),
}).strict();

export const ZodPhysicianType = z.object({
	physician: z.string(),
	label: z.string(),
	phone: z.string(),
});

export const ZodSelectionType = z.array(ZodPhysicianType.nullable());

export const ZodPhysiciansIndivType = z.object({
	id: z.string(),
	checked: z.boolean(),
	physicians: z.array(ZodPhysicianType),
	selections: ZodSelectionType,
});

export const ZodPhysiciansDraftType = z.array(ZodPhysiciansIndivType);

export const ZodDemographicsStrIndivType = z.object({
	id: z.string(),
	value: z.string(),
}).strict();

// export const ZodDemographicsNumIndivType = z.object({
// 	id: z.string(),
// 	value: z.number(),
// }).strict();

export const ZodDemographicsDateIndivValueType = z.string().nullable();
export const ZodDemographicsDateIndivType = z.object({
	id: z.string(),
	value: ZodDemographicsDateIndivValueType,
}).strict();

// export const ZodDemographicsStrArrType = z.object({
// 	id: z.string(),
// 	value: z.string().or(z.null()),
// 	options: z.array(z.string()),
// }).strict();

// export const ZodDemographicsIndivType = z.union([ZodDemographicsStrIndivType, ZodDemographicsNumIndivType, ZodDemographicsDateIndivType, ZodDemographicsStrArrType]);
export const ZodDemographicsIndivType = z.union([ZodDemographicsStrIndivType, ZodDemographicsDateIndivType]);
export const ZodDemographicsDraftType = z.array(ZodDemographicsIndivType);

export const ZodAppointmentIndivType = z.object({
	id: z.string(),
	date: z.string().nullable(),
	time: z.string().nullable(),
	label: z.string(),
}).strict();
export const ZodAppointmentDraftType = z.array(ZodAppointmentIndivType);

export const ZodPhysicalInformationIndivType = z.object({
	id: z.string(),
	value: z.number(),
}).strict();
export const ZodPhysicalInformationDraftType = z.array(ZodPhysicalInformationIndivType);

export const ZodCheckedConditionHBA1CType = z.object({
	id: z.string(),
	label: z.string(),
	value: z.number(),
	date: z.string().or(z.null()),
}).strict();

export const ZodCheckedConditionHBA1CArrayType = z.array(ZodCheckedConditionHBA1CType);

export const ZodCheckedConditionIndivType = z.object({
	id: z.string(),
	checked: z.boolean(),
	selection: z.string().or(z.null()),
	hba1c: z.optional(ZodCheckedConditionHBA1CArrayType),
	label: z.string(),
	choices: z.array(z.string()),
	treatmentGoals: z.array(z.string()),
	plannedInterventions: z.array(z.string()),
}).strict();

export const ZodCheckedConditionsDraftType = z.array(ZodCheckedConditionIndivType);

export const ZodMedicationByDoseWholeType = z.object({
	type: z.string(),
	checked: z.boolean(),
	id: z.string(),
	amount: z.number(),
	unit: z.string(),
	selectedoption: z.string(),
	options: z.array(z.string()),
}).strict();

export const ZodMedicationByDosePartsType = z.object({
	type: z.string(),
	checked: z.boolean(),
	id: z.string(),
	amount1: z.number(),
	amount2: z.number(),
	unit: z.string(),
	selectedoption: z.string(),
	options: z.array(z.string()),
}).strict();

export const ZodMedicationNotByDoseType = z.object({
	type: z.string(),
	checked: z.boolean(),
	id: z.string(),
	selectedoption: z.string(),
	options: z.array(z.string()),
}).strict();

export const ZodMedicationIndivType = z.union([
	ZodMedicationByDoseWholeType,
	ZodMedicationByDosePartsType,
	ZodMedicationNotByDoseType,
]);

export const ZodMedicationsDraftType = z.array(ZodMedicationIndivType);

export const ZodMedicationAllergyIndivType = z.object({
	id: z.string(),
	checked: z.boolean(),
	value: z.string(),
}).strict();

export const ZodMedicationAllergiesDraftType = z.array(ZodMedicationAllergyIndivType);

export const ZodPickerStateType = z.object({
	value: z.null().or(z.instanceof(dayjs as unknown as typeof Dayjs)),
	validationError: z.string().or(z.null()),
}).strict();

export const ZodLabFormSubRowType = z.object({
	id: z.number(),
	name: z.string(),
	parentId: z.number(),
	textfield1: z.string(),
	textfield2: z.string(),
}).strict();

export const ZodLabFormRowType = z.object({
	id: z.number(),
	name: z.string(),
	subitemIds: z.array(z.number()),
	textfield1: z.string(),
	textfield2: z.string(),
}).strict();

export const ZodLabFormDraftType = z.object({
	items: z.object({
		byId: z.record(z.string(), ZodLabFormRowType),
		allIds: z.array(z.number()),
	}).strict(),
	subitems: z.object({
		byId: z.record(z.string(), ZodLabFormSubRowType),
		allIds: z.array(z.number()),
	}).strict(),
	itemIdCounter: z.number(),
	subItemIdCounter: z.number(),
}).strict();
