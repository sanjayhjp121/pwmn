import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

import TableNoData from 'src/sections/admin-table/table-no-data';
import BrandTableRow from 'src/sections/admin-table/user-table-row';
import BrandTableHead from 'src/sections/admin-table/user-table-head';
import TableEmptyRows from 'src/sections/admin-table/table-empty-rows';
import BrandTableToolbar from 'src/sections/admin-table/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from 'src/sections/admin-table/utils';

export default function BrandPage() {
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [verified, setVerified] = useState(false);
  const [openClientDialog, setOpenClientDialog] = useState(false);
  const [openMediaDialog, setOpenMediaDialog] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandCompany, setNewBrandCompany] = useState('');
  const [newBrandStatus, setNewBrandStatus] = useState('active');
  const [error, setError] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [phone_number, setNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const fetchBrands = async () => {
    try {
      const response = await axios.get('http://localhost:5002/brand/listAll', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBrands(response.data.data);
    } catch (err) {
      console.error('Error fetching brands:', err);
      setError('Error fetching brands.');
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [page]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = brands.map((n) => n.full_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const handleNewClient = () => {
    setOpenClientDialog(true);
  };

  const handleCloseClientDialog = () => {
    setOpenClientDialog(false);
    setNewBrandName('');
    setNewBrandCompany('');
    setVerified(false);
    setNewBrandStatus('active');
    setNumber('');
    setNewEmail('');
    setNewPassword('');
  };

  const handleCreateClient = async () => {
    const newClient = {
      full_name: newBrandName,
      email: newEmail,
      phone_number,
      company_name: newBrandCompany,
      email_verified: verified,
      status: newBrandStatus,
      password: newPassword,
    };

    console.log('Creating client with data:', newClient);

    try {
      const response = await axios.post('http://localhost:5002/brand/create', newClient, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Response from server:', response.data);

      if (response.data.code) {
        setBrands([...brands, response.data.data]);
        handleCloseClientDialog();
      }
    } catch (err) {
      console.error('Error creating client:', err);
      setError('Error creating client.');
    }
  };

  const handleNewMedia = () => {
    navigate('/mediaform'); // Navigate to the Create Media page
  };

  const dataFiltered = applyFilter({
    inputData: brands,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Brands</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNewClient}>
            New Client
          </Button>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNewMedia}>
            New Media
          </Button>
        </Stack>
      </Stack>

      <Card>
        <BrandTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <BrandTableHead
                order={order}
                orderBy={orderBy}
                rowCount={brands.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'full_name', label: 'Name' },
                  { id: 'company_name', label: 'Company' },
                  { id: 'email_verified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <BrandTableRow
                      key={row.id}
                      name={row.full_name}
                      status={row.status}
                      company={row.company_name}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.email_verified}
                      number={row.number}
                      selected={selected.indexOf(row.full_name) !== -1}
                      onClick={(event) => handleClick(event, row.full_name)}
                    />
                  ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, brands.length)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={brands.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Dialog for adding new client */}
      <Dialog open={openClientDialog} onClose={handleCloseClientDialog}>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="phone_number"
            label="Phone Number"
            type="number"
            fullWidth
            value={phone_number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="company"
            label="Company"
            type="text"
            fullWidth
            value={newBrandCompany}
            onChange={(e) => setNewBrandCompany(e.target.value)}
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
            value={newBrandStatus}
            onChange={(e) => setNewBrandStatus(e.target.value)}
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
          <Button onClick={handleCloseClientDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateClient} color="primary">
            Save
          </Button>
          <Button onClick={handleCloseClientDialog} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>

      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
}
