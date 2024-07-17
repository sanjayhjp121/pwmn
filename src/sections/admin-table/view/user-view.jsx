import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('full_name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [verified, setVerified] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserCompany, setNewUserCompany] = useState('');
  const [newUserStatus, setNewUserStatus] = useState('active');
  const [error, setError] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [phone_number, setNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newAgency, setNewAgency] = useState(''); // Add state for agency

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5002/user/listAllMember', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error fetching users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.full_name);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = [...selected, name];
    } else if (selectedIndex === 0) {
      newSelected = selected.slice(1);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  const handleNewUser = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewUserName('');
    setNewUserCompany('');
    setVerified(false);
    setNewUserStatus('active');
    setNumber('');
    setNewEmail('');
    setNewPassword('');
    setNewAgency(''); // Reset agency field
    setError(null); // Clear error state on dialog close
  };

  const handleCreateUser = async () => {
    const newUser = {
      full_name: newUserName,
      email: newEmail,
      phone_number,
      company_name: newUserCompany,
      email_verified: verified,
      status: newUserStatus,
      password: newPassword,
      agency: newAgency, // Include agency in the new user data
    };

    try {
      const response = await axios.post('http://localhost:5002/user/createMember', newUser, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.code === 200) {
        setUsers([...users, response.data.data]);
        handleCloseDialog(); // Close dialog on successful creation
      } else {
        console.error('Error creating user:', response.data.message);
        setError('Error creating user.');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Error creating user.');
    }
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNewUser}>
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'full_name', label: 'Name' },
                  { id: 'company_name', label: 'Company' },
                  { id: 'email_verified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '', label: '' },
                ]}
              />

              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <UserTableRow
                    key={row.id}
                    row={row}
                    selected={selected.indexOf(row.full_name) !== -1}
                    onSelectRow={(event) => handleClick(event, row.full_name)}
                  />
                ))}
                <TableEmptyRows height={53} emptyRows={emptyRows(page, rowsPerPage, users.length)} />
                <TableNoData isNotFound={notFound} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="number"
            label="Phone Number"
            type="text"
            fullWidth
            value={phone_number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            id="company"
            label="Company"
            type="text"
            fullWidth
            value={newUserCompany}
            onChange={(e) => setNewUserCompany(e.target.value)}
          />
          <TextField
            margin="dense"
            id="agency"
            label="Agency"
            type="text"
            fullWidth
            value={newAgency}
            onChange={(e) => setNewAgency(e.target.value)}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={verified}
              onChange={(e) => setVerified(e.target.checked)}
              color="primary"
            />
            <Typography>Verified</Typography>
          </div>
          <TextField
            margin="dense"
            id="status"
            label="Status"
            type="text"
            fullWidth
            value={newUserStatus}
            onChange={(e) => setNewUserStatus(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="primary">
            Save
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
}
