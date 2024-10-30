import type { MouseEvent } from 'react';
import {
	Grid,
	Slider,
} from "@mui/material";
import { SocialDrugHistory } from './SocialDrugHistory';
import type { SocialDrugHistoryDraftType } from '../../../types/types';

export function resetLocalStateProperty(
	draft: SocialDrugHistoryDraftType,
	prev: SocialDrugHistoryDraftType,
	localStateProperty: string,
) {
	// if (localStateProperty !== null) {
	// 	if (localStateProperty === "socialdrughistory") {
	// 		draft[localStateProperty] = {
	// 			...prev[localStateProperty]!,
	// 			subtypes: prev[localStateProperty]!.subtypes.map(subtype => {
	// 				return subtype;
	// 			})
	// 		};
	// 	}
	// }
	// else {
	// 	draft[localStateProperty] = null;
	// };
};

export function resetLocalState(prev: SocialDrugHistoryDraftType) {
	const draft = {} as SocialDrugHistoryDraftType;
	// draft.checked = prev.checked;
	// draft.id = prev.id;
	resetLocalStateProperty(draft, prev, "socialdrughistory");

	return draft;
};

export function usePage(
	localSocialDrugHistoryCopy: SocialDrugHistoryDraftType,
	handleToggleSocialDrugHistoryQuestion: (
		event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
		localMentalCopyActivityId: string,
		index: number,
	) => void,
	handleSlideSocialDrugHistoryQuestion: (
		value: number,
		localMentalCopyActivityId: string,
		index: number,
	) => void,
) {
	// return (
	// 	<SocialDrugHistory
	// 		localSocialDrugHistoryCopy={localSocialDrugHistoryCopy}
	// 		handleToggleSocialDrugHistoryQuestion={handleToggleSocialDrugHistoryQuestion}
	// 		handleSlideSocialDrugHistoryQuestion={handleSlideSocialDrugHistoryQuestion}
	// 	/>
	// );
};

// export function useFirstQuestion(
// 	questions: SocialDrugHistoryDraftType,
// 	onChange: (event: Event, value: number | number[], activeThumb: number, index: number) => void,
// ) {
// 	if (questions[0].value === false && questions[1].value === false) {
// 		return (
// 			<></>
// 		);
// 	}
// 	else if (questions[0].value === true) {
// 		return (
// 			<Grid
// 				id="toplevelgrid-gridrow1"
// 				container
// 				item
// 				key={questions[2].id}
// 			>
// 				<Grid
// 					item
// 					xs={8}
// 				>
// 					{questions[2].description}
// 				</Grid>
// 				<Grid
// 					item
// 					xs={8}
// 				>
// 					<Slider
// 						value={questions[2].value as number}
// 						// onChangeCommitted={onChangeCommitted}
// 						onChange={(event: Event, value: number | number[], activeThumb: number) =>
// 							onChange(event, value, activeThumb, 2)}
// 						step={1}
// 						marks
// 						min={0}
// 						max={10}
// 						valueLabelDisplay="auto"
// 					// disabled
// 					/>
// 				</Grid>
// 			</Grid>
// 		);
// 	}
// 	else if (questions[1].value === true) {
// 		return (
// 			<Grid
// 				id="toplevelgrid-gridrow1"
// 				container
// 				item
// 				key={questions[3].id}
// 			>
// 				<Grid
// 					item
// 					xs={8}
// 				>
// 					{questions[3].description}
// 				</Grid>
// 				<Grid
// 					item
// 					xs={8}
// 				>
// 					<Slider
// 						value={questions[3].value as number}
// 						// onChangeCommitted={onChangeCommitted}
// 						onChange={(event: Event, value: number | number[], activeThumb: number) =>
// 							onChange(event, value, activeThumb, 3)}
// 						step={1}
// 						marks
// 						min={0}
// 						max={10}
// 						valueLabelDisplay="auto"
// 					// disabled
// 					/>
// 				</Grid>
// 			</Grid>
// 		);
// 	};
// };