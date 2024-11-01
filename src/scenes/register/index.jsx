import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Card, CardContent, CardActions, Typography, Button, Divider, useTheme, InputAdornment, IconButton } from "@mui/material";
import { colors } from "../../styles/colorPalette";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidad de password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para controlar visibilidad de confirm password

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setRegisterError("Las contraseñas no coinciden");
            return;
        }
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email, 
                    password: password, 
                    nombre_completo: nombreCompleto 
                }),
            });
        
            const data = await response.json();
            if (response.ok){
                navigate('/login');
            } else {
                const errorMessage = data.message;
                setRegisterError(errorMessage);
                
            }
        } catch (error) {
            console.error('Error en la autenticación', error);
            setRegisterError('Hubo un problema en el servidor');
        }
    }
    
    useEffect(() => {
        // Actualiza el mensaje de error en tiempo real si las contraseñas no coinciden
        if (password && confirmPassword && password !== confirmPassword) {
            setRegisterError('Las contraseñas no coinciden');
        } else {
            setRegisterError('');
        }
    }, [password, confirmPassword]);
    

    return(
        <Box
            mt={'5rem'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Card
                sx={{
                    border: `0.2rem solid ${colors.primary}`,
                    borderRadius: '0.8rem',
                    width: '35rem'
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1.5rem'
                        }}
                        component={'form'} 
                        onSubmit={handleRegister}
                    >
                        <Typography 
                            variant='h2'
                            sx={{
                                color: colors.accent,
                                marginBottom: '1.5rem',
                                fontWeight: '400'
                            }}
                        >Registrate</Typography>
                        <TextField 
                            type="text" 
                            value={nombreCompleto} 
                            onChange={(e) => setNombreCompleto(e.target.value)} 
                            label="Nombre"
                            placeholder="Ingrese nombre completo"
                            required
                            variant="outlined"
                            sx={{
                                width: '90%'
                            }}
                        />
                        <Box display={'flex'} flexDirection={'row'} sx={{ width: '90%', gap: '1rem'}}>
                            <TextField 
                                type={showPassword ? "text" : "password"}
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                label="Password"
                                placeholder="Ingrese password"
                                required
                                variant="outlined"
                                sx={{
                                    width: '50%'
                                }}
                                slotProps = {{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                            <TextField
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                label="Confirm Password"
                                placeholder="Confime password"
                                required
                                variant="outlined"
                                sx={{
                                    width: '50%'
                                }}
                                slotProps = {{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                        </Box>
                        <TextField 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            label="Email"
                            placeholder="Ingrese email"
                            required
                            variant="outlined"
                            sx={{
                                width: '90%'
                            }}
                        />
                        
                        {registerError && 
                        <Typography 
                            variant='p'
                            sx={{ 
                                color: 'red',
                                fontWeight: 'bold',
                                margin: '1rem'
                            }}
                        >{registerError}</Typography>}
                        <Button
                            type='submit'
                            variant="contained"
                            sx={{
                                bgcolor: colors.accent,
                                color: colors.primary,
                                fontWeight: "bold",
                                width: "10rem",
                                marginBottom: "1.5rem"
                            }}
                        >Crear Cuenta</Button>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box m={'1rem'}>
                        <Typography
                            variant="body"
                            sx={{
                                color: colors.light
                            }}
                        >
                            <Link to="/login" style={{ color: `${colors.light}`, textDecoration: 'none' }}>
                                ¿Ya tienes una cuenta? ¡Inicia Sesión!
                            </Link>
                        </Typography>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
};

export default Register;