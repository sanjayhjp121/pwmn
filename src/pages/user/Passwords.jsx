import axios from 'axios';
import { useState, useEffect } from 'react';

import {
  Card,
  Stack,
  Table,
  Button,
  Dialog,
  Container,
  TableBody,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  TablePagination,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import PasswordTableRow from '../../sections/admin-table/user-table-row'; // Adjust import paths as necessary
import TableNoData from '../../sections/admin-table/table-no-data';
import TableEmptyRows from '../../sections/admin-table/table-empty-rows';
import PasswordTableHead from '../../sections/admin-table/user-table-head';
import PasswordTableToolbar from '../../sections/admin-table/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../../sections/admin-table/utils';

export default function Passwords() {
  const [passwords, setPasswords] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('website');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [newWebsite, setNewWebsite] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newCategory, setNewCategory] = useState('general');

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const response = await axios.get('http://localhost:5002/password/listAll');
      setPasswords(response.data.data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = passwords.map((n) => n.website);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, website) => {
    const selectedIndex = selected.indexOf(website);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, website);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleNewPassword = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewWebsite('');
    setNewUsername('');
    setNewPassword('');
    setNewCategory('general');
  };

  const handleCreatePassword = async () => {
    const newPasswordEntry = {
      website: newWebsite,
      username: newUsername,
      password: newPassword,
      category: newCategory,
    };

    try {
      const response = await axios.post("http://localhost:5002/password/create", newPasswordEntry);
      setPasswords([...passwords, response.data]);
      handleCloseDialog();
    } catch (error) {
      console.error('Error creating password:', error);
    }
  };

  const dataFiltered = applyFilter({
    inputData: passwords,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Passwords</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNewPassword}>
          New Password
        </Button>
      </Stack>

      <Card>
        <PasswordTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <PasswordTableHead
                order={order}
                orderBy={orderBy}
                rowCount={passwords.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'website', label: 'Website' },
                  { id: 'username', label: 'Username' },
                  { id: 'password', label: 'Password' },
                  { id: 'category', label: 'Category' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PasswordTableRow
                      key={row.id}
                      website={row.website}
                      username={row.username}
                      password={row.password}
                      category={row.category}
                      selected={selected.indexOf(row.website) !== -1}
                      handleClick={(event) => handleClick(event, row.website)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, passwords.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={passwords.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Dialog for adding new password */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="website"
            label="Website"
            type="text"
            fullWidth
            value={newWebsite}
            onChange={(e) => setNewWebsite(e.target.value)}
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="text"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreatePassword} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
