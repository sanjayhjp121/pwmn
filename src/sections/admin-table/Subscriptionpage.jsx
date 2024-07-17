// /components/SubscriptionList.js
import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const subscriptions = [
  {
    name: 'Basic Plan',
    purchasedDate: '2023-01-01',
    endDate: '2024-01-01',
    timePeriod: 'Yearly',
    plan: 'Active'
  },
  // Add more subscriptions here
];

export default function Subscriptionpage({ onAddSubscription }) {
  return (
    <TableContainer component={Paper}>
      <Button variant="contained" color="primary" onClick={onAddSubscription} style={{ margin: 16 }}>
        Add New Subscription
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subscription Name</TableCell>
            <TableCell>Purchased Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Subscription Time Period</TableCell>
            <TableCell>Plan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptions.map((subscription, index) => (
            <TableRow key={index}>
              <TableCell>{subscription.name}</TableCell>
              <TableCell>{subscription.purchasedDate}</TableCell>
              <TableCell>{subscription.endDate}</TableCell>
              <TableCell>{subscription.timePeriod}</TableCell>
              <TableCell>{subscription.plan}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
