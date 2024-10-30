import type { ChangeEvent } from "react";
import { Fragment, useCallback } from "react";
import {
	Typography,
	Stack,
} from "@mui/material";

import type { SocialDeterminantsIndivType } from "../../types/types";
import { ExternalIoFormControlLabel } from "../../io/wrappers/ExternalIoFormControlLabel";
import { useAppDispatch } from "../../storage/hooks";
import { setCheckbox } from "./socialdeterminantsSlice";

interface SocialDeterminantsQuestionGroupProps {
	questionsGroup: SocialDeterminantsIndivType; // used to be a subtype when subtypes was the unneccessary level between parent structure and child data
};

export function SocialDeterminantsQuestionGroup({
	questionsGroup,
}: SocialDeterminantsQuestionGroupProps) {
	const dispatch = useAppDispatch();

	const handleCheckbox = useCallback((
		event: ChangeEvent<HTMLInputElement>,
		checked: boolean,
		id: string,
		which?: string,
	) => {
		dispatch(
			setCheckbox({
				type: 'setCheckbox',
				questionsGroupId: questionsGroup.id,
				codeId: id,
				value: checked,
				codeorcodes: which,
			})
		);
	},
		[
			dispatch,
			questionsGroup.id,
		]
	);

	return (
		<>
			{questionsGroup.questions
				.map((q, i) => {
					return (
						<Stack
							key={`${questionsGroup.id}-${i}`}
							sx={{
								marginLeft: "24px"
							}}
						>
							{("codes" in q) ?
								<Typography
									fontWeight="fontWeightBold"
								>
									{q.text}
								</Typography> :
								<ExternalIoFormControlLabel
									id={q.text}
									checked={q.code.checked}
									onExternalChange={(
										event: ChangeEvent<HTMLInputElement>,
										checked: boolean,
										id: string,
										which?: string,
									) => handleCheckbox(event, checked, q.code.id, which)}
									which="code"
								/>
							}
							{("codes" in q) ?
								<Stack
									sx={{
										marginLeft: "24px"
									}}
								>
									{q.codes.map(c => {
										return (
											<Fragment
												key={c.code.id}
											>
												<ExternalIoFormControlLabel
													id={c.code.description}
													checked={c.code.checked}
													onExternalChange={(
														event: ChangeEvent<HTMLInputElement>,
														checked: boolean,
														id: string,
														which?: string,
													) => handleCheckbox(event, checked, c.code.id, which)}
													which="codes"
												/>
											</Fragment>
										);
									})}
								</Stack> :
								<></>
							}
						</Stack>
					);
				})
			}
		</>
	);
};
