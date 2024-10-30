import type { AlignmentType, HeadingLevel, ParagraphChild} from "docx";
import { Paragraph, TextRun } from "docx";

/** 
 * spacing commented since new styles have the appropriate spacing per style now
 */
export function ioHeader(
	text: string | readonly ParagraphChild[],
	bold?: boolean,
	style = "ioheadingfont13",
	alignment?: (typeof AlignmentType)[keyof typeof AlignmentType],
	heading?: (typeof HeadingLevel)[keyof typeof HeadingLevel],
) {
	if (typeof text === "string") {
		return new Paragraph({
			children: [
				new TextRun({
					text: text,
					bold: bold,
				})
			],
			heading: heading,
			style: style,
			alignment: alignment,
		});
	}
	return new Paragraph({
		children: text,
		heading: heading,
		style: style,
		alignment: alignment,
	});
};
