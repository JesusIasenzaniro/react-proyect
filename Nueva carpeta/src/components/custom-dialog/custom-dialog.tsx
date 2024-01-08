import React, { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { DialogContentText } from '@mui/material';

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    actions: ReactNode;
    text: string;
    errorMessage?: string;
    handleSubmit?: () => void;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
    open,
    onClose,
    title,
    children,
    actions,
    text,
    errorMessage,
    handleSubmit,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            component={'form'}
            onSubmit={handleSubmit ? handleSubmit : undefined}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
                {children}
                {errorMessage && (
                    <DialogContentText color='error' marginTop={'10px'}>
                        {errorMessage}
                    </DialogContentText>
                )}
            </DialogContent>
            <DialogActions>{actions}</DialogActions>
        </Dialog>
    );
};

export default CustomDialog;
