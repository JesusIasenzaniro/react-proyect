import React, { useCallback, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PieChartIcon from '@mui/icons-material/PieChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import companyLogo from '../../resources/images/logo.svg';
import ListIcon from '@mui/icons-material/List';
import EmailIcon from '@mui/icons-material/Email';
import { Outlet } from 'react-router-dom';
import { useUIControlContext } from '../../context/ui-control-context';
import { useStore } from '../../store';
import MuiDrawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import ConcentrationReportDialog from '../../dialogs/ConcentrationReportDialog';
import ReportIcon from '@mui/icons-material/Report';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const drawerWidth = 260;

type OpenSubmenusState = {
    [key: string]: boolean;
};

interface MenuItem {
    text?: string;
    link: string;
    logo?: JSX.Element;
    color?: string;
    submenu?: SubmenuItem[];
}

interface SubmenuItem {
    text: string;
    logo: JSX.Element;
    color?: string;
    link: string;
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    marginBottom: '-10px',
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

function Navbar() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [azureToken, bnpUserRol, dqrUserRol] = useStore((state) => [
        state.azureToken,
        state.bnpUserRol,
        state.dqrUserRol,
    ]);
    const [open, setOpen] = useState(true);

    const { handleLogOut } = useUIControlContext();
    const location = useLocation();
    const handleDrawerOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleDrawerClose = useCallback(() => {
        setOpen(false);
    }, []);

    const [openSubmenus, setOpenSubmenus] = useState<OpenSubmenusState>(() => {
        const savedSubmenus = localStorage.getItem('openSubmenus');
        return savedSubmenus ? JSON.parse(savedSubmenus) : {};
    });

    const handleToggleSubmenu = (text: string) => {
        setOpenSubmenus((prevOpen: OpenSubmenusState) => {
            const newOpen = {
                ...prevOpen,
                [text]: !prevOpen[text],
            };
            localStorage.setItem('openSubmenus', JSON.stringify(newOpen));
            return newOpen;
        });
    };

    React.useEffect(() => {
        const savedSubmenus = localStorage.getItem('openSubmenus');
        if (savedSubmenus) {
            setOpenSubmenus(JSON.parse(savedSubmenus));
        }
    }, []);

    const navbarOptions = useMemo(
        () => [
            {
                text: 'Allfunds',
                subtext: 'Dashboard',
                logo: (
                    <img
                        style={{ marginLeft: '-6px' }}
                        alt='company-logo'
                        src={companyLogo}
                    />
                ),
                link: '/',
            },
            {
                text: 'Transaction Monitoring',
                logo: <AssessmentIcon />,
                link: '/transaction-monitoring',
                color: 'secondary',
            },

            {
                text: 'BNP',
                logo: <PieChartIcon />,
                link: 'bnp/generate',
                color: 'secondary',
                submenu: [
                    {
                        text: 'Generate Reports',
                        logo: <PieChartIcon />,
                        color: 'secondary',
                        link: '/bnp/generate',
                    },
                    {
                        text: 'Generation List',
                        logo: <ListIcon />,
                        color: 'secondary',
                        link: '/bnp/reports-list',
                    },
                    {
                        text: 'Send Emails',
                        logo: <EmailIcon />,
                        color: 'secondary',
                        link: '/bnp/emails',
                    },
                ],
            },
            {
                text: 'DQR',
                logo: <PostAddIcon />,
                link: '',
                color: 'secondary',
                submenu: [
                    {
                        text: 'Home',
                        logo: <HomeIcon />,
                        color: 'secondary',
                        link: '/dqr/home',
                    },
                    {
                        text: 'Concentration Report',
                        logo: <PostAddIcon />,
                        color: 'secondary',
                        link: '',
                    },
                    {
                        text: 'Risk List',
                        logo: <ReportIcon />,
                        color: 'secondary',
                        link: '/dqr/risk-list',
                    },
                    {
                        text: 'Research List',
                        logo: <QueryStatsIcon />,
                        color: 'secondary',
                        link: '/dqr/research-list',
                    },
                ],
            },
        ],
        []
    );

    const filteredNavbarOptions = useCallback(() => {
        return navbarOptions.filter((option) => {
            if (!azureToken) {
                return option.text !== 'Transaction Monitoring';
            }
            if (!bnpUserRol) {
                return option.text !== 'BNP';
            }
            if (!dqrUserRol) {
                return option.text !== 'DQR';
            }
            return true;
        });
    }, [azureToken, bnpUserRol, dqrUserRol, navbarOptions]);

    const navigate = useNavigate();

    const handleItemClick = useCallback(
        (item: MenuItem) => {
            if (item.submenu && item.submenu.length > 0) {
                if (item.text) {
                    handleToggleSubmenu(item.text);
                }
            } else {
                navigate(item.link);
            }
        },
        [handleToggleSubmenu, navigate]
    );

    const handleSubitemClick = useCallback(
        (subItem: SubmenuItem) => {
            if (subItem.text === 'Concentration Report') {
                setIsDialogOpen(true);
            } else {
                navigate(subItem.link);
            }
        },
        [setIsDialogOpen, navigate]
    );

    const isRouteActive = useCallback(
        (route: string) => {
            return location.pathname === route;
        },
        [location.pathname]
    );

    const getIconColor = useCallback(
        (menuItem: MenuItem) => {
            if (isRouteActive(menuItem.link)) {
                return 'primary';
            }
            if (menuItem.submenu) {
                const isSubmenuActive = menuItem.submenu.some(
                    (subItem: SubmenuItem) => isRouteActive(subItem.link)
                );

                if (isSubmenuActive) {
                    return 'primary';
                }
            }
            return menuItem.color || 'inherit';
        },
        [isRouteActive]
    );

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexGrow: 1,
                paddingLeft: 3,
                paddingTop: 2,
                paddingRight: 3,
            }}
        >
            <CssBaseline />
            <Drawer variant='permanent' open={open}>
                <DrawerHeader>
                    <IconButton
                        onClick={!open ? handleDrawerOpen : handleDrawerClose}
                    >
                        {!open ? (
                            <ChevronRightIcon color='secondary' />
                        ) : (
                            <ChevronLeftIcon color='secondary' />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <List>
                            {filteredNavbarOptions().map(
                                ({ text, logo, link, color, submenu }) => (
                                    <React.Fragment key={text}>
                                        <Tooltip title={text} placement='right'>
                                            <ListItem
                                                button
                                                onClick={() =>
                                                    handleItemClick({
                                                        text,
                                                        logo,
                                                        link,
                                                        color,
                                                        submenu,
                                                    })
                                                }
                                                sx={{}}
                                            >
                                                <ListItemIcon>
                                                    {React.cloneElement(logo, {
                                                        color: getIconColor({
                                                            text,
                                                            link,
                                                            logo,
                                                            color,
                                                            submenu,
                                                        }),
                                                    })}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={text}
                                                    sx={{
                                                        display: 'block',
                                                        textAlign: 'left',
                                                    }}
                                                />
                                                {submenu &&
                                                    submenu.length > 0 && (
                                                        <ExpandMoreIcon
                                                            color='secondary'
                                                            sx={{
                                                                transform:
                                                                    openSubmenus[
                                                                        text
                                                                    ]
                                                                        ? 'rotate(180deg)'
                                                                        : 'rotate(0deg)',
                                                                transition:
                                                                    'transform 0.3s',
                                                            }}
                                                        />
                                                    )}
                                            </ListItem>
                                        </Tooltip>
                                        {submenu && submenu.length > 0 && (
                                            <Collapse
                                                in={openSubmenus[text]}
                                                timeout='auto'
                                                unmountOnExit
                                            >
                                                <List
                                                    component='div'
                                                    disablePadding
                                                >
                                                    {submenu.map((subItem) => (
                                                        <ListItemButton
                                                            sx={{ pl: 4 }}
                                                            key={subItem.text}
                                                            onClick={() =>
                                                                handleSubitemClick(
                                                                    subItem
                                                                )
                                                            }
                                                        >
                                                            <ListItemIcon>
                                                                {React.cloneElement(
                                                                    subItem.logo,
                                                                    {
                                                                        color: getIconColor(
                                                                            subItem
                                                                        ),
                                                                    }
                                                                )}
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={
                                                                    subItem.text
                                                                }
                                                            />
                                                        </ListItemButton>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        )}
                                    </React.Fragment>
                                )
                            )}
                        </List>
                    </Box>

                    <Box>
                        <List>
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={handleLogOut}
                                    href={'/'}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? 'initial'
                                            : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <LogoutIcon color='secondary' />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={'Log out'}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Outlet />
            <ConcentrationReportDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </Box>
    );
}

export default Navbar;
