import type { ReactNode, SyntheticEvent } from 'react';
import { useState } from 'react';
import { Grid, Tab, Tabs } from '@mui/material'

import { Demographics } from '../../components/administrative/demographics/Demographics';
import { Appointments } from '../../components/administrative/appointments/Appointments';
import { Physicians } from '../../components/administrative/physicians/Physicians';
import { Conditions } from '../../components/conditionsanddiseases/conditions/Conditions';
import { Diagnostics } from '../../components/conditionsanddiseases/diagnostics/Diagnostics';
import { SocialDrugHistory } from '../../components/conditionsanddiseases/socialdrughistory/SocialDrugHistory';
import { Functionals } from '../../components/functionals/Functionals';
import { Medications } from '../../components/medications/Medications';
import { MedicationAllergies } from '../../components/medications/MedicationAllergies';
import { PhysicalInformation } from '../../components/physical/physicalinformation/PhysicalInformation';
import { Vaccines } from '../../components/physical/vaccines/Vaccines';
import { Screenings } from '../../components/screenings/Screenings';
import { SocialDeterminants } from '../../components/socialdeterminants/SocialDeterminants';

interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
};

function TabPanel({
	children,
	index,
	value,
}: TabPanelProps) {
	return (
		<>
			{value === index && (
				<Grid
					id="innerlevel-grid-tabpanel"
					container
					sx={{
						flexWrap: "nowrap",
						height: '89vh',
					}}
				>
					{children}
				</Grid>
			)}
		</>
	);
};

interface IoVerticalTabsProps {
	testingStartingTab?: number;
	isTesting?: boolean;
};

export function IoVerticalTabs({
	testingStartingTab,
	isTesting = false,
}: IoVerticalTabsProps) {
	const [value, setValue] = useState(testingStartingTab ? testingStartingTab : 6);

	const handleChange = (_event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<>
			<Grid
				id="toplevel-ioverticaltabs"
				container
			>
				<Grid
					item
					xs='auto'
				>
					<Tabs
						orientation="vertical"
						variant="scrollable"
						value={value}
						onChange={handleChange}
						aria-label="Vertical tabs example"
						sx={{
							borderRight: 1,
							borderColor: 'divider',
						}}
					>
						<Tab
							label="Demographics"
							id={`vertical-tab-${0}`}
							aria-controls={`vertical-tabpanel-${0}`}
						/>
						<Tab
							label="Appointments"
							id={`vertical-tab-${1}`}
							aria-controls={`vertical-tabpanel-${1}`}
						/>
						<Tab
							label="Physicians"
							id={`vertical-tab-${2}`}
							aria-controls={`vertical-tabpanel-${2}`}
						/>
						<Tab
							label="Medications"
							id={`vertical-tab-${3}`}
							aria-controls={`vertical-tabpanel-${3}`}
						/>
						<Tab
							label="Physical Information"
							id={`vertical-tab-${4}`}
							aria-controls={`vertical-tabpanel-${4}`}
						/>
						<Tab
							label="Vaccines"
							id={`vertical-tab-${5}`}
							aria-controls={`vertical-tabpanel-${5}`}
						/>
						<Tab
							label="Screenings"
							id={`vertical-tab-${6}`}
							aria-controls={`vertical-tabpanel-${6}`}
						/>
						<Tab
							label="Functionals"
							id={`vertical-tab-${7}`}
							aria-controls={`vertical-tabpanel-${7}`}
						/>
						<Tab
							label="Conditions and Diseases"
							id={`vertical-tab-${8}`}
							aria-controls={`vertical-tabpanel-${8}`}
						/>
						<Tab
							label="Social Drug History"
							id={`vertical-tab-${9}`}
							aria-controls={`vertical-tabpanel-${9}`}
						/>
						<Tab
							label="Social Determinants"
							id={`vertical-tab-${10}`}
							aria-controls={`vertical-tabpanel-${10}`}
						/>
					</Tabs>
				</Grid>
				<Grid
					item
					container
					id="hereiam"
					xs={8}
					sx={{
						margin: "16px",
					}}
				>
					<TabPanel
						value={value}
						index={0}
					>
						<Demographics
						/>
					</TabPanel>
					<TabPanel
						value={value}
						index={1}
					>
						<Appointments
						/>
					</TabPanel>
					<TabPanel
						value={value}
						index={2}
					>
						<Physicians />
					</TabPanel>
					<TabPanel
						value={value}
						index={3}
					>
						<Medications />
						<MedicationAllergies />
					</TabPanel>
					<TabPanel
						value={value}
						index={4}
					>
						<PhysicalInformation
						/>
					</TabPanel>
					<TabPanel
						value={value}
						index={5}
					>
						<Vaccines />
					</TabPanel>
					<TabPanel
						value={value}
						index={6}
					>
						<Screenings />
					</TabPanel>
					<TabPanel
						value={value}
						index={7}
					>
						<Functionals
						/>
					</TabPanel>
					<TabPanel
						value={value}
						index={8}
					>
						<Conditions />
						<Diagnostics />
					</TabPanel>
					<TabPanel
						value={value}
						index={9}
					>
						<SocialDrugHistory
						/>
					</TabPanel>
					<TabPanel
						value={value}
						index={10}
					>
						<SocialDeterminants
						/>
					</TabPanel>
				</Grid>
			</Grid>
		</>
	);
};
