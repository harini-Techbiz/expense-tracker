//rafce
import React, { useRef, useEffect, useMemo, useState } from 'react'
import { Grid, CssBaseline, Switch, FormControlLabel } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import Details from './components/Details/Details'
import Main from './components/Main/Main'
import useStyles from './styles';

import { SpeechState, useSpeechContext } from "@speechly/react-client";

const App = () => {
    const classes = useStyles();
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem('prefersDark');
        return saved ? saved === 'true' : false;
    });
    const theme = useMemo(() => createMuiTheme({ palette: { type: dark ? 'dark' : 'light' } }), [dark]);
    const toggleDark = (_, val) => {
        const next = typeof val === 'boolean' ? val : !dark;
        setDark(next);
        localStorage.setItem('prefersDark', String(next));
    }
    //const { speechState } = useSpeechContext();
    //const main = useRef(null);
    //const executeScroll = () => main.current.scrollIntoView(); //main=Main component

    // useEffect(() => {
    //     if (speechState === SpeechState.Recording) {
    //         executeScroll();
    //     }
    // }, [speechState]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <div>
            <Grid className={classes.grid} container spacing={0} alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={3} className={classes.mobile}>
                    <Details title="Income" />
                </Grid>
                {/* <Grid item xs={12} sm={5} ref={main} className={classes.main}>
                    <Main />
                </Grid> */}
                <Grid item xs={12} sm={5} className={classes.main}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <FormControlLabel control={<Switch checked={dark} onChange={toggleDark} color="primary" />} label="Dark mode" />
                    </div>
                    <Main />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.desktop}>
                    <Details title="Income" />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.last}>
                    <Details title="Expense" />
                </Grid>
            </Grid>
            <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </div>
        </ThemeProvider>
    )
}

export default App
