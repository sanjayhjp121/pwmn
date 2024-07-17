import React from 'react';
import { Container, Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, TablePagination, Toolbar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const auditLogs = [
  { id: 1, email: 'konjat@gmail.com', action: 'revealed OTP code for account: Facebook (Sample)', timestamp: '1 minute ago', ip: '2001:8f8:1c39:7229:2cd2:524b:34ea:48d3' },
  { id: 2, email: 'konjat@gmail.com', action: 'revealed OTP code for account: Apple (Sample)', timestamp: '1 minute ago', ip: '2001:8f8:1c39:7229:2cd2:524b:34ea:48d3' },
  { id: 3, email: 'konjat@gmail.com', action: 'logged in', timestamp: '2 minutes ago', ip: '2001:8f8:1c39:7229:2cd2:524b:34ea:48d3' },
  { id: 4, email: 'konjat@gmail.com', action: 'signed up for Daito with organization Konjat', timestamp: '2 minutes ago', ip: '2001:8f8:1c39:7229:2cd2:524b:34ea:48d3' },
];

const Logs = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredLogs = auditLogs.filter(log => 
    log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.timestamp.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.ip.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>Audit Log</Typography>
        <Toolbar>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search log entry..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            sx={{ width: 400 }}
          />
        </Toolbar>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>IP Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(log => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'red', mr: 2 }}>{log.email.charAt(0)}</Avatar>
                      {log.email}
                    </Box>
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredLogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
};

export default Logs;
