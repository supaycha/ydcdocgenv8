import type { ZodType } from 'zod';
import type { ZodError} from 'zod-validation-error';
import { fromZodError } from 'zod-validation-error';

export function parseZodReaderFriendly(zobject: ZodType, value: unknown) {
	try {
		zobject.parse(value);
	} catch (err) {
		const validationError = fromZodError(err as ZodError);
		throw Error(validationError.toString());
	};
};
