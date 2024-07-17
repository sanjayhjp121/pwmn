// /components/SubscriptionForm.js
import * as React from 'react';
import { Box, Button, TextField, MenuItem, FormControlLabel, Checkbox, Typography } from '@mui/material';

export default function SubscriptionForm({ onCancel }) {
  const [form, setForm] = React.useState({
    category: '',
    name: '',
    description: '',
    dateOfPurchase: '',
    endDate: '',
    planInterval: 'Monthly',
    notify: {
      monthBefore: false,
      weekBefore: false,
      dayBefore: false
    },
    cost: '',
    documents: null,
    teamMembers: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm({
        ...form,
        notify: {
          ...form.notify,
          [name]: checked
        }
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      documents: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(form);
    onCancel();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Category" name="category" value={form.category} onChange={handleChange} />
      <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
      <TextField label="Description" name="description" value={form.description} onChange={handleChange} multiline rows={4} />
      <TextField label="Date of Purchase" name="dateOfPurchase" type="date" value={form.dateOfPurchase} onChange={handleChange} InputLabelProps={{ shrink: true }} />
      <TextField label="End Date" name="endDate" type="date" value={form.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
      <TextField
        label="Plan Interval"
        name="planInterval"
        select
        value={form.planInterval}
        onChange={handleChange}
      >
        <MenuItem value="Monthly">Monthly</MenuItem>
        <MenuItem value="Yearly">Yearly</MenuItem>
        <MenuItem value="Lifetime">Lifetime</MenuItem>
      </TextField>
      <Typography variant="subtitle1">Notify me:</Typography>
      <FormControlLabel
        control={<Checkbox checked={form.notify.monthBefore} onChange={handleChange} name="monthBefore" />}
        label="One month before end date"
      />
      <FormControlLabel
        control={<Checkbox checked={form.notify.weekBefore} onChange={handleChange} name="weekBefore" />}
        label="One week before end date"
      />
      <FormControlLabel
        control={<Checkbox checked={form.notify.dayBefore} onChange={handleChange} name="dayBefore" />}
        label="One day before end date"
      />
      <TextField label="Subscription Cost" name="cost" value={form.cost} onChange={handleChange} />
      <Button variant="contained" component="label">
        Add Documents - Drag and Drop
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      <TextField label="Share access: team members" name="teamMembers" value={form.teamMembers} onChange={handleChange} />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Save Subscription
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
