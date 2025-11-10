import React,{useContext, useMemo, useState} from 'react'
import { List as MultiList, ListItem, ListItemAvatar, Avatar, Slide, IconButton, ListItemText, ListItemSecondaryAction, Grid, TextField } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';
import useStyles from './styles'

import {ExpenseTrackerContext} from '../../../context/context';

  const List = () => {
    const classes = useStyles();
    const { transactions,deleteTransaction } = useContext(ExpenseTrackerContext);
    const [query, setQuery] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      return transactions.filter(t => {
        const matchesQuery = !q || t.category.toLowerCase().includes(q);
        const afterFrom = !fromDate || t.date >= fromDate;
        const beforeTo = !toDate || t.date <= toDate;
        return matchesQuery && afterFrom && beforeTo;
      });
    }, [transactions, query, fromDate, toDate]);

    return (
      <>
        <Grid container spacing={2} style={{ marginBottom: 8 }}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Search category" value={query} onChange={(e)=>setQuery(e.target.value)} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField fullWidth type="date" label="From" InputLabelProps={{ shrink: true }} value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField fullWidth type="date" label="To" InputLabelProps={{ shrink: true }} value={toDate} onChange={(e)=>setToDate(e.target.value)} />
          </Grid>
        </Grid>
        <MultiList dense={false} className={classes.list}>
        {filtered.map((transaction) => (
          <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                  <MoneyOff />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={transaction.category} secondary={`₹${transaction.amount} - ${transaction.date}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={()=>deleteTransaction(transaction.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Slide>
        ))}
      </MultiList>
      </>
    );
  };


export default List
