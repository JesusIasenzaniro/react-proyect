import React, { createContext, useCallback, useContext, useState } from 'react';
import { AlertColor } from '@mui/material';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { UIControlContext } from '../types/ui-control-context';

const context = createContext<UIControlContext | undefined>(undefined);

export type UIControlContextProviderProps = UIControlContext & {
    children: React.ReactElement | null;
};

export function UIControlContextProvider(
    props: UIControlContextProviderProps
): React.ReactElement {
    const navigate = useNavigate();
    const [setAccessToken, setAzureToken, setBnpUserRol, setDqrUserRol] =
        useStore((state) => [
            state.setAccessToken,
            state.setAzureToken,
            state.setBnpUserRol,
            state.setDqrUserRol,
        ]);
    const [groupNameUnique, setGroupNameUnique] = useState<string | undefined>(
        ''
    );
    const [reportDetailId, setReportDetailId] = useState<string | undefined>(
        ''
    );

    const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
        undefined
    );
    const [alertMessage, setAlertMessage] = useState<string | undefined>(
        undefined
    );
    const [openToast, setOpenToast] = useState<boolean | undefined>(false);

    const handleOpenToast = useCallback((url?: string): void | undefined => {
        setOpenToast(true);

        if (url) {
            window.open(url);
        }
    }, []);

    const handleCloseToast = useCallback((): void | undefined => {
        setOpenToast(false);
    }, []);

    const [openBackdrop, setOpenBackdrop] = useState<boolean | undefined>(
        false
    );

    const handleOpenBackdrop = useCallback((): void | undefined => {
        setOpenBackdrop(true);
    }, []);

    const handleCloseBackdrop = useCallback((): void | undefined => {
        setOpenBackdrop(false);
    }, []);

    const handleLogOut = useCallback(() => {
        setAccessToken(null);
        setAzureToken(null);
        setBnpUserRol(null);
        setDqrUserRol(null);
        navigate('/');
    }, [navigate, setAccessToken, setAzureToken, setBnpUserRol, setDqrUserRol]);

    const handleNavigateToProviderList = useCallback(
        (
            groupId: string,
            groupType: string,
            groupName?: string,
            reportDetailId?: string
        ) => {
            navigate(`/bnp/reports-list/${groupId}:${groupType}/send`);

            if (groupName && reportDetailId) {
                setGroupNameUnique(groupName);
                setReportDetailId(reportDetailId);
            } else {
                setGroupNameUnique(undefined);
                setReportDetailId(undefined);
            }
        },
        [navigate]
    );

    return (
        <context.Provider
            value={{
                alertSeverity,
                setAlertSeverity,
                alertMessage,
                setAlertMessage,
                openToast,
                setOpenToast,
                handleOpenToast,
                handleCloseToast,
                openBackdrop,
                setOpenBackdrop,
                handleOpenBackdrop,
                handleCloseBackdrop,
                handleLogOut,
                handleNavigateToProviderList,
                groupNameUnique,
                reportDetailId,
            }}
        >
            {props.children}
        </context.Provider>
    );
}

export function useUIControlContext(): UIControlContext {
    const globalContext = useContext(context);

    if (globalContext === undefined) {
        throw new Error(
            'You must use `useUIControlContext` hook within a component that is a descendant of a <UIControlContextProvider />'
        );
    }

    return globalContext;
}
