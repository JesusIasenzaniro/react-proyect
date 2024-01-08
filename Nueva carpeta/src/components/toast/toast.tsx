import { Alert, AlertColor, Box, Snackbar } from '@mui/material';

interface Props {
    openToast: boolean;
    handleCloseToast: () => void;
    message: string | undefined;
    severity: AlertColor | undefined;
}
function Toast({ openToast, handleCloseToast, message, severity }: Props) {
    return (
        <Box>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={openToast}
                onClose={handleCloseToast}
            >
                <Alert
                    onClose={handleCloseToast}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Toast;
