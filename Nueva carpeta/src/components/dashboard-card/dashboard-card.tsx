import React, { useCallback } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CircleArrowRight from '../../resources/images/circle-arrow-right.svg';
import { Avatar, Grid, Link } from '@mui/material';

interface Props {
    img: string;
    name: string;
    desc: string;
    link: string | undefined;
    bnpUserRol: string | null;
    azureToken: string | null;
    dqrUserRol: string | null;
}

function DashboardCard({
    img,
    name,
    desc,
    link,
    bnpUserRol,
    azureToken,
    dqrUserRol,
}: Props) {
    const validOptionsCard = useCallback(() => {
        let avatarStyle: React.CSSProperties = { width: 24, height: 24 };
        let validText = null;
        let linkToUse = link;

        if (!(name === 'Transaction Monitoring' && azureToken) && !(name === 'BNP Report' && bnpUserRol) && !(name === 'Detailed Qualitative Report' && dqrUserRol)) {
            avatarStyle = { ...avatarStyle, filter: "grayscale(100%)" };
            validText = <Typography style={{ marginRight: '8px' }}>You have no role for this application </Typography>;
            linkToUse = undefined;
        }
        return {
            validComponent: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {validText}
                    <Avatar
                        alt='circle-arrow-right'
                        src={CircleArrowRight}
                        sx={avatarStyle}
                    />
                </div>
            ),
            link: linkToUse,
        };
    }, [azureToken, bnpUserRol, dqrUserRol, link, name]);

    return (
        <Link href={validOptionsCard().link} underline='none'>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component='img'
                    alt='dashboard-img'
                    height='140'
                    image={img}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant='h5'
                        component='article'
                        color='black'
                        fontWeight='bold'
                    >
                        {name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {desc}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>{validOptionsCard().validComponent}</Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Link>
    );
}

export default DashboardCard;
