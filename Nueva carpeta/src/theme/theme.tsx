import { createTheme } from '@mui/material';

export const theme = createTheme({
    typography: {
        fontFamily: 'Inter, sans-serif',
    },
    palette: {
        primary: {
            main: '#F49F6C',
        },
        secondary: {
            main: '#fff',
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#0E234099',
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    background: '#F1F1F3',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '1rem',
                },

                textInfo: {
                    color: '#10152E66',
                },

                containedWarning: {
                    fontWeight: 'bold',
                    fontSize: '16px',
                    background: '#F49F6C',
                },
                sizeLarge: {
                    height: '56px',
                },
            },
        },

        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: '#0E2340',
                },
            },
        },

        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: '#fff',
                },
                secondary: {
                    color: '#fff',
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                colorInfo: {
                    background: '#447CCB',
                },
            },
        },
    },
});
