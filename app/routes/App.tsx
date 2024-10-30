import { useMemo, useState, type ReactElement } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';
import {
	Stack,
	CssBaseline,
	GlobalStyles,
	Collapse,
	Button
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { CCPButton } from './generation/CCP/CCPButton';
import { HBA1CButton } from './generation/HBA1C/HBA1CButton';
import { IoVerticalTabs } from './io/wrappers/ioVerticalTabs';

// import './App.css';
import { IoToggleButtons } from './io/wrappers/IoToggleButtons';
import { LabForm } from './labform/LabForm';

function AppContents() {

	// useEffect(() => {
	// 	console.log(`dateOfEstablishment: ${demographics.filter(d => d.id === "dateOfEstablishment")[0].value}`);
	// }, [demographics]);

	return (
		<Stack
			id="toplevelstack"
			sx={{
				height: "auto",
				justifyContent: "space-between",
			}}
			rowGap={2}
		>
			<>
				<Stack
					id="toplevelstack-row1"
					// direction="row"
					sx={{
						height: `89vh`,
					}}
				>
					<IoVerticalTabs
						isTesting={false}
					/>
				</Stack>
				<Stack
					id="toplevelstack-row2"
					direction="row"
				>
					<CCPButton
					/>
					<HBA1CButton
					/>
				</Stack>
			</>
		</Stack>
	);
};

function fallbackRender(props: FallbackProps) {
	// Call resetErrorBoundary() to reset the error boundary and retry the render.

	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre style={{ color: "red" }}>{props.error.message}</pre>
			<pre style={{ color: "red" }}>{props.error.stack}</pre>
		</div>
	);
}

interface AppProps {
	children?: ReactElement
};

function App({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	children
}: AppProps) {
	// const backgroundColor = "#DEDEDE";
	const backgroundColor = "#8c8c8c"; 
	const [mode, setMode] = useState<string | null>("ccpgeneration");

	return (
		<CssBaseline>
			<GlobalStyles
				styles={{
					body: { backgroundColor: backgroundColor },
				}}
			/>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<ErrorBoundary
					fallbackRender={fallbackRender}
				>
					<Stack>
						<IoToggleButtons
							mode={mode}
							setMode={setMode}
						/>
						<Collapse
							in={mode === "labform"}
						>
							<LabForm>
								
							</LabForm>
						</Collapse>
						<Collapse
							in={mode === "ccpgeneration"}
						>
							<AppContents />
						</Collapse>
					</Stack>
				</ErrorBoundary>
			</LocalizationProvider>
		</CssBaseline>
	);
};

export default App;
