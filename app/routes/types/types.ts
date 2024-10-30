import type { InputHTMLAttributes } from "react";
import type { z } from "zod";
import type {
	ZodVacVersionIndivType,
	ZodVacVersionsType,
	ZodRiskConditionIndivType,
	ZodRiskConditionsType,
	ZodStatementsIndivType,
	ZodPossibleNextVaccinesIndivType,
	ZodRecommendationIndivType,
	ZodPneumococcalVaccineDraftType,
	ZodPossibleNextVaccinesType,
	ZodStatementsType,
	ZodRecommendationsType,
	ZodAgeRangeType,
	ZodAgeRangeInitObjType,
	ZodKATZADLType,
	ZodFunctionalsDraftType,
	ZodLBIADLType,
	ZodLBIADLActivitiesType,
	ZodLBIADLActivityIndivType,
	ZodLBIADLActivityOptionsType,
	ZodLBIADLActivityOptionIndivType,
	ZodKATZADLActivityOptionIndivType,
	ZodKATZADLActivityOptionsType,
	ZodKATZADLActivityIndivType,
	ZodKATZADLActivitiesType,
	ZodKATZADLActivityResultType,
	ZodDietQuestionIndivType,
	ZodDietQuestionsType,
	ZodDietType,
	ZodPhysicalActivityQuestionIndivType,
	ZodPhysicalActivityQuestionsType,
	ZodPhysicalActivityType,
	ZodSocialActivityQuestionIndivType,
	ZodSocialActivityQuestionsType,
	ZodSocialActivityType,
	ZodPhysicianType,
	ZodSelectionType,
	ZodPhysiciansIndivType,
	ZodPhysiciansDraftType,
	ZodToggleOptionsIndivType,
	ZodToggleOptionsType,
	ZodDiagnosticsIndivType,
	ZodDiagnosticsDraftType,
	ZodConditionsandDiseasesDraftType,
	ZodDemographicsIndivType,
	ZodAppointmentDraftType,
	ZodAppointmentIndivType,
	ZodDemographicsDateIndivType,
	ZodDemographicsDateIndivValueType,
	ZodDemographicsDraftType,
	ZodDemographicsStrIndivType,
	ZodCheckedConditionIndivType,
	ZodCheckedConditionsDraftType,
	ZodSocialDrugHistoryIndivType,
	ZodSocialDrugHistoryDraftType,
	ZodBothVaccineDraftType,
	ZodBothVaccineIndivType,
	ZodDoseIndivType,
	ZodDosesType,
	ZodDosesVaccineIndivType,
	ZodDosesVaccineDraftType,
	ZodOnlyVaccineDraftType,
	ZodOnlyVaccineIndivType,
	ZodPhysicalInformationIndivType,
	ZodPhysicalInformationDraftType,
	ZodRadioOptionsIndivType,
	ZodRadioOptionsType,
	ZodGroupedScreeningIndivType,
	ZodGroupedScreeningDraftType,
	ZodSingleScreeningIndivType,
	ZodSingleScreeningDraftType,
	ZodToggledScreeningIndivType,
	ZodToggledScreeningDraftType,
	ZodMedicationByDoseWholeType,
	ZodMedicationByDosePartsType,
	ZodMedicationNotByDoseType,
	ZodMedicationIndivType,
	ZodMedicationsDraftType,
	ZodMedicationAllergyIndivType,
	ZodMedicationAllergiesDraftType,
	ZodSocialDrugHistoryIllegalIndivType,
	ZodSocialDrugHistoryLegalIndivType,
	ZodSocialDrugHistoryToggleOptionsValueType,
	ZodSocialDrugHistoryToggleOptionIndivValueType,
	ZodSocialDrugHistoryLegalValueStringIndivType,
	ZodSocialDrugHistoryIllegalValueBooleanIndivType,
	ZodSocialDeterminantsDraftType,
	ZodSocialDeterminantsIndivType,
	ZodSocialDeterminantsQuestionsType,
	ZodSocialDeterminantsIndivQuestionType,
	ZodSocialDeterminantsCodesWrapperType,
	ZodSocialDeterminantsCodeWrapperType,
	ZodSocialDeterminantsCodeType,
	ZodCheckedConditionHBA1CType,
	ZodCheckedConditionHBA1CArrayType,
	ZodPickerStateType,
	ZodLabFormDraftType,
	// ZodTimePickerStateType,
} from "./types_zod"
import type { Dayjs } from "dayjs";

type DataAttributeKey = `data-${string}`;
export interface IoInputProps extends InputHTMLAttributes<HTMLInputElement> {
	[dataAttribute: DataAttributeKey]: unknown;
};

type RadioOptionsIndivType1 = z.infer<typeof ZodRadioOptionsIndivType>;
export interface RadioOptionsIndivType extends RadioOptionsIndivType1 {
	[key: string]: string | boolean | null | ToggleOptionsType;
};
export type RadioOptionsType = z.infer<typeof ZodRadioOptionsType>;

type GroupedScreeningIndivType1 = z.infer<typeof ZodGroupedScreeningIndivType>;
export interface GroupedScreeningIndivType extends GroupedScreeningIndivType1 {
	[key: string]: string | boolean | null | RadioOptionsType;
};
export type GroupedScreeningDraftType = z.infer<typeof ZodGroupedScreeningDraftType>;

type ToggledScreeningIndivType1 = z.infer<typeof ZodToggledScreeningIndivType>;
export interface ToggledScreeningIndivType extends ToggledScreeningIndivType1 {
	[key: string]: string | boolean | number | null | ToggleOptionsType;
};
export type ToggledScreeningDraftType = z.infer<typeof ZodToggledScreeningDraftType>;

type SingleScreeningIndivType1 = z.infer<typeof ZodSingleScreeningIndivType>;
export interface SingleScreeningIndivType extends SingleScreeningIndivType1 {
	[key: string]: string | boolean | number | null | undefined | ToggleOptionsType;
};
export type SingleScreeningDraftType = z.infer<typeof ZodSingleScreeningDraftType>;

type OnlyVaccineIndivType1 = z.infer<typeof ZodOnlyVaccineIndivType>;
export interface OnlyVaccineIndivType extends OnlyVaccineIndivType1 {
	[key: string]: string | boolean | null;
};
export type OnlyVaccineDraftType = z.infer<typeof ZodOnlyVaccineDraftType>;

type BothVaccineIndivType1 = z.infer<typeof ZodBothVaccineIndivType>;
export interface BothVaccineIndivType extends BothVaccineIndivType1 {
	[key: string]: string | boolean | null;
};
export type BothVaccineDraftType = z.infer<typeof ZodBothVaccineDraftType>;

type DoseIndivType1 = z.infer<typeof ZodDoseIndivType>;
export interface DoseIndivType extends DoseIndivType1 {
	[key: string]: string | boolean | null;
};
export type DosesType = z.infer<typeof ZodDosesType>;

type DosesVaccineIndivType1 = z.infer<typeof ZodDosesVaccineIndivType>;
export interface DosesVaccineIndivType extends DosesVaccineIndivType1 {
	[key: string]: string | boolean | DosesType;
};
export type DosesVaccineDraftType = z.infer<typeof ZodDosesVaccineDraftType>;

export type ToggleOptionsIndivType = z.infer<typeof ZodToggleOptionsIndivType>;

export type ToggleOptionsType = z.infer<typeof ZodToggleOptionsType>;

export type DiagnosticsIndivType = z.infer<typeof ZodDiagnosticsIndivType>;

export type DiagnosticsDraftType = z.infer<typeof ZodDiagnosticsDraftType>;
export type ConditionsandDiseasesDraftType = z.infer<typeof ZodConditionsandDiseasesDraftType>;

export type PhysicianType = z.infer<typeof ZodPhysicianType>;

export type SelectionType = z.infer<typeof ZodSelectionType>;
export type PhysiciansIndivType = z.infer<typeof ZodPhysiciansIndivType>;

export type PhysiciansDraftType = z.infer<typeof ZodPhysiciansDraftType>;

export type DemographicsStrIndivType = z.infer<typeof ZodDemographicsStrIndivType>;

// export type DemographicsNumIndivType = z.infer<typeof ZodDemographicsNumIndivType>;

export type DemographicsDateIndivValueType = z.infer<typeof ZodDemographicsDateIndivValueType>;
export type DemographicsDateIndivType = z.infer<typeof ZodDemographicsDateIndivType>;

// export type DemographicsStrArrType = z.infer<typeof ZodDemographicsStrArrType>;

export type DemographicsIndivType = z.infer<typeof ZodDemographicsIndivType>;

export type DemographicsDraftType = z.infer<typeof ZodDemographicsDraftType>;

type AppointmentIndivType1 = z.infer<typeof ZodAppointmentIndivType>;
export interface AppointmentIndivType extends AppointmentIndivType1 {
	[key: string]: string | null;
};
export type AppointmentDraftType = z.infer<typeof ZodAppointmentDraftType>;

type PhysicalInformationIndivType1 = z.infer<typeof ZodPhysicalInformationIndivType>;
export interface PhysicalInformationIndivType extends PhysicalInformationIndivType1 {
	[key: string]: string | number;
};
export type PhysicalInformationDraftType = z.infer<typeof ZodPhysicalInformationDraftType>;

export type VacVersionIndivType = z.infer<typeof ZodVacVersionIndivType>;

export type VacVersionsType = z.infer<typeof ZodVacVersionsType>;

type RiskConditionIndivType1 = z.infer<typeof ZodRiskConditionIndivType>;
export interface RiskConditionIndivType extends RiskConditionIndivType1 {
	[key: string]: string | boolean;
};
export type RiskConditionsType = z.infer<typeof ZodRiskConditionsType>;

type StatementsIndivType1 = z.infer<typeof ZodStatementsIndivType>;
export interface StatementsIndivType extends StatementsIndivType1 {
	[key: string]: string | boolean | (string | null) | { value: number, unit: string }
};
export type StatementsType = z.infer<typeof ZodStatementsType>;

type PossibleNextVaccinesIndivType1 = z.infer<typeof ZodPossibleNextVaccinesIndivType>;
export interface PossibleNextVaccinesIndivType extends PossibleNextVaccinesIndivType1 {
	[key: string]: string | StatementsType
};
export type PossibleNextVaccinesType = z.infer<typeof ZodPossibleNextVaccinesType>;

type RecommendationIndivType1 = z.infer<typeof ZodRecommendationIndivType>;
export interface RecommendationIndivType extends RecommendationIndivType1 {
	[key: string]: string | PossibleNextVaccinesType
};
export type RecommendationsType = z.infer<typeof ZodRecommendationsType>;

type AgeRangeType1 = z.infer<typeof ZodAgeRangeType>;
export interface AgeRangeType extends AgeRangeType1 {
	[key: string]: RiskConditionsType | RecommendationsType;
};

export type PneumococcalVaccineDraftType1 = z.infer<typeof ZodPneumococcalVaccineDraftType>;
export interface PneumococcalVaccineDraftType extends PneumococcalVaccineDraftType1 {
	[key: string]: string | boolean | VacVersionsType | AgeRangeType | null
};

export type AgeRangeInitObjType1 = z.infer<typeof ZodAgeRangeInitObjType>;
export interface AgeRangeInitObjType extends AgeRangeInitObjType1 {
	[key: string]: AgeRangeType
};

type DietQuestionIndivType1 = z.infer<typeof ZodDietQuestionIndivType>;
export interface DietQuestionIndivType extends DietQuestionIndivType1 {
	[key: string]: string | number;
};
export type DietQuestionsType = z.infer<typeof ZodDietQuestionsType>;

type DietType1 = z.infer<typeof ZodDietType>;
export interface DietType extends DietType1 {
	[key: string]: DietQuestionsType;
};

type PhysicalActivityQuestionIndivType1 = z.infer<typeof ZodPhysicalActivityQuestionIndivType>;
export interface PhysicalActivityQuestionIndivType extends PhysicalActivityQuestionIndivType1 {
	[key: string]: string | number;
};
export type PhysicalActivityQuestionsType = z.infer<typeof ZodPhysicalActivityQuestionsType>;

type PhysicalActivityType1 = z.infer<typeof ZodPhysicalActivityType>;
export interface PhysicalActivityType extends PhysicalActivityType1 {
	[key: string]: PhysicalActivityQuestionsType;
};

type SocialActivityQuestionIndivType1 = z.infer<typeof ZodSocialActivityQuestionIndivType>;
export interface SocialActivityQuestionIndivType extends SocialActivityQuestionIndivType1 {
	[key: string]: string | number;
};
export type SocialActivityQuestionsType = z.infer<typeof ZodSocialActivityQuestionsType>;

type SocialActivityType1 = z.infer<typeof ZodSocialActivityType>;
export interface SocialActivityType extends SocialActivityType1 {
	[key: string]: SocialActivityQuestionsType;
};

type SocialDrugHistoryToggleOptionIndivValueType1 = z.infer<typeof ZodSocialDrugHistoryToggleOptionIndivValueType>;
export interface SocialDrugHistoryToggleOptionIndivValueType extends SocialDrugHistoryToggleOptionIndivValueType1 {
	[key: string]: string;
};
export type SocialDrugHistoryToggleOptionsValueType = z.infer<typeof ZodSocialDrugHistoryToggleOptionsValueType>;

type SocialDrugHistoryLegalValueStringIndivType1 = z.infer<typeof ZodSocialDrugHistoryLegalValueStringIndivType>;
export interface SocialDrugHistoryLegalValueStringIndivType extends SocialDrugHistoryLegalValueStringIndivType1 {
	[key: string]: string;
};

type SocialDrugHistoryLegalIndivType1 = z.infer<typeof ZodSocialDrugHistoryLegalIndivType>;
export interface SocialDrugHistoryLegalIndivType extends SocialDrugHistoryLegalIndivType1 {
	[key: string]: string | number | SocialDrugHistoryToggleOptionsValueType | SocialDrugHistoryLegalValueStringIndivType;
};

type SocialDrugHistoryIllegalValueBooleanIndivType1 = z.infer<typeof ZodSocialDrugHistoryIllegalValueBooleanIndivType>;
export interface SocialDrugHistoryIllegalValueBooleanIndivType extends SocialDrugHistoryIllegalValueBooleanIndivType1 {
	[key: string]: string | boolean;
};

type SocialDrugHistoryIllegalIndivType1 = z.infer<typeof ZodSocialDrugHistoryIllegalIndivType>;
export interface SocialDrugHistoryIllegalIndivType extends SocialDrugHistoryIllegalIndivType1 {
	[key: string]: string | number | boolean | SocialDrugHistoryToggleOptionsValueType | SocialDrugHistoryIllegalValueBooleanIndivType;
};

export type SocialDrugHistoryIndivType = z.infer<typeof ZodSocialDrugHistoryIndivType>;
export type SocialDrugHistoryDraftType = z.infer<typeof ZodSocialDrugHistoryDraftType>;

type SocialDeterminantsCodeType1 = z.infer<typeof ZodSocialDeterminantsCodeType>;
export interface SocialDeterminantsCodeType extends SocialDeterminantsCodeType1 {
	[key: string]: string | boolean;
};

type SocialDeterminantsCodeWrapperType1 = z.infer<typeof ZodSocialDeterminantsCodeWrapperType>;
export interface SocialDeterminantsCodeWrapperType extends SocialDeterminantsCodeWrapperType1 {
	[key: string]: string | SocialDeterminantsCodeType;
};

type SocialDeterminantsCodesWrapperType1 = z.infer<typeof ZodSocialDeterminantsCodesWrapperType>;
export interface SocialDeterminantsCodesWrapperType extends SocialDeterminantsCodesWrapperType1 {
	[key: string]: string | SocialDeterminantsCodeWrapperType[];
};

export type SocialDeterminantsIndivQuestionType = z.infer<typeof ZodSocialDeterminantsIndivQuestionType>;
export type SocialDeterminantsQuestionsType = z.infer<typeof ZodSocialDeterminantsQuestionsType>;

type SocialDeterminantsIndivType1 = z.infer<typeof ZodSocialDeterminantsIndivType>;
export interface SocialDeterminantsIndivType extends SocialDeterminantsIndivType1 {
	[key: string]: string | SocialDeterminantsQuestionsType;
};
export type SocialDeterminantsDraftType = z.infer<typeof ZodSocialDeterminantsDraftType>;

type KATZADLActivityOptionIndivType1 = z.infer<typeof ZodKATZADLActivityOptionIndivType>;
export interface KATZADLActivityOptionIndivType extends KATZADLActivityOptionIndivType1 {
	[key: string]: string;
};
export type KATZADLActivityOptionsType = z.infer<typeof ZodKATZADLActivityOptionsType>;

type KATZADLActivityIndivType1 = z.infer<typeof ZodKATZADLActivityIndivType>;
export interface KATZADLActivityIndivType extends KATZADLActivityIndivType1 {
	[key: string]: string | KATZADLActivityOptionsType | boolean;
};
export type KATZADLActivitiesType = z.infer<typeof ZodKATZADLActivitiesType>;

type KATZADLActivityResultType1 = z.infer<typeof ZodKATZADLActivityResultType>;
export interface KATZADLActivityResultType extends KATZADLActivityResultType1 {
	[key: string]: string;
};

type KATZADLType1 = z.infer<typeof ZodKATZADLType>;
export interface KATZADLType extends KATZADLType1 {
	[key: string]: KATZADLActivitiesType | KATZADLActivityResultType | number;
};

type LBIADLActivityOptionIndivType1 = z.infer<typeof ZodLBIADLActivityOptionIndivType>;
export interface LBIADLActivityOptionIndivType extends LBIADLActivityOptionIndivType1 {
	[key: string]: string | number | boolean;
};
export type LBIADLActivityOptionsType = z.infer<typeof ZodLBIADLActivityOptionsType>;

type LBIADLActivityIndivType1 = z.infer<typeof ZodLBIADLActivityIndivType>;
export interface LBIADLActivityIndivType extends LBIADLActivityIndivType1 {
	[key: string]: string | boolean | number | LBIADLActivityOptionsType;
};
export type LBIADLActivitiesType = z.infer<typeof ZodLBIADLActivitiesType>;

type LBIADLType1 = z.infer<typeof ZodLBIADLType>;
export interface LBIADLType extends LBIADLType1 {
	[key: string]: number | LBIADLActivitiesType;
};

type FunctionalsDraftType1 = z.infer<typeof ZodFunctionalsDraftType>;
export interface FunctionalsDraftType extends FunctionalsDraftType1 {
	[key: string]: string | boolean | KATZADLType | LBIADLType | DietType | PhysicalActivityType | SocialActivityType | null;
};

type CheckedConditionHBA1CType1 = z.infer<typeof ZodCheckedConditionHBA1CType>;
export interface CheckedConditionHBA1CType extends CheckedConditionHBA1CType1 {
	[key: string]: string | number | null;
};

type CheckedConditionHBA1CArrayType = z.infer<typeof ZodCheckedConditionHBA1CArrayType>;

type CheckedConditionIndivType1 = z.infer<typeof ZodCheckedConditionIndivType>;
export interface CheckedConditionIndivType extends CheckedConditionIndivType1 {
	[key: string]: string | boolean | null | string[] | CheckedConditionHBA1CArrayType | undefined;
};
export type CheckedConditionsDraftType = z.infer<typeof ZodCheckedConditionsDraftType>;

type MedicationByDoseWholeType1 = z.infer<typeof ZodMedicationByDoseWholeType>;
export interface MedicationByDoseWholeType extends MedicationByDoseWholeType1 {
	[key: string]: string | boolean | number | string[];
};

type MedicationByDosePartsType1 = z.infer<typeof ZodMedicationByDosePartsType>;
export interface MedicationByDosePartsType extends MedicationByDosePartsType1 {
	[key: string]: string | boolean | number | string[];
};

type MedicationNotByDoseType1 = z.infer<typeof ZodMedicationNotByDoseType>;
export interface MedicationNotByDoseType extends MedicationNotByDoseType1 {
	[key: string]: string | boolean | string[];
};

export type MedicationIndivType = z.infer<typeof ZodMedicationIndivType>;
export type MedicationsDraftType = z.infer<typeof ZodMedicationsDraftType>;

type MedicationAllergyIndivType1 = z.infer<typeof ZodMedicationAllergyIndivType>;
export interface MedicationAllergyIndivType extends MedicationAllergyIndivType1 {
	[key: string]: string | boolean | number;
};
export type MedicationAllergiesDraftType = z.infer<typeof ZodMedicationAllergiesDraftType>;

type PickerStateType1 = z.infer<typeof ZodPickerStateType>;
export interface PickerStateType extends PickerStateType1 {
	[key: string]: string | null | Dayjs;
};

export type LabFormDraftType = z.infer<typeof ZodLabFormDraftType>;
// type TimePickerStateType1 = z.infer<typeof ZodTimePickerStateType>;
// export interface TimePickerStateType extends TimePickerStateType1 {
// 	[key: string]: string | null;
// };

// export type PsychosocialDepressionType = {
// 	id: string;
// 	label: string;
// 	lastTest: string | null;
// 	lastTestScore: number;
// };

// export type PsychosocialWorkActivitiesType = {
// 	id: string;
// 	label: string;
// 	value: string;
// };

// export type PsychosocialHouseholdType = {
// 	id: string;
// 	label: string;
// 	marriedStatus: null;
// 	childrenStatusandNumber: null;
// };

// export type PsychosocialTobaccoType = {
// 	id: string;
// 	label: string;
// 	smokingStatus: boolean;
// 	howMany: {
// 		amount: number;
// 		time: string;
// 	};
// };

// export type PsychosocialAlcoholType = {
// 	id: string;
// 	label: string;
// 	drinkingStatus: boolean;
// 	social: boolean;
// 	ever: boolean;
// 	howMany: {
// 		amount: number;
// 		time: string;
// 	};
// };

// export type PsychosocialIndivType =
// 	| PsychosocialDepressionType
// 	| PsychosocialWorkActivitiesType
// 	| PsychosocialHouseholdType
// 	| PsychosocialTobaccoType
// 	| PsychosocialAlcoholType;

// export type PsychosocialsDraftType = PsychosocialIndivType[];

// export type OptionIndivType = {
// 	id: string;
// 	checked: boolean;
// };

// export type OptionsType = OptionIndivType[];

// export type SurgicalProceduresIndivType = {
// 	id: string;
// 	label: string;
// 	checked: boolean;
// };

// export type SurgicalProceduresDraftType = SurgicalProceduresIndivType[];

// export type EndOfLifePlanningPatientUnderstandingType = {
// 	id: string;
// 	label: string;
// 	understanding: boolean;
// };

// export type EndOfLifePlanningAdvancedDirectivesType = {
// 	id: string;
// 	label: string;
// 	doctorHas: boolean;
// };

// export type EndOfLifePlanningIndivType =
// 	| EndOfLifePlanningPatientUnderstandingType
// 	| EndOfLifePlanningAdvancedDirectivesType;

// export type EndOfLifePlanningDraftType = EndOfLifePlanningIndivType[];
