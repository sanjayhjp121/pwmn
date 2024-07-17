import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Box, Button, TextField, Typography, Autocomplete} from '@mui/material';


const clients = [
  { id: 1, name: 'Client 1' },
  { id: 2, name: 'Client 2' },
  { id: 3, name: 'Client 3' },
  // Add more clients as needed
];

const MediaAccountForm = () => {
  const [formValues, setFormValues] = React.useState({
    platform: '',
    url: '',
    email: '',
    username: '',
    password: '',
    notes: '',
    image: '',
    clients: [],
    FA_phone: '',
    FA_App: '',
    Recovery_Email: '',
    Backup_Codes: '',
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleClientsChange = (event, newValue) => {
    setFormValues({ ...formValues, clients: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save media account data
    console.log('Form Submitted', formValues);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFormValues({ ...formValues, image: reader.result });
    };

    reader.readAsDataURL(file);
  }, [formValues]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Create Media Account</Typography>
      <Autocomplete
        multiple
        options={clients}
        getOptionLabel={(option) => option.name}
        value={formValues.clients}
        onChange={handleClientsChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Clients"
            placeholder="Select clients"
            fullWidth
            sx={{ mb: 2 }}
          />
        )}
      />
      <TextField
        label="Platform Name"
        name="platform"
        value={formValues.platform}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="URL"
        name="url"
        value={formValues.url}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Username"
        name="username"
        value={formValues.username}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Notes"
        name="notes"
        value={formValues.notes}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="2FA Phone"
        name="FA_phone"
        value={formValues.FA_phone}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="2FA App"
        name="FA_App"
        value={formValues.FA_App}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Recovery Email"
        name="Recovery_Email"
        value={formValues.Recovery_Email}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Backup Codes"
        name="Backup_Codes"
        value={formValues.Backup_Codes}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Box {...getRootProps()} sx={{ border: '2px dashed gray', p: 5, textAlign: 'center', mb: 2 }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the image here...</Typography>
        ) : (
          <Typography>Drag & drop an image here, or click to select one</Typography>
        )}
      </Box>

      {formValues.image && (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <img src={formValues.image} alt="Selected" style={{ maxWidth: '10%' }} />
        </Box>
      )}

      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

export default MediaAccountForm;
