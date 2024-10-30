export function VACCINEVERSIONDOSE_INIT_OBJ(id: number, version?: string, dateReceived?: string, dateDue?: string) {
	return {
		id: id,
		version: version ? version : "PCV13/PCV15", // togglebuttongroup should default to PCV13/PCV15
		dateReceived: dateReceived ? dateReceived : null, // mui date components use null, not undefined as optional parameters implicitly do
		dateDue: dateDue ? dateDue : null,
	};
};
