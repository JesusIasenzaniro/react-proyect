import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UIControlContextProvider } from './context/ui-control-context';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import { BrowserRouter } from 'react-router-dom';
import { DataProcessingContextProvider } from './context/data-processing-context';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BrowserRouter>
                    <UIControlContextProvider
                        alertSeverity={undefined}
                        setAlertSeverity={() => 'success'}
                        alertMessage={undefined}
                        setAlertMessage={() => 'Success'}
                        openToast={undefined}
                        setOpenToast={() => false}
                        handleOpenToast={() => {
                            false;
                        }}
                        handleCloseToast={() => {
                            false;
                        }}
                        openBackdrop={undefined}
                        setOpenBackdrop={() => false}
                        handleOpenBackdrop={() => {
                            false;
                        }}
                        handleCloseBackdrop={() => {
                            false;
                        }}
                        handleLogOut={() => {
                            false;
                        }}
                        handleNavigateToProviderList={() => {
                            false;
                        }}
                        groupNameUnique={undefined}
                        reportDetailId={undefined}
                    >
                        <DataProcessingContextProvider
                            transformInUnixValue={() => {
                                false;
                            }}
                            selected={undefined}
                            setSelected={() => {
                                false;
                            }}
                            handleGetIdAndType={() => {
                                false;
                            }}
                            groupId={undefined}
                            typeId={null}
                            groupType={undefined}
                            handleChipStatus={(status = 'Ready') => {
                                return { label: status, color: 'info' };
                            }}
                        >
                            <App />
                        </DataProcessingContextProvider>
                    </UIControlContextProvider>
                </BrowserRouter>
            </LocalizationProvider>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
