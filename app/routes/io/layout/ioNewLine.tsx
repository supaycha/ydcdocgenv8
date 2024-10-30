import { Paragraph, TextRun } from "docx";

/** 
 * if multiple textruns then need to be configured individually,
 * 		so they need to be set externally then passed as whole object
 */
export function ioNewLine(
	// text: string | readonly ParagraphChild[],
	// bold?: boolean,
	// underline?: boolean,
	// style = "ioparagraph",
	// alignment?: (typeof AlignmentType)[keyof typeof AlignmentType],
	// italics?: boolean,
	// tabStops?: readonly TabStopDefinition[],
) {
	// if (typeof text === "string") {
	return new Paragraph({
		children: [
			new TextRun({
				text: "",
			})
		],
		style: "ioparagraph",
		// alignment: alignment,
		// tabStops: tabStops,
	});
	// }

	// return new Paragraph({
	// 	children: text,
	// 	style: style,
	// 	alignment: alignment,
	// 	tabStops: tabStops,
	// });
};
