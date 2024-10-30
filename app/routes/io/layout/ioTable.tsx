import type { TableRow } from "docx";
import { convertInchesToTwip, Table, WidthType } from "docx";

interface IoTableProps {
	rows: TableRow[];
};

export function ioTable({
	rows
}: IoTableProps) {
	return new Table({
		margins: {
			left: convertInchesToTwip(0.08),
			right: convertInchesToTwip(0.08),
		},
		width: {
			size: 100,
			type: WidthType.PERCENTAGE
		},
		rows: rows,
	});
};
