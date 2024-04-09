import { Helmet } from 'react-helmet-async';
import React, {useContext, useEffect} from 'react';
import {
    Card,
    Table,
    Stack,
    Paper,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    IconButton,
    TableContainer,
    TablePagination, Box, Snackbar, TextField, Backdrop, FormControlLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import {ListHead, ListToolbar} from "../sections/list";
import UserForm from "../sections/user/UserForm";
import UserDelete from "../sections/user/UserDelete";
import UserContext from "../hooks/user/UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";

// ----------------------------------------------------------------------

export default function UserPage() {

  const {
      user,
      users,
      openSnackbar,
      messageSnackbar,
      typeSnackbar,
      getUsers,
      openForm,
      handleOpenForm,
      handleCloseForm,
      handleInputChange,
      handleSubmit,
      handleOpenDelete,
      handleCloseSnackbar,
      filterName,
      page,
      rowsPerPage,
      selected,
      handleClick,
      handleChangePage,
      handleChangeRowsPerPage,
      filteredUsers,
      emptyRows,
      isNotFound,
      filterField,
      loading
  } = useContext(UserContext);


  useEffect(() => {
    getUsers();
  }, []);

  return (
      <>
        <Helmet>
          <title>Usuarios</title>
        </Helmet>

        <Box sx={{margin: 2}}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h4" gutterBottom>
              Usuarios
            </Typography>
            <Button sx={{textTransform: "none"}} variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}
                    onClick={(event) => handleOpenForm(event, null)}>
              Usuario
            </Button>
          </Stack>

          <UserForm/>

          <UserDelete/>

          <Card>
            <ListToolbar context={UserContext} name={"Usuario"} title={"usuarios"}/>

            <Scrollbar>
              <TableContainer sx={{minWidth: 1000}}>
                <Table>
                  <ListHead context={UserContext} name={"usuarios"}/>
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const {
                        id,
                        username,
                        first_name,
                        last_name,
                        email,
                        is_staff,
                        is_active,
                        permissions,
                        identification
                      } = row;
                      const nombre = `${first_name} ${last_name}`;
                      const selectedUser = selected.indexOf(id) !== -1;

                      return (
                          <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                            <TableCell padding="checkbox">
                              <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, nombre)} />
                            </TableCell>

                            <TableCell align="left">{id}</TableCell>

                            <TableCell align="left">{username}</TableCell>

                            <TableCell align="left">{first_name}</TableCell>

                            <TableCell align="left">{last_name}</TableCell>

                            <TableCell align="left">{email}</TableCell>
                            
                            <TableCell align="left">{is_staff}</TableCell>
                            
                            <TableCell align="left">{is_active}</TableCell>
                            
                            <TableCell align="left">{permissions}</TableCell>
                            
                            <TableCell align="left">{identification}</TableCell>

                            <TableCell align="center" width={"5%"}>
                              <div style={{ display: 'flex' }}>
                                <IconButton id={`editar-usuario-${id}`} color="inherit" onClick={(event)=>handleOpenForm(event, id)}>
                                  <EditIcon />
                                </IconButton>
                                {is_staff && <IconButton id={`eliminar-usuario-${id}`} color="inherit" onClick={(event)=>handleOpenDelete(event, id)}>
                                  <DeleteIcon />
                                </IconButton>}
                              </div>
                            </TableCell>

                          </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={10} />
                        </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
                            <Paper
                                sx={{
                                  textAlign: 'center',
                                }}
                            >
                              <Typography variant="h6" paragraph>
                                No se encontraron resultados
                              </Typography>

                              <Typography variant="body2">
                                No se encontraron resultados para &nbsp;
                                filterField
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Intente buscar con otro nombre.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                  )}
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
                labelRowsPerPage="Filas por página"
            />
          </Card>
        </Box>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={typeSnackbar} sx={{ width: '100%' }}>
            {messageSnackbar}
          </Alert>
        </Snackbar>

      </>
  );
}