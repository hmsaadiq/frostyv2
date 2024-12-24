import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

const Input = styled('input')({
  display: 'none',
});

const PaymentPage = ({ totalPrice, isBackend, onPaymentComplete }) => {
  const [receiptFile, setReceiptFile] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf')) {
      setReceiptFile(file);
    } else {
      setPaymentStatus('Please upload a valid JPEG, PNG, or PDF file.');
    }
  };

  const handleDeleteReceipt = () => {
    setReceiptFile(null);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (isBackend) {
      try {
        // Simulating a Paystack API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock successful payment
        const mockTransactionId = 'PAYSTACK_' + Math.random().toString(36).substr(2, 9);
        onPaymentComplete(mockTransactionId);
        setPaymentStatus('Payment completed successfully!');
      } catch (error) {
        setPaymentStatus('Payment failed. Please try again.');
      }
    } else {
      if (receiptFile) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating upload
        onPaymentComplete(receiptFile);
        setPaymentStatus('Payment receipt uploaded successfully!');
      } else {
        setPaymentStatus('Please upload a receipt before confirming payment.');
      }
    }
    setIsLoading(false);
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Payment Details
        </Typography>
        {!isBackend && (
          <>
            <Typography variant="body1" gutterBottom>
              Please make a transfer to the following account:
            </Typography>
            <Typography variant="body1">Account Number: 6173682815</Typography>
            <Typography variant="body1">Bank: Fidelity Bank</Typography>
            <Typography variant="body1">Account Name: Saadiq Hamza</Typography>
            <Typography variant="body1" gutterBottom>
              Amount: ₦{totalPrice.toLocaleString()}
            </Typography>
            <Box mt={2}>
              <Input
                accept="image/*,application/pdf"
                id="receipt-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="receipt-file">
                <Button variant="contained" component="span">
                  Upload Receipt (JPEG, PNG, or PDF)
                </Button>
              </label>
              {receiptFile && (
                <Grid container alignItems="center" spacing={2} mt={1}>
                  <Grid item>
                    <Typography variant="body2">{receiptFile.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="secondary" onClick={handleDeleteReceipt}>
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Box>
          </>
        )}
        {isBackend && (
          <Typography variant="body1" gutterBottom>
            You will be redirected to Paystack to complete your payment of ₦{totalPrice.toLocaleString()}.
          </Typography>
        )}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : (isBackend ? 'Proceed to Payment' : 'Confirm Payment')}
        </Button>
        {paymentStatus && (
          <Typography color={paymentStatus.includes('successfully') ? 'success' : 'error'} sx={{ mt: 2 }}>
            {paymentStatus}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentPage;