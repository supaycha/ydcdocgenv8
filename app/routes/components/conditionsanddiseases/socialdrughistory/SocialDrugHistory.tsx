import { Fragment } from "react";
import {
	FormControl,
	FormGroup,
	List,
	Typography,
} from "@mui/material";

import { SocialDrugHistoryQuestionLegal } from "./SocialDrugHistoryQuestionLegal";
import { SocialDrugHistoryQuestionIllegal } from "./SocialDrugHistoryQuestionIllegal";
import type { SocialDrugHistoryIllegalIndivType, SocialDrugHistoryLegalIndivType } from "../../../types/types";
import { useAppSelector } from "../../../storage/hooks";
import { selectSocialDrugHistory } from "./socialdrughistorySlice";


interface SocialDrugHistoryProps {
};

// eslint-disable-next-line no-empty-pattern
export function SocialDrugHistory({
}: SocialDrugHistoryProps) {
	const socialDrugHistory = useAppSelector(selectSocialDrugHistory);

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
					{socialDrugHistory
						.filter(q => (
							q.id === "alcohol" ||
							q.id === "smoking"
						))
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
										{questionsGroup.id.toUpperCase()}
									</Typography>
									<SocialDrugHistoryQuestionLegal
										questionsGroup={(questionsGroup as SocialDrugHistoryLegalIndivType)}
									/>
								</Fragment>
							);
						})
					}
					{socialDrugHistory
						.filter(q => (
							q.id === "marijuana" ||
							q.id === "cocaine" ||
							q.id === "heroin"
						))
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
										{questionsGroup.id.toUpperCase()}
									</Typography>
									<SocialDrugHistoryQuestionIllegal
										questionsGroup={(questionsGroup as SocialDrugHistoryIllegalIndivType)}
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
