import { ReturnChipStatus } from './shared';
export interface DataProcessingContext {
    selected: GridRowSelectionModel;
    setSelected: React.Dispatch<
        React.SetStateAction<GridRowSelectionModel | []>
    >;
    transformInUnixValue: (date: string | number) => timestamp;
    handleGetIdAndType: (reportId: string) => void;
    groupId: string | undefined;
    typeId: number | null;
    groupType: string | undefined;
    handleChipStatus: (status: string) => ReturnChipStatus | undefined;
}
