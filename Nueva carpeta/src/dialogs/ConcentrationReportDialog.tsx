import React, { useState } from 'react';
import CustomDialog from '../components/custom-dialog/custom-dialog';
import CustomButton from '../components/custom-button/custom-button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useStore } from '../store';
import { Box } from '@mui/material';
import { useUIControlContext } from '../context/ui-control-context';

interface ConcentrationReportDialogProps {
    open: boolean;
    onClose: () => void;
}

function ConcentrationReportDialog({
    open,
    onClose,
}: ConcentrationReportDialogProps) {
    const [reportId, setReportId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const accessToken = useStore((state) => state.accessToken);
    const { handleLogOut } = useUIControlContext();

    const handleDownloadClick = async () => {
        const entityId = parseInt(reportId, 10);
        if (!isNaN(entityId)) {
            setIsLoading(true);
            try {
                const apiUrl = process.env.REACT_APP_AFB_DQR_API;
                const response = await fetch(
                    apiUrl + `api/ConcentrationReport?entityId=${entityId}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                console.log(response);
                if (!response.ok) {
                    if (response.status === 401) {
                        handleLogOut();
                    }
                    if (response.status === 404) {
                        setError('Not found');
                        setIsLoading(false);
                    }
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                const contentDispositionHeader = response.headers.get(
                    'content-disposition'
                );
                console.log({ contentDispositionHeader });
                const matches = contentDispositionHeader?.match(
                    /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
                );
                const fileName =
                    matches && matches[1] ? matches[1] : 'Report.xlsx';
                console.log({ fileName });
                // link.setAttribute('download', `Report_${entityId}.xlsx`);
                document.body.appendChild(link);
                link.click();
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
                setError('');
                onClose();
                setIsLoading(false);
            } catch (error) {
                console.error('Error downloading the report: ', error);
                setError('Error downloading the report. Please try again.');
                setIsLoading(false);
            }
        } else {
            setError('It is necessary to enter a valid id.');
        }
    };

    return (
        <CustomDialog
            open={open}
            onClose={onClose}
            title='Download Concentration Report'
            text='Insert the id of the report you want to download.'
            errorMessage={error}
            actions={
                <>
                    <CustomButton onClick={onClose} text='CANCEL' />
                    <CustomButton
                        onClick={handleDownloadClick}
                        text='DOWNLOAD'
                    />
                </>
            }
        >
            {isLoading ? (
                <Box display='flex' justifyContent='center'>
                    <CircularProgress />
                </Box>
            ) : (
                <TextField
                    autoFocus
                    margin='dense'
                    id='reportId'
                    label='Report ID'
                    type='number'
                    fullWidth
                    variant='standard'
                    value={reportId}
                    onChange={(e) => setReportId(e.target.value)}
                />
            )}
        </CustomDialog>
    );
}

export default ConcentrationReportDialog;
