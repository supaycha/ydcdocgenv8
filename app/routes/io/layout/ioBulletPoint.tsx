import type { AlignmentType} from "docx";
import { Paragraph, TextRun } from "docx";

export function ioBulletPoint(
	text: string,
	level: number,
	bold = false,
	style = "iobulletpoint",
	alignment?: (typeof AlignmentType)[keyof typeof AlignmentType],
) {
	return new Paragraph({
		children: [
			new TextRun({
				text: text,
				bold: bold,
			})
		],
		bullet: {
			level: level
		},
		style: style,
		alignment: alignment,
	});
};
