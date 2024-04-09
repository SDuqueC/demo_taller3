import React, {useContext} from "react";
import Modal from "@mui/material/Modal";
import {
    Backdrop,
    Box,
    Button, CircularProgress,
    Divider,
    Grid, IconButton, InputAdornment,
    MenuItem,
    Stack,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import UserContext from "../../hooks/user/UserContext";

const scrollBarStyle = {
    scrollbarWidth: 'thin', // Para navegadores que no sean webkit
    scrollbarColor: '#888 #f1f1f1', // Color del pulgar y del riel
    WebkitOverflowScrolling: 'touch',
    '&::-webkit-scrollbar': {
        width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '12px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
}

export default function UserForm() {

    const {
        user,
        openForm,
        handleInputChange,
        handleOnBlur,
        handleCloseForm,
        handleSubmit,
        userError,
        edit,
        loading
        } = useContext(UserContext);

    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSmallScreen ? '90%' : '70%',
        height: isSmallScreen ? '80%' : '74%',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,

        ...(isSmallScreen ? {} : {scrollBarStyle}),
    };

    const textFieldStyle = { minHeight: "5rem" };

    return (
        <>
            <Modal
                open={openForm}
                onClose={handleCloseForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    component="form"
                    sx={modalStyle}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                        <Typography variant="h4" gutterBottom>
                            {edit ? "Editar" : "Crear"} Cliente
                        </Typography>
                    </Stack>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id={"usuario"}
                                fullWidth
                                name="usuario"
                                value={user.username}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur}
                                label={"Usuario"} variant="outlined"
                                style={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id={"nombre"}
                                fullWidth
                                required
                                name="nombre"
                                value={user.first_name}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur}
                                label={"Nombre"} variant="outlined"
                                style={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id={"apellido"}
                                fullWidth
                                required
                                name={"apellido"}
                                value={user.last_name}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur}
                                label={"Apellido"} variant="outlined"
                                style={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            id={"correo"}
                            fullWidth
                            required
                            name={"correo"}
                            value={user.email}
                            onChange={handleInputChange}
                            onBlur={handleOnBlur}
                            label={"Correo"} variant="outlined"
                            style={textFieldStyle}
                        />
                    </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={user.is_staff}
                                        onChange={handleInputChange}
                                        name="is_staff"
                                    />
                                }
                                label="Es del personal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={user.is_active}
                                        onChange={handleInputChange}
                                        name="is_active"
                                    />
                                }
                                label="Está activo"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                id={"permisos"}
                                fullWidth
                                required
                                name={"permisos"}
                                value={user.permissions}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur}
                                label={"Permisos"} variant="outlined"
                                style={textFieldStyle}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id={"identificacion"}
                                fullWidth
                                required
                                name={"identificacion"}
                                value={user.identification}
                                onChange={handleInputChange}
                                onBlur={handleOnBlur}
                                label={"Identificacion"} variant="outlined"
                                style={textFieldStyle}
                                disabled={edit}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" alignItems="center" justifyContent="space-between" >
                        <Button id={"agregar-editar-usuario"} variant="contained" type="submit">
                            {edit ? "Editar" : "Agregar"}
                        </Button>
                        <Button variant="contained" onClick={handleCloseForm}>
                            Cancelar
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 5000, position: 'absolute'}}
                open = {loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}