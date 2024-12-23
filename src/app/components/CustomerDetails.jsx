import React from 'react';
import { TextField } from '@mui/material';

const CustomerDetails = ({ customerName, setCustomerName, customerPhone, setCustomerPhone, customerEmail, setCustomerEmail, customerNotes, setCustomerNotes }) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Phone Number"
        value={customerPhone}
        onChange={(e) => setCustomerPhone(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email Address"
        type="email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Special Instructions"
        multiline
        rows={4}
        value={customerNotes}
        onChange={(e) => setCustomerNotes(e.target.value)}
      />
    </>
  );
};

export default CustomerDetails;