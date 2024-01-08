import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

interface Props {
    errorMessage: string;
    errorCode?: string;
}

function ErrorPage({ errorMessage, errorCode }: Props) {
    document.title = `${document.title} - Error`;
    return (
        <Box
            sx={{
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <Typography sx={{ marginBottom: '15px' }}> {errorCode}</Typography>
            <Typography>
                {errorMessage}
            </Typography>
        </Box>
    );
}

export default ErrorPage;
