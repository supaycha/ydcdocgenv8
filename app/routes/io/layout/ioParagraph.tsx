import type { AlignmentType, ParagraphChild} from "docx";
import { Paragraph, TextRun, UnderlineType } from "docx";

/** 
 * if multiple textruns then need to be configured individually,
 * 		so they need to be set externally then passed as whole object
 */
export function ioParagraph(
	text: string | readonly ParagraphChild[],
	bold?: boolean,
	underline?: boolean,
	style = "ioparagraph",
	alignment?: (typeof AlignmentType)[keyof typeof AlignmentType],
	italics?: boolean,
) {
	if (typeof text === "string") {
		return new Paragraph({
			children: [
				new TextRun({
					text: text,
					bold: bold,
					italics: italics,
					underline: underline ?
						{
							// color: "black",
							type: UnderlineType.SINGLE
						} :
						undefined,
				})
			],
			style: style,
			alignment: alignment,
		});
	}

	return new Paragraph({
		children: text,
		style: style,
		alignment: alignment,
	});
};
