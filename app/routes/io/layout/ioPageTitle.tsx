import { BorderStyle, Paragraph, TextRun } from "docx";

export function ioPageTitle(
	text: string,
	pageBreakBefore = false,
	border = true
) {
	return new Paragraph({
		children: [
			new TextRun({
				text: text,
				bold: true
			}),
		],
		border: !border ? undefined : {
			bottom: {
				color: "auto",
				space: 1,
				style: BorderStyle.SINGLE,
				size: 12,
			},
		},
		pageBreakBefore: pageBreakBefore,
		style: "ioparagraph",
	});
};
