import React, { useState, useEffect } from 'react';

import {
  Grid,
  Card,
  Alert,
  Button,
  Snackbar,
  Container,
  TextField,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

const PaymentModel = () => {
  const [basicPrice, setBasicPrice] = useState(10); // Predefined prices
  const [miniPrice, setMiniPrice] = useState(20);
  const [agencyPrice, setAgencyPrice] = useState(30);
  const [basicDescription, setBasicDescription] = useState(
    'Ideal for small teams with basic project management needs.'
  );
  const [miniDescription, setMiniDescription] = useState(
    'Great for medium-sized teams looking for more features.'
  );
  const [agencyDescription, setAgencyDescription] = useState(
    'Perfect for large organizations with advanced project management requirements.'
  );
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch prices and descriptions on component mount
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      // Simulating fetching predefined prices and descriptions from a source
      setBasicPrice(10);
      setMiniPrice(20);
      setAgencyPrice(30);
      setBasicDescription(
        'Ideal for small teams with basic project management needs. Includes task management, basic reporting, and up to 10 team members.'
      );
      setMiniDescription(
        'Great for medium-sized teams looking for more features. Includes task management, advanced reporting, and up to 25 team members.'
      );
      setAgencyDescription(
        'Perfect for large organizations with advanced project management requirements. Includes task management, custom reporting, and unlimited team members.'
      );
    } catch (err) {
      console.error('Error fetching prices:', err);
      setErrorMessage('Error fetching prices.');
    }
  };

  const handleSave = async () => {
    const prices = {
      basicPrice,
      miniPrice,
      agencyPrice,
    };

    try {
      // Simulating saving updated prices
      console.log('Updated prices:', prices);
      setSuccessMessage('Prices updated successfully!');
    } catch (err) {
      console.error('Error updating prices:', err);
      setErrorMessage('Error updating prices.');
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Set Plan Prices
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Basic Plan
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {basicDescription}
              </Typography>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                value={basicPrice}
                onChange={(e) => setBasicPrice(e.target.value)}
                sx={{ mt: 2 }}
              />
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Mini Plan
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {miniDescription}
              </Typography>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                value={miniPrice}
                onChange={(e) => setMiniPrice(e.target.value)}
                sx={{ mt: 2 }}
              />
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Agency Plan
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {agencyDescription}
              </Typography>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                value={agencyPrice}
                onChange={(e) => setAgencyPrice(e.target.value)}
                sx={{ mt: 2 }}
              />
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PaymentModel;
