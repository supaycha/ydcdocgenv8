import { AlignmentType, Paragraph, TextRun } from "docx";

export function ioDocTitle(
	text: string,
	bold?: boolean,
) {
	return new Paragraph({
		children: [
			new TextRun({
				text: text,
				bold: bold
			}),
		],
		style: "iodoctitle",
		alignment: AlignmentType.CENTER,
	});
};
