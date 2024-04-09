import React, { useContext} from "react";
import Modal from "@mui/material/Modal";
import {
    Box,
    Button,
    Stack,
    Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import UserContext from "../../hooks/user/UserContext";

export default function UserDelete() {

    const { User, openDelete, handleCloseDelete, handleDelete } = useContext(UserContext);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isSmallScreen ? "90%" : "70%",
        height: isSmallScreen ? "25%" : "auto",
        overflowY: "auto",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    return (
        <Modal
            open = {openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        Eliminar Cliente
                    </Typography>
                </Stack>
                <Typography variant="body1" gutterBottom>
                    ¿Está seguro que desea eliminar al cliente {User?.name}?

                </Typography>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="contained" onClick={handleCloseDelete}>
                        No
                    </Button>
                    <Button id={"confirmar-eliminar-cliente"} variant="contained" color="error" onClick={handleDelete}>
                        Sí
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}