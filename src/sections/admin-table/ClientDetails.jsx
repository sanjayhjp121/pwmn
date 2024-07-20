import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Box, Paper, Button, Divider, Typography, CircularProgress } from '@mui/material';
import MediaAccountsTable from './MediaAccountsTable';

const ClientDetails = () => {
  const [client, setClient] = useState(null);
  const [mediaAccounts, setMediaAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        // Replace with your actual API endpoint
        const clientResponse = await axios.get('http://localhost:5002/user/createPassword');
        setClient(clientResponse.data);

        // Fetch media accounts related to the client
        const mediaResponse = await axios.get(`http://localhost:5002/user/createPassword`);
        setMediaAccounts(mediaResponse.data);
      } catch (err) {
        console.error('Error fetching client details or media accounts:', err);
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, []);

  const handleCreateMediaAccount = () => {
    navigate('/mediaform');
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          Client Details: {client ? client.name : 'Loading...'}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mt: 2, pl: 2 }}>
          {client ? (
            <>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <strong>ID:</strong> {client.id}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <strong>Name:</strong> {client.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <strong>Date of Birth:</strong> {client.dob}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {client.email}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <strong>Password Manager:</strong> {client.passwordManager}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <strong>Description:</strong> {client.description || '—'}
              </Typography>
            </>
          ) : (
            <Typography variant="subtitle1">Loading client details...</Typography>
          )}
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Media Accounts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateMediaAccount}
          sx={{ mb: 3 }}
        >
          Add Media
        </Button>
        <MediaAccountsTable mediaAccounts={mediaAccounts} />
      </Paper>
    </Box>
  );
};

export default ClientDetails;
