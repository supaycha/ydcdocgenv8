import { Fragment } from 'react';
import { FormControl, FormGroup, List, Typography } from '@mui/material';

import { SocialDeterminantsQuestionGroup } from './SocialDeterminantsQuestionGroup';
import { useAppSelector } from '../../storage/hooks';
import { selectSocialDeterminants } from './socialdeterminantsSlice';

interface SocialDeterminantsProps {
};

// eslint-disable-next-line no-empty-pattern
export function SocialDeterminants({
}: SocialDeterminantsProps) {
	const socialDeterminants = useAppSelector(selectSocialDeterminants);

	return (
		<FormControl
			sx={{
				overflow: "auto",
				width: "100%"
			}}
			component="fieldset"
			variant="standard"
		>
			<FormGroup>
				<List
					id="toplevelgrid-KATZADL"
				>
					<Typography
						sx={{
							fontWeight: "fontWeightBold"
						}}
					>
						CHECKING A BOX MEANS THE PATIENT SAID YES TO QUESTION;
						LEAVING A BOX UNCHECKED MEANS THE PATIENT SAID NO TO QUESTION;
					</Typography>
					{socialDeterminants
						.map((questionsGroup, _index) => {
							return (
								<Fragment
									key={questionsGroup.id}
								>
									<Typography
										sx={{
											fontWeight: "fontWeightBold"
										}}
									>
										{questionsGroup.label}
									</Typography>
									<SocialDeterminantsQuestionGroup
										questionsGroup={questionsGroup}
									/>
								</Fragment>
							);
						})
					}
				</List>
			</FormGroup>
		</FormControl>
	);
};
