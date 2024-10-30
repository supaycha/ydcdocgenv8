import { ioBulletPoint } from "../../io/layout/ioBulletPoint";
import { ioNewLine } from "../../io/layout/ioNewLine";
import { ioPageTitle } from "../../io/layout/ioPageTitle";
import { ioParagraph } from "../../io/layout/ioParagraph";

import type { CheckedConditionsDraftType } from "../../types/types";

function generateLifestyleMods() {
	return [
		ioBulletPoint(
			"Diet: A DASH diet is recommended, to decrease dietary sodium and increase dietary potassium.",
			0,
			false,
		),
		ioBulletPoint(
			"Balanced diet and nutrition; including a high-fiber diet, eating no starchy vegetables, or whole foods, and avoiding refined sugar and grains. The replacement of saturated fat with monounsaturated and polyunsaturated fats reduces dietary cholesterol.",
			0,
			false,
		),
		ioBulletPoint(
			"Fluid intake: Ensure appropriate fluid intake and avoid dehydration.",
			0,
			false,
			undefined,
		),
		ioBulletPoint(
			"Weight loss: body weight control is indicated to avoid obesity. Particularly abdominal obesity should be managed.",
			0,
			false,
		),
		ioBulletPoint(
			"Assess BMI annually, patients with DM2 and overweight: Aim for ≥ 5% weight loss.",
			0,
			true,
		),
		ioBulletPoint(
			"Exercise: moderate-intensity aerobic exercise (walking, jogging, cycling, yoga, or swimming) for 30 minutes 5–7 days per week or 90–150 minutes per week.",
			0,
			false,
		),
		ioBulletPoint(
			"Smoking: patient non-smoker.",
			0,
			false,
		),
		ioBulletPoint(
			"Smoking: Smoking Cessation",
			0,
			false,
		),
		ioBulletPoint(
			"Alcohol consumption: should be avoided or limited to a moderate intake.",
			0,
			false,
		),
		ioBulletPoint(
			"Safety: Prevent falls and eliminate potential hazards in the individual's home environment.",
			0,
			false,
		),
		ioBulletPoint(
			"Reduce stress and induce mindfulness.",
			0,
			false,
		),
	];
};

export function generateChronicConditions(ccs: CheckedConditionsDraftType) {
	const c1 = [
		ioPageTitle(
			"Chronic Conditions",
			true,
		),
		ioNewLine(),
	];
	const pageBreak = ioPageTitle(
		"", 
		true, 
		false,
	);

	const c2 = ccs.filter(a => a.checked === true && a.selection !== undefined && a.selection !== null).map((condition, i) => {
		let part1 = [];
		if (i % 2 === 0 && i !== 0) {
			part1.push(pageBreak)
		};

		part1 = part1.concat([
			ioParagraph(
				`Chronic condition #${i + 1}:`,
				true,
			),
			ioBulletPoint(
				condition.selection!,
				1,
			),
			ioNewLine(),
			ioParagraph(
				"Action Plan",
				true,
				true,
			),
		]);
		const part2 = [
			ioParagraph(
				"Treatment Goals",
				true,
			),
		];
		const part3 = condition.treatmentGoals.map(tgoal => {
			const par = ioBulletPoint(
				tgoal, 
				0,
			);
			return par;
		});
		const part4 = [
			...generateLifestyleMods(),
			ioParagraph(
				"Planned intervention",
				true,
			),
		];
		const part5 = condition.plannedInterventions.map(tgoal => {
			const par = ioBulletPoint(
				tgoal, 
				0,
			);
			return par;
		});

		return [
			...part1,
			ioNewLine(),
			...part2,
			...part3,
			...part4,
			...part5,
			ioNewLine(),
		];
	});

	return [
		...c1,
		...c2.flat(),
	];
};
