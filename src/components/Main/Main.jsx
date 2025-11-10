import React, { useContext } from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, Divider, Button } from '@material-ui/core'

import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard';

import { ExpenseTrackerContext } from '../../context/context'

const downloadCsv = (transactions) => {
    const header = ['id','type','category','amount','date'];
    const rows = transactions.map(t => [t.id, t.type, t.category, t.amount, t.date]);
    const csv = [header, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

const Main = () => {
    const classes = useStyles();
    const { balance, transactions, clearTransactions } = useContext(ExpenseTrackerContext);
    return (
        <Card className={classes.root}>
            <CardHeader title="Expense Tracker" subheader="Now handle your expense at ease" />
            <CardContent>
                <Typography align="center" variant="h5">Total Balance : ₹{balance}</Typography>
                <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                    <InfoCard />
                </Typography>
                <Grid container spacing={2} style={{ marginTop: 12 }}>
                    <Grid item>
                        <Button variant="outlined" color="primary" onClick={() => downloadCsv(transactions)}>Export CSV</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="secondary" onClick={clearTransactions}>Clear All</Button>
                    </Grid>
                </Grid>
                <Divider className={classes.divider}/>
                <Form />
            </CardContent>
            <CardContent className={classes.CardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <List />
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    )
}

export default Main
