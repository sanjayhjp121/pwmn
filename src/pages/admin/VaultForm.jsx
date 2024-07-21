import axios from 'axios';
import { useState } from 'react';

import {
    Stack,
    Button,
    TextField,
} from '@mui/material';

export default function VaultForm( onClose ) {
    const [formData, setFormData] = useState({
        user_id: '',
        type: '',
        username: '',
        password: '',
        expiration_date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_PORT}/vault/create`, formData);
            alert(response.data.message);
            onClose();
        } catch (error) {
            console.error(error);
            alert('Error saving vault details');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    label="User ID"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Expiration Date"
                    name="expiration_date"
                    type="date"
                    value={formData.expiration_date}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Save
                </Button>
            </Stack>
        </form>
    );
}
