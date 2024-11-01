import { Box, Typography, Card, CardHeader, CardContent, CircularProgress, Table, TableContainer, TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import { colors } from "../../styles/colorPalette";
import { useState, useEffect } from "react";
import { fetchUsers } from "../../actions/fetchUsers";
import dayjs from "dayjs";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [orderBy, setOrderBy] = useState('nombre_completo'); // Campo para ordenar
    const [orderDirection, setOrderDirection] = useState('asc'); // Dirección del orden

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [])
    

    const handleSort = (property) => {
        const isAsc = orderBy === property && orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedUsers = users.slice().sort((a, b) => {
        if (orderBy === 'fecha_registro' || orderBy === 'ultimo_login') {
            return (new Date(a[orderBy]) - new Date(b[orderBy])) * (orderDirection === 'asc' ? 1 : -1);
        } else {
            return (a[orderBy] > b[orderBy] ? 1 : -1) * (orderDirection === 'asc' ? 1 : -1);
        }
    });

    return (
        <Box p={'2rem'} bgcolor={colors.background} sx={{ height: '100%' }}>
            <Card>
                <CardHeader
                    title={
                        <Typography
                            sx={{
                                color: colors.secondary,
                                marginLeft: '2rem'
                            }}
                            variant="h6"
                        >Ususarios</Typography>
                    }
                    sx={{ bgcolor: '#d3d3d385' }}
                />
                <CardContent>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead
                                
                                >
                                    <TableRow>
                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === 'nombre_completo'}
                                                direction={orderBy === 'nombre_completo' ? orderDirection : 'asc'}
                                                onClick={() => handleSort('nombre_completo')}
                                            >Nombre completo</TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === 'email'}
                                                direction={orderBy === 'email' ? orderDirection : 'asc'}
                                                onClick={() => handleSort('email')}
                                            >Email</TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === 'fecha_registro'}
                                                direction={orderBy === 'fecha_registro' ? orderDirection : 'asc'}
                                                onClick={() => handleSort('fecha_registro')}
                                            >Fecha de Registro</TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={orderBy === 'ultimo_login'}
                                                direction={orderBy === 'ultimo_login' ? orderDirection : 'asc'}
                                                onClick={() => handleSort('ultimo_login')}
                                            >Último Login</TableSortLabel>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {sortedUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.nombre_completo}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.fecha_registro ? dayjs(user.fecha_registro).format('YYYY-MM-DD hh:mm A') : 'N/A'}</TableCell>
                                        <TableCell>{user.ultimo_login ? dayjs(user.ultimo_login).format('YYYY-MM-DD hh:mm A') : 'N/A'}</TableCell>
                                    </TableRow>
                                ))}
                            </Table>
                        </TableContainer>
                    )} 
                </CardContent>
            </Card>
        </Box>
    )
}

export default Users;