import React, { useState } from 'react';

import {
  Table,
  Paper,
  Dialog,
  Button,
  Select,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  InputLabel,
  FormControl,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material';

// Dummy data for media accounts (you should replace this with real data)
const dummyMediaAccounts = [
  { id: 1, platform: 'Facebook', url: 'https://facebook.com', email: 'user@facebook.com', username: 'user1', password: 'password1', notes: 'Some notes', image: 'https://via.placeholder.com/150' },
  { id: 2, platform: 'Twitter', url: 'https://twitter.com', email: 'user@twitter.com', username: 'user2', password: 'password2', notes: 'Some notes', image: 'https://via.placeholder.com/150' },
  { id: 3, platform: 'Instagram', url: 'https://instagram.com', email: 'user@instagram.com', username: 'user3', password: 'password3', notes: 'Some notes', image: 'https://via.placeholder.com/150' },
  { id: 4, platform: 'LinkedIn', url: 'https://linkedin.com', email: 'user@linkedin.com', username: 'user4', password: 'password4', notes: 'Some notes', image: 'https://via.placeholder.com/150' },
  { id: 5, platform: 'Snapchat', url: 'https://snapchat.com', email: 'user@snapchat.com', username: 'user5', password: 'password5', notes: 'Some notes', image: 'https://via.placeholder.com/150' },
  { id: 6, platform: 'Airbnb', url: 'https://airbnb.com', email: 'user@airbnb.com', username: 'user6', password: 'password6', notes: 'Some notes', image: 'https://via.placeholder.com/150' },
  { id: 7, platform: 'Booking.com', url: 'https://booking.com', email: 'user@booking.com', username: 'user7', password: 'password7', notes: 'Some notes', image: 'https://via.placeholder.com/150' },
  { id: 8, platform: 'Expedia', url: 'https://expedia.com', email: 'user@expedia.com', username: 'user8', password: 'password8', notes: 'Some notes', image: 'https://via.placeholder.com/150' },
  // Add more platforms as needed
];

const platforms = [
  'Facebook',
  'Twitter',
  'Instagram',
  'LinkedIn',
  'Snapchat',
  'Airbnb',
  'Booking.com',
  'Expedia',
  // Add more famous platforms here
];

export default function MediaAccountsTable() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ p: 2 }}>Media Accounts</Typography>
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <InputLabel>Platform</InputLabel>
          <Select
            value={selectedPlatform}
            onChange={handlePlatformChange}
            label="Platform"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {platforms.map((platform, index) => (
              <MenuItem key={index} value={platform}>{platform}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
            {dummyMediaAccounts
              .filter(account => !selectedPlatform || account.platform === selectedPlatform)
              .map((account) => (
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
