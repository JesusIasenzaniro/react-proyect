import { Columns, Rows, ColumnsName } from './shared';

interface ActionEvent {
    (
        reportDetailId: string,
        groupId?: string,
        groupType?: string,
        providerName?: string,
        reportListId?: string,
        type?: string
    ): void;
}

export interface ActionData {
    status: string;
    color: string;
    buttonText: string;
    actionEvent?: ActionEvent;
    actionType: string;
}
export interface CustomTableProps {
    rows: Rows[];
    columns: Columns[];
    useCheckbox: boolean;
    groupType?: string;
    groupId?: string;
    actionsData?: ActionData[];
    selected: GridRowSelectionModel;
    setSelected: React.Dispatch<React.SetStateAction<GridRowSelectionModel>>;
    handleGetItemUrl?: (id: string | number) => Promise<void>;
    handleNavigate?: (id: string | number, type: string | undefined) => void;
    handleChipStatus?: (status: string) => ReturnChipStatus | undefined;
    transformInUnixValue?: (date: string | number) => number;
}

export interface CustomTableHeadProps {
    numSelected: number;
    order: string;
    orderBy: string;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRequestSort: (property: keyof ColumnsName) => void;
    rowCount: number;
    columns: Columns[];
    useCheckbox: boolean;
}
