import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box,Paper, Button, Divider, Typography } from '@mui/material';

import MediaAccountsTable from './MediaAccountsTable';

const ClientDetails = () => {
  // const [openForm, setOpenForm] = React.useState(false);
  const navigate = useNavigate();

  const handleCreateMediaAccount = () => {
    navigate('/mediaform')
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          Client Details: Waghru
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mt: 2, pl: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <strong>ID:</strong> 200856
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <strong>Name:</strong> Funsukh Waghru
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <strong>Date of Birth:</strong> 28-03-2003
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <strong>Email:</strong> demo@gmail.com
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <strong>Password Manager:</strong> Funsukh Waghru Basic Password Manager
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            <strong>Description:</strong> —
          </Typography>
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
        <MediaAccountsTable />
      </Paper>
    </Box>
  );
};

export default ClientDetails;
