import type { ParagraphChild} from "docx";
import { AlignmentType, Paragraph, TableCell, WidthType } from "docx";

export function ioTableCell(
	widthSize: number,
	text?: readonly ParagraphChild[],
	textAlignment: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.CENTER,
	style = "ioparagraph",
	columnSpan?: number,
) {
	return new TableCell({
		columnSpan: columnSpan,
		width: {
			size: widthSize,
			type: WidthType.PERCENTAGE
		},
		children: [
			new Paragraph({
				children: text,
				spacing: { line: 275 }, // 1.15 line spacing in paragraph options
				style: style,
				alignment: textAlignment,
			})
		],
	});
};
