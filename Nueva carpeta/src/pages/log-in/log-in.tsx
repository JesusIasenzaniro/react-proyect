import { useCallback, useState } from 'react';
import { CustomTextFieldStyles } from '../../components/custom-text-field-styles/custom-text-field-styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../../resources/images/logo.svg';
import cover from '../../resources/images/log-in-cover.svg';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useStore } from '../../store';
import { LOGIN } from '../../graphql/mutations/login';
import Toast from '../../components/toast/toast';
import SimpleBackdrop from '../../components/backdrop/backdrop';
import { useUIControlContext } from '../../context/ui-control-context';
import jwt_decode from 'jwt-decode';

import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Typography,
} from '@mui/material';
import { IFormInputs } from '../../types/shared';

interface DecodedTokenInfo {
    UserId: string;
    aud: string;
    client_id: string;
    exp: number;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/expired': string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string[];
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
    iss: string;
    scope: string;
    sub: string;
}

function LogIn() {
    const {
        alertSeverity,
        setAlertSeverity,
        alertMessage,
        setAlertMessage,
        openToast,
        handleOpenToast,
        handleCloseToast,
        openBackdrop,
        handleOpenBackdrop,
        handleCloseBackdrop,
    } = useUIControlContext();

    document.title = `${document.title} - Login`;

    const [login] = useMutation(LOGIN);

    const [setAccessToken, setAzureToken, setBnpUserRol, setDqrUserRol] = useStore(
        (state) => [
            state.setAccessToken,
            state.setAzureToken,
            state.setBnpUserRol,
            state.setDqrUserRol,
        ]
    );

    const [showPassword, setShowPassword] = useState(false);

    const { handleSubmit, control } = useForm<IFormInputs>();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = useCallback(
        async ({ userName, password }: IFormInputs) => {
            handleOpenBackdrop();
            try {
                const response = await login({
                    variables: {
                        clientId: 'AppHub',
                        email: userName,
                        password: password,
                    },
                });

                if (response.data) {
                    const { token } = response.data.login;
                    const { token: azureToken } = response.data.login.azureAd;

                    if (token) {
                        handleCloseBackdrop();
                        setAccessToken(token);
                        const decodedToken: DecodedTokenInfo =
                            jwt_decode(token);

                        if (
                            decodedToken[
                                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
                            ].includes('BnpReports')
                        ) {
                            setBnpUserRol('BnpReports');
                        }

                        if (
                            decodedToken[
                                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
                                ].includes('DqrReport')
                        ) {
                            setDqrUserRol('DqrReport');
                        }

                        if (azureToken) {
                            setAzureToken(azureToken);
                        }
                    } else {
                        handleCloseBackdrop();
                        setAlertSeverity('error');
                        setAlertMessage(
                            'There was an unexpected error, review the email and password'
                        );
                        handleOpenToast();
                    }
                }
            } catch (error) {
                handleCloseBackdrop();
                setAlertSeverity('error');
                setAlertMessage(
                    'There was an unexpected error, review the email and password'
                );
                handleOpenToast();
            }
        },
        [
            handleOpenBackdrop,
            login,
            handleCloseBackdrop,
            setAccessToken,
            setBnpUserRol,
            setDqrUserRol,
            setAzureToken,
            setAlertSeverity,
            setAlertMessage,
            handleOpenToast,
        ]
    );

    return (
        <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction='row' sx={{ minHeight: '100vh' }}>
                <Grid
                    item
                    xs={6}
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'none',
                            md: 'block',
                            lg: 'block',
                        },
                    }}
                >
                    <Box
                        component='article'
                        sx={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${cover})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                </Grid>

                <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    item
                    container
                    alignItems='center'
                    justifyContent='center'
                    direction='column'
                    rowSpacing={3}
                >
                    <Grid item>
                        <Avatar alt='company-logo' src={logo} />
                    </Grid>
                    <Grid item>
                        <Typography
                            variant='h4'
                            align='center'
                            fontWeight='bold'
                            color='#000'
                        >
                            Hello again!
                        </Typography>
                    </Grid>

                    <Grid item sx={{ width: '50%' }}>
                        <Controller
                            name='userName'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <CustomTextFieldStyles
                                    {...field}
                                    id='outlined-required'
                                    label='User Name'
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item sx={{ width: '50%' }}>
                        <Controller
                            name='password'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <CustomTextFieldStyles
                                    {...field}
                                    id='outlined-password-input'
                                    label='Password'
                                    autoComplete='current-password'
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='toggle password visibility'
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    edge='end'
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item sx={{ width: '40%' }}>
                        <Button
                            type='submit'
                            variant='contained'
                            color='warning'
                            fullWidth
                        >
                            Log In
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Toast
                handleCloseToast={handleCloseToast}
                openToast={openToast as boolean}
                severity={alertSeverity}
                message={alertMessage}
            />

            <SimpleBackdrop
                handleCloseBackdrop={handleCloseBackdrop}
                openBackdrop={openBackdrop as boolean}
            />
        </Box>
    );
}

export default LogIn;
