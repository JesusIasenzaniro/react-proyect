import { Tab, Tabs } from '@mui/material';

interface TabsArray {
    tabValue: string;
    tabLabel: string;
}
interface Props {
    tab: string;
    handleChangeTab: (event: React.SyntheticEvent, newValue: string) => void;
    tabsArray: TabsArray[];
}

function TabComponent({ tab, handleChangeTab, tabsArray }: Props) {
    return (
        <Tabs value={tab} onChange={handleChangeTab} aria-label='status tabs'>
            {tabsArray.map(({ tabValue, tabLabel }) => (
                <Tab value={tabValue} label={tabLabel} key={tabValue} />
            ))}
        </Tabs>
    );
}

export default TabComponent;
