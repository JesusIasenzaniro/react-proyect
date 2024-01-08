import React, { createContext, useCallback, useContext, useState } from 'react';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DataProcessingContext } from '../types/data-processing-context';
import { ReturnChipStatus } from '../types/shared';

const context = createContext<DataProcessingContext | undefined>(undefined);

export type DataProcessingContextProviderProps = DataProcessingContext & {
    children: React.ReactElement | null;
};

export function DataProcessingContextProvider(
    props: DataProcessingContextProviderProps
): React.ReactElement {
    const [selected, setSelected] = useState<GridRowSelectionModel>([]);
    const [groupId, setGroupId] = useState<string | undefined>('');
    const [groupType, setGroupType] = useState<string | undefined>('');
    const [typeId, setTypeId] = useState<number | null>(null);

    const transformInUnixValue = (date: string | number) => {
        let dateObject = dayjs(date, 'DD/MM/YYYY HH:mm:ss');

        if (!dateObject.isValid()) {
            dateObject = dayjs(date);
        }

        const timestamp = dateObject.unix();
        return timestamp;
    };

    const handleGetIdAndType = useCallback((reportId: string) => {
        let id;
        let type;
        if (reportId) {
            const idAndType = reportId.split(':');
            id = idAndType[0];
            type = idAndType[1];
        }
        const typeId = type === 'BillingGroup' ? 1 : 0;

        setGroupId(id);
        setGroupType(type);
        setTypeId(typeId);
    }, []);

    const handleChipStatus = useCallback(
        (status: string): ReturnChipStatus | undefined => {
            if (status === 'Ready') {
                return { label: status, color: 'info' };
            } else if (status === 'Sent' || status === 'SENT') {
                return { label: 'Sent', color: 'success' };
            } else if (status === 'PendingToRevision') {
                return { label: 'Pending to revision', color: 'warning' };
            } else if (status === 'NoResults') {
                return { label: 'No results', color: 'error' };
            } else if (status === 'REJECTED') {
                return { label: 'Rejected', color: 'error' };
            }
        },
        []
    );

    return (
        <context.Provider
            value={{
                selected,
                setSelected,
                transformInUnixValue,
                handleGetIdAndType,
                groupId,
                typeId,
                groupType,
                handleChipStatus,
            }}
        >
            {props.children}
        </context.Provider>
    );
}

export function useDataProcessingContext(): DataProcessingContext {
    const globalContext = useContext(context);

    if (globalContext === undefined) {
        throw new Error(
            'You must use `useDataProcessingContext` hook within a component that is a descendant of a <DataProcessingContextProvider />'
        );
    }

    return globalContext;
}
