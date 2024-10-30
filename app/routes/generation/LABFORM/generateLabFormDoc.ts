import dayjs from "dayjs";
import type { Paragraph, Table } from "docx";
import { Document, Header, AlignmentType, Packer } from "docx";
import saveAs from "file-saver";

import { styles } from "../docxstyles";
import { ioParagraph } from "../../io/layout/ioParagraph";
import type { LabFormDraftType } from "../../types/types";
import { ioPageTitle } from "../../io/layout/ioPageTitle";
import { ioBulletPoint } from "../../io/layout/ioBulletPoint";

export async function generateLabFormDoc(
	mode: string,
	labform: LabFormDraftType,
) {
	const l = [] as Paragraph[];
	const itemIds = Object.keys(labform.items.byId);
	itemIds.forEach(itemId => {
		const item = labform.items.byId[itemId];
		l.push(
			ioBulletPoint(
				`${item.textfield1}, ${item.textfield2}`,
				0,
				true,
			),
		);

		item.subitemIds.forEach(subitemId => {
			const subitem = labform.subitems.byId[subitemId];
			l.push(
				ioBulletPoint(
					`${subitem.textfield1}, ${subitem.textfield2}`,
					1,
					true,
				),
			);
		})
	})

	// const r = [] as Paragraph[];
	// const subitemIds = Object.keys(labform.subitems.byId);
	// subitemIds.forEach(subitemId => {
	// 	const subitem = labform.subitems.byId[subitemId];
	// 	r.push(
	// 		ioBulletPoint(
	// 			`${subitem.textfield1}, ${subitem.textfield2}`,
	// 			1,
	// 			true,
	// 		),
	// 	);
	// })




	const topInfo = [
		ioPageTitle(
			"Lab Form",
		),
		...l,
		// ...r,
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
						// ioParagraph(
						// 	`${demographics.filter(n => n.id === "dateOfBirth")[0].value}`,
						// 	undefined,
						// 	undefined,
						// 	undefined,
						// 	AlignmentType.RIGHT,
						// ),
						// new Paragraph({
						// 	// text: `${(administrative.filter(n => n.id === "patientName")[0] as AdministrativeStrIndivType).value} ${physical.filter(n => n.id === "dateOfBirth")[0].value}`,
						// 	text: `${demographics.filter(n => n.id === "dateOfBirth")[0].value}`,
						// 	alignment: AlignmentType.RIGHT,
						// }),
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