import React, { useState } from 'react';

import {
  Table,
  Paper,
  Dialog,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material';

const dummyMediaAccounts = [
  { id: 1, platform: 'Facebook', url: 'https://facebook.com', email: 'user@facebook.com', username: 'user1', password: 'password1', notes: 'Some notes', image: 'https://via.placeholder.com/150' },
  { id: 2, platform: 'Twitter', url: 'https://twitter.com', email: 'user@twitter.com', username: 'user2', password: 'password2', notes: 'Some notes', image: 'https://via.placeholder.com/150' },
  { id: 3, platform: 'Instagram', url: 'https://instagram.com', email: 'user@instagram.com', username: 'user3', password: 'password3', notes: 'Some notes', image: 'https://via.placeholder.com/150' },
];

export default function MediaAccountsTable() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ p: 2 }}>Media Accounts</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Platform</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyMediaAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.platform}</TableCell>
                <TableCell>{account.url}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.username}</TableCell>
                <TableCell>{account.password}</TableCell>
                <TableCell>{account.notes}</TableCell>
                <TableCell>
                  <Button onClick={() => handleImageClick(account.image)} style={{ padding: 0 }}>
                    <img
                      src={account.image}
                      alt={account.platform}
                      width="50"
                      height="50"
                      style={{ cursor: 'pointer' }}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
