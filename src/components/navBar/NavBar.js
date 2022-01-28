import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from '@material-ui/core';
import Adb from '@material-ui/icons/Adb';

import { makeStyles } from '@material-ui/core/styles';

const usestyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        fontSize: '2.3rem',
    },
}));

const NavBar = ({ getIndianCases, getGlobalData, india }) => {
    const classes = usestyles();

    return (
        <AppBar position='static' style={{ background: '#2E3B55' }}>
            <Toolbar>
                <Typography variant='h6' className={classes.title}>
                    Covid-19 Tracker Demo
                </Typography>
                <Button
                    variant='contained'
                    style={{ backgroundColor: 'green', color: 'white' }}
                    onClick={!india ? getIndianCases : getGlobalData}
                >
                    {!india ? 'India' : 'Global'}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
