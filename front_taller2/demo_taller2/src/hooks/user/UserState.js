import propTypes from 'prop-types';
import React, {useEffect} from 'react';
import { getAllUsers, getUsuario, createUser, updateUsuario, deleteUsuario } from "../../api/UserApi";
import { applySortFilter, getComparator } from "../../filter/Filter";
import UserContext from "./UserContext";


UserState.propTypes = {
    children: propTypes.node,
};


export default function UserState(props) {

    const TABLE_HEAD = [
        { id: 'id', label: 'ID', alignRight: false},
        { id: 'username', label: 'Nombre de Usuario', alignRight: false },
        { id: 'first_name', label: 'Nombre', alignRight: false },
        { id: 'last_name', label: 'Apellido', alignRight: false },
        { id: 'email', label: 'Correo Electrónico', alignRight: false },
        { id: 'is_staff', label: 'Es Staff', alignRight: false },
        { id: 'is_active', label: 'Activo', alignRight: false },
        { id: 'permissions', label: 'Permiso', alignRight: false },
        { id: 'identification', label: 'Identificación', alignRight: false },
        { id: 'actions', label: 'Acciones', alignRight: true, disablePadding: true, disableSort: true},
    ];

    const FILTER_OPTIONS = [
        { id: 'username', label: 'Nombre de Usuario' },
        { id: 'first_name', label: 'Nombre' },
        { id: 'last_name', label: 'Apellido' },
        { id: 'email', label: 'Correo Electrónico' },
        { id: 'is_staff', label: 'Es Staff' },
        { id: 'is_active', label: 'Activo' },
        { id: 'permissions', label: 'Permiso' },
        { id: 'identification', label: 'Identificación' },
    ];

    const emptyUser = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        is_staff: false,
        is_active: true,
        permissions: '',
        identification: '',
    };

    const emptyError = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        is_staff: '',
        is_active: '',
        permissions: '',
        identification: '',
    };

    const [user, setUser] = React.useState(emptyUser);
    const [users, setUsers] = React.useState([]);
    const [openForm, setOpenForm] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [messageSnackbar, setMessageSnackbar] = React.useState('');
    const [typeSnackbar, setTypeSnackbar] = React.useState('success');
    const [loading, setLoading] = React.useState(false);

    const getUsers = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response);
            setLoading(false)
        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('Error al obtener los usuarios');
            handleOpenSnackbar();
        }
    };

    const getUser = async (id) => {
        try {
            const response = await getUsuario(id);
            setUser(response.data);
        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('Error al obtener el usuario');
            handleOpenSnackbar();
        }
    };

    const addUser = async (user) => {
        try {
            setLoading(true)
            const response = await createUser(user);
            setUsers([...users, response.data])
            setTypeSnackbar('success');
            setMessageSnackbar('Usuario creado correctamente');
            handleOpenSnackbar();
            handleCloseForm();
            setLoading(false)

        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('Error al crear el usuario');
            handleOpenSnackbar();
        }
    };

    const updateUser = async (user) => {
        try {
            setLoading(true)
            await updateUsuario(user);
            setTypeSnackbar('success');
            setMessageSnackbar('Usuario actualizado correctamente');
            handleOpenSnackbar();
            handleCloseForm();
            setLoading(false)

        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('Error al actualizar el usuario');
            handleOpenSnackbar();
        }
    };

    const deleteUser = async (id) => {
        try {
            await deleteUsuario(id);
            setTypeSnackbar('success');
            setMessageSnackbar('Usuario eliminado correctamente');
            handleOpenSnackbar();
            handleCloseForm();

        } catch (error) {
            setTypeSnackbar('error');
            setMessageSnackbar('Error al eliminar el usuario');
            handleOpenSnackbar();
        }
    };

/*    useEffect(() => {
        getUsers();
    }, []);*/

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        console.log(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.id) {
            updateUser(user).then(() => getUsers());
        } else {
            addUser(user).then(() => getUsers());
        }
    }

    const [error, setError] = React.useState(emptyError);

    const handleOnBlur = (event) => {
        const { name, value } = event.target;
        if (!value) {
            setError({ ...error, [name]: 'Campo requerido' });
        } else {
            setError({ ...error, [name]: '' });
        }
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteUser(user.id).then(() => getUsers());
        handleCloseDelete();
    }

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    }

    const handleOpenForm = async (event, id) => {
        if (id) {
            await getUser(id);
        } else {
            setUser(emptyUser);
        }
        setOpenForm(true);
    }

    const handleCloseForm = () => {
        setOpenForm(false);
    }

    const handleOpenDelete = async (event, id) => {
        await getUser(id);
        setOpenDelete(true);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const [filterName, setFilterName] = React.useState('');
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [edit, setEdit] = React.useState(false);
    const [selected, setSelected] = React.useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const [openFilter, setOpenFilter] = React.useState(null);
    const [filterField, setFilterField] = React.useState('id');

    const handleOpenFilter = (event) => {
        setOpenFilter(event.currentTarget);
    }

    const handleCloseFilter = () => {
        setOpenFilter(null);
    }

    const handleFilterField = (event, field) => {
        setFilterField(field);
        handleCloseFilter();
    }

    // const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName, filterField, 'usuarios');
    console.log(users)
    let filteredUsers = [];
    if (users?.length > 0) {
        filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName, filterField, 'usuarios');
        console.log(filteredUsers);
    }
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
    const isNotFound = !filteredUsers.length && !!filterName;

    const [userError, setUserError] = React.useState(emptyError);

    const getUserError = () => {
        setUserError(emptyError);
    }

    return (
            <UserContext.Provider value={
                {
                    TABLE_HEAD,
                    FILTER_OPTIONS,
                    user,
                    users,
                    openForm,
                    edit,
                    openSnackbar,
                    messageSnackbar,
                    typeSnackbar,
                    openDelete,
                    getUsers,
                    handleInputChange,
                    handleSubmit,
                    handleDelete,
                    handleOnBlur,
                    handleOpenForm,
                    handleCloseForm,
                    handleOpenDelete,
                    handleCloseDelete,
                    handleCloseSnackbar,
                    filterName,
                    order,
                    orderBy,
                    page,
                    rowsPerPage,
                    selected,
                    filteredUsers,
                    emptyRows,
                    isNotFound,
                    handleRequestSort,
                    handleClick,
                    handleChangePage,
                    handleChangeRowsPerPage,
                    handleFilterByName,
                    userError,
                    filterField,
                    handleFilterField,
                    openFilter,
                    handleOpenFilter,
                    handleCloseFilter,
                    loading
                }
            }>
                {props.children}
            </UserContext.Provider>
    );


}