export interface UIControlContext {
    alertSeverity: AlertColor | undefined;
    setAlertSeverity: React.Dispatch<React.SetStateAction<AlertColor>>;
    alertMessage: string | undefined;
    setAlertMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
    openToast: boolean | undefined;
    setOpenToast: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    handleOpenToast: (url?: string) => void | undefined;
    handleCloseToast: () => void | undefined;
    openBackdrop: boolean | undefined;
    setOpenBackdrop: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    handleOpenBackdrop: () => void | undefined;
    handleCloseBackdrop: () => void | undefined;
    handleLogOut: () => void;
    handleNavigateToProviderList: (
        groupId: string,
        groupType: string,
        groupName?: string,
        reportDetailId?: string
    ) => MouseEventHandler<HTMLButtonElement> | undefined;
    groupNameUnique: string | undefined;
    reportDetailId: string | undefined;
}
