export const styles = {
	paragraphStyles: [

		{
			id: "ioparagraph",
			name: "IOPARAGRAPH",
			basedOn: "Normal",
			run: {
				// size: 24,
				// size: 28,
				size: 32,
				color: "000000",
				font: {
					name: "Tahoma",
				},
			},
			paragraph: {
				color: "000000",
				spacing: { line: 275 }, // 1.15 line spacing in paragraph options
			},
		},
		{
			id: "iodoctitle",
			name: "IODOCTITLE",
			basedOn: "Normal",
			run: {
				size: 48,
				color: "000000",
				font: {
					name: "Tahoma",
				},
			},
			paragraph: {
				color: "000000",
				spacing: { line: 275 }, // 1.15 line spacing in paragraph options
			},
		},
		{
			id: "iosectionheader",
			name: "IOSECTIONHEADER",
			basedOn: "Heading3",
			run: {
				size: 48,
				color: "000000",
				font: {
					name: "Tahoma",
				},
			},
			paragraph: {
				color: "000000",
				spacing: { line: 275 }, // 1.15 line spacing in paragraph options
			},
		},
		{
			id: "iobulletpoint",
			name: "IOBULLETPOINT",
			basedOn: "Normal",
			run: {
				// size: 24,
				// size: 28,
				size: 32,
				color: "000000",
				font: {
					name: "Tahoma",
				},
			},
			paragraph: {
				color: "000000",			
				// spacing: { line: 240 }, // 1.5 line spacing in paragraph options
				spacing: {
					before: 150,
					after: 150,
					line: 240,
				}, // 1.15 line spacing in paragraph options
			},
		},
		{
			id: "ioheadingfont13",
			name: "IOHEADING2",
			basedOn: "Heading2",
			run: {
				// size: 26,
				// size: 30,
				size: 34,
				color: "000000",
				font: {
					name: "Tahoma",
				},
			},
			paragraph: {
				color: "000000",
				spacing: { line: 275 }, // 1.15 line spacing in paragraph options
			},
		},
	],
};