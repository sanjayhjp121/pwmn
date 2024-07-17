import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

export default function BrandTableRow({
  selected,
  name,
  description,
  company,
  address,
  _id, // Added _id prop to receive the agency ID
}) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRowClick = () => {
    // Navigate to '/adduser' with agency ID
    navigate(`/agency`);
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        style={{ cursor: 'pointer' }}
        onClick={handleRowClick} // Handle click on the whole row
      >
        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
          <Checkbox disableRipple checked={selected} onChange={() => {}} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} />
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Typography variant="body2">{description}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2">{company}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2">{address}</Typography>
        </TableCell>

        <TableCell align="right" onClick={(e) => e.stopPropagation()}>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Menu popover component remains the same */}
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

BrandTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  _id: PropTypes.string.isRequired, // Define _id prop type
};
